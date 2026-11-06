import { Patient } from "../models/Patient.js";

export const INITIAL_PATIENTS = [
  {
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
    image: "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/patients/patient-1.jpg",
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
      "Mohammed Salim, 62, is a daily wage labourer from Darbhanga district who was brought to Patna Medical College & Hospital in a critical state after struggling to breathe for several days.",
      "Doctors diagnosed him with severe bilateral pneumonia leading to respiratory failure. He was immediately placed on ventilator support in the ICU.",
      "Islah's field team verified his case within 24 hours of admission and has been coordinating with the hospital. Every rupee donated goes directly to his treatment.",
    ],
    familyBackground:
      "Wife (homemaker), one son (18, daily labourer), one daughter (16, studying in Class 10). The family earns approximately ₹250–300 per day. They have no health insurance.",
    updates: [
      {
        date: "2026-06-28",
        type: "admission",
        title: "Patient Admitted to ICU",
        text: "Mohammed Salim admitted to PMCH ICU with severe respiratory failure. Placed on ventilator support.",
      },
      {
        date: "2026-07-02",
        type: "treatment",
        title: "Antibiotic Therapy & Oxygen Support",
        text: "Responding positively to dual-antibiotic therapy. Oxygen saturation gradually improving.",
      },
    ],
    donationHistory: [
      { donor: "A donor from Delhi", amount: 5000, date: "2026-07-02", message: "Praying for full recovery" },
      { donor: "An anonymous donor", amount: 2000, date: "2026-07-01" },
      { donor: "A donor from Patna", amount: 1000, date: "2026-06-30" },
    ],
    status: "Active",
  },
  {
    slug: "shakuntala-devi",
    name: "Shakuntala Devi",
    age: 58,
    gender: "Female",
    disease: "Acute Heart Failure",
    diagnosis:
      "A condition where the heart suddenly cannot pump enough blood to meet the body's needs. Requires immediate medical intervention and cardiac monitoring.",
    hospital: "AIIMS Patna",
    hospitalAddress: "Phulwari Sharif, Patna, Bihar - 801505",
    ward: "Cardiology ICU",
    admissionDate: "2026-06-25",
    condition: "Serious",
    urgent: true,
    image: "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/patients/patient-2.jpg",
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
      { label: "AIIMS Admission Form", type: "admission", verified: true },
      { label: "ECG & 2D Echo Report", type: "medical", verified: true },
      { label: "Gram Panchayat Income Certificate", type: "income", verified: true },
      { label: "Aadhaar Card", type: "identity", verified: true },
    ],
    story: [
      "Shakuntala Devi, 58, collapsed at her home in rural Samastipur and was rushed to AIIMS Patna where she was diagnosed with acute decompensated heart failure.",
      "She requires urgent intensive cardiac care, inotropic medications, and continuous telemetry monitoring to prevent irreversible cardiac arrest.",
    ],
    familyBackground:
      "Widowed mother living with younger son who works at a local grain mill earning ₹6,000 monthly. No family health savings.",
    updates: [
      {
        date: "2026-06-25",
        type: "admission",
        title: "Admitted to Cardiac ICU",
        text: "Emergency admission following acute shortness of breath and fluid accumulation in lungs.",
      },
    ],
    donationHistory: [
      { donor: "A donor from Mumbai", amount: 10000, date: "2026-06-27" },
      { donor: "A donor from Bengaluru", amount: 3500, date: "2026-06-26" },
    ],
    status: "Active",
  },
  {
    slug: "ramesh-kumar",
    name: "Ramesh Kumar",
    age: 47,
    gender: "Male",
    disease: "Liver Cirrhosis with GI Bleed",
    diagnosis:
      "Advanced scarring of the liver combined with internal bleeding in the gastrointestinal tract. Requires urgent blood transfusions, medication, and endoscopic intervention.",
    hospital: "Paras HMRI Hospital",
    hospitalAddress: "Raja Bazar, Patna, Bihar - 800014",
    ward: "Gastroenterology Unit, ICU",
    admissionDate: "2026-07-01",
    condition: "Critical",
    urgent: true,
    image: "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/patients/patient-3.jpg",
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
      { label: "Endoscopy & Lab Reports", type: "medical", verified: true },
      { label: "Income Certificate (Block Office)", type: "income", verified: true },
      { label: "Aadhaar Card", type: "identity", verified: true },
    ],
    story: [
      "Ramesh Kumar, 47, is a smallholder farmer from Nalanda district who was brought to Paras HMRI in critical condition with severe internal bleeding.",
      "He is the sole provider for his wife and three young school-going children. The family is in severe distress.",
    ],
    familyBackground:
      "Married with 3 children (ages 8, 12, 15). Monthly family income approx ₹5,000–6,000.",
    updates: [
      {
        date: "2026-07-01",
        type: "admission",
        title: "Emergency GI Bleed Admission",
        text: "Admitted with active bleeding. Emergency blood units transfused.",
      },
    ],
    donationHistory: [
      { donor: "A donor from Chennai", amount: 3000, date: "2026-07-10" },
      { donor: "An anonymous donor", amount: 2000, date: "2026-07-08" },
    ],
    status: "Active",
  },
  {
    slug: "abdul-rahman",
    name: "Abdul Rahman",
    age: 66,
    gender: "Male",
    disease: "Kidney Failure",
    diagnosis:
      "Both kidneys have ceased functioning and cannot filter metabolic waste. Requires regular dialysis sessions to sustain life.",
    hospital: "Medanta Hospital",
    hospitalAddress: "Exhibition Road, Patna, Bihar - 800001",
    ward: "Nephrology Unit",
    admissionDate: "2026-06-20",
    condition: "Serious",
    urgent: true,
    image: "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev/patients/patient-4.jpg",
    neededAmount: 110000,
    raisedAmount: 38000,
    donorsCount: 55,
    costBreakdown: [
      { label: "Dialysis Sessions (20 sessions)", amount: 60000 },
      { label: "Nephrology Consultation & ICU", amount: 22000 },
      { label: "Medicines & IV Fluids", amount: 15000 },
      { label: "Diagnostic Tests (Kidney Function)", amount: 8000 },
      { label: "Nutrition & Support Care", amount: 5000 },
    ],
    verificationId: "Islah-CLS-2026-004",
    verifiedBy: "Dr. Sana Fatima, Nephrologist, Medanta Patna",
    verificationDate: "2026-06-21",
    documents: [
      { label: "Hospital Admission Letter", type: "admission", verified: true },
      { label: "Nephrologist Evaluation Report", type: "medical", verified: true },
      { label: "BPL Certificate", type: "income", verified: true },
      { label: "Aadhaar Card", type: "identity", verified: true },
    ],
    story: [
      "Abdul Rahman, 66, is a retired rural school teacher from Gaya, Bihar, who suffered sudden renal failure following a severe urinary tract infection.",
      "His modest teacher's pension of ₹4,000 per month cannot support regular private dialysis sessions.",
    ],
    familyBackground:
      "Retired teacher with elderly wife. Modest pension with no corporate health benefits.",
    updates: [
      {
        date: "2026-06-20",
        type: "admission",
        title: "Emergency Renal Admission",
        text: "Admitted with complete renal failure. Emergency hemodialysis initiated.",
      },
    ],
    donationHistory: [
      { donor: "A donor from Riyadh", amount: 8000, date: "2026-07-11", message: "For our respected teacher" },
      { donor: "A donor from Delhi", amount: 3000, date: "2026-07-10" },
    ],
    status: "Active",
  },
  {
    slug: "baby-ayesha",
    name: "Baby Ayesha",
    age: 3,
    gender: "Female",
    disease: "Severe Dengue with Thrombocytopenia",
    diagnosis:
      "Severe dengue hemorrhagic fever with critically low platelet count. Requires emergency pediatric intensive care and platelet transfusions.",
    hospital: "Nalanda Medical College & Hospital (NMCH)",
    hospitalAddress: "Agam Kuan, Patna, Bihar - 800007",
    ward: "Pediatric ICU, Bed 04",
    admissionDate: "2026-07-03",
    condition: "Critical",
    urgent: true,
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    neededAmount: 65000,
    raisedAmount: 27500,
    donorsCount: 52,
    costBreakdown: [
      { label: "PICU Stay & Monitoring (7 days)", amount: 28000 },
      { label: "Platelet Concentrates & Blood Products", amount: 18000 },
      { label: "IV Fluids & Critical Medications", amount: 12000 },
      { label: "Daily CBC & Serology Panels", amount: 7000 },
    ],
    verificationId: "Islah-CLS-2026-005",
    verifiedBy: "Dr. Priyamvada Roy, NMCH Patna",
    verificationDate: "2026-07-04",
    documents: [
      { label: "Pediatric Admission Form", type: "admission", verified: true },
      { label: "Platelet & Dengue Serology Report", type: "medical", verified: true },
      { label: "Aadhaar Card (Parent)", type: "identity", verified: true },
    ],
    story: [
      "Baby Ayesha, aged 3, was rushed to NMCH Patna with a 104°F fever and dangerously falling platelet counts under 15,000/μL.",
      "Her father works as an auto-rickshaw driver in Patna and is unable to afford emergency pediatric ICU care.",
    ],
    familyBackground:
      "Father is an auto-driver earning ₹350 daily. Mother is a homemaker. One elder sibling.",
    updates: [
      {
        date: "2026-07-03",
        type: "admission",
        title: "Emergency PICU Admission",
        text: "Admitted with dengue shock syndrome. Single-donor platelets administered.",
      },
    ],
    donationHistory: [
      { donor: "A donor from Pune", amount: 5000, date: "2026-07-05" },
      { donor: "An anonymous donor", amount: 2000, date: "2026-07-04" },
    ],
    status: "Active",
  },
];

export async function seedInitialPatients(): Promise<void> {
  try {
    for (const patientData of INITIAL_PATIENTS) {
      await Patient.findOneAndUpdate(
        { slug: patientData.slug },
        { $set: patientData },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log(`[Database Seed] Synchronized ${INITIAL_PATIENTS.length} patient cases into MongoDB.`);
  } catch (error) {
    console.error("[Database Seed] Error seeding patients:", error);
  }
}
