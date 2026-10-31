import { toast as sonnerToast } from "sonner";

export interface ToastOptions {
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Extracts a human-friendly error string from unknown error types:
 * Axios responses, Error instances, strings, or API response objects.
 */
export function extractErrorMessage(
  err: unknown,
  fallbackMessage = "Something went wrong. Please try again."
): string {
  if (!err) return fallbackMessage;
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message;
  if (typeof err === "object") {
    const errorObj = err as Record<string, any>;
    if (errorObj.response?.data?.message && typeof errorObj.response.data.message === "string") {
      return errorObj.response.data.message;
    }
    if (errorObj.response?.data?.error && typeof errorObj.response.data.error === "string") {
      return errorObj.response.data.error;
    }
    if (errorObj.message && typeof errorObj.message === "string") {
      return errorObj.message;
    }
  }
  return fallbackMessage;
}

/**
 * Centralized Toast helper.
 * Eliminates redundant try/catch error formatting and provides consistent toast styling.
 *
 * Usage:
 *   import { toast } from "@/utils/toast";
 *   toast.success("Application submitted!");
 *   toast.error(err, "Failed to submit application");
 */
export const toast = {
  success: (message: string, options?: ToastOptions) => {
    return sonnerToast.success(message, options);
  },

  /**
   * Accepts strings, Error instances, Axios/Fetch errors, and extracts the right user-facing message.
   */
  error: (err: unknown, fallbackMessage?: string, options?: ToastOptions) => {
    const message = extractErrorMessage(err, fallbackMessage);
    return sonnerToast.error(message, options);
  },

  info: (message: string, options?: ToastOptions) => {
    return sonnerToast.info(message, options);
  },

  warning: (message: string, options?: ToastOptions) => {
    return sonnerToast.warning(message, options);
  },

  loading: (message: string, options?: ToastOptions) => {
    return sonnerToast.loading(message, options);
  },

  dismiss: (id?: string | number) => {
    return sonnerToast.dismiss(id);
  },

  promise: <T>(
    promise: Promise<T>,
    data: {
      loading: string;
      success: string | ((result: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return sonnerToast.promise(promise, data);
  },

  raw: sonnerToast,
};

export default toast;

