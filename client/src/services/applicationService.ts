import { apiRequest } from "./apiClient";

export type ApplicationType =
  | "volunteer"
  | "sponsor"
  | "partner"
  | "mentor"
  | "career";

export interface ApplicationPayload {
  type: ApplicationType;
  fullName: string;
  email: string;
  phone: string;
  countryCode?: string;
  city?: string;
  state?: string;
  organization?: string;
  selectedSectors?: string[];
  subclassifications?: string[];
  message?: string;
  turnstileToken?: string;
  formData?: Record<string, any>;
}

export interface ApplicationResponse {
  success: boolean;
  message: string;
  applicationId: string;
  id: string;
}

/**
 * Submit an application (Volunteer, Partner, Sponsor, Mentor, Career)
 */
export async function submitApplication(
  payload: ApplicationPayload
): Promise<ApplicationResponse> {
  return apiRequest<ApplicationResponse>("/applications", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
