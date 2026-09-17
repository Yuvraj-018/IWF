import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function MembershipPolicyModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-slate-800">Terms and Policies</h3>
              <button
                onClick={onClose}
                className="p-2 bg-white rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition shadow-sm border border-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto text-sm text-slate-600 space-y-4">
              <p>
                <strong>1. Membership Validity:</strong> All memberships are valid for one financial year from the date of joining.
              </p>
              <p>
                <strong>2. Non-Transferable:</strong> Membership is non-transferable and non-refundable under any circumstances.
              </p>
              <p>
                <strong>3. Code of Conduct:</strong> Members are expected to uphold the values and mission of Islah Welfare Foundation (Islah). Any action detrimental to the organization's reputation may result in termination of membership.
              </p>
              <p>
                <strong>4. Privacy:</strong> We value your privacy. Your data will only be used for official Islah communication and will not be shared with unauthorized third parties.
              </p>
              <p>
                <strong>5. Non-Executive Roles:</strong> All Supporting Members are Non-Executive &amp; Non-Voting Members.
              </p>
              <p>
                <strong>6. Renewal:</strong> Membership shall be automatically deactivated if not renewed within the prescribed time period.
              </p>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-brand-green text-white font-bold rounded-lg hover:bg-brand-green-dark transition"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
