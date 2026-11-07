import { SiteSetting } from "../models/SiteSetting.js";

export interface SyncDirectoryEntryPayload {
  id: string;
  name: string;
  role: string;
  type: "member" | "donor" | "partner" | "volunteer" | "mentor";
  location: string;
  avatar?: string;
  category?: string;
  bio?: string;
  organization?: string;
  isPublicConsent: boolean;
  receiptNo?: string;
  certificateNo?: string;
  memberNo?: string;
}

/**
 * Automatically synchronizes a verified donor or member into the community directory spotlight
 * with their public visibility consent flag.
 */
export async function syncToCommunityDirectory(entry: SyncDirectoryEntryPayload): Promise<void> {
  try {
    const setting = await SiteSetting.findOne({ key: "community_directory" });
    const currentSpotlight: SyncDirectoryEntryPayload[] = setting?.data?.spotlight || [];

    const existingIndex = currentSpotlight.findIndex(
      (item) =>
        item.id === entry.id ||
        (entry.receiptNo && item.receiptNo === entry.receiptNo) ||
        (entry.memberNo && item.memberNo === entry.memberNo)
    );

    if (existingIndex >= 0) {
      currentSpotlight[existingIndex] = {
        ...currentSpotlight[existingIndex],
        ...entry,
      };
    } else {
      currentSpotlight.unshift(entry);
    }

    await SiteSetting.findOneAndUpdate(
      { key: "community_directory" },
      {
        $set: {
          key: "community_directory",
          category: "general",
          "data.spotlight": currentSpotlight,
        },
      },
      { upsert: true, new: true }
    );
  } catch (err: any) {
    console.warn("⚠️ [DIRECTORY SYNC WARNING] Failed to sync to community directory:", err.message);
  }
}

