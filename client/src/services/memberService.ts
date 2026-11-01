import { apiRequest } from "./apiClient";

export interface RegisterMemberPayload {
  name?: string;
  fullName?: string;
  fatherName?: string;
  category: string;
  email: string;
  phone?: string;
  mobile?: string;
  countryCode?: string;
  state: string;
  district: string;
  address?: string;
  pincode?: string;
  membershipPeriod?: number | string;
  paymentMode?: string;
  transactionId?: string;
  paymentDate?: string;
  consentDisplay?: string;
  photoUrl?: string;
  metadata?: Record<string, any>;
}

export interface MemberRecord {
  memberNo?: string;
  id?: string;
  name: string;
  category: MemberCategory | string;
  annualFee: number;
  email?: string;
  phone: string;
  state: string;
  district: string;
  address?: string;
  status: "Active" | "Expired" | "Pending";
  validFrom?: string;
  validTill: string;
  receiptNo?: string;
  joined?: string;
}

export interface RegisterMemberResponse {
  success: boolean;
  message: string;
  member: MemberRecord;
}

export type MemberCategory = "Community" | "Contributing" | "Patron" | "Blue" | "Yellow" | "Green";

export interface MemberStatusResponse {
  success: boolean;
  member: {
    id: string;
    name: string;
    category: MemberCategory | string;
    state: string;
    district: string;
    status: "Active" | "Expired" | "Pending" | string;
    validTill: string;
    joined: string;
  };
}

export interface ListMembersResponse {
  success: boolean;
  count: number;
  data: MemberRecord[];
}

export interface OtpResponse {
  success: boolean;
  message: string;
  devHint?: string;
  maskedPhone?: string;
}

export interface RenewMemberPayload {
  memberNo: string;
  membershipPeriod: number;
  paymentMode?: string;
  transactionId?: string;
}

export interface RenewMemberResponse {
  success: boolean;
  message: string;
  member: {
    id: string;
    name: string;
    category: MemberCategory;
    state: string;
    district: string;
    status: string;
    validTill: string;
    receiptNo: string;
  };
}

export async function registerMember(
  payload: RegisterMemberPayload
): Promise<RegisterMemberResponse> {
  return apiRequest<RegisterMemberResponse>("/members", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function checkMemberStatus(
  memberNo: string
): Promise<MemberStatusResponse> {
  return apiRequest<MemberStatusResponse>(
    `/members/status/${encodeURIComponent(memberNo)}`
  );
}

export async function listMembers(params?: {
  category?: string;
  state?: string;
  search?: string;
  status?: string;
}): Promise<ListMembersResponse> {
  const query = new URLSearchParams();
  if (params?.category && params.category !== "All") query.set("category", params.category);
  if (params?.state && params.state !== "All") query.set("state", params.state);
  if (params?.search) query.set("search", params.search);
  if (params?.status) query.set("status", params.status);

  const qs = query.toString();
  return apiRequest<ListMembersResponse>(`/members${qs ? `?${qs}` : ""}`);
}

export async function sendMemberOtp(identifier: string): Promise<OtpResponse> {
  return apiRequest<OtpResponse>("/members/send-otp", {
    method: "POST",
    body: JSON.stringify({ identifier }),
  });
}

export async function verifyMemberOtp(
  identifier: string,
  code: string
): Promise<{ success: boolean; message: string }> {
  return apiRequest<{ success: boolean; message: string }>("/members/verify-otp", {
    method: "POST",
    body: JSON.stringify({ identifier, code }),
  });
}

export async function renewMember(
  payload: RenewMemberPayload
): Promise<RenewMemberResponse> {
  return apiRequest<RenewMemberResponse>("/members/renew", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
