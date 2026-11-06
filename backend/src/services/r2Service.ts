import crypto from "crypto";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export interface R2UploadResult {
  url: string;
  key: string;
  bucket: string;
  isPrivate: boolean;
  mimeType: string;
  sizeBytes: number;
}

function getMimeType(filePathOrName: string): string {
  const ext = path.extname(filePathOrName).toLowerCase();
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
    case ".doc":
      return "application/msword";
    case ".docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    default:
      return "application/octet-stream";
  }
}

function getSignatureKey(key: string, dateStamp: string, region: string, service: string) {
  const kDate = crypto.createHmac("sha256", "AWS4" + key).update(dateStamp).digest();
  const kRegion = crypto.createHmac("sha256", kDate).update(region).digest();
  const kService = crypto.createHmac("sha256", kRegion).update(service).digest();
  return crypto.createHmac("sha256", kService).update("aws4_request").digest();
}

/**
 * Uploads any file directly to Cloudflare R2
 * - Automatically routes confidential documents (PAN cards, resumes, medical records) to `islah-private-docs`
 * - Routes public media (photos, banners, news covers, publications) to `islah-public-assets`
 */
export async function uploadToR2(
  fileBuffer: Buffer,
  options: {
    folder?: string;
    originalName?: string;
    isPrivate?: boolean;
    mimeType?: string;
  } = {}
): Promise<R2UploadResult> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
  const publicBucket = process.env.CLOUDFLARE_R2_BUCKET_NAME || "islah-public-assets";
  const privateBucket = process.env.CLOUDFLARE_R2_PRIVATE_BUCKET_NAME || "islah-private-docs";
  const publicBaseUrl = (process.env.CLOUDFLARE_R2_PUBLIC_URL || "").replace(/\/+$/, "");

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error("Cloudflare R2 storage credentials are not configured in environment variables.");
  }

  const folder = (options.folder || "general").toLowerCase().replace(/^\/+|\/+$/g, "");
  const ext = options.originalName ? path.extname(options.originalName) : ".jpg";
  const cleanBase = options.originalName
    ? path.basename(options.originalName, ext).replace(/[^a-zA-Z0-9_-]/g, "_")
    : "asset";

  const filename = `${cleanBase}_${Date.now()}${ext}`;
  const r2Key = `${folder}/${filename}`;

  // Check if asset is confidential: PAN cards & explicitly private documents only
  // (Photos, CVs, and Resumes are PUBLIC as requested, stored on public Cloudflare CDN)
  const isConfidential =
    options.isPrivate === true ||
    folder.includes("pan") ||
    folder.includes("tax-exemption") ||
    folder.includes("confidential") ||
    cleanBase.toLowerCase().includes("pan");

  const targetBucket = isConfidential ? privateBucket : publicBucket;
  const contentType = options.mimeType || getMimeType(filename);

  const host = `${accountId}.r2.cloudflarestorage.com`;
  const endpoint = `https://${host}/${targetBucket}/${encodeURIComponent(r2Key).replace(/%2F/g, "/")}`;

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.substring(0, 8);
  const region = "auto";
  const service = "s3";

  const payloadHash = crypto.createHash("sha256").update(fileBuffer).digest("hex");
  const canonicalUri = `/${targetBucket}/${encodeURIComponent(r2Key).replace(/%2F/g, "/")}`;

  const canonicalHeaders =
    `content-type:${contentType}\n` +
    `host:${host}\n` +
    `x-amz-content-sha256:${payloadHash}\n` +
    `x-amz-date:${amzDate}\n`;

  const signedHeaders = "content-type;host;x-amz-content-sha256;x-amz-date";

  const canonicalRequest =
    "PUT\n" +
    canonicalUri + "\n" +
    "\n" +
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

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Cloudflare R2 PUT failed (${res.status}): ${errText}`);
  }

  // Generate resolved URL
  let finalUrl: string;
  if (isConfidential) {
    // Confidential documents: routed through backend secure viewer or presigned URL
    finalUrl = `/api/upload/private/${r2Key}`;
  } else {
    // Public assets: high-speed global edge CDN URL
    finalUrl = publicBaseUrl ? `${publicBaseUrl}/${r2Key}` : endpoint;
  }

  return {
    url: finalUrl,
    key: r2Key,
    bucket: targetBucket,
    isPrivate: isConfidential,
    mimeType: contentType,
    sizeBytes: fileBuffer.length,
  };
}

/**
 * Generates an expiring S3 presigned download URL for confidential documents in `islah-private-docs`
 * (Default: valid for 15 minutes / 900 seconds)
 */
export function getSignedPrivateUrl(r2Key: string, expiresInSeconds: number = 900): string {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
  const privateBucket = process.env.CLOUDFLARE_R2_PRIVATE_BUCKET_NAME || "islah-private-docs";

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error("Missing Cloudflare R2 credentials for presigned URL.");
  }

  const host = `${accountId}.r2.cloudflarestorage.com`;
  const canonicalUri = `/${privateBucket}/${encodeURIComponent(r2Key).replace(/%2F/g, "/")}`;

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.substring(0, 8);
  const region = "auto";
  const service = "s3";
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;

  const queryParams = new URLSearchParams({
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": `${accessKeyId}/${credentialScope}`,
    "X-Amz-Date": amzDate,
    "X-Amz-Expires": expiresInSeconds.toString(),
    "X-Amz-SignedHeaders": "host",
  });

  queryParams.sort();

  const canonicalHeaders = `host:${host}\n`;
  const signedHeaders = "host";

  const canonicalRequest =
    "GET\n" +
    canonicalUri + "\n" +
    queryParams.toString() + "\n" +
    canonicalHeaders + "\n" +
    signedHeaders + "\n" +
    "UNSIGNED-PAYLOAD";

  const stringToSign =
    "AWS4-HMAC-SHA256\n" +
    amzDate + "\n" +
    credentialScope + "\n" +
    crypto.createHash("sha256").update(canonicalRequest).digest("hex");

  const signingKey = getSignatureKey(secretAccessKey, dateStamp, region, service);
  const signature = crypto.createHmac("sha256", signingKey).update(stringToSign).digest("hex");

  queryParams.append("X-Amz-Signature", signature);

  return `https://${host}${canonicalUri}?${queryParams.toString()}`;
}

