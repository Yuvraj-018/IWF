import { Request, Response } from "express";
import { SiteSetting } from "../models/SiteSetting.js";

const DEFAULT_SETTINGS: Record<string, { category: "impact" | "contact" | "general"; data: Record<string, any> }> = {
  // ── 1. Top-Level Core Milestones (Outcomes, Annual Reports, Global) ──
  impact_stats: {
    category: "impact",
    data: {
      livesTouched: "50,000+",
      villagesReached: "300+",
      districtsCovered: "15+",
      ongoingPrograms: "25+",
      volunteersCount: "500+",
      partnersCount: "100+",
      yearsOfImpact: "10+",
      totalCumulativeImpact: "71,000+",
    },
  },

  // ── 2. Homepage Hero & Animated Live Counters ──
  homepage_stats: {
    category: "impact",
    data: {
      livesTouched: "5,000+",
      healthCamps: "100+",
      studentsSupported: "2,000+",
      villagesReached: "50+",
      activePrograms: "12",
      yearsOfService: "8",
      heroBeneficiaries: "10,000+",
    },
  },

  // ── 3. Get Involved Community Mini-Counters ──
  getinvolved_stats: {
    category: "impact",
    data: {
      lives: "25,000+",
      villages: "120+",
      students: "18,500+",
      volunteers: "5,800+",
    },
  },

  // ── 4. Featured Causes Progress & Donation Counters ──
  featured_causes_stats: {
    category: "impact",
    data: {
      eduRaised: "1,65,240",
      eduGoalPct: "75",
      medRaised: "2,12,880",
      medGoalPct: "48",
      womenRaised: "1,48,720",
      womenGoalPct: "60",
    },
  },

  // ── 5. Demographic Beneficiary Breakdown ──
  demographic_stats: {
    category: "impact",
    data: {
      childrenCount: "28,000+",
      womenCount: "21,000+",
      youthCount: "15,000+",
      seniorCitizensCount: "7,000+",
    },
  },

  // ── 6. Sector-Wise Key Achievements (All 7 Pillars) ──
  sector_stats: {
    category: "impact",
    data: {
      educationChildren: "8,000+",
      educationSchools: "120+",
      enrollmentRate: "95%",
      healthPeople: "6,000+",
      healthCamps: "85+",
      womenEmpowered: "4,000+",
      selfHelpGroups: "200+",
      youthTrained: "3,500+",
      youthPlacedRate: "70%",
      treesPlanted: "15,000+",
      farmersSupported: "2,500+",
      waterProjects: "50+",
      reliefFamilies: "12,000+",
      reliefDrives: "30+",
      foodRationKits: "45,000+",
      cleanWaterPoints: "80+",
      householdToilets: "250+",
      cleanWaterPeople: "15,000+",
    },
  },

  // ── 7. Official Helplines & Headquarters ──
  contact_info: {
    category: "contact",
    data: {
      primaryPhone: "+91 94314 00000",
      helplinePhone: "+91 94314 11111",
      whatsappNumber: "+91 94314 00000",
      primaryEmail: "info@iwfindia.org",
      emergencyEmail: "emergency@iwfindia.org",
      darbhangaOffice: "Islah Welfare Foundation, Near Tower Chowk, Darbhanga, Bihar - 846004",
      delhiOffice: "New Delhi Liaison Office, India",
    },
  },
};

export async function getSettings(req: Request, res: Response): Promise<void> {
  try {
    const { key, category } = req.query;
    const query: Record<string, any> = {};

    if (key) query.key = key;
    if (category) query.category = category;

    let settings = await SiteSetting.find(query);

    // Auto-seed defaults if not initialized in MongoDB yet
    if (settings.length === 0 && !key && !category) {
      const docs = Object.entries(DEFAULT_SETTINGS).map(([k, val]) => ({
        key: k,
        category: val.category,
        data: val.data,
      }));
      settings = await SiteSetting.insertMany(docs);
      console.log("⚡ [SETTINGS] Auto-initialized all site stats, sector metrics, and contact numbers.");
    }

    // Prepare map with fallbacks for any keys not yet created in existing DB instances
    const settingsMap: Record<string, any> = {};
    for (const [k, val] of Object.entries(DEFAULT_SETTINGS)) {
      if (!key || key === k) {
        if (!category || category === val.category) {
          settingsMap[k] = { ...val.data };
        }
      }
    }

    // Override with DB values
    for (const item of settings) {
      settingsMap[item.key] = { ...(settingsMap[item.key] || {}), ...item.data };
    }

    res.json({
      success: true,
      data: settingsMap,
      raw: settings,
    });
  } catch (error: any) {
    console.error("getSettings error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function updateSetting(req: Request, res: Response): Promise<void> {
  try {
    const { key } = req.params;
    const { data, category } = req.body;

    if (!key) {
      res.status(400).json({ success: false, message: "Setting key is required" });
      return;
    }

    const updated = await SiteSetting.findOneAndUpdate(
      { key },
      {
        $set: {
          data,
          ...(category ? { category } : {}),
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({
      success: true,
      message: `Setting '${key}' updated successfully. Changes are live across the site.`,
      data: updated.data,
    });
  } catch (error: any) {
    console.error("updateSetting error:", error);
    res.status(500).json({ success: false, message: "Failed to update setting" });
  }
}
