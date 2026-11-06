import fs from "fs";
import path from "path";
import crypto from "crypto";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Media } from "../models/Media.js";

dotenv.config();

/**
 * ============================================================================
 * Cloudflare R2 Asset Migration Script
 * ============================================================================
 * Automatically scans original assets from client/src/assets and client/public,
 * uploads them into their respective Cloudflare R2 bucket folders (hero, causes,
 * gallery, patients, reports, branding), and syncs live URLs with MongoDB Media!
 *
 * Requirements in backend/.env:
 *   CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
 *   CLOUDFLARE_R2_ACCESS_KEY_ID=your_r2_access_key_id
 *   CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
 *   CLOUDFLARE_R2_BUCKET_NAME=islah-public-assets
 *   CLOUDFLARE_R2_PUBLIC_URL=https://pub-xxxxxx.r2.dev  (or your custom domain: https://cdn.iwfindia.org)
 * ============================================================================
 */

// S3 AWS v4 Signature Helpers (Zero external dependency — uses Node native crypto)
function getSignatureKey(key: string, dateStamp: string, region: string, service: string) {
  const kDate = crypto.createHmac("sha256", "AWS4" + key).update(dateStamp).digest();
  const kRegion = crypto.createHmac("sha256", kDate).update(region).digest();
  const kService = crypto.createHmac("sha256", kRegion).update(service).digest();
  return crypto.createHmac("sha256", kService).update("aws4_request").digest();
}

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    case ".pdf":
      return "application/pdf";
    default:
      return "application/octet-stream";
  }
}

