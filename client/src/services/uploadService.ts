import { apiRequest } from "./apiClient";

export interface UploadedFileResult {
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  publicId: string;
  format: string;
  resourceType: string;
}

export interface SingleUploadResponse {
  success: boolean;
  message: string;
  file: UploadedFileResult;
}

export interface MultipleUploadResponse {
  success: boolean;
  message: string;
  files: UploadedFileResult[];
}

/**
 * Upload a single file (e.g. CV, resume, patient document, grievance proof) to Cloudinary via backend
 */
export async function uploadSingleFile(
  file: File,
  folder = "islah/general",
  isPrivate = false
): Promise<UploadedFileResult> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);
  if (isPrivate) {
    formData.append("isPrivate", "true");
  }

  const res = await apiRequest<SingleUploadResponse>("/upload/single", {
    method: "POST",
    body: formData,
  });

  if (!res.success || !res.file) {
    throw new Error(res.message || "Failed to upload file");
  }

  return res.file;
}

/**
 * Upload multiple files to Cloudflare R2 / Cloudinary via backend (max 10)
 */
export async function uploadMultipleFiles(
  files: File[],
  folder = "islah/general",
  isPrivate = false
): Promise<UploadedFileResult[]> {
  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }
  formData.append("folder", folder);
  if (isPrivate) {
    formData.append("isPrivate", "true");
  }

  const res = await apiRequest<MultipleUploadResponse>("/upload/multiple", {
    method: "POST",
    body: formData,
  });

  if (!res.success || !res.files) {
    throw new Error(res.message || "Failed to upload files");
  }

  return res.files;
}
