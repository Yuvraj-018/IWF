import patient1Img from "@/assets/patient-1.jpg";
import patient2Img from "@/assets/patient-2.jpg";
import patient3Img from "@/assets/patient-3.jpg";
import patient4Img from "@/assets/patient-4.jpg";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PatientCondition = "Critical" | "Serious" | "Stable" | "Recovering" | "Discharged";

export type PatientDocument = {
  label: string;
  type: "admission" | "income" | "identity" | "medical" | "prescription";
  verified: boolean;
};

export type DonationEntry = {
  donor: string; // anonymized, e.g. "A donor from Delhi"
  amount: number;
  date: string; // ISO date
  message?: string;
};

export type PatientUpdate = {
  date: string; // ISO date
  title: string;
  text: string;
  type: "admission" | "surgery" | "treatment" | "progress" | "discharge" | "funding";
};

export type CostBreakdown = {
  label: string;
  amount: number;
};

export type Patient = {
  id: number;
  slug: string;
  name: string;
  age: number;
  gender: string;
  disease: string;
  diagnosis?: string; // layperson-friendly explanation
  hospital: string;
  hospitalAddress?: string;
  ward?: string; // e.g. "ICU Ward 3"
  admissionDate: string; // ISO date
  condition: PatientCondition;
  urgent: boolean;
  image: string;

  // Financials
  neededAmount: number;
  raisedAmount: number;
  donorsCount: number;
  costBreakdown: CostBreakdown[];

  // Transparency
  verificationId: string; // Islah case reference e.g. "Islah-CLS-2026-001"
  verifiedBy: string;
  verificationDate: string;
  documents: PatientDocument[];

  // Story & narrative
  story: string[]; // paragraphs
  familyBackground?: string;

  // Timeline
  updates: PatientUpdate[];
  donationHistory: DonationEntry[];
};

// ─── Data ────────────────────────────────────────────────────────────────────

