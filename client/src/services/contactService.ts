import { apiRequest } from "./apiClient";

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  countryCode?: string;
  subject?: string;
  message: string;
  enquiryType?: string;
  cityDistrict?: string;
  state?: string;
  pinCode?: string;
  preferredContactMethod?: string;
  regionalOfficeTarget?: string;
  referenceNumber?: string;
  source?: string;
  turnstileToken?: string;
  metadata?: Record<string, any>;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  contactId?: string;
  referenceNumber?: string;
}

export async function submitContact(
  payload: ContactPayload
): Promise<ContactResponse> {
  return apiRequest<ContactResponse>("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
