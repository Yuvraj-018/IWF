import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const key_id = process.env.RAZORPAY_KEY_ID || "";
const key_secret = process.env.RAZORPAY_KEY_SECRET || "";

if (!key_id || !key_secret) {
  console.warn(
    "[Razorpay Warning] RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing in environment variables."
  );
}

export const razorpayInstance =
  key_id && key_secret
    ? new Razorpay({ key_id, key_secret })
    : new Razorpay({ key_id: "rzp_test_dummy", key_secret: "secret_dummy" });

export const RAZORPAY_CONFIG = {
  key_id,
  key_secret,
};