export const URGENT_PATIENTS: Patient[] = [
  {
    id: 1,
    slug: "mohammed-salim",
    name: "Mohammed Salim",
    age: 62,
    gender: "Male",
    disease: "Severe Pneumonia with Respiratory Failure",
    diagnosis:
      "A serious lung infection that has spread to both lungs, making it very difficult to breathe. The patient is currently on ventilator support in the ICU.",
    hospital: "Patna Medical College & Hospital",
    hospitalAddress: "Ashok Rajpath, Patna, Bihar - 800004",
    ward: "Medical ICU, Ward 7",
    admissionDate: "2026-06-28",
    condition: "Critical",
    urgent: true,
    image: patient1Img,

    neededAmount: 85000,
    raisedAmount: 21000,
    donorsCount: 34,
    costBreakdown: [
      { label: "ICU / Ventilator Support (10 days)", amount: 40000 },
      { label: "Medicines & Antibiotics", amount: 18000 },
      { label: "Diagnostic Tests (CT Scan, Blood Work)", amount: 12000 },
      { label: "Oxygen & Emergency Procedures", amount: 10000 },
      { label: "Nurse & Attendant Support", amount: 5000 },
    ],

    verificationId: "Islah-CLS-2026-001",
    verifiedBy: "Dr. Anjum Ara, Senior Physician, PMCH",
    verificationDate: "2026-06-29",
    documents: [
      { label: "Hospital Admission Letter", type: "admission", verified: true },
      { label: "Doctor's Prescription & Report", type: "medical", verified: true },
      { label: "BPL / Income Certificate", type: "income", verified: true },
      { label: "Aadhaar Card (Patient)", type: "identity", verified: true },
      { label: "CT Scan Report", type: "prescription", verified: true },
    ],

    story: [
      "Mohammed Salim, 62, is a daily wage labourer from Darbhanga district who was brought to Patna Medical College & Hospital in a critical state after struggling to breathe for several days. His family, unable to afford even a rickshaw to the hospital, borrowed money from neighbours to bring him to Patna.",
      "Doctors diagnosed him with severe bilateral pneumonia leading to respiratory failure. He was immediately placed on ventilator support in the ICU. His wife and two children are back in the village, with no source of income while he is hospitalised. The family has exhausted their savings of just ₹3,000.",
      "Islah's field team verified his case within 24 hours of admission and has been coordinating with the hospital. Every rupee donated goes directly to his treatment. With your support, Mohammed Salim can survive this crisis and return to his family.",
    ],
    familyBackground:
      "Wife (homemaker), one son (18, daily labourer), one daughter (16, studying in Class 10). The family earns approximately ₹250–300 per day on good days. They have no health insurance or government coverage.",

    updates: [
      {
        date: "2026-06-28",
        type: "admission",
        title: "Patient Admitted to ICU",
        text: "Mohammed Salim was admitted to PMCH ICU with severe breathing difficulty. Placed on ventilator support. Islah case opened immediately.",
      },
      {
        date: "2026-06-29",
        type: "treatment",
        title: "Islah Verification Completed",
        text: "Islah field team visited PMCH. Case verified by Dr. Anjum Ara. Hospital confirmed he qualifies for emergency support. Initial ₹8,000 released for medicines.",
      },
      {
        date: "2026-07-02",
        type: "progress",
        title: "Condition Slightly Improved",
        text: "Doctors report marginal improvement in oxygen saturation levels. Still critical but responding to antibiotics. Ventilator support continues.",
      },
      {
        date: "2026-07-08",
        type: "funding",
        title: "34 Donors Have Contributed",
        text: "₹21,000 raised so far by 34 compassionate donors. Islah has utilised ₹18,000 for medicines and ICU charges. ₹64,000 still needed.",
      },
    ],

    donationHistory: [
      { donor: "A donor from Delhi", amount: 2000, date: "2026-07-10", message: "Get well soon." },
      { donor: "An anonymous donor", amount: 1100, date: "2026-07-09" },
      { donor: "A donor from Mumbai", amount: 5000, date: "2026-07-08", message: "Praying for your recovery." },
      { donor: "A donor from Patna", amount: 500, date: "2026-07-07" },
      { donor: "An anonymous donor", amount: 1500, date: "2026-07-06" },
      { donor: "A donor from Bengaluru", amount: 3000, date: "2026-07-05" },
    ],
  },

  {
    id: 2,
    slug: "shakuntala-devi",
    name: "Shakuntala Devi",
    age: 58,
    gender: "Female",
    disease: "Acute Heart Failure",
    diagnosis:
      "A condition where the heart suddenly cannot pump enough blood to meet the body's needs. Requires immediate medical intervention and may require cardiac surgery.",
    hospital: "AIIMS Patna",
    hospitalAddress: "Phulwari Sharif, Patna, Bihar - 801505",
    ward: "Cardiology ICU",
    admissionDate: "2026-06-25",
    condition: "Serious",
    urgent: true,
    image: patient2Img,

    neededAmount: 125000,
    raisedAmount: 43500,
    donorsCount: 61,
    costBreakdown: [
      { label: "Cardiac ICU & Monitoring (14 days)", amount: 55000 },
      { label: "Cardiac Medications & Injections", amount: 28000 },
      { label: "Echocardiography & Diagnostic Tests", amount: 20000 },
      { label: "Emergency Procedures", amount: 15000 },
      { label: "Nursing Care & Attendant", amount: 7000 },
    ],

    verificationId: "Islah-CLS-2026-002",
    verifiedBy: "Dr. Rakesh Sharma, Cardiologist, AIIMS Patna",
    verificationDate: "2026-06-26",
    documents: [
      { label: "Hospital Admission Letter", type: "admission", verified: true },
      { label: "Cardiologist Report & ECG", type: "medical", verified: true },
      { label: "BPL / Income Certificate", type: "income", verified: true },
      { label: "Aadhaar Card (Patient)", type: "identity", verified: true },
      { label: "Echocardiogram Report", type: "prescription", verified: true },
    ],

    story: [
      "Shakuntala Devi, 58, a homemaker from Muzaffarpur, Bihar, collapsed at home while cooking. Her son rushed her to the nearest primary health centre, which immediately referred her to AIIMS Patna given the severity of her condition. She was diagnosed with acute heart failure on arrival.",
      "Shakuntala is the backbone of her family. Her husband passed away three years ago, and her two sons work as auto-rickshaw drivers earning barely enough to sustain the household. The sudden hospitalisation has put the family in severe financial distress. They have sold what little gold jewellery they had to fund the initial days of treatment.",
      "Islah's team has been supporting them in navigating the hospital system and arranging urgent funds. The doctors are cautiously optimistic about her recovery with continued care, but the financial burden is overwhelming for the family. Your support can help Shakuntala Devi go home to her children.",
    ],
    familyBackground:
      "Widow, two sons (both auto-rickshaw drivers, earning ₹400–500/day combined). Lives in rented accommodation in Muzaffarpur. No health insurance.",

    updates: [
      {
        date: "2026-06-25",
        type: "admission",
        title: "Emergency Admission at AIIMS Patna",
        text: "Shakuntala Devi admitted via emergency with acute chest pain and breathlessness. Diagnosed with acute heart failure. Admitted to Cardiology ICU.",
      },
      {
        date: "2026-06-26",
        type: "treatment",
        title: "Islah Case Verified",
        text: "Islah field coordinator visited AIIMS. Case verified by Dr. Rakesh Sharma. BPL certificate and income proof confirmed. Initial ₹15,000 released.",
      },
      {
        date: "2026-07-01",
        type: "progress",
        title: "Condition Stabilising",
        text: "Doctors report that heart function has improved slightly with medication. Patient is conscious and responding. Still requires ICU monitoring for at least 10 more days.",
      },
      {
        date: "2026-07-05",
        type: "funding",
        title: "₹43,500 Raised — Thank You!",
        text: "61 donors have shown incredible generosity. ₹38,000 utilised for ICU charges and cardiac medicines. ₹81,500 still needed for complete treatment.",
      },
    ],

    donationHistory: [
      { donor: "A donor from Hyderabad", amount: 5000, date: "2026-07-10", message: "Strength to her and family." },
      { donor: "An anonymous donor", amount: 2100, date: "2026-07-09" },
      { donor: "A donor from Kolkata", amount: 3000, date: "2026-07-08" },
      { donor: "A donor from Patna", amount: 1000, date: "2026-07-07" },
      { donor: "An anonymous donor", amount: 500, date: "2026-07-06" },
      { donor: "A donor from Dubai", amount: 10000, date: "2026-07-04", message: "May she recover fully." },
    ],
  },

  {
    id: 3,
    slug: "ramesh-kumar",
    name: "Ramesh Kumar",
    age: 47,
    gender: "Male",
    disease: "Liver Cirrhosis with GI Bleed",
    diagnosis:
      "Advanced scarring of the liver combined with internal bleeding in the gastrointestinal tract. Requires urgent blood transfusions, medication, and possibly surgical intervention.",
    hospital: "Paras HMRI Hospital",
    hospitalAddress: "Raja Bazar, Patna, Bihar - 800014",
    ward: "Gastroenterology Unit, ICU",
    admissionDate: "2026-07-01",
    condition: "Critical",
    urgent: true,
    image: patient3Img,

    neededAmount: 95000,
    raisedAmount: 30000,
    donorsCount: 42,
    costBreakdown: [
      { label: "ICU Stay & Monitoring (12 days)", amount: 36000 },
      { label: "Blood Transfusions (4 units)", amount: 20000 },
      { label: "Liver Medicines & IV Drugs", amount: 22000 },
      { label: "Endoscopy & Diagnostic Tests", amount: 12000 },
      { label: "Nutrition Support & Nursing", amount: 5000 },
    ],

    verificationId: "Islah-CLS-2026-003",
    verifiedBy: "Dr. Priya Mishra, Gastroenterologist, Paras HMRI",
    verificationDate: "2026-07-02",
    documents: [
      { label: "Hospital Admission Letter", type: "admission", verified: true },
      { label: "Gastroenterology Report", type: "medical", verified: true },
      { label: "Income Certificate (Block Office)", type: "income", verified: true },
      { label: "Aadhaar Card (Patient)", type: "identity", verified: true },
      { label: "Blood Reports & Endoscopy Report", type: "prescription", verified: true },
    ],

    story: [
      "Ramesh Kumar, 47, is a small farmer from Nalanda district who was brought to Paras HMRI in a critical condition after vomiting blood. He has been suffering from liver disease for the past two years but could never afford proper treatment. His condition deteriorated rapidly, requiring immediate hospitalisation.",
      "Ramesh is the sole breadwinner for his wife and three children aged between 8 and 15. His farmland, barely 1 acre, is not enough to sustain the family. The monsoon season means no additional income from daily labour. The family is in extreme financial distress and has taken a loan from a local moneylender at high interest just for the admission deposit.",
      "Islah intervened within hours of being alerted by the hospital's social worker. Multiple blood transfusions have been administered and his condition has stabilised slightly, but he is still in the ICU. Every donation brings him closer to seeing his children again.",
    ],
    familyBackground:
      "Married with 3 children (ages 8, 12, 15). Wife is a homemaker. Owns 1 acre of farmland in Nalanda district. Monthly family income approximately ₹5,000–6,000.",

    updates: [
      {
        date: "2026-07-01",
        type: "admission",
        title: "Emergency Admission — GI Bleed",
        text: "Ramesh Kumar rushed to Paras HMRI with active GI bleeding. Two units of blood transfused immediately. Admitted to Gastroenterology ICU.",
      },
      {
        date: "2026-07-02",
        type: "treatment",
        title: "Islah Verification & Initial Support",
        text: "Islah case verified by Dr. Priya Mishra. ₹12,000 released for emergency blood and medicines. Endoscopy procedure completed.",
      },
      {
        date: "2026-07-06",
        type: "progress",
        title: "Bleeding Controlled — On Liver Medication",
        text: "Active bleeding has been controlled. Patient is on aggressive liver medication. ICU stay extended for close monitoring. Two more blood units may be needed.",
      },
      {
        date: "2026-07-10",
        type: "funding",
        title: "42 Donors — ₹30,000 Raised",
        text: "₹26,000 utilised for blood, ICU, and medicines. Grateful for every contribution. ₹65,000 still required for complete treatment and recovery.",
      },
    ],

    donationHistory: [
      { donor: "A donor from Chennai", amount: 3000, date: "2026-07-10" },
      { donor: "An anonymous donor", amount: 500, date: "2026-07-09" },
      { donor: "A donor from Patna", amount: 2000, date: "2026-07-08", message: "Speedy recovery!" },
      { donor: "A donor from Pune", amount: 5000, date: "2026-07-07" },
      { donor: "An anonymous donor", amount: 1000, date: "2026-07-06" },
      { donor: "A donor from Lucknow", amount: 1500, date: "2026-07-05" },
    ],
  },

  {
    id: 4,
    slug: "abdul-rahman",
    name: "Abdul Rahman",
    age: 66,
    gender: "Male",
    disease: "Kidney Failure",
    diagnosis:
      "Both kidneys have stopped functioning and are unable to filter waste from the blood. The patient requires regular dialysis to stay alive and may need a kidney transplant evaluation.",
    hospital: "Medanta Hospital",
    hospitalAddress: "Exhibition Road, Patna, Bihar - 800001",
    ward: "Nephrology Unit",
    admissionDate: "2026-06-20",
    condition: "Serious",
    urgent: true,
    image: patient4Img,

    neededAmount: 110000,
    raisedAmount: 38000,
    donorsCount: 55,
    costBreakdown: [
      { label: "Dialysis Sessions (20 sessions)", amount: 60000 },
      { label: "Nephrology Consultation & ICU", amount: 22000 },
      { label: "Medicines & IV Fluids", amount: 15000 },
      { label: "Diagnostic Tests (Kidney Function, Ultrasound)", amount: 8000 },
      { label: "Nutrition & Support Care", amount: 5000 },
    ],

    verificationId: "Islah-CLS-2026-004",
    verifiedBy: "Dr. Sana Fatima, Nephrologist, Medanta Patna",
    verificationDate: "2026-06-21",
    documents: [
      { label: "Hospital Admission Letter", type: "admission", verified: true },
      { label: "Nephrologist Report", type: "medical", verified: true },
      { label: "BPL Certificate", type: "income", verified: true },
      { label: "Aadhaar Card (Patient)", type: "identity", verified: true },
      { label: "Kidney Function Tests & Ultrasound", type: "prescription", verified: true },
    ],

    story: [
      "Abdul Rahman, 66, is a retired school teacher from Gaya, Bihar, who was admitted to Medanta Hospital after his kidneys suddenly stopped functioning. He had been managing mild kidney disease for years on basic medication, but a sudden infection caused his kidneys to fail completely, requiring immediate dialysis.",
      "Abdul Rahman's pension of ₹4,000 per month barely covers household expenses. His children are working in different cities but earn modest wages and are already stretched thin. Dialysis at ₹3,000 per session, needed three times a week, is financially impossible for the family without external support.",
      "Islah has been by his side since day one, coordinating with the hospital and managing the funds transparently. Abdul Rahman's gentle spirit and the way he speaks about returning to his students move everyone who visits him. With your help, he can complete his treatment and go home.",
    ],
    familyBackground:
      "Retired school teacher. Wife (homemaker, 62). Three children — one son working in Delhi, one daughter married in Bhagalpur, one son in Patna. Monthly pension: ₹4,000.",

    updates: [
      {
        date: "2026-06-20",
        type: "admission",
        title: "Admitted with Complete Kidney Failure",
        text: "Abdul Rahman admitted to Medanta Nephrology with complete kidney failure. Emergency dialysis initiated. Islah alerted by family.",
      },
      {
        date: "2026-06-21",
        type: "treatment",
        title: "Islah Verified — First Dialysis Funded",
        text: "Case verified by Dr. Sana Fatima. All documents confirmed. Islah funded first 5 dialysis sessions (₹15,000). Patient responding well.",
      },
      {
        date: "2026-07-03",
        type: "progress",
        title: "10 Dialysis Sessions Completed",
        text: "Patient has completed 10 of the required dialysis sessions. Creatinine levels improving. 10 more sessions needed. Transplant evaluation being planned.",
      },
      {
        date: "2026-07-10",
        type: "funding",
        title: "55 Donors — ₹38,000 Raised",
        text: "₹33,000 used for dialysis and medicines. 55 donors have shown immense kindness. ₹72,000 still required for remaining dialysis and evaluation.",
      },
    ],

    donationHistory: [
      { donor: "A donor from Riyadh", amount: 8000, date: "2026-07-11", message: "For our teacher." },
      { donor: "A donor from Delhi", amount: 3000, date: "2026-07-10" },
      { donor: "An anonymous donor", amount: 1500, date: "2026-07-09" },
      { donor: "A donor from Gaya", amount: 2000, date: "2026-07-08", message: "Get well soon sir." },
      { donor: "An anonymous donor", amount: 500, date: "2026-07-07" },
      { donor: "A donor from Bengaluru", amount: 5000, date: "2026-07-06" },
    ],
  },
];