async function uploadFileToR2(
  filePath: string,
  r2Key: string,
  credentials: {
    accountId: string;
    accessKeyId: string;
    secretAccessKey: string;
    bucketName: string;
  }
): Promise<boolean> {
  const { accountId, accessKeyId, secretAccessKey, bucketName } = credentials;
  const fileBuffer = fs.readFileSync(filePath);
  const contentType = getMimeType(filePath);

  const host = `${accountId}.r2.cloudflarestorage.com`;
  const endpoint = `https://${host}/${bucketName}/${encodeURIComponent(r2Key).replace(/%2F/g, "/")}`;

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.substring(0, 8);
  const region = "auto";
  const service = "s3";

  const payloadHash = crypto.createHash("sha256").update(fileBuffer).digest("hex");
  const canonicalUri = `/${bucketName}/${encodeURIComponent(r2Key).replace(/%2F/g, "/")}`;

  const canonicalHeaders =
    `content-type:${contentType}\n` +
    `host:${host}\n` +
    `x-amz-content-sha256:${payloadHash}\n` +
    `x-amz-date:${amzDate}\n`;

  const signedHeaders = "content-type;host;x-amz-content-sha256;x-amz-date";

  const canonicalRequest =
    "PUT\n" +
    canonicalUri + "\n" +
    "\n" + // query string
    canonicalHeaders + "\n" +
    signedHeaders + "\n" +
    payloadHash;

  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign =
    "AWS4-HMAC-SHA256\n" +
    amzDate + "\n" +
    credentialScope + "\n" +
    crypto.createHash("sha256").update(canonicalRequest).digest("hex");

  const signingKey = getSignatureKey(secretAccessKey, dateStamp, region, service);
  const signature = crypto.createHmac("sha256", signingKey).update(stringToSign).digest("hex");

  const authorizationHeader =
    `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;

  try {
    const res = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": contentType,
        "x-amz-date": amzDate,
        "x-amz-content-sha256": payloadHash,
        Authorization: authorizationHeader,
      },
      body: fileBuffer,
    });

    if (res.ok) {
      return true;
    } else {
      const errText = await res.text();
      console.error(`❌ Upload failed for ${r2Key} (Status ${res.status}): ${errText}`);
      return false;
    }
  } catch (err: any) {
    console.error(`❌ Network error uploading ${r2Key}:`, err.message);
    return false;
  }
}

/**
 * Categorized Mapping of Original Files to R2 Sections & Dynamic Media Slots
 */
interface AssetTask {
  localPath: string;
  r2Key: string;
  slotKey?: string;
  category: "hero" | "causes" | "gallery" | "reports" | "patients" | "branding";
  title: string;
  altText: string;
  tags: string[];
}

async function run() {
  console.log("==========================================================");
  console.log(" 🚀 ISLAH - Cloudflare R2 Asset Upload & Database Syncer");
  console.log("==========================================================\n");

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || "islah-public-assets";
  const publicBaseUrl = (process.env.CLOUDFLARE_R2_PUBLIC_URL || "").replace(/\/+$/, "");

  if (!accountId || !accessKeyId || !secretAccessKey) {
    console.error("❌ Missing Cloudflare R2 Credentials in environment variables!");
    console.error("Please add the following to backend/.env:\n");
    console.error("  CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id");
    console.error("  CLOUDFLARE_R2_ACCESS_KEY_ID=your_r2_access_key_id");
    console.error("  CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_r2_secret_access_key");
    console.error("  CLOUDFLARE_R2_BUCKET_NAME=islah-public-assets");
    console.error("  CLOUDFLARE_R2_PUBLIC_URL=https://pub-xxxxxx.r2.dev\n");
    process.exit(1);
  }

  console.log(`📡 Connecting to Cloudflare R2:`);
  console.log(`   Account:    ${accountId}`);
  console.log(`   Bucket:     ${bucketName}`);
  console.log(`   Public CDN: ${publicBaseUrl || "(Direct endpoint)"}\n`);

  const clientDir = path.resolve(process.cwd(), "../client");
  const assetsDir = path.join(clientDir, "src/assets");
  const publicDocsDir = path.join(clientDir, "public/docs");

  const tasks: AssetTask[] = [
    // ── 1. Hero Carousel Banners ──
    {
      localPath: path.join(assetsDir, "hero-carousel/hero-slide-1.jpg"),
      r2Key: "hero/hero-slide-1.jpg",
      slotKey: "hero-slide-1",
      category: "hero",
      title: "Education for Every Child",
      altText: "Education for Every Child - Primary School Classroom",
      tags: ["hero", "education", "carousel"],
    },
    {
      localPath: path.join(assetsDir, "hero-carousel/hero-slide-2.jpg"),
      r2Key: "hero/hero-slide-2.jpg",
      slotKey: "hero-slide-2",
      category: "hero",
      title: "Building a Better India – Vision 2047",
      altText: "Building a Better India Vision 2047",
      tags: ["hero", "vision2047", "carousel"],
    },
    {
      localPath: path.join(assetsDir, "hero-carousel/hero-slide-3.jpg"),
      r2Key: "hero/hero-slide-3.jpg",
      slotKey: "hero-slide-3",
      category: "hero",
      title: "Healthcare That Reaches the Last Mile",
      altText: "Healthcare Rural Health Diagnostics",
      tags: ["hero", "healthcare", "carousel"],
    },
    {
      localPath: path.join(assetsDir, "hero-carousel/hero-slide-4.jpg"),
      r2Key: "hero/hero-slide-4.jpg",
      slotKey: "hero-slide-4",
      category: "hero",
      title: "Skills Today, Success Tomorrow",
      altText: "Vocational Skills Training",
      tags: ["hero", "livelihood", "carousel"],
    },

    // ── 2. Core Program Pillars (Causes) ──
    {
      localPath: path.join(assetsDir, "cause-education.jpg"),
      r2Key: "causes/cause-education.jpg",
      slotKey: "cause-education",
      category: "causes",
      title: "Education & Learning Centres",
      altText: "Education scholarships, school kits and remedial learning centres",
      tags: ["causes", "education"],
    },
    {
      localPath: path.join(assetsDir, "cause-medical.png"),
      r2Key: "causes/cause-medical.png",
      slotKey: "cause-medical",
      category: "causes",
      title: "Emergency Medical & Health Camps",
      altText: "Mobile medical units and diagnostic screenings",
      tags: ["causes", "healthcare"],
    },
    {
      localPath: path.join(assetsDir, "cause-women.jpg"),
      r2Key: "causes/cause-women.jpg",
      slotKey: "cause-women",
      category: "causes",
      title: "Women Empowerment & Micro-Enterprises",
      altText: "Self-help groups and women artisan tailoring",
      tags: ["causes", "women-empowerment"],
    },
    {
      localPath: path.join(assetsDir, "thematic-agriculture.jpg"),
      r2Key: "causes/cause-agriculture.jpg",
      slotKey: "cause-agriculture",
      category: "causes",
      title: "Rural Livelihoods & Agri-Empowerment",
      altText: "Organic farming, drip irrigation and rural livelihoods",
      tags: ["causes", "livelihood", "agriculture"],
    },
    {
      localPath: path.join(assetsDir, "thematic-entrepreneur.jpg"),
      r2Key: "causes/cause-relief.jpg",
      slotKey: "cause-relief",
      category: "causes",
      title: "Relief & Disaster Rehabilitation",
      altText: "Flood and emergency winter relief dispatches",
      tags: ["causes", "relief"],
    },

    // ── 3. Gallery Photos ──
    {
      localPath: path.join(assetsDir, "gallery-1.jpg"),
      r2Key: "gallery/gallery-1.jpg",
      slotKey: "gallery-1",
      category: "gallery",
      title: "Primary School Computer Learning Lab",
      altText: "Students learning computers in rural school",
      tags: ["gallery", "education"],
    },
    {
      localPath: path.join(assetsDir, "gallery-2.jpg"),
      r2Key: "gallery/gallery-2.jpg",
      slotKey: "gallery-2",
      category: "gallery",
      title: "Mobile Health Camp & Diagnostics",
      altText: "Doctor examining patient at community health camp",
      tags: ["gallery", "healthcare"],
    },
    {
      localPath: path.join(assetsDir, "gallery-3.jpg"),
      r2Key: "gallery/gallery-3.jpg",
      slotKey: "gallery-3",
      category: "gallery",
      title: "Empowering Rural Education — Documentary",
      altText: "Rural education documentary still",
      tags: ["gallery", "education"],
    },
    {
      localPath: path.join(assetsDir, "gallery-4.jpg"),
      r2Key: "gallery/gallery-4.jpg",
      slotKey: "gallery-4",
      category: "gallery",
      title: "Women's Self-Help Group Sewing Workshop",
      altText: "Women artisans working on sewing machines",
      tags: ["gallery", "women-empowerment"],
    },
    {
      localPath: path.join(assetsDir, "gallery-5.jpg"),
      r2Key: "gallery/gallery-5.jpg",
      slotKey: "gallery-5",
      category: "gallery",
      title: "Youth Vocational Training & Electrical Skills",
      altText: "Vocational electrical training workshop",
      tags: ["gallery", "livelihood"],
    },
    {
      localPath: path.join(assetsDir, "gallery-6.jpg"),
      r2Key: "gallery/gallery-6.jpg",
      slotKey: "gallery-6",
      category: "gallery",
      title: "Clean Village Tree Plantation Drive",
      altText: "Volunteers planting saplings in village",
      tags: ["gallery", "environment"],
    },

    // ── 4. Patient Photos ──
    {
      localPath: path.join(assetsDir, "patient-1.jpg"),
      r2Key: "patients/patient-1.jpg",
      category: "patients",
      title: "Master Aarav Kumar",
      altText: "Aarav Kumar Patient Photo",
      tags: ["patient", "healthcare"],
    },
    {
      localPath: path.join(assetsDir, "patient-2.jpg"),
      r2Key: "patients/patient-2.jpg",
      category: "patients",
      title: "Shakuntala Devi",
      altText: "Shakuntala Devi Patient Photo",
      tags: ["patient", "healthcare"],
    },
    {
      localPath: path.join(assetsDir, "patient-3.jpg"),
      r2Key: "patients/patient-3.jpg",
      category: "patients",
      title: "Rajesh Ranjan",
      altText: "Rajesh Ranjan Patient Photo",
      tags: ["patient", "healthcare"],
    },
    {
      localPath: path.join(assetsDir, "patient-4.jpg"),
      r2Key: "patients/patient-4.jpg",
      category: "patients",
      title: "Md. Tariq Anwer",
      altText: "Md. Tariq Anwer Patient Photo",
      tags: ["patient", "healthcare"],
    },

    // ── 5. Annual Reports & PDFs ──
    {
      localPath: path.join(publicDocsDir, "islah_report.pdf"),
      r2Key: "reports/islah_annual_report_latest.pdf",
      slotKey: "report-2023-24",
      category: "reports",
      title: "ISLAH Annual Report 2023-2024",
      altText: "Annual Financial and Statutory Impact Report PDF",
      tags: ["report", "governance", "audit"],
    },
    {
      localPath: path.join(publicDocsDir, "islah_brochure.pdf"),
      r2Key: "reports/islah_foundation_brochure.pdf",
      slotKey: "foundation-brochure",
      category: "reports",
      title: "ISLAH Welfare Foundation Official Brochure",
      altText: "Official Foundation Overview Brochure PDF",
      tags: ["brochure", "profile"],
    },

    // ── 6. Logos & Brand Assets ──
    {
      localPath: path.join(assetsDir, "logo.png"),
      r2Key: "branding/logo.png",
      slotKey: "brand-logo-primary",
      category: "branding",
      title: "ISLAH Foundation Logo",
      altText: "Official Primary Logo",
      tags: ["branding", "logo"],
    },
    {
      localPath: path.join(assetsDir, "new logo.png"),
      r2Key: "branding/new-logo.png",
      slotKey: "brand-logo-crest",
      category: "branding",
      title: "ISLAH Foundation Crest Logo",
      altText: "Official Crest Logo",
      tags: ["branding", "logo"],
    },
  ];

  console.log(`📦 Found ${tasks.length} core assets to migrate.\n`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    console.log(`[${i + 1}/${tasks.length}] Checking: ${task.r2Key}...`);

    if (!fs.existsSync(task.localPath)) {
      console.warn(`   ⚠️ Local file missing: ${task.localPath} (Skipping)`);
      continue;
    }

    const uploaded = await uploadFileToR2(task.localPath, task.r2Key, {
      accountId,
      accessKeyId,
      secretAccessKey,
      bucketName,
    });

    if (uploaded) {
      successCount++;
      const liveUrl = publicBaseUrl ? `${publicBaseUrl}/${task.r2Key}` : `https://${bucketName}.${accountId}.r2.cloudflarestorage.com/${task.r2Key}`;
      console.log(`   ✅ Live at: ${liveUrl}`);
      task.localPath = liveUrl; // reuse for db update
    } else {
      failCount++;
    }
  }

  console.log("\n----------------------------------------------------------");
  console.log(`🎉 Cloudflare R2 Upload Complete: ${successCount} uploaded, ${failCount} failed.`);
  console.log("----------------------------------------------------------\n");

  // Optional: Sync with MongoDB Media Collection if MONGO_URI is set
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (mongoUri && successCount > 0) {
    console.log("🗄️ Syncing live Cloudflare URLs with MongoDB Media registry...");
    try {
      await mongoose.connect(mongoUri);
      for (const task of tasks) {
        if (task.slotKey && task.localPath.startsWith("http")) {
          await Media.findOneAndUpdate(
            { key: task.slotKey },
            {
              $set: {
                title: task.title,
                category: task.category,
                url: task.localPath,
                altText: task.altText,
                tags: task.tags,
                mediaType: task.r2Key.endsWith(".pdf") ? "document" : "photo",
              },
            },
            { upsert: true, new: true }
          );
          console.log(`   ✨ Updated MongoDB slot: ${task.slotKey}`);
        }
      }
      await mongoose.disconnect();
      console.log("✅ MongoDB Media registry synchronized successfully!");
    } catch (err: any) {
      console.warn("⚠️ Could not sync with MongoDB:", err.message);
    }
  }

  console.log("\nAll done! 🚀");
}

run();

