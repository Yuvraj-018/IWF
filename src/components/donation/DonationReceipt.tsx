import { forwardRef } from "react";
import {
  FileText,
  Calendar,
  User,
  Gift,
  Leaf,
  HandHeart,
} from "lucide-react";

export interface DonationReceiptData {
  receiptNo: string;
  receiptDate: string;
  donorName: string;
  mobileNo: string;
  email: string;
  address: string;
  financialType: string;
  frequency: string;
  amount: number;
  contributionFor?: string;
  paymentMode?: string;
  transactionId?: string;
  paymentDate?: string;
}

interface DonationReceiptProps {
  data: DonationReceiptData;
  className?: string;
}

export const DonationReceipt = forwardRef<HTMLDivElement, DonationReceiptProps>(
  ({ data, className = "" }, ref) => {
    const formattedAmount = `₹${data.amount.toLocaleString("en-IN")}`;

    return (
      <div
        ref={ref}
        id="donation-receipt-canvas"
        className={`w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden text-slate-800 font-sans print:shadow-none print:border-none print:max-w-none print:rounded-none ${className}`}
      >
        {/* ─── Top Navy Header with Organic Wave & Botanical Artwork ─────── */}
        <div className="relative bg-[#071527] text-white overflow-hidden pt-6 sm:pt-8 px-6 sm:px-8 pb-12 sm:pb-16">
          {/* Subtle Botanical Leaf Silhouette in background */}
          <div className="absolute top-2 right-12 w-44 h-44 opacity-15 pointer-events-none text-sky-300">
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
              <path d="M50 10 C30 30 20 60 40 85 C65 65 75 35 50 10 Z" />
              <path d="M40 85 Q55 55 50 10" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M45 65 Q60 50 68 52" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M42 45 Q28 35 22 38" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          <div className="relative z-10 flex items-start justify-between gap-4">
            {/* Left: Emblem + Brand Name */}
            <div className="flex items-center gap-3 sm:gap-4 text-left">
              {/* Hands holding leaves logo reproduction */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 text-white">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
                  {/* Center sprout leaves */}
                  <path d="M50 16 C50 16 54 28 66 32 C57 35 53 40 50 46 C47 40 43 35 34 32 C46 28 50 16 50 16 Z" />
                  <path d="M50 28 C54 18 64 15 70 17 C70 24 64 30 54 30 Z" opacity="0.95" />
                  <path d="M50 28 C46 18 36 15 30 17 C30 24 36 30 46 30 Z" opacity="0.95" />
                  {/* Cupping hands */}
                  <path d="M20 50 C22 43 30 44 37 48 C43 52 48 58 50 62 C52 58 57 52 63 48 C70 44 78 43 80 50 C82 62 70 76 50 84 C30 76 18 62 20 50 Z" />
                </svg>
              </div>

              <div>
                <h1 className="text-xl sm:text-3xl font-black tracking-wider text-white leading-tight font-sans">
                  ISLAH
                </h1>
                <p className="text-[10px] sm:text-xs font-bold tracking-[0.22em] text-slate-200 uppercase mt-0.5">
                  WELFARE FOUNDATION
                </p>
                <p className="text-[9px] sm:text-[10px] text-slate-300 font-medium tracking-tight mt-1 opacity-90 hidden xs:block sm:block">
                  Empowering Youth | Enriching Communities | Transforming Lives
                </p>
              </div>
            </div>

            {/* Right: Handwritten "Kindness Creates Change ♡" */}
            <div className="text-right shrink-0">
              <div
                className="font-['Caveat',cursive] -rotate-3 text-white text-2xl sm:text-3xl lg:text-4xl leading-tight select-none drop-shadow-sm"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                <div className="tracking-wide">Kindness</div>
                <div className="tracking-wide -mt-1 sm:-mt-2">Creates</div>
                <div className="tracking-wide -mt-1 sm:-mt-2 flex items-center justify-end gap-1">
                  <span>Change</span>
                  <span className="text-xl sm:text-2xl font-sans">♡</span>
                </div>
              </div>
            </div>
          </div>

          {/* Organic Wave Transition Bottom */}
          <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="relative block w-full h-10 sm:h-14 text-white"
              fill="currentColor"
            >
              <path d="M0,0 C320,110 750,20 1200,90 L1200,120 L0,120 Z" />
            </svg>
          </div>
        </div>

        {/* ─── Receipt Body Content ───────────────────────────────────────── */}
        <div className="px-6 sm:px-8 pt-4 pb-6 space-y-5 text-left bg-white">
          {/* Subheader & Large Title with Accent Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <div>
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#0284c7] block">
                THANK YOU FOR YOUR SUPPORT
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none mt-1">
                <span className="text-[#071527]">Donation </span>
                <span className="text-[#38bdf8]">Receipt</span>
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-600 max-w-md mt-2 leading-relaxed">
                Your generosity helps us create a brighter, more inclusive tomorrow. Together, we can
                empower lives and build stronger communities.
              </p>
            </div>

            {/* "Small Contributions Create Big Change" Badge */}
            <div className="bg-[#f0f7ff] border border-blue-100 rounded-2xl p-3 sm:p-4 flex items-center gap-3 shrink-0 shadow-2xs self-start sm:self-auto">
              <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-[#0284c7] flex items-center justify-center shrink-0">
                <HandHeart className="w-6 h-6 text-[#0284c7]" />
              </div>
              <div className="leading-tight">
                <p className="text-xs font-black text-[#071527]">Small</p>
                <p className="text-xs font-black text-[#071527]">Contributions</p>
                <p className="text-xs font-black text-[#071527]">Create Big Change</p>
                <div className="w-9 h-0.5 bg-[#0284c7] mt-1 rounded-full" />
              </div>
            </div>
          </div>

          {/* Receipt Number & Date Strip */}
          <div className="bg-[#f8fafc] border border-slate-200/90 rounded-2xl p-4 sm:px-6 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            {/* Left: Receipt No */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-[#071527] flex items-center justify-center shrink-0 shadow-2xs">
                <FileText className="w-4 h-4 text-[#071527]" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Receipt No.
                </span>
                <span className="font-mono font-black text-sm sm:text-base text-[#071527]">
                  {data.receiptNo}
                </span>
              </div>
            </div>

            {/* Vertical Divider for tablet/desktop */}
            <div className="hidden sm:block w-px h-9 bg-slate-200" />

            {/* Right: Receipt Date */}
            <div className="flex items-center gap-3 sm:justify-end">
              <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-[#071527] flex items-center justify-center shrink-0 shadow-2xs">
                <Calendar className="w-4 h-4 text-[#071527]" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Receipt Date
                </span>
                <span className="font-bold text-sm sm:text-base text-[#071527]">
                  {data.receiptDate}
                </span>
              </div>
            </div>
          </div>

          {/* Donor Details Card */}
          <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white shadow-2xs">
            {/* Card Header */}
            <div className="bg-[#f8fafc] px-5 py-3 border-b border-slate-200/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#071527] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-[#071527]">Donor Details</h3>
                <p className="text-[11px] text-slate-500">We are grateful for your support.</p>
              </div>
            </div>

            {/* Card Content Table */}
            <div className="p-4 sm:p-5 space-y-2 text-xs sm:text-sm">
              <div className="grid grid-cols-12 gap-2 py-0.5">
                <span className="col-span-4 sm:col-span-3 text-slate-600 font-semibold">Name</span>
                <span className="col-span-1 text-slate-400 font-bold">:</span>
                <span className="col-span-7 sm:col-span-8 font-black text-[#071527]">
                  {data.donorName || "--"}
                </span>
              </div>
              <div className="grid grid-cols-12 gap-2 py-0.5">
                <span className="col-span-4 sm:col-span-3 text-slate-600 font-semibold">Mobile No.</span>
                <span className="col-span-1 text-slate-400 font-bold">:</span>
                <span className="col-span-7 sm:col-span-8 font-bold text-[#071527]">
                  {data.mobileNo || "--"}
                </span>
              </div>
              <div className="grid grid-cols-12 gap-2 py-0.5">
                <span className="col-span-4 sm:col-span-3 text-slate-600 font-semibold">Email</span>
                <span className="col-span-1 text-slate-400 font-bold">:</span>
                <span className="col-span-7 sm:col-span-8 font-bold text-[#071527]">
                  {data.email || "--"}
                </span>
              </div>
              <div className="grid grid-cols-12 gap-2 py-0.5">
                <span className="col-span-4 sm:col-span-3 text-slate-600 font-semibold">Address</span>
                <span className="col-span-1 text-slate-400 font-bold">:</span>
                <span className="col-span-7 sm:col-span-8 font-bold text-[#071527]">
                  {data.address || "--"}
                </span>
              </div>
            </div>
          </div>

          {/* Donation Details Card */}
          <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white shadow-2xs">
            {/* Card Header */}
            <div className="bg-[#f8fafc] px-5 py-3 border-b border-slate-200/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#071527] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-[#071527]">Donation Details</h3>
                <p className="text-[11px] text-slate-500">Your contribution makes a real difference.</p>
              </div>
            </div>

            {/* Card Content Table */}
            <div className="p-4 sm:p-5 space-y-2 text-xs sm:text-sm">
              <div className="grid grid-cols-12 gap-2 py-0.5">
                <span className="col-span-4 sm:col-span-3 text-slate-600 font-semibold">Financial Type</span>
                <span className="col-span-1 text-slate-400 font-bold">:</span>
                <span className="col-span-7 sm:col-span-8 font-bold text-[#071527]">
                  {data.financialType || "General Donation"}
                </span>
              </div>
              <div className="grid grid-cols-12 gap-2 py-0.5">
                <span className="col-span-4 sm:col-span-3 text-slate-600 font-semibold">Frequency</span>
                <span className="col-span-1 text-slate-400 font-bold">:</span>
                <span className="col-span-7 sm:col-span-8 font-bold text-[#071527]">
                  {data.frequency || "One Time"}
                </span>
              </div>
              <div className="grid grid-cols-12 gap-2 py-0.5">
                <span className="col-span-4 sm:col-span-3 text-slate-600 font-semibold">Amount</span>
                <span className="col-span-1 text-slate-400 font-bold">:</span>
                <span className="col-span-7 sm:col-span-8 font-black text-[#071527] text-base">
                  {formattedAmount}
                </span>
              </div>
              <div className="grid grid-cols-12 gap-2 py-0.5">
                <span className="col-span-4 sm:col-span-3 text-slate-600 font-semibold">Contribution For</span>
                <span className="col-span-1 text-slate-400 font-bold">:</span>
                <span className="col-span-7 sm:col-span-8 font-bold text-[#071527]">
                  {data.contributionFor || "--"}
                </span>
              </div>
              <div className="grid grid-cols-12 gap-2 py-0.5">
                <span className="col-span-4 sm:col-span-3 text-slate-600 font-semibold">Payment Mode</span>
                <span className="col-span-1 text-slate-400 font-bold">:</span>
                <span className="col-span-7 sm:col-span-8 font-bold text-[#071527]">
                  {data.paymentMode || "UPI"}
                </span>
              </div>
              <div className="grid grid-cols-12 gap-2 py-0.5">
                <span className="col-span-4 sm:col-span-3 text-slate-600 font-semibold">Transaction ID</span>
                <span className="col-span-1 text-slate-400 font-bold">:</span>
                <span className="col-span-7 sm:col-span-8 font-mono font-bold text-[#071527]">
                  {data.transactionId || "pay_QR12345abcde67890"}
                </span>
              </div>
              <div className="grid grid-cols-12 gap-2 py-0.5">
                <span className="col-span-4 sm:col-span-3 text-slate-600 font-semibold">Payment Date</span>
                <span className="col-span-1 text-slate-400 font-bold">:</span>
                <span className="col-span-7 sm:col-span-8 font-bold text-[#071527]">
                  {data.paymentDate || `${data.receiptDate} | 10:45 AM`}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Endorsement: Thank You + Signature + Official Circular Seal */}
          <div className="bg-[#f0f7ff] border border-blue-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-5">
            {/* Left: Thank You & Mission Note */}
            <div className="flex items-start gap-3 max-w-xs text-left">
              <div className="w-8 h-8 rounded-lg bg-blue-100/90 text-[#071527] flex items-center justify-center shrink-0 mt-0.5">
                <Leaf className="w-4 h-4 text-[#071527]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-[#071527] leading-tight">Thank You</h4>
                <p className="text-[11px] font-bold text-[#071527] leading-tight mt-0.5">for supporting our mission.</p>
                <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                  Your generosity helps us create a lasting social impact.
                </p>
              </div>
            </div>

            {/* Middle: Authorised Signatory with Handcrafted Script */}
            <div className="flex flex-col items-center justify-center text-center px-2">
              <svg
                className="w-28 h-9 text-[#071527]"
                viewBox="0 0 120 36"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 24 C20 8, 26 6, 32 20 C36 28, 42 16, 48 10 C54 4, 58 26, 64 22 C70 18, 76 12, 84 18 C90 24, 100 14, 110 16" />
                <path d="M22 28 C45 31, 75 29, 106 28" strokeWidth="1" strokeDasharray="2 2" />
              </svg>
              <div className="w-28 h-px bg-slate-300 mt-0.5" />
              <span className="text-[10px] font-bold text-slate-700 mt-1">Authorised Signatory</span>
              <span className="text-[9px] text-slate-500">Islah Welfare Foundation</span>
            </div>

            {/* Right: Official Circular Stamp Badge */}
            <div className="shrink-0 -rotate-6 select-none" title="Official Stamp - Islah Welfare Foundation">
              <svg viewBox="0 0 100 100" className="w-20 h-20 text-[#006837]">
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <path
                  id="receipt-seal-text-path"
                  d="M 50, 50 m -31, 0 a 31,31 0 1,1 62,0 a 31,31 0 1,1 -62,0"
                  fill="none"
                />
                <text className="text-[7.5px] font-black uppercase tracking-[0.16em]" fill="currentColor">
                  <textPath href="#receipt-seal-text-path" startOffset="50%" textAnchor="middle">
                    ISLAH WELFARE FOUNDATION •
                  </textPath>
                </text>
                <circle cx="50" cy="50" r="23" fill="#006837" fillOpacity="0.06" stroke="currentColor" strokeWidth="1" />
                <text
                  x="50"
                  y="55"
                  textAnchor="middle"
                  className="text-sm font-black font-sans tracking-wider"
                  fill="currentColor"
                >
                  IWF
                </text>
                <circle cx="28" cy="50" r="1.5" fill="currentColor" />
                <circle cx="72" cy="50" r="1.5" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>

        {/* ─── Bottom Footer Navy Strip with Curved Wave Top ───────────────── */}
        <div className="relative bg-[#071527] text-white pt-6 pb-4 px-6 sm:px-8 overflow-hidden">
          {/* Organic Wave Transition Top */}
          <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
            <svg
              viewBox="0 0 1200 60"
              preserveAspectRatio="none"
              className="relative block w-full h-4 sm:h-6 text-white"
              fill="currentColor"
            >
              <path d="M0,0 C380,45 800,5 1200,40 L1200,0 L0,0 Z" />
            </svg>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left pt-1">
            <div className="flex items-center gap-2">
              <span className="text-[9px] sm:text-[10px] tracking-[0.22em] font-extrabold uppercase text-slate-300">
                PEOPLE &nbsp; SUPPORT &nbsp; CHANGE &nbsp; TOGETHER
              </span>
              <span className="hidden sm:inline text-slate-500">────</span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-200">
              A Brighter Tomorrow Is A Shared Effort.
            </span>
          </div>
        </div>
      </div>
    );
  }
);

DonationReceipt.displayName = "DonationReceipt";
