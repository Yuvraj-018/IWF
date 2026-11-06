import { useState, useEffect } from "react";
import { API_BASE_URL } from "./apiClient";

export interface MediaItem {
  _id: string;
  key: string;
  title: string;
  category: "hero" | "causes" | "thematic" | "gallery" | "patients" | "people" | "reports" | "general" | "partners";
  mediaType?: "photo" | "video" | "document";
  url: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  publicId?: string;
  altText?: string;
  caption?: string;
  location?: string;
  date?: string;
  tags?: string[];
  albumId?: string;
  albumTitle?: string;
  isCover?: boolean;
  order?: number;
  subHeading?: string;
  ctaLink?: string;
}

export interface GalleryAlbum {
  albumId: string;
  albumTitle: string;
  coverUrl: string;
  mediaType: "photo" | "video";
  videoUrl?: string;
  date?: string;
  location?: string;
  count: number;
  items: MediaItem[];
}

export async function fetchGalleryAlbums(): Promise<GalleryAlbum[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/media/albums`);
    if (!res.ok) throw new Error("Albums fetch failed");
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn("Could not fetch gallery albums from backend CMS:", err);
    return [];
  }
}

interface MediaResponse {
  success: boolean;
  count: number;
  data: MediaItem[];
  keyMap: Record<string, string>;
}

// In-memory cache to prevent re-fetching across component re-renders
let cachedKeyMap: Record<string, string> | null = null;
let cachedList: MediaItem[] | null = null;
let pendingPromise: Promise<MediaResponse> | null = null;

export async function fetchAllMedia(): Promise<MediaResponse> {
  if (cachedKeyMap && cachedList) {
    return {
      success: true,
      count: cachedList.length,
      data: cachedList,
      keyMap: cachedKeyMap,
    };
  }

  if (pendingPromise) {
    return pendingPromise;
  }

  pendingPromise = fetch(`${API_BASE_URL}/media`)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`Media fetch failed with status ${res.status}`);
      }
      const data: MediaResponse = await res.json();
      cachedKeyMap = data.keyMap || {};
      cachedList = data.data || [];
      return data;
    })
    .catch((err) => {
      console.warn("Could not fetch media from backend CMS, falling back to local assets:", err);
      return {
        success: false,
        count: 0,
        data: [],
        keyMap: {},
      };
    })
    .finally(() => {
      pendingPromise = null;
    });

  return pendingPromise;
}

/**
 * Custom React hook to seamlessly integrate Cloudinary CMS assets.
 * Returns helper `getMedia(key, fallback)` which automatically provides the Cloudinary URL
 * when populated, or smoothly falls back to the static bundled image.
 */
export function useMedia(category?: string) {
  const [mediaMap, setMediaMap] = useState<Record<string, string>>(cachedKeyMap || {});
  const [mediaList, setMediaList] = useState<MediaItem[]>(cachedList || []);
  const [loading, setLoading] = useState<boolean>(!cachedKeyMap);

  useEffect(() => {
    let isMounted = true;
    fetchAllMedia().then((res) => {
      if (!isMounted) return;
      setMediaMap(res.keyMap);
      if (category) {
        setMediaList(res.data.filter((item) => item.category === category));
      } else {
        setMediaList(res.data);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [category]);

  const getMedia = (key: string, fallback: string): string => {
    return mediaMap[key] || fallback;
  };

  return {
    mediaMap,
    mediaList,
    loading,
    getMedia,
  };
}
