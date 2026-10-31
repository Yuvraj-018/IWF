import { apiRequest } from "./apiClient";

export interface CreateOrderParams {
  amount: number;
  receipt?: string;
  notes?: Record<string, any>;
}

export interface CreateOrderResponse {
  success: boolean;
  order_id: string;
  amount: number;
  currency: string;
  key_id: string;
  message?: string;
}

export interface VerifyPaymentParams {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  donationData?: {
    donorName: string;
    donorType?: string;
    email: string;
    phone: string;
    countryCode?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    financialType: string;
    frequency?: string;
    amount: number;
    taxExemption?: boolean;
    pan?: string;
    patientSlug?: string;
    websiteConsent?: string;
    recurringPledge?: boolean;
    pledgeMonths?: string;
  };
  memberData?: {
    name?: string;
    fullName?: string;
    fatherName?: string;
    category: string;
    annualFee?: number;
    amount?: number;
    membershipPeriod?: number | string;
    email: string;
    phone?: string;
    mobile?: string;
    countryCode?: string;
    state?: string;
    district?: string;
    address?: string;
    pincode?: string;
    consentDisplay?: string;
    paymentMode?: string;
    isRenewal?: boolean;
    memberNo?: string;
  };
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  payment_id: string;
  order_id: string;
  receiptNo?: string;
  entity?: any;
}

export async function createPaymentOrder(
  params: CreateOrderParams
): Promise<CreateOrderResponse> {
  return apiRequest<CreateOrderResponse>("/create-order", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export async function verifyPayment(
  params: VerifyPaymentParams
): Promise<VerifyPaymentResponse> {
  return apiRequest<VerifyPaymentResponse>("/verify-payment", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export async function getDonationReceipt(receiptNo: string) {
  return apiRequest(`/donations/${encodeURIComponent(receiptNo)}`);
}
