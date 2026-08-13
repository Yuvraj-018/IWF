import { useState, useMemo, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Shield, Sparkles, Award, CheckCircle2,
  Download, ArrowRight, ArrowLeft, Check, AlertCircle,
  Calendar, CreditCard, Smartphone, Building2, Banknote,
  Search, FileText, QrCode, RefreshCw, X,
  ChevronLeft, ChevronRight,
  Phone, Mail, MapPin, BadgeCheck,
  Lock, UserCheck, Clock, XCircle, Trophy,
  Heart, Upload, User, Wallet, Copy, RotateCcw,
  IndianRupee, Info, Star,
} from "lucide-react";
import {
  Footer, Header, NotificationTicker, RoleFormModal, UtilityBar,
} from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";
import { MembershipPolicyModal } from "@/components/membership/MembershipPolicyModal";

// ══════════════════════════════════════════════════════════════════
//  TYPES
// ══════════════════════════════════════════════════════════════════

type MemberCategory = "Blue" | "Yellow" | "Green";
type DonorTier = "Platinum" | "Gold" | "Silver";
type PageTab = "Members" | "Donors" | "Your Membership";

// ══════════════════════════════════════════════════════════════════
//  CATEGORY CONFIG
// ══════════════════════════════════════════════════════════════════

const CATEGORY_CONFIG: Record<MemberCategory, {
  code: string; amount: number; color: string; darkColor: string;
  bg: string; border: string; badge: string; features: string[]; icon: typeof Shield;
}> = {
  Blue: {
    code: "BL", amount: 2500, color: "#1D4ED8", darkColor: "#1E3A8A",
    bg: "#EFF6FF", border: "#BFDBFE", badge: "bg-blue-100 text-blue-700 border-blue-200",
    features: [
      "Recognition as a Supporting Member of IWF",
      "Participation in selected programs and awareness activities",
      "Engagement in community initiatives",
    ],
    icon: Shield,
  },
  Yellow: {
    code: "YL", amount: 4000, color: "#D97706", darkColor: "#92400E",
    bg: "#FFFBEB", border: "#FDE68A", badge: "bg-amber-100 text-amber-700 border-amber-200",
    features: [
      "Recognition for active contribution and engagement",
      "Participation in program-level activities",
      "Opportunities to collaborate in community initiatives",
    ],
    icon: Award,
  },
  Green: {
    code: "GR", amount: 6000, color: "#15803D", darkColor: "#14532D",
    bg: "#F0FDF4", border: "#BBF7D0", badge: "bg-green-100 text-green-700 border-green-200",
    features: [
      "Special recognition as key supporter of IWF",
      "Invitation to major programs and special events",
      "Opportunity to contribute ideas and support initiatives",
    ],
    icon: Sparkles,
  },
};

// ══════════════════════════════════════════════════════════════════
//  DONOR TIER CONFIG
// ══════════════════════════════════════════════════════════════════

const DONOR_TIER_CONFIG: Record<DonorTier, {
  color: string; darkColor: string; bg: string; border: string;
  label: string; minAmount: number; icon: typeof Trophy; gradientFrom: string; gradientTo: string;
}> = {
  Platinum: {
    color: "#6B7280", darkColor: "#374151", bg: "#F9FAFB", border: "#D1D5DB",
    label: "Platinum", minAmount: 50000, icon: Trophy,
    gradientFrom: "#6B7280", gradientTo: "#374151",
  },
  Gold: {
    color: "#D97706", darkColor: "#92400E", bg: "#FFFBEB", border: "#FDE68A",
    label: "Gold", minAmount: 20000, icon: Star,
    gradientFrom: "#D97706", gradientTo: "#92400E",
  },
  Silver: {
    color: "#64748B", darkColor: "#475569", bg: "#F8FAFC", border: "#CBD5E1",
    label: "Silver", minAmount: 5000, icon: Award,
    gradientFrom: "#94A3B8", gradientTo: "#64748B",
  },
};

// ══════════════════════════════════════════════════════════════════
//  MOCK DATA
// ══════════════════════════════════════════════════════════════════

type MockMember = {
  id: string; name: string; category: MemberCategory;
  district: string; state: string; status: "Active" | "Expired";
  validTill: string; phone: string; joined: string;
};

const MOCK_MEMBERS: MockMember[] = [
  { id: "IWF-BL-2025-001", name: "Md. Aftab Alam", category: "Blue", district: "Darbhanga", state: "Bihar", status: "Active", validTill: "2026-04-30", phone: "9876543210", joined: "2025-04-30" },
  { id: "IWF-BL-2025-002", name: "Sunita Kumari", category: "Blue", district: "Madhubani", state: "Bihar", status: "Expired", validTill: "2025-04-14", phone: "9765432109", joined: "2024-04-14" },
  { id: "IWF-YL-2025-001", name: "Rajesh Kumar", category: "Yellow", district: "Darbhanga", state: "Bihar", status: "Active", validTill: "2026-05-09", phone: "9654321098", joined: "2025-05-09" },
  { id: "IWF-GR-2025-001", name: "Pankaj Sharma", category: "Green", district: "Samastipur", state: "Bihar", status: "Active", validTill: "2026-04-19", phone: "9543210987", joined: "2025-04-19" },
  { id: "IWF-GR-2025-002", name: "Hope Foundation", category: "Green", district: "New Delhi", state: "Delhi", status: "Active", validTill: "2026-05-21", phone: "9432109876", joined: "2025-05-21" },
  { id: "IWF-BL-2025-003", name: "Dr. Amit Singh", category: "Blue", district: "Bengaluru", state: "Karnataka", status: "Active", validTill: "2026-06-15", phone: "9321098765", joined: "2025-06-15" },
  { id: "IWF-YL-2025-002", name: "Priya Devi", category: "Yellow", district: "Gaya", state: "Bihar", status: "Active", validTill: "2026-07-22", phone: "9210987654", joined: "2025-07-22" },
  { id: "IWF-GR-2025-003", name: "Rakesh Yadav", category: "Green", district: "Darbhanga", state: "Bihar", status: "Active", validTill: "2026-03-01", phone: "9109876543", joined: "2025-03-01" },
  { id: "IWF-BL-2025-004", name: "Faizan Ahmad", category: "Blue", district: "Lucknow", state: "Uttar Pradesh", status: "Active", validTill: "2026-08-10", phone: "9098765432", joined: "2025-08-10" },
  { id: "IWF-YL-2025-003", name: "Anjali Mishra", category: "Yellow", district: "Ranchi", state: "Jharkhand", status: "Active", validTill: "2026-09-05", phone: "8987654321", joined: "2025-09-05" },
  { id: "IWF-BL-2025-005", name: "Vikram Choudhary", category: "Blue", district: "Kolkata", state: "West Bengal", status: "Active", validTill: "2026-10-12", phone: "8876543210", joined: "2025-10-12" },
  { id: "IWF-YL-2025-004", name: "Zeba Siddiqui", category: "Yellow", district: "Darbhanga", state: "Bihar", status: "Active", validTill: "2026-11-15", phone: "8765432109", joined: "2025-11-15" },
];

type MockDonor = {
  id: string; name: string; tier: DonorTier;
  amount: number; location: string; cause: string;
};

const MOCK_DONORS: MockDonor[] = [
  { id: "D001", name: "Pankaj Sharma", tier: "Platinum", amount: 120000, location: "Darbhanga, Bihar", cause: "Education Support" },
  { id: "D002", name: "XYZ Foundation", tier: "Platinum", amount: 100000, location: "New Delhi, Delhi", cause: "Healthcare Support" },
  { id: "D003", name: "ABC Charitable Trust", tier: "Platinum", amount: 75000, location: "Patna, Bihar", cause: "Rural Development" },
  { id: "D004", name: "Dr. Amit Singh", tier: "Platinum", amount: 70000, location: "Muzaffarpur, Bihar", cause: "Education Support" },
  { id: "D005", name: "Rakesh Yadav", tier: "Platinum", amount: 55000, location: "Samastipur, Bihar", cause: "Skill Development" },
  { id: "D006", name: "Helping Hands India", tier: "Platinum", amount: 50000, location: "Bengaluru, Karnataka", cause: "Health & Nutrition" },
  { id: "D007", name: "Sunita Kumari", tier: "Gold", amount: 35000, location: "Madhubani, Bihar", cause: "Women Empowerment" },
  { id: "D008", name: "Priya Devi", tier: "Gold", amount: 35000, location: "Darbhanga, Bihar", cause: "Education Support" },
  { id: "D009", name: "Bright Future Trust", tier: "Gold", amount: 30000, location: "Kolkata, West Bengal", cause: "Scholarship Program" },
  { id: "D010", name: "Aditya Birla Trust", tier: "Gold", amount: 25000, location: "Purnia, Bihar", cause: "Community Welfare" },
  { id: "D011", name: "TATA Trust Support", tier: "Gold", amount: 24000, location: "Katihar, Bihar", cause: "Healthcare Support" },
  { id: "D012", name: "Care & Share Org", tier: "Gold", amount: 22000, location: "Guwahati, Assam", cause: "Food & Nutrition" },
  { id: "D013", name: "Md. Aftab Alam", tier: "Silver", amount: 15000, location: "Darbhanga, Bihar", cause: "Education Support" },
  { id: "D014", name: "Anjali Mishra", tier: "Silver", amount: 12000, location: "Madhubani, Bihar", cause: "Education Support" },
  { id: "D015", name: "Sanjay Dutt", tier: "Silver", amount: 9000, location: "Samastipur, Bihar", cause: "Community Support" },
  { id: "D016", name: "Hope Foundation", tier: "Silver", amount: 8000, location: "Patna, Bihar", cause: "General Support" },
  { id: "D017", name: "Faizan Ahmad", tier: "Silver", amount: 7000, location: "Gaya, Bihar", cause: "Education Support" },
  { id: "D018", name: "Kiran Bedi Fund", tier: "Silver", amount: 6000, location: "Saharsa, Bihar", cause: "Women Empowerment" },
];

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep", "Puducherry", "Ladakh"
];

const STATE_DISTRICTS: Record<string, string[]> = {
  "Andhra Pradesh": [
    "Anantapur",
    "Chittoor",
    "East Godavari",
    "Guntur",
    "Krishna",
    "Kurnool",
    "Nellore",
    "Prakasam",
    "Srikakulam",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
    "YSR Kadapa"
  ],
  "Arunachal Pradesh": [
    "Tawang",
    "West Kameng",
    "East Kameng",
    "Papum Pare",
    "Kurung Kumey",
    "Kra Daadi",
    "Lower Subansiri",
    "Upper Subansiri",
    "West Siang",
    "East Siang",
    "Siang",
    "Upper Siang",
    "Lower Siang",
    "Lower Dibang Valley",
    "Dibang Valley",
    "Anjaw",
    "Lohit",
    "Namsai",
    "Changlang",
    "Tirap",
    "Longding"
  ],
  "Assam": [
    "Baksa",
    "Barpeta",
    "Biswanath",
    "Bongaigaon",
    "Cachar",
    "Charaideo",
    "Chirang",
    "Darrang",
    "Dhemaji",
    "Dhubri",
    "Dibrugarh",
    "Goalpara",
    "Golaghat",
    "Hailakandi",
    "Hojai",
    "Jorhat",
    "Kamrup Metropolitan",
    "Kamrup",
    "Karbi Anglong",
    "Karimganj",
    "Kokrajhar",
    "Lakhimpur",
    "Majuli",
    "Morigaon",
    "Nagaon",
    "Nalbari",
    "Dima Hasao",
    "Sivasagar",
    "Sonitpur",
    "South Salmara-Mankachar",
    "Tinsukia",
    "Udalguri",
    "West Karbi Anglong"
  ],
  "Bihar": [
    "Araria",
    "Arwal",
    "Aurangabad",
    "Banka",
    "Begusarai",
    "Bhagalpur",
    "Bhojpur",
    "Buxar",
    "Darbhanga",
    "East Champaran (Motihari)",
    "Gaya",
    "Gopalganj",
    "Jamui",
    "Jehanabad",
    "Kaimur (Bhabua)",
    "Katihar",
    "Khagaria",
    "Kishanganj",
    "Lakhisarai",
    "Madhepura",
    "Madhubani",
    "Munger (Monghyr)",
    "Muzaffarpur",
    "Nalanda",
    "Nawada",
    "Patna",
    "Purnia (Purnea)",
    "Rohtas",
    "Saharsa",
    "Samastipur",
    "Saran",
    "Sheikhpura",
    "Sheohar",
    "Sitamarhi",
    "Siwan",
    "Supaul",
    "Vaishali",
    "West Champaran"
  ],
  "Chandigarh": [
    "Chandigarh"
  ],
  "Chhattisgarh": [
    "Balod",
    "Baloda Bazar",
    "Balrampur",
    "Bastar",
    "Bemetara",
    "Bijapur",
    "Bilaspur",
    "Dantewada (South Bastar)",
    "Dhamtari",
    "Durg",
    "Gariyaband",
    "Janjgir-Champa",
    "Jashpur",
    "Kabirdham (Kawardha)",
    "Kanker (North Bastar)",
    "Kondagaon",
    "Korba",
    "Korea (Koriya)",
    "Mahasamund",
    "Mungeli",
    "Narayanpur",
    "Raigarh",
    "Raipur",
    "Rajnandgaon",
    "Sukma",
    "Surajpur",
    "Surguja"
  ],
  "Dadra and Nagar Haveli and Daman and Diu": [
    "Dadra",
    "Nagar Haveli",
    "Daman",
    "Diu"
  ],
  "Delhi": [
    "Central Delhi",
    "East Delhi",
    "New Delhi",
    "North Delhi",
    "North East  Delhi",
    "North West  Delhi",
    "Shahdara",
    "South Delhi",
    "South East Delhi",
    "South West  Delhi",
    "West Delhi"
  ],
  "Goa": [
    "North Goa",
    "South Goa"
  ],
  "Gujarat": [
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Aravalli",
    "Banaskantha (Palanpur)",
    "Bharuch",
    "Bhavnagar",
    "Botad",
    "Chhota Udepur",
    "Dahod",
    "Dangs (Ahwa)",
    "Devbhoomi Dwarka",
    "Gandhinagar",
    "Gir Somnath",
    "Jamnagar",
    "Junagadh",
    "Kachchh",
    "Kheda (Nadiad)",
    "Mahisagar",
    "Mehsana",
    "Morbi",
    "Narmada (Rajpipla)",
    "Navsari",
    "Panchmahal (Godhra)",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Sabarkantha (Himmatnagar)",
    "Surat",
    "Surendranagar",
    "Tapi (Vyara)",
    "Vadodara",
    "Valsad"
  ],
  "Haryana": [
    "Ambala",
    "Bhiwani",
    "Charkhi Dadri",
    "Faridabad",
    "Fatehabad",
    "Gurgaon",
    "Hisar",
    "Jhajjar",
    "Jind",
    "Kaithal",
    "Karnal",
    "Kurukshetra",
    "Mahendragarh",
    "Mewat",
    "Palwal",
    "Panchkula",
    "Panipat",
    "Rewari",
    "Rohtak",
    "Sirsa",
    "Sonipat",
    "Yamunanagar"
  ],
  "Himachal Pradesh": [
    "Bilaspur",
    "Chamba",
    "Hamirpur",
    "Kangra",
    "Kinnaur",
    "Kullu",
    "Lahaul &amp; Spiti",
    "Mandi",
    "Shimla",
    "Sirmaur (Sirmour)",
    "Solan",
    "Una"
  ],
  "Jammu and Kashmir": [
    "Anantnag",
    "Bandipore",
    "Baramulla",
    "Budgam",
    "Doda",
    "Ganderbal",
    "Jammu",
    "Kargil",
    "Kathua",
    "Kishtwar",
    "Kulgam",
    "Kupwara",
    "Leh",
    "Poonch",
    "Pulwama",
    "Rajouri",
    "Ramban",
    "Reasi",
    "Samba",
    "Shopian",
    "Srinagar",
    "Udhampur"
  ],
  "Jharkhand": [
    "Bokaro",
    "Chatra",
    "Deoghar",
    "Dhanbad",
    "Dumka",
    "East Singhbhum",
    "Garhwa",
    "Giridih",
    "Godda",
    "Gumla",
    "Hazaribag",
    "Jamtara",
    "Khunti",
    "Koderma",
    "Latehar",
    "Lohardaga",
    "Pakur",
    "Palamu",
    "Ramgarh",
    "Ranchi",
    "Sahibganj",
    "Seraikela-Kharsawan",
    "Simdega",
    "West Singhbhum"
  ],
  "Karnataka": [
    "Bagalkot",
    "Ballari (Bellary)",
    "Belagavi (Belgaum)",
    "Bengaluru (Bangalore) Rural",
    "Bengaluru (Bangalore) Urban",
    "Bidar",
    "Chamarajanagar",
    "Chikballapur",
    "Chikkamagaluru (Chikmagalur)",
    "Chitradurga",
    "Dakshina Kannada",
    "Davangere",
    "Dharwad",
    "Gadag",
    "Hassan",
    "Haveri",
    "Kalaburagi (Gulbarga)",
    "Kodagu",
    "Kolar",
    "Koppal",
    "Mandya",
    "Mysuru (Mysore)",
    "Raichur",
    "Ramanagara",
    "Shivamogga (Shimoga)",
    "Tumakuru (Tumkur)",
    "Udupi",
    "Uttara Kannada (Karwar)",
    "Vijayapura (Bijapur)",
    "Yadgir"
  ],
  "Kerala": [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad"
  ],
  "Lakshadweep": [
    "Lakshadweep"
  ],
  "Madhya Pradesh": [
    "Agar Malwa",
    "Alirajpur",
    "Anuppur",
    "Ashoknagar",
    "Balaghat",
    "Barwani",
    "Betul",
    "Bhind",
    "Bhopal",
    "Burhanpur",
    "Chhatarpur",
    "Chhindwara",
    "Damoh",
    "Datia",
    "Dewas",
    "Dhar",
    "Dindori",
    "Guna",
    "Gwalior",
    "Harda",
    "Hoshangabad",
    "Indore",
    "Jabalpur",
    "Jhabua",
    "Katni",
    "Khandwa",
    "Khargone",
    "Mandla",
    "Mandsaur",
    "Morena",
    "Narsinghpur",
    "Neemuch",
    "Panna",
    "Raisen",
    "Rajgarh",
    "Ratlam",
    "Rewa",
    "Sagar",
    "Satna",
    "Sehore",
    "Seoni",
    "Shahdol",
    "Shajapur",
    "Sheopur",
    "Shivpuri",
    "Sidhi",
    "Singrauli",
    "Tikamgarh",
    "Ujjain",
    "Umaria",
    "Vidisha"
  ],
  "Maharashtra": [
    "Ahmednagar",
    "Akola",
    "Amravati",
    "Aurangabad",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Dhule",
    "Gadchiroli",
    "Gondia",
    "Hingoli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai City",
    "Mumbai Suburban",
    "Nagpur",
    "Nanded",
    "Nandurbar",
    "Nashik",
    "Osmanabad",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal"
  ],
  "Manipur": [
    "Bishnupur",
    "Chandel",
    "Churachandpur",
    "Imphal East",
    "Imphal West",
    "Jiribam",
    "Kakching",
    "Kamjong",
    "Kangpokpi",
    "Noney",
    "Pherzawl",
    "Senapati",
    "Tamenglong",
    "Tengnoupal",
    "Thoubal",
    "Ukhrul"
  ],
  "Meghalaya": [
    "East Garo Hills",
    "East Jaintia Hills",
    "East Khasi Hills",
    "North Garo Hills",
    "Ri Bhoi",
    "South Garo Hills",
    "South West Garo Hills",
    "South West Khasi Hills",
    "West Garo Hills",
    "West Jaintia Hills",
    "West Khasi Hills"
  ],
  "Mizoram": [
    "Aizawl",
    "Champhai",
    "Kolasib",
    "Lawngtlai",
    "Lunglei",
    "Mamit",
    "Saiha",
    "Serchhip"
  ],
  "Nagaland": [
    "Dimapur",
    "Kiphire",
    "Kohima",
    "Longleng",
    "Mokokchung",
    "Mon",
    "Peren",
    "Phek",
    "Tuensang",
    "Wokha",
    "Zunheboto"
  ],
  "Odisha": [
    "Angul",
    "Balangir",
    "Balasore",
    "Bargarh",
    "Bhadrak",
    "Boudh",
    "Cuttack",
    "Deogarh",
    "Dhenkanal",
    "Gajapati",
    "Ganjam",
    "Jagatsinghapur",
    "Jajpur",
    "Jharsuguda",
    "Kalahandi",
    "Kandhamal",
    "Kendrapara",
    "Kendujhar (Keonjhar)",
    "Khordha",
    "Koraput",
    "Malkangiri",
    "Mayurbhanj",
    "Nabarangpur",
    "Nayagarh",
    "Nuapada",
    "Puri",
    "Rayagada",
    "Sambalpur",
    "Sonepur",
    "Sundargarh"
  ],
  "Puducherry": [
    "Karaikal",
    "Mahe",
    "Pondicherry",
    "Yanam"
  ],
  "Punjab": [
    "Amritsar",
    "Barnala",
    "Bathinda",
    "Faridkot",
    "Fatehgarh Sahib",
    "Fazilka",
    "Ferozepur",
    "Gurdaspur",
    "Hoshiarpur",
    "Jalandhar",
    "Kapurthala",
    "Ludhiana",
    "Mansa",
    "Moga",
    "Muktsar",
    "Nawanshahr (Shahid Bhagat Singh Nagar)",
    "Pathankot",
    "Patiala",
    "Rupnagar",
    "Sahibzada Ajit Singh Nagar (Mohali)",
    "Sangrur",
    "Tarn Taran"
  ],
  "Rajasthan": [
    "Ajmer",
    "Alwar",
    "Banswara",
    "Baran",
    "Barmer",
    "Bharatpur",
    "Bhilwara",
    "Bikaner",
    "Bundi",
    "Chittorgarh",
    "Churu",
    "Dausa",
    "Dholpur",
    "Dungarpur",
    "Hanumangarh",
    "Jaipur",
    "Jaisalmer",
    "Jalore",
    "Jhalawar",
    "Jhunjhunu",
    "Jodhpur",
    "Karauli",
    "Kota",
    "Nagaur",
    "Pali",
    "Pratapgarh",
    "Rajsamand",
    "Sawai Madhopur",
    "Sikar",
    "Sirohi",
    "Sri Ganganagar",
    "Tonk",
    "Udaipur"
  ],
  "Sikkim": [
    "East Sikkim",
    "North Sikkim",
    "South Sikkim",
    "West Sikkim"
  ],
  "Tamil Nadu": [
    "Ariyalur",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Salem",
    "Sivaganga",
    "Thanjavur",
    "Theni",
    "Thoothukudi (Tuticorin)",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar"
  ],
  "Telangana": [
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hyderabad",
    "Jagtial",
    "Jangaon",
    "Jayashankar Bhoopalpally",
    "Jogulamba Gadwal",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Komaram Bheem Asifabad",
    "Mahabubabad",
    "Mahabubnagar",
    "Mancherial",
    "Medak",
    "Medchal",
    "Nagarkurnool",
    "Nalgonda",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Sircilla",
    "Rangareddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal (Rural)",
    "Warangal (Urban)",
    "Yadadri Bhuvanagiri"
  ],
  "Tripura": [
    "Dhalai",
    "Gomati",
    "Khowai",
    "North Tripura",
    "Sepahijala",
    "South Tripura",
    "Unakoti",
    "West Tripura"
  ],
  "Uttarakhand": [
    "Almora",
    "Bageshwar",
    "Chamoli",
    "Champawat",
    "Dehradun",
    "Haridwar",
    "Nainital",
    "Pauri Garhwal",
    "Pithoragarh",
    "Rudraprayag",
    "Tehri Garhwal",
    "Udham Singh Nagar",
    "Uttarkashi"
  ],
  "Uttar Pradesh": [
    "Agra",
    "Aligarh",
    "Allahabad",
    "Ambedkar Nagar",
    "Amethi (Chatrapati Sahuji Mahraj Nagar)",
    "Amroha (J.P. Nagar)",
    "Auraiya",
    "Azamgarh",
    "Baghpat",
    "Bahraich",
    "Ballia",
    "Balrampur",
    "Banda",
    "Barabanki",
    "Bareilly",
    "Basti",
    "Bhadohi",
    "Bijnor",
    "Budaun",
    "Bulandshahr",
    "Chandauli",
    "Chitrakoot",
    "Deoria",
    "Etah",
    "Etawah",
    "Faizabad",
    "Farrukhabad",
    "Fatehpur",
    "Firozabad",
    "Gautam Buddha Nagar",
    "Ghaziabad",
    "Ghazipur",
    "Gonda",
    "Gorakhpur",
    "Hamirpur",
    "Hapur (Panchsheel Nagar)",
    "Hardoi",
    "Hathras",
    "Jalaun",
    "Jaunpur",
    "Jhansi",
    "Kannauj",
    "Kanpur Dehat",
    "Kanpur Nagar",
    "Kanshiram Nagar (Kasganj)",
    "Kaushambi",
    "Kushinagar (Padrauna)",
    "Lakhimpur - Kheri",
    "Lalitpur",
    "Lucknow",
    "Maharajganj",
    "Mahoba",
    "Mainpuri",
    "Mathura",
    "Mau",
    "Meerut",
    "Mirzapur",
    "Moradabad",
    "Muzaffarnagar",
    "Pilibhit",
    "Pratapgarh",
    "RaeBareli",
    "Rampur",
    "Saharanpur",
    "Sambhal (Bhim Nagar)",
    "Sant Kabir Nagar",
    "Shahjahanpur",
    "Shamali (Prabuddh Nagar)",
    "Shravasti",
    "Siddharth Nagar",
    "Sitapur",
    "Sonbhadra",
    "Sultanpur",
    "Unnao",
    "Varanasi"
  ],
  "West Bengal": [
    "Alipurduar",
    "Bankura",
    "Birbhum",
    "Burdwan (Bardhaman)",
    "Cooch Behar",
    "Dakshin Dinajpur (South Dinajpur)",
    "Darjeeling",
    "Hooghly",
    "Howrah",
    "Jalpaiguri",
    "Kalimpong",
    "Kolkata",
    "Malda",
    "Murshidabad",
    "Nadia",
    "North 24 Parganas",
    "Paschim Medinipur (West Medinipur)",
    "Purba Medinipur (East Medinipur)",
    "Purulia",
    "South 24 Parganas",
    "Uttar Dinajpur (North Dinajpur)"
  ],
  "Ladakh": [
    "Leh",
    "Kargil"
  ],
  "Andaman and Nicobar Islands": [
    "Nicobar",
    "North and Middle Andaman",
    "South Andaman"
  ]
};;

const BIHAR_DISTRICTS = STATE_DISTRICTS.Bihar;

// ══════════════════════════════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════════════════════════════

function generateMemberId(category: MemberCategory, seq: number) {
  const code = CATEGORY_CONFIG[category].code;
  const year = new Date().getFullYear();
  return `IWF-${code}-${year}-${String(seq).padStart(3, "0")}`;
}

function generateReceiptNo() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  return `IWF-MEM-${y}${m}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function addYears(dateStr: string, years: number) {
  const d = new Date(dateStr);
  d.setFullYear(d.getFullYear() + years);
  return d.toISOString().split("T")[0];
}

function formatDisplayDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
}

function formatCompactDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function isExpiredDate(dateStr: string) {
  return new Date(dateStr) < new Date();
}

function getMemberInitials(name: string) {
  return name.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase();
}

// ══════════════════════════════════════════════════════════════════
//  PDF GENERATORS (unchanged from original — these work correctly)
// ══════════════════════════════════════════════════════════════════

async function generateMembershipCard(data: {
  memberId: string; fullName: string; category: MemberCategory;
  joinDate: string; validTill: string; district: string; state: string;
}) {
  const { default: jsPDF } = await import("jspdf");
  const cfg = CATEGORY_CONFIG[data.category];
  const doc = new jsPDF({ unit: "mm", format: [86, 54], orientation: "landscape" });
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b] as const;
  };
  const [r, g, b] = hexToRgb(cfg.color);
  const [dr, dg, db] = hexToRgb(cfg.darkColor);
  doc.setFillColor(dr, dg, db);
  doc.rect(0, 0, 86, 54, "F");
  doc.setFillColor(r, g, b);
  doc.rect(0, 0, 86, 36, "F");
  doc.setFillColor(255, 255, 255);
  doc.setGState(doc.GState({ opacity: 0.07 }));
  doc.circle(72, -6, 20, "F");
  doc.circle(80, 48, 16, "F");
  doc.setGState(doc.GState({ opacity: 1 }));
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(5.5);
  doc.setFont("helvetica", "bold");
  doc.text("ISLAH WELFARE FOUNDATION", 5, 8);
  doc.setFillColor(255, 255, 255);
  doc.setGState(doc.GState({ opacity: 0.2 }));
  doc.roundedRect(5, 10, 28, 5.5, 1, 1, "F");
  doc.setGState(doc.GState({ opacity: 1 }));
  doc.setFontSize(6);
  doc.setFont("helvetica", "bold");
  doc.text(`✦ ${data.category.toUpperCase()} MEMBER`, 19, 13.8, { align: "center" });
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(data.fullName.toUpperCase().slice(0, 22), 5, 25);
  doc.setFontSize(5.5);
  doc.setFont("helvetica", "normal");
  doc.text(`${data.district}, ${data.state}`, 5, 31);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(5);
  doc.setFont("helvetica", "bold");
  doc.text("MEMBER ID", 5, 41);
  doc.setFontSize(7);
  doc.text(data.memberId, 5, 46);
  doc.setFontSize(5);
  doc.setFont("helvetica", "normal");
  doc.text("VALID TILL", 55, 41);
  doc.setFontSize(6.5);
  doc.setFont("helvetica", "bold");
  doc.text(formatDisplayDate(data.validTill).toUpperCase(), 55, 46);
  doc.setFillColor(255, 255, 255);
  doc.setGState(doc.GState({ opacity: 0.1 }));
  doc.rect(0, 51, 86, 3, "F");
  doc.setGState(doc.GState({ opacity: 1 }));
  doc.setFontSize(4.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 255, 255);
  doc.text("iwfindia.org  |  info@iwfindia.org  |  +91 9811861633", 43, 53, { align: "center" });
  const dataUri = doc.output("datauristring");
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = dataUri;
  link.download = `IWF-Member-Card-${data.memberId}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function generateMembershipReceipt(data: {
  memberId: string; fullName: string; fatherName: string; category: MemberCategory;
  amount: number; joinDate: string; validTill: string; paymentMode: string;
  transactionId: string; receiptNo: string;
}) {
  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const cfg = CATEGORY_CONFIG[data.category];
  const hexToRgb = (hex: string) =>
    [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)] as const;
  const [cr, cg, cb] = hexToRgb(cfg.color);
  const green = [21, 88, 47] as const;
  const orange = [234, 88, 12] as const;
  doc.setFillColor(...green);
  doc.rect(0, 0, 210, 45, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("ISLAH WELFARE FOUNDATION", 105, 16, { align: "center" });
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text('"Planting Seeds of Hope and Change"', 105, 22, { align: "center" });
  doc.text("Bathiya, Darbhanga, Bihar - 847423 | info@iwfindia.org | +91 9811861633", 105, 28, { align: "center" });
  doc.setFillColor(...orange);
  doc.rect(0, 45, 210, 10, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("MEMBERSHIP FEE RECEIPT", 105, 52, { align: "center" });
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Receipt No.: ${data.receiptNo}`, 15, 65);
  doc.text(`Date: ${formatDisplayDate(data.joinDate)}`, 150, 65);
  doc.line(15, 68, 195, 68);
  doc.setFillColor(cr, cg, cb, 0.06);
  doc.roundedRect(12, 72, 186, 65, 3, 3, "F");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(cr, cg, cb);
  doc.text("MEMBER INFORMATION", 20, 82);
  const memberRows: [string, string][] = [
    ["Full Name", data.fullName],
    ["Father / Mother Name", data.fatherName || "—"],
    ["Member ID", data.memberId],
    ["Membership Category", `${data.category} Member`],
    ["Date of Joining", formatDisplayDate(data.joinDate)],
    ["Valid Till", formatDisplayDate(data.validTill)],
    ["Membership Status", "Active"],
  ];
  doc.setFontSize(9);
  memberRows.forEach(([label, value], i) => {
    const y = 91 + i * 8.5;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text(`${label}:`, 20, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 30, 30);
    doc.text(value, 90, y);
  });
  const payY = 145;
  doc.setFillColor(...green);
  doc.roundedRect(12, payY, 186, 40, 3, 3, "F");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("PAYMENT DETAILS", 20, payY + 10);
  doc.setFontSize(9);
  const payRows: [string, string][] = [
    ["Annual Membership Fee", `INR ${data.amount.toLocaleString("en-IN")}`],
    ["Payment Mode", data.paymentMode],
    ["Transaction / Reference ID", data.transactionId || "Cash Payment"],
  ];
  payRows.forEach(([label, value], i) => {
    const y = payY + 19 + i * 8;
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, 20, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, 100, y);
  });
  const catY = 195;
  doc.setFillColor(cr, cg, cb);
  doc.roundedRect(12, catY, 186, 18, 3, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(`${data.category.toUpperCase()} MEMBERSHIP — Annual Fee: INR ${data.amount.toLocaleString("en-IN")}`, 105, catY + 11, { align: "center" });
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text("We confirm receipt of the annual membership fee. This membership is valid for one year from the date of joining.", 105, 225, { align: "center" });
  doc.text("Islah Welfare Foundation thanks you for your trust and support in our mission.", 105, 231, { align: "center" });
  doc.line(25, 255, 85, 255);
  doc.line(125, 255, 185, 255);
  doc.setFontSize(8);
  doc.text("Authorized Signatory", 55, 260, { align: "center" });
  doc.text("Member Signature", 155, 260, { align: "center" });
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...green);
  doc.text("Islah Welfare Foundation", 55, 265, { align: "center" });
  doc.setFillColor(...green);
  doc.rect(0, 285, 210, 12, "F");
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 255, 255);
  doc.text("Islah Welfare Foundation (Reg.) | Bathiya, Darbhanga, Bihar - 847423 | info@iwfindia.org | +91 9811861633", 105, 293, { align: "center" });
  const dataUri = doc.output("datauristring");
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = dataUri;
  link.download = `IWF-Membership-Receipt-${data.receiptNo}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ══════════════════════════════════════════════════════════════════
//  ZOD SCHEMA
// ══════════════════════════════════════════════════════════════════

const memberSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required"),
  fatherName: z.string().trim().optional(),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().trim().email("Enter a valid email address"),
  address: z.string().trim().min(5, "Address is required"),
  district: z.string().min(1, "Please select a district"),
  state: z.string().trim().min(2, "State is required"),
  pincode: z.string().trim().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  category: z.enum(["Blue", "Yellow", "Green"], { required_error: "Select a membership category" }),
  membershipPeriod: z.enum(["1", "2"]),
  paymentMode: z.enum(["UPI", "Card", "Net Banking", "Wallet"]),
  transactionId: z.string().trim().optional(),
  paymentDate: z.string().min(1, "Payment date is required"),
  consentDisplay: z.enum(["yes", "no"], { required_error: "Please select Yes or No" }),
  disclaimerAccepted: z.boolean().refine((v) => v === true, { message: "You must accept the declaration to proceed" }),
});

type MemberFormData = z.infer<typeof memberSchema>;

// ══════════════════════════════════════════════════════════════════
//  SHARED UI PRIMITIVES
// ══════════════════════════════════════════════════════════════════

const inputCls = "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1 mt-1.5 text-xs font-medium text-red-600">
      <AlertCircle className="w-3 h-3" /> {msg}
    </p>
  );
}

function InputLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

// ══════════════════════════════════════════════════════════════════
//  STEP INDICATOR
// ══════════════════════════════════════════════════════════════════

function StepIndicator({ step }: { step: number }) {
  const steps = ["Personal Details", "Membership Details", "Contribution Details", "Review & Submit"];
  return (
    <div className="flex items-center justify-center mb-8 overflow-x-auto pb-1">
      {steps.map((label, i) => {
        const s = i + 1;
        const isActive = s === step;
        const isDone = s < step;
        return (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-extrabold transition-all shrink-0 shadow-sm ${isDone ? "bg-brand-green text-white shadow-green-200" :
                isActive ? "bg-brand-orange text-white scale-110 shadow-lg shadow-orange-200" :
                  "bg-slate-100 text-slate-400"
                }`}>
                {isDone ? <Check className="w-4 h-4" /> : s}
              </div>
              <span className={`text-[10px] mt-1.5 font-semibold whitespace-nowrap hidden sm:block ${isActive ? "text-brand-orange" : isDone ? "text-brand-green" : "text-slate-400"
                }`}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 sm:w-16 h-0.5 mb-5 mx-1 transition-all duration-500 ${isDone ? "bg-brand-green" : "bg-slate-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  MEMBER CARD VISUAL (CSS-rendered in-browser preview)
// ══════════════════════════════════════════════════════════════════

function MemberCardVisual({ category, name, memberId, validTill, district, state, photo }: {
  category: MemberCategory; name: string; memberId: string;
  validTill: string; district: string; state: string; photo?: string | null;
}) {
  const cfg = CATEGORY_CONFIG[category];
  const initials = getMemberInitials(name);
  return (
    <div
      className="w-full max-w-[340px] h-[215px] rounded-2xl relative overflow-hidden shadow-2xl select-none"
      style={{ background: `linear-gradient(135deg, ${cfg.color} 0%, ${cfg.darkColor} 100%)` }}
    >
      <div className="absolute -top-14 -right-14 w-48 h-48 rounded-full bg-white/10" />
      <div className="absolute bottom-0 -left-10 w-40 h-40 rounded-full bg-white/5" />
      <div className="absolute top-3 right-3 w-16 h-16 rounded-full bg-white/5" />

      {/* Header row */}
      <div className="absolute inset-x-0 top-0 px-5 pt-3.5 flex items-start justify-between">
        <div>
          <p className="text-white font-extrabold text-[10px] tracking-widest">IWF</p>
          <p className="text-white/70 text-[7px] tracking-wider uppercase">Islah Welfare Foundation</p>
          <p className="text-white/50 text-[6.5px] mt-0.5">Non-Executive & Non-Voting Member</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2.5 py-1 border border-white/30">
          <p className="text-white text-[9px] font-extrabold tracking-wider">{category.toUpperCase()} MEMBER</p>
        </div>
      </div>

      {/* Photo area */}
      <div className="absolute left-5 top-12 w-[52px] h-[64px] rounded-xl bg-white/20 border-2 border-white/40 overflow-hidden flex items-center justify-center">
        {photo
          ? <img src={photo} alt="Member" className="w-full h-full object-cover" />
          : <span className="text-white font-extrabold text-lg">{initials}</span>
        }
      </div>

      {/* Member info */}
      <div className="absolute top-[52px] left-[76px]">
        <p className="text-white font-extrabold text-[15px] leading-tight tracking-wide">
          {name.toUpperCase().slice(0, 16)}
        </p>
        {name.length > 16 && (
          <p className="text-white font-extrabold text-[13px] leading-tight">{name.toUpperCase().slice(16, 28)}</p>
        )}
        <p className="text-white/65 text-[10px] mt-1">{district}, {state}</p>
      </div>

      {/* Bottom bar */}
      <div className="absolute inset-x-0 bottom-0 bg-black/30 backdrop-blur-sm px-5 py-2.5 flex items-end justify-between">
        <div>
          <p className="text-white/50 text-[7px] uppercase tracking-widest">Member ID</p>
          <p className="text-white font-mono font-bold text-[12px] tracking-wider">{memberId}</p>
        </div>
        <div className="text-right">
          <p className="text-white/50 text-[7px] uppercase tracking-widest">Valid Till</p>
          <p className="text-white font-bold text-[11px]">{validTill}</p>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  MEMBERS & DONORS HERO (tabbed dark header)
// ══════════════════════════════════════════════════════════════════

function MembersAndDonorsHero({ activeTab, setActiveTab }: { activeTab: PageTab; setActiveTab: (t: PageTab) => void }) {
  const tabs: PageTab[] = ["Members", "Donors", "Your Membership"];
  return (
    <section id="community-tabs" className="relative bg-[#0b1f3b] text-white pt-14 pb-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 right-8 w-96 h-96 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="absolute bottom-4 right-1/3 w-48 h-48 rounded-full bg-blue-400/8 blur-2xl" />
        {/* subtle dot pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-brand-orange/40" />
          <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">IWF Community</span>
          <div className="h-px w-12 bg-brand-orange/40" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">Our Members &amp; Donors</h1>
        <p className="text-white/65 text-sm max-w-xl mx-auto leading-relaxed mb-10">
          Our members and donors are the strength behind our mission. Their support helps us build stronger communities and create lasting social impact.
        </p>

        {/* Tab pills */}
        <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-full p-1.5 border border-white/15 shadow-xl">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 sm:px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${activeTab === tab
                ? "bg-white text-[#0b1f3b] shadow-lg"
                : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════
//  MEMBER AVATAR
// ══════════════════════════════════════════════════════════════════

function MemberAvatar({ name, category }: { name: string; category: MemberCategory }) {
  const cfg = CATEGORY_CONFIG[category];
  const initials = getMemberInitials(name);
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-md"
      style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.darkColor})` }}
    >
      {initials}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  MEMBERS TAB
// ══════════════════════════════════════════════════════════════════

function MembersTab({ onRenewClick }: { onRenewClick: () => void }) {
  const [categoryFilter, setCategoryFilter] = useState<MemberCategory | "All">("All");
  const [stateFilter, setStateFilter] = useState("All");
  const [districtFilter, setDistrictFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const filtered = useMemo(() => MOCK_MEMBERS.filter(m => {
    const matchCat = categoryFilter === "All" || m.category === categoryFilter;
    const matchState = stateFilter === "All" || m.state === stateFilter;
    const matchDist = districtFilter === "All" || m.district === districtFilter;
    const matchSearch = !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.id.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchState && matchDist && matchSearch;
  }), [categoryFilter, stateFilter, districtFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleReset = () => {
    setCategoryFilter("All");
    setStateFilter("All");
    setDistrictFilter("All");
    setSearch("");
    setCurrentPage(1);
  };

  const states = useMemo(() => ["All", ...Array.from(new Set(MOCK_MEMBERS.map(m => m.state))).sort()], []);

  const districts = useMemo(() => {
    const list = stateFilter === "All"
      ? MOCK_MEMBERS.map(m => m.district)
      : MOCK_MEMBERS.filter(m => m.state === stateFilter).map(m => m.district);
    return ["All", ...Array.from(new Set(list)).sort()];
  }, [stateFilter]);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-3">

      {/* ─ Info Banner */}
      <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-3 text-xs text-amber-800 font-semibold">
        <Info className="w-4 h-4 shrink-0 text-amber-500" />
        All Members are Non-Executive &amp; Non-Voting Members
      </div>

      {/* ─ Category Description Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-3">
        {(["Blue", "Yellow", "Green"] as MemberCategory[]).map(cat => {
          const cfg = CATEGORY_CONFIG[cat];
          const Icon = cfg.icon;
          return (
            <div
              key={cat}
              className="rounded-2xl border-2 p-5 relative overflow-hidden"
              style={{ borderColor: cfg.border, background: `linear-gradient(145deg, ${cfg.bg}, #ffffff)` }}
            >
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-20"
                style={{ backgroundColor: cfg.color }} />
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-md"
                  style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.darkColor})` }}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest mb-0.5" style={{ color: cfg.color }}>
                    {cat} Card Member
                  </p>
                  <p className="text-xs font-bold text-slate-700">
                    Annual Contribution: <span style={{ color: cfg.color }}>₹{cfg.amount.toLocaleString("en-IN")}</span>
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-2 relative z-10">
                {cfg.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-slate-600 leading-snug">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${cfg.color}20` }}>
                      <Check className="w-2.5 h-2.5" style={{ color: cfg.color }} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* ─ Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        {[
          { label: "Total Members", value: "127", Icon: Users, color: "#1D4ED8", bg: "#EFF6FF" },
          { label: "Blue Members", value: "48", Icon: Shield, color: "#1D4ED8", bg: "#DBEAFE" },
          { label: "Yellow Members", value: "42", Icon: Award, color: "#D97706", bg: "#FEF3C7" },
          { label: "Green Members", value: "37", Icon: Sparkles, color: "#15803D", bg: "#DCFCE7" },
        ].map(({ label, value, Icon, color, bg }) => (
          <div key={label} className="rounded-xl p-4 flex items-center gap-3 relative overflow-hidden"
            style={{ backgroundColor: bg }}>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full opacity-15"
              style={{ backgroundColor: color }} />
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${color}25` }}>
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <div>
              <p className="text-2xl font-extrabold leading-none" style={{ color }}>{value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ─ Renew button */}
      <div className="flex justify-end mb-3">
        <button onClick={onRenewClick}
          className="inline-flex items-center gap-2 border-2 border-amber-400 text-amber-600 font-bold px-5 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors shadow-sm">
          <RefreshCw className="w-3.5 h-3.5" /> Renew Membership
        </button>
      </div>

      {/* ─ Filter Bar */}
      <div className="bg-white border border-slate-100 rounded-2xl p-3 mb-3 flex flex-wrap gap-3 items-end shadow-sm">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Category</label>
          <select value={categoryFilter}
            onChange={e => { setCategoryFilter(e.target.value as MemberCategory | "All"); setCurrentPage(1); }}
            className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-brand-green">
            <option value="All">All Categories</option>
            {(["Blue", "Yellow", "Green"] as MemberCategory[]).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">State</label>
          <select value={stateFilter}
            onChange={e => {
              setStateFilter(e.target.value);
              setDistrictFilter("All");
              setCurrentPage(1);
            }}
            className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-brand-green">
            {states.map(s => (
              <option key={s} value={s}>{s === "All" ? "All States" : s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">District</label>
          <select value={districtFilter}
            onChange={e => { setDistrictFilter(e.target.value); setCurrentPage(1); }}
            className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-brand-green">
            {districts.map(d => (
              <option key={d} value={d}>{d === "All" ? "All Districts" : d}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-48">
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search by name or Member ID…"
              className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-brand-green" />
          </div>
        </div>
        <button onClick={handleReset}
          className="h-9 px-4 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:border-brand-green hover:text-brand-green transition flex items-center gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* ─ Table */}
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm mb-3">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "linear-gradient(90deg, #0b1f3b, #18325c)" }}>
                {["S. No.", "Photo", "Name", "Member ID", "Category", "District", "Valid Till"].map(h => (
                  <th key={h} className="px-4 py-3.5 text-left text-xs font-bold text-white/90 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400 text-sm">
                    <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
                    No members found matching your filters.
                  </td>
                </tr>
              ) : paginated.map((member, i) => {
                const cfg = CATEGORY_CONFIG[member.category];
                const expired = isExpiredDate(member.validTill);
                return (
                  <tr key={member.id}
                    className={`border-b border-slate-50 hover:bg-slate-50/70 transition ${i % 2 === 1 ? "bg-slate-50/40" : ""}`}>
                    <td className="px-4 py-3 text-slate-400 text-xs font-semibold">
                      {(currentPage - 1) * ITEMS_PER_PAGE + i + 1}
                    </td>
                    <td className="px-4 py-3">
                      <MemberAvatar name={member.name} category={member.category} />
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{member.name}</td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs font-bold" style={{ color: cfg.color }}>{member.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${cfg.badge}`}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                        {member.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">{member.district}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${expired ? "text-red-600" : "text-green-700"}`}>
                        <Calendar className="w-3.5 h-3.5" />
                        {formatCompactDate(member.validTill)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3.5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 bg-slate-50/50">
          <p className="text-xs text-slate-500">
            Showing {filtered.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} entries
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:border-brand-green hover:text-brand-green disabled:opacity-30 transition bg-white">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setCurrentPage(p)}
                className={`w-8 h-8 rounded-lg border text-xs font-bold transition ${currentPage === p
                  ? "bg-brand-green border-brand-green text-white shadow-sm"
                  : "border-slate-200 text-slate-600 hover:border-brand-green bg-white"
                  }`}>
                {p}
              </button>
            ))}
            {totalPages > 5 && <span className="text-slate-400 text-xs">…</span>}
            {totalPages > 5 && (
              <button onClick={() => setCurrentPage(totalPages)}
                className="w-8 h-8 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:border-brand-green bg-white transition">
                {totalPages}
              </button>
            )}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:border-brand-green hover:text-brand-green disabled:opacity-30 transition bg-white">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  DONOR COMPONENTS
// ══════════════════════════════════════════════════════════════════

function DonorAvatar({ name, tier, size = "md" }: { name: string; tier: DonorTier; size?: "sm" | "md" | "lg" }) {
  const cfg = DONOR_TIER_CONFIG[tier];
  const initials = getMemberInitials(name);
  const sizeMap = { sm: "w-10 h-10 text-xs", md: "w-14 h-14 text-sm", lg: "w-20 h-20 text-lg" };
  return (
    <div className={`${sizeMap[size]} rounded-full flex items-center justify-center font-bold text-white border-2 shadow-md`}
      style={{ background: `linear-gradient(135deg, ${cfg.gradientFrom}, ${cfg.gradientTo})`, borderColor: cfg.color }}>
      {initials}
    </div>
  );
}

function DonorTierBadge({ tier }: { tier: DonorTier }) {
  const cfg = DONOR_TIER_CONFIG[tier];
  const Icon = cfg.icon;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold border uppercase tracking-wider"
      style={{ color: cfg.color, backgroundColor: cfg.bg, borderColor: cfg.border }}>
      <Icon className="w-2.5 h-2.5" /> {cfg.label} Donor
    </span>
  );
}

function FeaturedDonorCard({ donor, rank }: { donor: MockDonor; rank: 1 | 2 | 3 }) {
  const cfg = DONOR_TIER_CONFIG[donor.tier];
  const rankMeta = {
    1: { emoji: "🥇", borderColor: "#F59E0B", shadow: "shadow-amber-200/60", bg: "from-amber-50 via-yellow-50 to-white" },
    2: { emoji: "🥈", borderColor: "#94A3B8", shadow: "shadow-slate-200/60", bg: "from-slate-100 via-slate-50 to-white" },
    3: { emoji: "🥉", borderColor: "#F97316", shadow: "shadow-orange-200/60", bg: "from-orange-50 via-amber-50 to-white" },
  }[rank];

  return (
    <motion.div whileHover={{ y: -5, scale: 1.01 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`bg-gradient-to-br ${rankMeta.bg} rounded-2xl border-2 p-6 text-center relative overflow-hidden shadow-lg ${rankMeta.shadow}`}
      style={{ borderColor: rankMeta.borderColor }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"
          style={{ backgroundColor: rankMeta.borderColor }} />
      </div>
      <span className="absolute top-3 left-4 text-2xl leading-none">{rankMeta.emoji}</span>
      <div className="absolute top-3 right-3">
        <DonorTierBadge tier={donor.tier} />
      </div>
      <div className="flex justify-center mt-8 mb-3">
        <DonorAvatar name={donor.name} tier={donor.tier} size="lg" />
      </div>
      <h3 className="font-extrabold text-slate-800 text-base mb-1">{donor.name}</h3>
      <p className="text-2xl font-extrabold mb-2" style={{ color: cfg.color }}>
        ₹{donor.amount.toLocaleString("en-IN")}
      </p>
      <div className="flex items-center justify-center gap-1 text-xs text-slate-500 mb-2">
        <MapPin className="w-3 h-3" /> {donor.location}
      </div>
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
        style={{ backgroundColor: `${cfg.color}15`, color: cfg.color }}>
        <Heart className="w-3 h-3" /> {donor.cause}
      </span>
    </motion.div>
  );
}

function DonorCard({ donor }: { donor: MockDonor }) {
  const cfg = DONOR_TIER_CONFIG[donor.tier];
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white border border-slate-100 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-center mb-3">
        <DonorAvatar name={donor.name} tier={donor.tier} />
      </div>
      <div className="flex justify-center mb-2">
        <DonorTierBadge tier={donor.tier} />
      </div>
      <p className="font-bold text-slate-800 text-sm leading-tight mb-1">{donor.name}</p>
      <p className="text-lg font-extrabold mb-1.5" style={{ color: cfg.color }}>
        ₹{donor.amount.toLocaleString("en-IN")}
      </p>
      <div className="flex items-center justify-center gap-1 text-xs text-slate-500 mb-1">
        <MapPin className="w-3 h-3" /> {donor.location}
      </div>
      <p className="text-xs font-semibold" style={{ color: cfg.color }}>
        ♥ {donor.cause}
      </p>
    </motion.div>
  );
}

function DonorTierSection({ tier, donors }: { tier: DonorTier; donors: MockDonor[] }) {
  const cfg = DONOR_TIER_CONFIG[tier];
  const Icon = cfg.icon;
  const [expanded, setExpanded] = useState(false);
  const displayDonors = expanded ? donors : donors.slice(0, 5);
  const tierRangeLabel = { Platinum: "₹50,000 & Above", Gold: "₹20,000 – ₹49,999", Silver: "₹5,000 – ₹19,999" }[tier];

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
            style={{ background: `linear-gradient(135deg, ${cfg.gradientFrom}, ${cfg.gradientTo})` }}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-slate-800">{tier} Donors</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full border"
                style={{ color: cfg.color, backgroundColor: cfg.bg, borderColor: cfg.border }}>
                {tierRangeLabel}
              </span>
            </div>
            <p className="text-xs text-slate-500">{donors.length} donors</p>
          </div>
        </div>
        {donors.length > 5 && (
          <button onClick={() => setExpanded(!expanded)}
            className="text-xs font-bold flex items-center gap-1 hover:underline transition"
            style={{ color: cfg.color }}>
            {expanded ? "← Show Less" : `View All →`}
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {displayDonors.map(donor => (
          <DonorCard key={donor.id} donor={donor} />
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  DONORS TAB
// ══════════════════════════════════════════════════════════════════

function DonorsTab({ isTopDonors = false }: { isTopDonors?: boolean }) {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<DonorTier | "All">("All");
  const [locationFilter, setLocationFilter] = useState("All");

  const sortedDonors = useMemo(() =>
    [...MOCK_DONORS].sort((a, b) => b.amount - a.amount),
    []);

  const filteredDonors = useMemo(() => sortedDonors.filter(d => {
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase());
    const matchTier = tierFilter === "All" || d.tier === tierFilter;
    const matchLoc = locationFilter === "All" || d.location.includes(locationFilter);
    return matchSearch && matchTier && matchLoc;
  }), [search, tierFilter, locationFilter, sortedDonors]);

  const featuredTop3 = sortedDonors.slice(0, 3);
  const platinum = filteredDonors.filter(d => d.tier === "Platinum");
  const gold = filteredDonors.filter(d => d.tier === "Gold");
  const silver = filteredDonors.filter(d => d.tier === "Silver");

  const uniqueStates = ["All", ...Array.from(new Set(MOCK_DONORS.map(d => {
    const parts = d.location.split(",");
    return parts[parts.length - 1].trim();
  }))).sort()];

  return (
    <div className="max-w-6xl mx-auto px-4 pt-3">

      {/* ─ Sub-hero */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-3 p-4 rounded-2xl relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0b1f3b 0%, #18325c 60%, #0a1b33 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-brand-orange/10 blur-2xl" />
          <div className="absolute bottom-0 left-1/4 w-32 h-32 rounded-full bg-green-400/10 blur-xl" />
        </div>
        <div className="relative z-10">
          <p className="text-brand-orange text-[10px] font-bold uppercase tracking-widest mb-1.5">Our Pillars of Strength</p>
          <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-1.5">
            {isTopDonors ? "Top Donors Leaderboard" : "Donors"}
          </h2>
          <p className="text-white/65 text-sm max-w-md leading-relaxed">
            Our donors empower us to transform lives and build stronger communities. We sincerely appreciate their generous support and trust in our mission.
          </p>
          <p className="text-white/40 text-xs mt-1.5 flex items-center gap-1">
            <Heart className="w-3 h-3 text-red-400" /> Thank you for being a part of our journey.
          </p>
        </div>
        <div className="relative z-10 shrink-0">
          <a href="/donate"
            className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold px-7 py-3 rounded-xl shadow-lg transition hover:scale-[1.02]">
            <Heart className="w-4 h-4" /> Donate Now
          </a>
        </div>
      </div>

      {/* ─ Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        {[
          { label: "Total Donors", value: "120+", sub: "Individuals & Organizations", color: "#1D4ED8", bg: "#EFF6FF", Icon: Users },
          { label: "Total Donations", value: "₹12,50,000+", sub: "Received So Far", color: "#15803D", bg: "#F0FDF4", Icon: IndianRupee },
          { label: "Projects Supported", value: "08", sub: "Across Different Sectors", color: "#D97706", bg: "#FFFBEB", Icon: Trophy },
          { label: "Lives Impacted", value: "15,000+", sub: "And Counting", color: "#7C3AED", bg: "#F5F3FF", Icon: Heart },
        ].map(({ label, value, sub, color, bg, Icon }) => (
          <div key={label} className="rounded-2xl p-5 relative overflow-hidden shadow-sm" style={{ backgroundColor: bg }}>
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-15" style={{ backgroundColor: color }} />
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ backgroundColor: `${color}20` }}>
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <p className="text-xl font-extrabold" style={{ color }}>{value}</p>
            <p className="text-xs font-bold text-slate-700 mt-0.5">{label}</p>
            <p className="text-[10px] text-slate-500">{sub}</p>
          </div>
        ))}
      </div>

      {/* ─ Filters */}
      <div className="bg-white border border-slate-100 rounded-2xl p-3 mb-3 flex flex-wrap gap-3 items-end shadow-sm">
        <div className="flex-1 min-w-44">
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search donor name…"
              className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-brand-green" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Category</label>
          <select value={tierFilter} onChange={e => setTierFilter(e.target.value as DonorTier | "All")}
            className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-brand-green">
            <option value="All">All Categories</option>
            {(["Platinum", "Gold", "Silver"] as DonorTier[]).map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Location</label>
          <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)}
            className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-brand-green">
            {uniqueStates.map(s => (
              <option key={s} value={s}>{s === "All" ? "All Locations" : s}</option>
            ))}
          </select>
        </div>
        <button onClick={() => { setSearch(""); setTierFilter("All"); setLocationFilter("All"); }}
          className="h-9 px-4 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:border-brand-green hover:text-brand-green transition flex items-center gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" /> Clear Filters
        </button>
      </div>

      {/* ─ Featured Top 3 */}
      {!search && tierFilter === "All" && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-slate-800 text-lg">Featured Donors (Top 3)</h3>
            <span className="text-xs text-slate-500 hidden sm:block">— Our most generous and impactful supporters</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {featuredTop3.map((donor, i) => (
              <FeaturedDonorCard key={donor.id} donor={donor} rank={(i + 1) as 1 | 2 | 3} />
            ))}
          </div>
        </div>
      )}

      {/* ─ Tiered sections */}
      {(tierFilter === "All" || tierFilter === "Platinum") && platinum.length > 0 && (
        <DonorTierSection tier="Platinum" donors={platinum} />
      )}
      {(tierFilter === "All" || tierFilter === "Gold") && gold.length > 0 && (
        <DonorTierSection tier="Gold" donors={gold} />
      )}
      {(tierFilter === "All" || tierFilter === "Silver") && silver.length > 0 && (
        <DonorTierSection tier="Silver" donors={silver} />
      )}

      {filteredDonors.length === 0 && (
        <div className="py-16 text-center text-slate-400">
          <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-semibold text-slate-500">No donors found matching your search.</p>
        </div>
      )}

      {/* ─ Footer note */}
      <div className="mt-8 p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Info className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Donor details are displayed with consent for transparency and recognition purposes.</span>
        </div>
        <p className="text-xs text-slate-500 sm:ml-auto font-semibold italic">Thank you for changing lives with us. 🤍</p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  BECOME A MEMBER / DONOR CTA
// ══════════════════════════════════════════════════════════════════

function BecomeMemberCTA({ onApplyNow }: { onApplyNow: (cat: MemberCategory) => void }) {
  return (
    <section className="py-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* background blurs removed */}
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-5">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-10 bg-brand-orange/40" />
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">Join Us</span>
            <div className="h-px w-10 bg-brand-orange/40" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">Become a Member / Donor</h2>
          <p className="text-slate-500 text-sm">Join hands with us and make a difference in the lives of many.</p>
        </div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-5">
          {(["Blue", "Yellow", "Green"] as MemberCategory[]).map(cat => {
            const cfg = CATEGORY_CONFIG[cat];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={cat}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="bg-white rounded-2xl border-2 shadow-lg hover:shadow-xl transition-shadow p-4 text-center flex flex-col items-center"
                style={{ borderColor: cfg.border }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-2 shadow-md"
                  style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.darkColor})` }}>
                  <Icon className="w-5.5 h-5.5 text-white" />
                </div>
                <h3 className="font-extrabold text-slate-800 text-sm mb-0.5">{cat} Card Member</h3>
                <p className="text-xl font-extrabold mb-0.5" style={{ color: cfg.color }}>
                  ₹{cfg.amount.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-slate-500 mb-3.5">/ Year</p>
                <button
                  onClick={() => onApplyNow(cat)}
                  className="w-full py-2 rounded-lg font-bold text-white text-sm shadow-md hover:scale-[1.01] transition-all"
                  style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.darkColor})` }}>
                  Apply Now
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Quote strip */}
        <div className="relative bg-white rounded-2xl border border-slate-100 shadow-sm py-4 px-5 overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-1.5 rounded-l-2xl"
            style={{ background: "linear-gradient(180deg, #1D4ED8, #D97706, #15803D)" }} />
          <div className="pl-3 flex flex-col md:flex-row items-start md:items-center gap-3">
            <div className="flex-1">
              <span className="text-4xl text-slate-200 font-serif leading-none">"</span>
              <p className="text-slate-700 font-medium text-xs md:text-sm -mt-2 leading-relaxed italic">
                Your contribution is more than support—it is a step towards building stronger communities and creating lasting social impact.
              </p>
            </div>
            <div className="shrink-0 text-brand-green/70">
              <Sparkles className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════
//  FORM — STEP 1: PERSONAL DETAILS
// ══════════════════════════════════════════════════════════════════

function Step1PersonalDetails({
  form, onNext,
}: { form: ReturnType<typeof useForm<MemberFormData, any, MemberFormData>>; onNext: () => void }) {
  const { register, formState: { errors }, trigger, watch, setValue } = form;

  const selectedState = watch("state") || "Bihar";
  const districtsList = STATE_DISTRICTS[selectedState] || [];
  const hasPredefinedDistricts = districtsList.length > 0;

  const previousState = useRef(selectedState);
  useEffect(() => {
    if (selectedState !== previousState.current) {
      setValue("district", "");
      previousState.current = selectedState;
    }
  }, [selectedState, setValue]);

  const handleNext = async () => {
    const ok = await trigger(["fullName", "mobile", "email", "address", "district", "state", "pincode"]);
    if (ok) onNext();
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 rounded-lg bg-brand-green/10 flex items-center justify-center">
          <User className="w-4 h-4 text-brand-green" />
        </div>
        <h3 className="text-base font-extrabold text-slate-800">Personal Details</h3>
      </div>
      <div className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <InputLabel required>Full Name</InputLabel>
            <input {...register("fullName")} placeholder="Enter your full name" className={inputCls} />
            <FieldError msg={errors.fullName?.message} />
          </div>
          <div>
            <InputLabel>Father / Mother Name</InputLabel>
            <input {...register("fatherName")} placeholder="Enter father / mother name" className={inputCls} />
          </div>
          <div>
            <InputLabel required>Mobile Number</InputLabel>
            <input {...register("mobile")} type="tel" placeholder="10-digit mobile number" className={inputCls} />
            <FieldError msg={errors.mobile?.message} />
          </div>
        </div>
        <div>
          <InputLabel required>Email Address</InputLabel>
          <input {...register("email")} type="email" placeholder="Enter email address" className={inputCls} />
          <FieldError msg={errors.email?.message} />
        </div>
        <div>
          <InputLabel required>Complete Address</InputLabel>
          <textarea {...register("address")} placeholder="House no., Street, Village/Town…" rows={2}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 placeholder:text-slate-400 resize-none" />
          <FieldError msg={errors.address?.message} />
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <InputLabel required>State</InputLabel>
            <select {...register("state")} className={inputCls}>
              {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <FieldError msg={errors.state?.message} />
          </div>
          <div>
            <InputLabel required>District</InputLabel>
            {hasPredefinedDistricts ? (
              <select {...register("district")} defaultValue="" className={inputCls}>
                <option value="" disabled>Select district</option>
                {districtsList.map(d => <option key={d} value={d}>{d}</option>)}
                <option value="Other">Other District</option>
              </select>
            ) : (
              <input {...register("district")} placeholder="Enter district" className={inputCls} />
            )}
            <FieldError msg={errors.district?.message} />
          </div>
          <div>
            <InputLabel required>Pincode</InputLabel>
            <input {...register("pincode")} placeholder="6-digit pincode" maxLength={6} className={inputCls} />
            <FieldError msg={errors.pincode?.message} />
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button type="button" onClick={handleNext}
          className="inline-flex items-center gap-2 bg-brand-green text-white font-bold px-8 py-3 rounded-xl shadow-md hover:bg-brand-green-dark transition hover:scale-[1.02]">
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  FORM — STEP 2: MEMBERSHIP DETAILS
// ══════════════════════════════════════════════════════════════════

function Step2MembershipDetails({
  form, onNext, onBack,
}: { form: ReturnType<typeof useForm<MemberFormData, any, MemberFormData>>; onNext: () => void; onBack: () => void }) {
  const { watch, setValue, formState: { errors }, trigger } = form;
  const category = watch("category");
  const period = watch("membershipPeriod") || "1";

  const handleNext = async () => {
    const ok = await trigger(["category", "membershipPeriod"]);
    if (ok) onNext();
  };

  const getAmount = (cat: MemberCategory | undefined, p: string) => {
    if (!cat) return 0;
    return CATEGORY_CONFIG[cat].amount * Number(p);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 rounded-lg bg-brand-orange/10 flex items-center justify-center">
          <BadgeCheck className="w-4 h-4 text-brand-orange" />
        </div>
        <h3 className="text-base font-extrabold text-slate-800">Membership Details</h3>
      </div>

      {/* Category cards */}
      <div className="space-y-3 mb-6">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Select Membership Category</p>
        {(["Blue", "Yellow", "Green"] as MemberCategory[]).map(cat => {
          const cfg = CATEGORY_CONFIG[cat];
          const Icon = cfg.icon;
          const isSelected = category === cat;
          return (
            <button key={cat} type="button"
              onClick={() => setValue("category", cat, { shouldValidate: true })}
              className="w-full text-left rounded-xl border-2 p-4 transition-all"
              style={{ borderColor: isSelected ? cfg.color : "#E2E8F0", backgroundColor: isSelected ? cfg.bg : "white" }}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                    style={{ background: isSelected ? `linear-gradient(135deg, ${cfg.color}, ${cfg.darkColor})` : "#F1F5F9" }}>
                    <Icon className="w-5 h-5" style={{ color: isSelected ? "white" : "#94A3B8" }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-800 text-sm">{cat} Card Member</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold border"
                        style={{ color: cfg.color, backgroundColor: cfg.bg, borderColor: cfg.border }}>
                        ₹{cfg.amount.toLocaleString("en-IN")}/year
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{cfg.features[0]}</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all`}
                  style={{ borderColor: isSelected ? cfg.color : "#CBD5E1", backgroundColor: isSelected ? cfg.color : "transparent" }}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <FieldError msg={errors.category?.message} />

      {/* Period selection */}
      <div className="mt-6">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Period of Fee</p>
        <div className="grid grid-cols-2 gap-3">
          {(["1", "2"] as const).map(p => {
            const isSelected = period === p;
            const amt = category ? CATEGORY_CONFIG[category].amount * Number(p) : 0;
            return (
              <button key={p} type="button"
                onClick={() => setValue("membershipPeriod", p, { shouldValidate: true })}
                className={`p-4 rounded-xl border-2 transition-all text-left ${isSelected ? "border-brand-green bg-brand-green/5" : "border-slate-200 bg-white hover:border-slate-300"
                  }`}>
                <p className={`font-extrabold text-base ${isSelected ? "text-brand-green" : "text-slate-700"}`}>
                  {p} Year{p === "2" ? "s" : ""}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {amt > 0 ? `₹${amt.toLocaleString("en-IN")} total` : "Select category first"}
                </p>
                {isSelected && <Check className="w-3.5 h-3.5 text-brand-green mt-1" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary pill */}
      {category && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="mt-5 p-4 rounded-xl flex items-center gap-3"
          style={{ backgroundColor: CATEGORY_CONFIG[category].bg, border: `1px solid ${CATEGORY_CONFIG[category].border}` }}>
          <BadgeCheck className="w-5 h-5 shrink-0" style={{ color: CATEGORY_CONFIG[category].color }} />
          <div>
            <p className="text-sm font-bold" style={{ color: CATEGORY_CONFIG[category].color }}>
              {category} Membership · {period} Year{period === "2" ? "s" : ""} — ₹{getAmount(category, period).toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-slate-500">Valid for {period} year{period === "2" ? "s" : ""} from date of joining</p>
          </div>
        </motion.div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button type="button" onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button type="button" onClick={handleNext}
          className="inline-flex items-center gap-2 bg-brand-green text-white font-bold px-8 py-3 rounded-xl shadow-md hover:bg-brand-green-dark transition hover:scale-[1.02]">
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  FORM — STEP 3: CONTRIBUTION DETAILS
// ══════════════════════════════════════════════════════════════════

function Step3ContributionDetails({
  form, onNext, onBack, joinDate, validTill,
  photoPreview, setPhotoPreview,
}: {
  form: ReturnType<typeof useForm<MemberFormData, any, MemberFormData>>;
  onNext: () => void; onBack: () => void;
  joinDate: string; validTill: string;
  photoPreview: string | null; setPhotoPreview: (v: string | null) => void;
}) {
  const { register, watch, setValue, formState: { errors }, trigger } = form;
  const [showTerms, setShowTerms] = useState(false);
  const category = watch("category");
  const period = watch("membershipPeriod") || "1";
  const consentDisplay = watch("consentDisplay");
  const disclaimerAccepted = watch("disclaimerAccepted");
  const cfg = category ? CATEGORY_CONFIG[category] : null;
  const amount = cfg ? cfg.amount * Number(period) : 0;

  const handleNext = async () => {
    const ok = await trigger(["paymentDate", "consentDisplay", "disclaimerAccepted"]);
    if (ok) onNext();
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
          <IndianRupee className="w-4 h-4 text-blue-600" />
        </div>
        <h3 className="text-base font-extrabold text-slate-800">Contribution Details</h3>
      </div>
      <div className="space-y-5">
        {/* Fee summary row */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <InputLabel>Annual Contribution</InputLabel>
            <div className={`${inputCls} flex items-center font-bold text-slate-800 bg-slate-50 cursor-not-allowed`}>
              {amount > 0 ? `₹${amount.toLocaleString("en-IN")}` : "—"}
            </div>
          </div>
          <div>
            <InputLabel required>Payment Date</InputLabel>
            <input {...register("paymentDate")} type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              max={new Date().toISOString().split("T")[0]}
              className={inputCls} />
            <FieldError msg={errors.paymentDate?.message} />
          </div>
          <div>
            <InputLabel>Date of Joining</InputLabel>
            <div className={`${inputCls} bg-slate-50 flex items-center text-slate-600 cursor-not-allowed`}>
              {formatCompactDate(joinDate)}
            </div>
          </div>
        </div>
        <div>
          <InputLabel>Valid Till (Auto-calculated)</InputLabel>
          <div className={`${inputCls} bg-slate-50 flex items-center text-slate-600 font-semibold cursor-not-allowed`}>
            <Calendar className="w-4 h-4 mr-2 text-brand-green" />
            {formatDisplayDate(validTill)}
          </div>
        </div>

        {/* Upload Documents */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <InputLabel>Upload Photo</InputLabel>
            <label className="block cursor-pointer">
              <div className={`${inputCls} flex items-center gap-2 cursor-pointer hover:border-brand-green hover:text-brand-green transition`}>
                {photoPreview
                  ? <><img src={photoPreview} alt="Preview" className="w-6 h-6 rounded-full object-cover" /><span className="text-xs text-brand-green font-semibold">Photo selected ✓</span></>
                  : <><Upload className="w-4 h-4 text-slate-400" /><span className="text-slate-400">Click to upload photo</span></>
                }
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
            </label>
            <p className="text-[10px] text-slate-400 mt-1">JPG, PNG, WEBP · Max 2MB · Passport size</p>
          </div>
          <div>
            <InputLabel>Upload ID Proof <span className="text-slate-400 font-normal">(Optional)</span></InputLabel>
            <label className="block cursor-pointer">
              <div className={`${inputCls} flex items-center gap-2 cursor-pointer hover:border-brand-green hover:text-brand-green transition`}>
                <Upload className="w-4 h-4 text-slate-400" /><span className="text-slate-400">Click to upload ID proof</span>
              </div>
              <input type="file" accept="image/*,.pdf" className="hidden" />
            </label>
            <p className="text-[10px] text-slate-400 mt-1">JPG, PNG, PDF · Max 5MB</p>
          </div>
        </div>

        {/* Consent for display */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-xs font-bold text-slate-700 mb-3">
            Consent for Display on Website{" "}
            <span className="text-slate-400 font-normal">(Optional but Recommended)</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            {(["yes", "no"] as const).map(val => (
              <button key={val} type="button"
                onClick={() => setValue("consentDisplay", val, { shouldValidate: true })}
                className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${consentDisplay === val
                  ? val === "yes" ? "border-brand-green bg-brand-green text-white" : "border-slate-500 bg-slate-700 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}>
                {val === "yes" ? "Yes" : "No"}
              </button>
            ))}
          </div>
          <FieldError msg={errors.consentDisplay?.message} />
        </div>

        {/* Declaration */}
        <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
          <p className="text-xs font-bold text-brand-green-dark mb-3 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> Declaration
          </p>
          <div className="flex items-start gap-2.5">
            <input id="disclaimer-cb" type="checkbox" checked={!!disclaimerAccepted}
              onChange={e => setValue("disclaimerAccepted", e.target.checked, { shouldValidate: true })}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-green focus:ring-brand-green cursor-pointer" />
            <label htmlFor="disclaimer-cb" className="text-xs text-slate-700 leading-relaxed cursor-pointer select-none">
              I hereby declare that the information provided above is true and correct. I have read and agree to the{" "}
              <button type="button" onClick={(e) => { e.preventDefault(); setShowTerms(true); }} className="font-semibold text-brand-green hover:underline">Membership Terms &amp; Conditions</button> of Islah Welfare Foundation (IWF). I understand that the membership fee is valid and non-refundable after 14 days.{" "}
              <span className="text-red-500">*</span>
            </label>
          </div>
          <FieldError msg={errors.disclaimerAccepted?.message} />
        </div>

        {/* Terms Modal */}
        <MembershipPolicyModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button type="button" onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button type="button" onClick={handleNext}
          className="inline-flex items-center gap-2 bg-brand-green text-white font-bold px-8 py-3 rounded-xl shadow-md hover:bg-brand-green-dark transition hover:scale-[1.02]">
          Proceed to Review <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  FORM — STEP 4: REVIEW & PAYMENT
// ══════════════════════════════════════════════════════════════════

function Step4ReviewPayment({
  form, memberId, joinDate, validTill, onBack, onSubmit,
}: {
  form: ReturnType<typeof useForm<MemberFormData, any, MemberFormData>>;
  memberId: string; joinDate: string; validTill: string;
  onBack: () => void; onSubmit: () => void;
}) {
  const { watch, setValue, register, formState: { errors } } = form;
  const data = form.getValues();
  const category = watch("category");
  const paymentMode = watch("paymentMode");
  const period = watch("membershipPeriod") || "1";
  const cfg = CATEGORY_CONFIG[category];
  const baseAmount = cfg.amount * Number(period);
  const convenienceFee = 50;
  const totalAmount = baseAmount + convenienceFee;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("islah-foundation@upi");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reviewRows: [string, string][] = [
    ["Full Name", data.fullName || "—"],
    ["Father / Mother", data.fatherName || "—"],
    ["Mobile", data.mobile || "—"],
    ["Email", data.email || "—"],
    ["Address", data.address || "—"],
    ["District, State", `${data.district || "—"}, ${data.state || "—"}`],
    ["Member ID (Auto)", memberId],
    ["Category", `${category} Membership`],
    ["Period", `${period} Year${period === "2" ? "s" : ""}`],
    ["Date of Joining", formatDisplayDate(joinDate)],
    ["Valid Till", formatDisplayDate(validTill)],
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
      {/* Category banner */}
      <div className="rounded-2xl p-5 mb-6 flex items-center justify-between relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${cfg.color} 0%, ${cfg.darkColor} 100%)` }}>
        <div className="absolute right-0 top-0 w-24 h-24 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
        <div>
          <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">{category} Membership</p>
          <p className="text-white text-2xl font-extrabold">₹{baseAmount.toLocaleString("en-IN")}</p>
          <p className="text-white/60 text-[11px] mt-0.5 font-mono">{memberId}</p>
        </div>
        <cfg.icon className="w-12 h-12 text-white/20" />
      </div>

      {/* Review table */}
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden mb-5 shadow-sm">
        <div className="bg-slate-50/80 px-4 py-2.5 border-b border-slate-100">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Application Summary</p>
        </div>
        {reviewRows.map(([label, value], i) => (
          <div key={label} className={`flex items-start gap-3 px-4 py-2.5 ${i % 2 === 1 ? "bg-slate-50/40" : ""}`}>
            <span className="text-xs font-semibold text-slate-500 shrink-0 w-32">{label}</span>
            <span className="text-xs text-slate-800 font-medium break-all">{value}</span>
          </div>
        ))}
      </div>

      {/* Payment Details */}
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm mb-5">
        <div className="bg-slate-50/80 px-4 py-2.5 border-b border-slate-100">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Payment Details</p>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Membership Fee</span>
            <span className="font-bold text-slate-800">₹{baseAmount.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Convenience Fee (Online Payment)</span>
            <span className="font-bold text-slate-800">₹{convenienceFee}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-base font-extrabold">
            <span className="text-brand-green-dark">Total Amount</span>
            <span className="text-brand-green-dark">₹{totalAmount.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Payment Method</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {([
            { mode: "UPI" as const, Icon: Smartphone, label: "UPI / QR Code", sub: "Pay using any UPI app" },
            { mode: "Card" as const, Icon: CreditCard, label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay" },
            { mode: "Net Banking" as const, Icon: Building2, label: "Net Banking", sub: "All major banks" },
            { mode: "Wallet" as const, Icon: Wallet, label: "Wallet", sub: "PhonePe, Paytm etc." },
          ]).map(({ mode, Icon, label, sub }) => (
            <button key={mode} type="button"
              onClick={() => setValue("paymentMode", mode)}
              className={`flex flex-col items-center gap-1.5 py-3.5 rounded-xl border-2 transition-all text-center ${paymentMode === mode ? "border-brand-green bg-brand-green/5" : "border-slate-200 hover:border-slate-300 bg-white"
                }`}>
              <Icon className={`w-5 h-5 ${paymentMode === mode ? "text-brand-green" : "text-slate-400"}`} />
              <span className={`text-[10px] font-bold leading-tight ${paymentMode === mode ? "text-brand-green" : "text-slate-700"}`}>{label}</span>
              <span className="text-[9px] text-slate-400 leading-tight">{sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* UPI QR */}
      {paymentMode === "UPI" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-gradient-to-br from-brand-green/5 to-emerald-50 border border-brand-green/20 rounded-xl mb-5">
          <p className="text-xs font-bold text-brand-green-dark mb-3 flex items-center gap-1.5">
            <QrCode className="w-4 h-4" /> Scan &amp; Pay Using Any UPI App
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-28 h-28 rounded-xl bg-white border-2 border-brand-green/20 flex items-center justify-center shadow-sm">
              <QrCode className="w-16 h-16 text-brand-green/40" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-xs text-slate-500 mb-1">UPI ID</p>
                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2">
                  <span className="font-mono font-bold text-slate-800 text-sm flex-1">islah-foundation@upi</span>
                  <button type="button" onClick={handleCopy}
                    className={`transition text-xs font-bold flex items-center gap-1 ${copied ? "text-brand-green" : "text-slate-400 hover:text-brand-green"}`}>
                    <Copy className="w-3.5 h-3.5" /> {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-500">After payment, enter your transaction ID below and click Submit.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Transaction ID */}
      <div className="mb-5">
        <InputLabel>Transaction / UTR / Reference ID</InputLabel>
        <input {...register("transactionId")} placeholder="e.g. T2507051234567" className={inputCls} />
      </div>

      {/* Bank details */}
      {paymentMode === "Net Banking" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-slate-50 border border-slate-200 rounded-xl mb-5">
          <p className="text-xs font-bold text-slate-700 mb-3">Bank Transfer Details</p>
          {[
            ["Account Name", "ISLAH WELFARE FOUNDATION"],
            ["Account No.", "1004451030069725"],
            ["Bank", "Uttar Bihar Gramin Bank"],
            ["IFSC Code", "CBIN0R10001"],
            ["Account Type", "Saving Account"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between text-xs py-1 border-b border-slate-100 last:border-0">
              <span className="text-slate-500 font-semibold">{k}</span>
              <span className="text-slate-800 font-mono font-bold">{v}</span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Feature footer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-5 border-t border-slate-100 mb-5">
        {[
          { Icon: RefreshCw, title: "Automatic Renewal", desc: "Membership will renew 1 year from payment" },
          { Icon: FileText, title: "Instant Receipt", desc: "Get your fee receipt instantly" },
          { Icon: Clock, title: "Reminders", desc: "30 days & 7 days before expiry" },
          { Icon: Lock, title: "100% Secure", desc: "Your payment info is secure" },
        ].map(({ Icon, title, desc }) => (
          <div key={title} className="flex flex-col items-center text-center gap-1.5">
            <div className="w-9 h-9 rounded-xl bg-brand-green/10 flex items-center justify-center">
              <Icon className="w-4 h-4 text-brand-green" />
            </div>
            <p className="text-xs font-bold text-slate-700 leading-tight">{title}</p>
            <p className="text-[10px] text-slate-400 leading-tight">{desc}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button type="button" onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button type="button" onClick={onSubmit}
          className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:scale-[1.02] transition-all">
          <UserCheck className="w-4 h-4" /> Submit Application
        </button>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  RECEIPT CARD (in-page view)
// ══════════════════════════════════════════════════════════════════

function ReceiptCard({ data, memberId, joinDate, validTill, receiptNo, period }: {
  data: MemberFormData; memberId: string; joinDate: string;
  validTill: string; receiptNo: string; period: string;
}) {
  const cfg = CATEGORY_CONFIG[data.category];
  const amount = cfg.amount * Number(period);
  return (
    <div className="border-2 border-slate-100 rounded-2xl overflow-hidden shadow-md">
      <div className="px-5 py-4 flex items-center justify-between text-white"
        style={{ background: "linear-gradient(135deg, #0b1f3b, #18325c)" }}>
        <div>
          <p className="font-extrabold text-sm">ISLAH WELFARE FOUNDATION</p>
          <p className="text-white/60 text-[10px]">"Planting Seeds of Hope and Change"</p>
        </div>
        <div className="text-right">
          <p className="text-white text-[10px] font-bold">MEMBERSHIP FEE RECEIPT</p>
          <p className="text-white/50 text-[9px]">Receipt No: {receiptNo}</p>
        </div>
      </div>
      <div className="px-5 py-2 text-white text-xs font-extrabold text-center"
        style={{ backgroundColor: cfg.color }}>
        {data.category.toUpperCase()} MEMBERSHIP — Annual Fee: ₹{amount.toLocaleString("en-IN")}
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs mb-4">
          {([
            ["Full Name", data.fullName],
            ["Father/Mother", data.fatherName || "—"],
            ["Mobile", data.mobile],
            ["Member ID", memberId],
            ["Category", `${data.category} Member`],
            ["Period", `${period} Year${period === "2" ? "s" : ""}`],
            ["Joining Date", formatCompactDate(joinDate)],
            ["Valid Till", formatCompactDate(validTill)],
          ] as [string, string][]).map(([k, v]) => (
            <div key={k}>
              <p className="text-slate-400 font-semibold">{k}</p>
              <p className="text-slate-800 font-bold break-all">{v}</p>
            </div>
          ))}
        </div>
        <div className="bg-brand-green/5 border border-brand-green/20 rounded-xl p-3.5">
          <div className="flex justify-between text-xs text-slate-600 mb-1">
            <span>Membership Fee</span>
            <span className="font-bold text-slate-800">₹{amount.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-600 mb-2">
            <span>Payment Mode</span>
            <span className="font-bold text-slate-800">{data.paymentMode}</span>
          </div>
          {data.transactionId && (
            <div className="flex justify-between text-xs text-slate-600 mb-2">
              <span>Transaction ID</span>
              <span className="font-mono font-bold text-slate-800">{data.transactionId}</span>
            </div>
          )}
          <div className="border-t border-brand-green/20 pt-2 flex justify-between text-sm font-extrabold text-brand-green-dark">
            <span>Total Paid</span>
            <span>₹{amount.toLocaleString("en-IN")}</span>
          </div>
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-4">
          Thank you for supporting Islah Welfare Foundation. Membership valid for {period} year{period === "2" ? "s" : ""} from date of joining.
        </p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  SUCCESS SCREEN
// ══════════════════════════════════════════════════════════════════

function SuccessScreen({ data, memberId, joinDate, validTill, receiptNo, photoPreview, onViewMembership }: {
  data: MemberFormData; memberId: string; joinDate: string;
  validTill: string; receiptNo: string; photoPreview: string | null;
  onViewMembership: () => void;
}) {
  const cfg = CATEGORY_CONFIG[data.category];
  const period = data.membershipPeriod || "1";
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleCard = async () => {
    setDownloading("card");
    await generateMembershipCard({ memberId, fullName: data.fullName, category: data.category, joinDate, validTill, district: data.district, state: data.state });
    setDownloading(null);
  };
  const handleReceipt = async () => {
    setDownloading("receipt");
    const amount = cfg.amount * Number(period);
    await generateMembershipReceipt({ memberId, fullName: data.fullName, fatherName: data.fatherName || "", category: data.category, amount, joinDate, validTill, paymentMode: data.paymentMode, transactionId: data.transactionId || "", receiptNo });
    setDownloading(null);
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
      {/* Welcome */}
      <div className="text-center py-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg"
          style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.darkColor})` }}>
          <CheckCircle2 className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-2xl font-extrabold text-brand-green-dark mb-1">Welcome, {data.fullName.split(" ")[0]}! 🎉</h2>
        <p className="text-slate-500 text-sm mb-1">
          Your <strong style={{ color: cfg.color }}>{data.category} Membership</strong> has been registered successfully.
        </p>
        <p className="text-xs text-slate-400 font-mono">{memberId} · Valid till {formatCompactDate(validTill)}</p>
      </div>

      {/* Card preview */}
      <div className="flex justify-center mb-6">
        <MemberCardVisual
          category={data.category}
          name={data.fullName}
          memberId={memberId}
          validTill={formatCompactDate(validTill)}
          district={data.district}
          state={data.state}
          photo={photoPreview}
        />
      </div>

      {/* Download buttons */}
      <div className="grid sm:grid-cols-2 gap-3 mb-5">
        <button onClick={handleCard} disabled={downloading === "card"}
          className="flex items-center justify-center gap-2 font-bold py-3 px-5 rounded-xl border-2 transition hover:scale-[1.02] disabled:opacity-60"
          style={{ borderColor: cfg.color, color: cfg.color }}>
          {downloading === "card"
            ? <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
            : <Download className="w-4 h-4" />}
          Download ID Card (PDF)
        </button>
        <button onClick={handleReceipt} disabled={downloading === "receipt"}
          className="flex items-center justify-center gap-2 bg-brand-green text-white font-bold py-3 px-5 rounded-xl shadow-md hover:bg-brand-green-dark transition hover:scale-[1.02] disabled:opacity-60">
          {downloading === "receipt"
            ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : <FileText className="w-4 h-4" />}
          Download Receipt (PDF)
        </button>
      </div>

      {/* Email info */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-6">
        <Mail className="w-3.5 h-3.5" />
        <span>Membership card &amp; receipt will be emailed to <strong className="text-slate-600">{data.email}</strong></span>
      </div>

      {/* In-page receipt */}
      <div className="mb-6">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Your Membership Receipt</p>
        <ReceiptCard data={data} memberId={memberId} joinDate={joinDate} validTill={validTill} receiptNo={receiptNo} period={period} />
      </div>

      {/* Renewal reminder */}
      <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6">
        <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700">
          <strong>Renewal reminders will be sent</strong> 30 days and 7 days before your membership expires on{" "}
          <strong>{formatDisplayDate(validTill)}</strong>.
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-center">
        <button onClick={onViewMembership} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:underline">
          <Search className="w-4 h-4" /> View Your Membership
        </button>
        <span className="text-slate-300 hidden sm:block">|</span>
        <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </a>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  FORM SIDEBAR
// ══════════════════════════════════════════════════════════════════

function FormSidebar() {
  return (
    <div className="space-y-4">
      {/* Category mini-cards */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-50" style={{ background: "linear-gradient(90deg, #f8fafc, #f1f5f9)" }}>
          <h4 className="font-extrabold text-brand-green-dark text-xs uppercase tracking-wider">Membership Categories</h4>
        </div>
        <div className="divide-y divide-slate-50">
          {(["Blue", "Yellow", "Green"] as MemberCategory[]).map(cat => {
            const cfg = CATEGORY_CONFIG[cat];
            const Icon = cfg.icon;
            return (
              <div key={cat} className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm"
                    style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.darkColor})` }}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-700">{cat} Card Member</p>
                    <p className="text-xs font-extrabold" style={{ color: cfg.color }}>₹{cfg.amount.toLocaleString("en-IN")}/year</p>
                  </div>
                </div>
                <ul className="space-y-1">
                  {cfg.features.map(f => (
                    <li key={f} className="flex items-start gap-1.5 text-[10px] text-slate-500 leading-snug">
                      <Check className="w-3 h-3 shrink-0 mt-0.5" style={{ color: cfg.color }} /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Policy */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-xs font-bold text-amber-800 mb-2.5 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5" /> Membership Policy
        </p>
        <ul className="space-y-1.5">
          {[
            "All memberships are valid for one financial year from the date of joining",
            "Membership is non-transferable and non-refundable",
            "All Supporting Members are Non-Executive & Non-Voting Members",
            "Membership shall be automatically deactivated if not renewed within prescribed time",
          ].map(p => (
            <li key={p} className="flex items-start gap-1.5 text-[10px] text-amber-700 leading-snug">
              <Check className="w-3 h-3 shrink-0 mt-0.5" /> {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Need Help */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Need Help?</p>
        <div className="space-y-2">
          <a href="tel:+919811861633" className="flex items-center gap-2 text-xs text-brand-green font-semibold hover:underline">
            <Phone className="w-3.5 h-3.5" /> +91 9811861633
          </a>
          <a href="mailto:info@iwfindia.org" className="flex items-center gap-2 text-xs text-brand-green font-semibold hover:underline">
            <Mail className="w-3.5 h-3.5" /> info@iwfindia.org
          </a>
          <p className="text-[10px] text-slate-400">Mon – Sat | 10:00 AM – 6:00 PM</p>
        </div>
      </div>

      {/* Security note */}
      <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl p-3">
        <Lock className="w-4 h-4 text-brand-green shrink-0" />
        <div>
          <p className="text-xs font-bold text-brand-green-dark">100% Secure</p>
          <p className="text-[10px] text-slate-500">Your information is 100% secure and encrypted.</p>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  APPLICATION FORM SECTION
// ══════════════════════════════════════════════════════════════════

function ApplicationFormSection({ preSelectedCategory, onViewMembership }: { preSelectedCategory: MemberCategory | null; onViewMembership: () => void }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];
  const [receiptNo] = useState(generateReceiptNo);
  const [joinDate] = useState(today);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<MemberFormData, any, MemberFormData>({
    resolver: zodResolver(memberSchema) as any,
    defaultValues: {
      paymentMode: "UPI",
      state: "Bihar",
      membershipPeriod: "1" as "1" | "2",
      disclaimerAccepted: false,
      ...(preSelectedCategory ? { category: preSelectedCategory } : {}),
    },
    mode: "onSubmit",
  });

  const category = form.watch("category");
  const period = form.watch("membershipPeriod") || "1";
  const validTill = addYears(joinDate, Number(period));

  const [memberId] = useState(() => generateMemberId(preSelectedCategory || "Blue", Math.floor(10 + Math.random() * 990)));
  const [currentMemberId, setCurrentMemberId] = useState(memberId);

  const scrollToForm = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNext = () => {
    if (category) setCurrentMemberId(generateMemberId(category, Math.floor(10 + Math.random() * 990)));
    setStep(s => s + 1);
    scrollToForm();
  };
  const handleBack = () => { setStep(s => s - 1); scrollToForm(); };
  const handleSubmit = () => { setSubmitted(true); scrollToForm(); };

  const data = form.getValues();

  return (
    <section id="register" className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* background blurs removed */}
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10 bg-brand-orange/40" />
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">Apply Now</span>
            <div className="h-px w-10 bg-brand-orange/40" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">Become a Supporting Member</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Join Islah Welfare Foundation (IWF) as a Supporting Member and help build stronger communities. Fill out the form below to become a Supporting Member.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="px-6 py-5 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0b1f3b 0%, #18325c 60%, #0a1b33 100%)" }}>
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-white font-extrabold text-lg relative z-10">Member Registration</h3>
              <p className="text-white/60 text-xs mt-1 relative z-10">
                Auto-generated Member ID · Digital ID Card · Fee Receipt
              </p>
            </div>
            <div className="p-6 sm:p-8">
              {!submitted && <StepIndicator step={step} />}
              <AnimatePresence mode="wait">
                {submitted ? (
                  <SuccessScreen key="success" data={data} memberId={currentMemberId}
                    joinDate={joinDate} validTill={validTill} receiptNo={receiptNo} photoPreview={photoPreview} onViewMembership={onViewMembership} />
                ) : step === 1 ? (
                  <Step1PersonalDetails key="s1" form={form} onNext={handleNext} />
                ) : step === 2 ? (
                  <Step2MembershipDetails key="s2" form={form} onNext={handleNext} onBack={handleBack} />
                ) : step === 3 ? (
                  <Step3ContributionDetails key="s3" form={form} onNext={handleNext} onBack={handleBack}
                    joinDate={joinDate} validTill={validTill}
                    photoPreview={photoPreview} setPhotoPreview={setPhotoPreview} />
                ) : (
                  <Step4ReviewPayment key="s4" form={form} memberId={currentMemberId}
                    joinDate={joinDate} validTill={validTill} onBack={handleBack} onSubmit={handleSubmit} />
                )}
              </AnimatePresence>

              {!submitted && (
                <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                  <p className="text-xs text-slate-500">
                    Already a member?{" "}
                    <button onClick={onViewMembership} className="text-brand-green font-bold hover:underline">
                      View or Renew your membership →
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24">
            <FormSidebar />
          </div>
        </div>

        {/* Thank you strip */}
        <div className="mt-12 rounded-2xl text-white p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0b1f3b, #18325c)" }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute right-0 top-0 w-40 h-40 rounded-full bg-brand-orange/10 blur-2xl" />
          </div>
          <div className="text-white/80 shrink-0">
            <Heart className="w-10 h-10 text-brand-orange fill-brand-orange animate-pulse" />
          </div>
          <div className="relative z-10 text-center md:text-left">
            <p className="font-extrabold text-lg mb-1">Thank you for being a valued member!</p>
            <p className="text-white/65 text-sm">Your continued support helps us empower lives and build stronger communities.</p>
          </div>
          <div className="relative z-10 shrink-0 grid grid-cols-2 sm:grid-cols-4 gap-4 md:ml-auto text-center">
            {[
              { value: "120+", label: "Members" },
              { value: "80+", label: "Volunteers" },
              { value: "40+", label: "Districts Reached" },
              { value: "15+", label: "Events Conducted" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-xl font-extrabold text-white">{value}</p>
                <p className="text-white/60 text-[10px]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════
//  MEMBER CARD PREVIEW SHOWCASE
// ══════════════════════════════════════════════════════════════════

function MemberCardPreviewSection() {
  const [activeCard, setActiveCard] = useState<MemberCategory>("Green");
  const sampleData: Record<MemberCategory, { name: string; memberId: string; validTill: string; district: string; state: string }> = {
    Blue: { name: "Mohammad Rashid", memberId: "IWF-BL-2025-001", validTill: "30 Apr 2026", district: "Darbhanga", state: "Bihar" },
    Yellow: { name: "Fatima Begum", memberId: "IWF-YL-2025-001", validTill: "15 Jun 2026", district: "Patna", state: "Bihar" },
    Green: { name: "Md. Irfan Alam", memberId: "IWF-GR-2025-001", validTill: "22 Sep 2026", district: "Muzaffarpur", state: "Bihar" },
  };
  return (
    <section className="py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0b1f3b 0%, #162f54 50%, #0b1f3b 100%)" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-orange/8 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-blue-400/8 blur-3xl" />
        <div className="absolute inset-0 opacity-3" style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10 bg-brand-orange/40" />
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">Digital Identity</span>
            <div className="h-px w-10 bg-brand-orange/40" />
          </div>
          <h2 className="text-white text-2xl md:text-3xl font-extrabold mb-2">Your Membership Card</h2>
          <p className="text-white/60 text-sm">Downloadable digital membership ID card — your verified identity as an IWF member.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Card switcher tabs */}
          <div className="order-2 lg:order-1 flex flex-col gap-3">
            {(["Blue", "Yellow", "Green"] as MemberCategory[]).map(cat => {
              const cfg = CATEGORY_CONFIG[cat];
              const Icon = cfg.icon;
              const isActive = activeCard === cat;
              return (
                <button key={cat} onClick={() => setActiveCard(cat)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all text-left ${isActive ? "border-white/40 bg-white/10 shadow-lg" : "border-white/10 hover:border-white/20 hover:bg-white/5"
                    }`}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.darkColor})` }}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${isActive ? "text-white" : "text-white/60"}`}>{cat} Card</p>
                    <p className={`text-[10px] ${isActive ? "text-white/60" : "text-white/30"}`}>₹{cfg.amount.toLocaleString("en-IN")}/yr</p>
                  </div>
                  {isActive && <Check className="w-4 h-4 text-white ml-auto" />}
                </button>
              );
            })}
          </div>

          {/* Card preview */}
          <div className="order-1 lg:order-2 flex-1 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={activeCard}
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}>
                <MemberCardVisual category={activeCard} {...sampleData[activeCard]} />
                <p className="text-white/40 text-[10px] text-center mt-3">Sample card — actual card includes your photo and details</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Features */}
          <div className="order-3 space-y-4 min-w-[200px]">
            {[
              { Icon: CreditCard, title: "Physical-style Card", desc: "Professional landscape card in PDF format" },
              { Icon: Download, title: "Instant Download", desc: "Available immediately after registration" },
              { Icon: Mail, title: "Email Delivery", desc: "Sent directly to your registered inbox" },
              { Icon: BadgeCheck, title: "Verified Identity", desc: "Official IWF membership proof" },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-white/70" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{title}</p>
                  <p className="text-white/50 text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════
//  MEMBER STATUS CHECK
// ══════════════════════════════════════════════════════════════════

function MemberStatusCheck({
  loadedMember,
  setLoadedMember,
}: {
  loadedMember: MockMember | null;
  setLoadedMember: (m: MockMember | null) => void;
}) {
  const [query, setQuery] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [result, setResult] = useState<MockMember | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loadedMember) {
      setQuery("");
      setOtpSent(false);
      setOtp("");
      setVerified(false);
      setResult(null);
      setNotFound(false);
    }
  }, [loadedMember]);

  const handleSearch = () => {
    const found = MOCK_MEMBERS.find(m =>
      m.id.toLowerCase() === query.trim().toLowerCase() || m.phone === query.trim()
    );
    if (found) { setResult(found); setOtpSent(true); setNotFound(false); }
    else { setNotFound(true); setOtpSent(false); setResult(null); }
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setVerified(true);
      setLoading(false);
      if (result) {
        setLoadedMember(result);
      }
    }, 1000);
  };

  const handleReset = () => {
    setQuery(""); setOtpSent(false); setOtp(""); setVerified(false); setResult(null); setNotFound(false);
    setLoadedMember(null);
  };

  return (
    <section id="status" className="bg-white">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10 bg-brand-orange/40" />
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">Member Portal</span>
            <div className="h-px w-10 bg-brand-orange/40" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-green-dark">Check Your Membership Status</h2>
          <p className="text-slate-500 text-sm mt-2">Enter your Membership ID or registered mobile number to verify your status.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="px-6 py-4" style={{ background: "linear-gradient(90deg, #0b1f3b, #18325c)" }}>
            <h3 className="text-white font-bold flex items-center gap-2 text-sm"><Search className="w-4 h-4" /> Member Lookup</h3>
          </div>
          <div className="p-6">
            <AnimatePresence mode="wait">
              {!otpSent && !verified && (
                <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex gap-2">
                    <input value={query} onChange={e => { setQuery(e.target.value); setNotFound(false); }}
                      onKeyDown={e => e.key === "Enter" && handleSearch()}
                      placeholder="e.g. IWF-BL-2025-001 or 9876543210"
                      className={`${inputCls} flex-1`} />
                    <button onClick={handleSearch} disabled={!query.trim()}
                      className="px-5 py-2 bg-brand-green text-white font-bold rounded-lg hover:bg-brand-green-dark transition disabled:opacity-50">
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                  <AnimatePresence>
                    {notFound && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                        className="mt-3 flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                        <XCircle className="w-4 h-4 shrink-0" /> No member found. Try IWF-BL-2025-001 or phone 9876543210 (demo)
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <p className="text-xs text-slate-400 mt-3">Demo: Try IWF-BL-2025-001 or phone 9876543210</p>
                </motion.div>
              )}

              {otpSent && !verified && result && (
                <motion.div key="otp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-brand-green bg-brand-green/5 border border-brand-green/20 rounded-lg p-3">
                    <Phone className="w-4 h-4" /> OTP sent to ****{result.phone.slice(-4)}
                  </div>
                  <div>
                    <InputLabel required>Enter OTP</InputLabel>
                    <div className="flex gap-2">
                      <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="• • • • • •"
                        maxLength={6} className={`${inputCls} flex-1 text-center tracking-widest font-bold text-xl`} />
                      <button onClick={handleVerify} disabled={otp.length < 4 || loading}
                        className="px-5 py-2 bg-brand-orange text-white font-bold rounded-lg hover:bg-brand-orange-dark transition disabled:opacity-50">
                        {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin block" /> : "Verify"}
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Demo: Enter any 4+ digit code</p>
                  </div>
                  <button onClick={handleReset} className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> Search again
                  </button>
                </motion.div>
              )}

              {verified && result && (
                <motion.div key="result" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                  {(() => {
                    const cfg = CATEGORY_CONFIG[result.category];
                    const expired = isExpiredDate(result.validTill);
                    return (
                      <>
                        <div className={`flex items-center justify-between p-4 rounded-xl border`}
                          style={!expired ? { backgroundColor: cfg.bg, borderColor: cfg.border } : { backgroundColor: "#FEF2F2", borderColor: "#FECACA" }}>
                          <div className="flex items-center gap-3">
                            <MemberAvatar name={result.name} category={result.category} />
                            <div>
                              <p className="font-bold text-slate-800">{result.name}</p>
                              <p className="text-xs font-mono text-slate-500">{result.id}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${expired ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
                            {result.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: "Category", value: `${result.category} Member`, Icon: cfg.icon },
                            { label: "Valid Till", value: formatDisplayDate(result.validTill), Icon: Calendar },
                            { label: "District", value: result.district, Icon: MapPin },
                            { label: "Mobile", value: `****${result.phone.slice(-4)}`, Icon: Phone },
                          ].map(({ label, value, Icon }) => (
                            <div key={label} className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                              <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Icon className="w-3 h-3" /> {label}</p>
                              <p className="text-sm font-bold text-slate-800">{value}</p>
                            </div>
                          ))}
                        </div>
                        {expired && (
                          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                            <p className="text-sm font-bold text-red-700 mb-2">Membership Expired</p>
                            <button
                              type="button"
                              onClick={() => {
                                document.getElementById("renew")?.scrollIntoView({ behavior: "smooth", block: "start" });
                              }}
                              className="inline-flex items-center gap-2 bg-brand-orange text-white text-sm font-bold px-5 py-2 rounded-lg hover:bg-brand-orange-dark transition"
                            >
                              <RefreshCw className="w-3.5 h-3.5" /> Renew Membership
                            </button>
                          </div>
                        )}
                        <button onClick={handleReset} className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 mx-auto">
                          <Search className="w-3 h-3" /> Search another member
                        </button>
                      </>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════
//  RENEWAL SECTION
// ══════════════════════════════════════════════════════════════════

function RenewalSection({
  loadedMember,
  setLoadedMember,
}: {
  loadedMember: MockMember | null;
  setLoadedMember: (m: MockMember | null) => void;
}) {
  const [query, setQuery] = useState("");
  const [step, setStep] = useState<"search" | "otp" | "select" | "payment" | "done">("search");
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState<MockMember | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<"1" | "2">("1");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loadedMember) {
      setQuery("");
      setStep("search");
      setOtp("");
      setResult(null);
      setNotFound(false);
    }
  }, [loadedMember]);

  const handleSearch = () => {
    const found = MOCK_MEMBERS.find(m =>
      m.id.toLowerCase() === query.trim().toLowerCase() || m.phone === query.trim()
    );
    if (found) { setResult(found); setStep("otp"); setNotFound(false); }
    else { setNotFound(true); }
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => { setStep("select"); setLoading(false); }, 1000);
  };

  const handleProceedPayment = () => setStep("payment");

  const handleComplete = () => {
    if (result) {
      const newValidTill = addYears(new Date().toISOString().split("T")[0], Number(selectedPeriod));
      const updatedMember = {
        ...result,
        validTill: newValidTill,
        status: "Active" as const,
      };
      setLoadedMember(updatedMember);
      setResult(updatedMember);
    }
    setStep("done");
  };

  return (
    <section id="renew" className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10 bg-brand-orange/40" />
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">Member Renewal</span>
            <div className="h-px w-10 bg-brand-orange/40" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-green-dark mb-2">Renew Your Membership</h2>
          <p className="text-slate-500 text-sm">You are just a few steps away from renewing your membership and continuing your impact.</p>
        </div>

        {/* Step progress */}
        <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2">
          {["Search Member", "Verify OTP", "Select Category", "Payment"].map((label, i) => {
            const stepMap: Record<typeof step, number> = { search: 1, otp: 2, select: 3, payment: 4, done: 5 };
            const currentStep = stepMap[step];
            const s = i + 1;
            const done = s < currentStep;
            const active = s === currentStep;
            return (
              <div key={s} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${done ? "bg-brand-green text-white" : active ? "bg-brand-orange text-white scale-110 shadow-lg" : "bg-slate-200 text-slate-500"}`}>
                    {done ? <Check className="w-3.5 h-3.5" /> : s}
                  </div>
                  <span className={`text-[10px] mt-1 font-semibold whitespace-nowrap hidden sm:block ${active ? "text-brand-orange" : done ? "text-brand-green" : "text-slate-400"}`}>{label}</span>
                </div>
                {i < 3 && <div className={`w-8 sm:w-14 h-0.5 mb-4 mx-1 ${done ? "bg-brand-green" : "bg-slate-200"}`} />}
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="px-6 py-4" style={{ background: "linear-gradient(90deg, #0b1f3b, #18325c)" }}>
            <h3 className="text-white font-bold text-sm flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Membership Renewal
            </h3>
          </div>
          <div className="p-6">
            <AnimatePresence mode="wait">
              {step === "search" && (
                <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <p className="text-sm text-slate-600">Enter your Member ID or registered mobile number to start renewal.</p>
                  <div className="flex gap-2">
                    <input value={query} onChange={e => { setQuery(e.target.value); setNotFound(false); }}
                      onKeyDown={e => e.key === "Enter" && handleSearch()}
                      placeholder="IWF-BL-2025-001 or mobile number"
                      className={`${inputCls} flex-1`} />
                    <button onClick={handleSearch} disabled={!query.trim()}
                      className="px-5 py-2 bg-brand-green text-white font-bold rounded-lg hover:bg-brand-green-dark transition disabled:opacity-50">
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                  {notFound && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                      <XCircle className="w-4 h-4 shrink-0" /> Member not found. Try IWF-BL-2025-001 or phone 9876543210
                    </div>
                  )}
                  <p className="text-xs text-slate-400">Demo: Try IWF-BL-2025-002 (expired) for renewal demo</p>
                </motion.div>
              )}

              {step === "otp" && result && (
                <motion.div key="otp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div className="p-4 bg-brand-green/5 border border-brand-green/20 rounded-xl">
                    <div className="flex items-center gap-3">
                      <MemberAvatar name={result.name} category={result.category} />
                      <div>
                        <p className="font-bold text-slate-800">{result.name}</p>
                        <p className="text-xs text-slate-500 font-mono">{result.id} · {result.category} Member</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-brand-green bg-brand-green/5 border border-brand-green/20 rounded-lg p-3">
                    <Phone className="w-4 h-4" /> OTP sent to ****{result.phone.slice(-4)}
                  </div>
                  <div className="flex gap-2">
                    <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP"
                      maxLength={6} className={`${inputCls} flex-1 text-center text-xl font-bold tracking-widest`} />
                    <button onClick={handleVerify} disabled={otp.length < 4 || loading}
                      className="px-5 py-2 bg-brand-orange text-white font-bold rounded-lg hover:bg-brand-orange-dark transition disabled:opacity-50">
                      {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin block" /> : "Verify"}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">Demo: Enter any 4+ digit code</p>
                  <button onClick={() => setStep("search")} className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> Back
                  </button>
                </motion.div>
              )}

              {step === "select" && result && (
                <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mb-5 p-4 rounded-xl border" style={{ backgroundColor: CATEGORY_CONFIG[result.category].bg, borderColor: CATEGORY_CONFIG[result.category].border }}>
                    <p className="text-xs font-semibold text-slate-500 mb-1">Current Membership</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-800">{result.name}</p>
                        <p className="text-xs font-mono text-slate-500">{result.id}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${isExpiredDate(result.validTill) ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
                          {result.status}
                        </span>
                        <p className="text-xs text-slate-500 mt-1">Till {formatCompactDate(result.validTill)}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Select Renewal Period</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {(["1", "2"] as const).map(p => {
                      const amt = CATEGORY_CONFIG[result.category].amount * Number(p);
                      return (
                        <button key={p} type="button" onClick={() => setSelectedPeriod(p)}
                          className={`p-4 rounded-xl border-2 transition text-left ${selectedPeriod === p ? "border-brand-green bg-brand-green/5" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                          <p className={`font-extrabold text-base ${selectedPeriod === p ? "text-brand-green" : "text-slate-700"}`}>
                            {p} Year{p === "2" ? "s" : ""}
                          </p>
                          <p className="text-xs text-slate-500">₹{amt.toLocaleString("en-IN")} total</p>
                          {selectedPeriod === p && <Check className="w-3.5 h-3.5 text-brand-green mt-1" />}
                        </button>
                      );
                    })}
                  </div>
                  <button onClick={handleProceedPayment}
                    className="w-full bg-brand-green text-white font-bold py-3 rounded-xl hover:bg-brand-green-dark transition flex items-center justify-center gap-2 shadow-md">
                    Proceed to Payment <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {step === "payment" && result && (
                <motion.div key="payment" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Renewal Fee ({selectedPeriod} year{selectedPeriod === "2" ? "s" : ""})</span>
                      <span className="font-bold">₹{(CATEGORY_CONFIG[result.category].amount * Number(selectedPeriod)).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-slate-600">Convenience Fee</span>
                      <span className="font-bold">₹50</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2 flex justify-between text-base font-extrabold text-brand-green-dark">
                      <span>Total Amount</span>
                      <span>₹{(CATEGORY_CONFIG[result.category].amount * Number(selectedPeriod) + 50).toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-brand-green/5 border border-brand-green/20 rounded-xl">
                    <p className="text-xs font-bold text-brand-green-dark mb-3"><QrCode className="w-4 h-4 inline mr-1" />Pay via UPI</p>
                    <p className="text-sm font-mono font-bold text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-2 flex items-center justify-between">
                      islah-foundation@upi
                      <button type="button" onClick={() => navigator.clipboard.writeText("islah-foundation@upi")}
                        className="text-brand-green"><Copy className="w-4 h-4" /></button>
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep("select")}
                      className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-sm font-semibold text-slate-600 hover:border-slate-300 transition flex items-center justify-center gap-1">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button onClick={handleComplete}
                      className="flex-2 flex-1 py-3 rounded-xl bg-brand-orange text-white font-bold text-sm hover:bg-brand-orange-dark transition shadow-md flex items-center justify-center gap-1">
                      Confirm Renewal <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "done" && result && (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                  <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-brand-green" />
                  </div>
                  <h3 className="font-extrabold text-brand-green-dark text-xl mb-2">Membership Renewed! 🎉</h3>
                  <p className="text-slate-500 text-sm mb-1">
                    {result.name}'s <strong>{result.category} Membership</strong> has been renewed.
                  </p>
                  <p className="text-xs text-slate-400 mb-6">
                    New validity: {addYears(new Date().toISOString().split("T")[0], Number(selectedPeriod))} ({selectedPeriod} year{selectedPeriod === "2" ? "s" : ""})
                  </p>
                  <button onClick={() => { setStep("search"); setQuery(""); setOtp(""); setResult(null); }}
                    className="inline-flex items-center gap-2 bg-brand-green text-white font-bold px-6 py-2.5 rounded-xl hover:bg-brand-green-dark transition shadow-md">
                    <RotateCcw className="w-4 h-4" /> Renew Another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════
//  LOADED MEMBER DETAILS
// ══════════════════════════════════════════════════════════════════

function LoadedMemberDetails({ member, onClear }: { member: MockMember; onClear: () => void }) {
  const cfg = CATEGORY_CONFIG[member.category];
  const expired = isExpiredDate(member.validTill);
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleCard = async () => {
    setDownloading("card");
    await generateMembershipCard({
      memberId: member.id,
      fullName: member.name,
      category: member.category,
      joinDate: member.joined,
      validTill: member.validTill,
      district: member.district,
      state: member.state,
    });
    setDownloading(null);
  };

  const handleReceipt = async () => {
    setDownloading("receipt");
    await generateMembershipReceipt({
      memberId: member.id,
      fullName: member.name,
      fatherName: "",
      category: member.category,
      amount: cfg.amount,
      joinDate: member.joined,
      validTill: member.validTill,
      paymentMode: "UPI",
      transactionId: "PRE-VERIFIED",
      receiptNo: "REC-" + member.id.split("-").pop(),
    });
    setDownloading(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden max-w-2xl mx-auto mb-8 transition-all hover:shadow-2xl">
      {/* Header gradient banner */}
      <div className="px-6 py-5 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${cfg.color} 0%, ${cfg.darkColor} 100%)` }}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/70">Verified Member Profile</span>
            <h3 className="text-white text-lg font-extrabold">{member.name}</h3>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${expired ? "bg-red-500/20 text-red-100 border border-red-400/30" : "bg-white/20 text-white border border-white/30"}`}>
            {expired ? "Expired" : "Active"}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Detail grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" /> Joined On
            </p>
            <p className="text-sm font-bold text-slate-800">{formatDisplayDate(member.joined)}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" /> Extended Till
            </p>
            <p className="text-sm font-bold text-slate-800">{formatDisplayDate(member.validTill)}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
              <Shield className="w-3 h-3 text-slate-400" /> Category
            </p>
            <p className="text-sm font-bold text-slate-800">{member.category} Card Member</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" /> District, State
            </p>
            <p className="text-sm font-bold text-slate-800">{member.district}, {member.state}</p>
          </div>
        </div>

        {/* Digital card container */}
        <div className="border-t border-slate-100 pt-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 text-center">Your Digital ID Card</p>
          <div className="flex justify-center">
            <MemberCardVisual
              category={member.category}
              name={member.name}
              memberId={member.id}
              validTill={formatCompactDate(member.validTill)}
              district={member.district}
              state={member.state}
              photo={null}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button onClick={handleCard} disabled={downloading === "card"}
            className="flex-1 flex items-center justify-center gap-2 font-bold py-3 px-5 rounded-xl border-2 transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 text-sm"
            style={{ borderColor: cfg.color, color: cfg.color }}>
            {downloading === "card"
              ? <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
              : <Download className="w-4 h-4" />}
            Download ID Card (PDF)
          </button>
          <button onClick={handleReceipt} disabled={downloading === "receipt"}
            className="flex-1 flex items-center justify-center gap-2 bg-brand-green text-white font-bold py-3 px-5 rounded-xl shadow-md hover:bg-brand-green-dark transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 text-sm">
            {downloading === "receipt"
              ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <FileText className="w-4 h-4" />}
            Download Receipt (PDF)
          </button>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-center">
          <button onClick={onClear} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition">
            <Search className="w-3.5 h-3.5" /> Lookup Another Member
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  YOUR MEMBERSHIP TAB
// ══════════════════════════════════════════════════════════════════

function YourMembershipTab({
  loadedMember,
  setLoadedMember,
}: {
  loadedMember: MockMember | null;
  setLoadedMember: (m: MockMember | null) => void;
}) {
  const handleClear = () => {
    setLoadedMember(null);
  };

  const scrollToRegister = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-3">
      <AnimatePresence mode="wait">
        {loadedMember ? (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <LoadedMemberDetails member={loadedMember} onClear={handleClear} />
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-4"
          >
            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 mb-3 text-center">
              <Shield className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-500">
                No active membership profile loaded.
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Use the <strong>Member Lookup</strong> form below to verify your membership status, download your verified digital card, or renew your subscription.
              </p>
              <button
                onClick={scrollToRegister}
                className="mt-4 inline-flex items-center gap-2 bg-brand-green text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md hover:bg-brand-green-dark transition hover:scale-[1.02]"
              >
                Apply for Membership <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Preview Card Types</p>
              <MemberCardPreviewSection />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-t border-slate-100 pt-4 space-y-4">
        <MemberStatusCheck loadedMember={loadedMember} setLoadedMember={setLoadedMember} />
        <RenewalSection loadedMember={loadedMember} setLoadedMember={setLoadedMember} />
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
//  MAIN PAGE
// ══════════════════════════════════════════════════════════════════

export default function MembershipPage() {
  const [activeTab, setActiveTab] = useState<PageTab>("Members");
  const [preSelectedCategory, setPreSelectedCategory] = useState<MemberCategory | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const [loadedMember, setLoadedMember] = useState<MockMember | null>(null);

  const handleApplyNow = (cat: MemberCategory) => {
    setPreSelectedCategory(cat);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("register")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleTabChange = (tab: PageTab) => {
    setActiveTab(tab);
    setTimeout(() => {
      document.getElementById("community-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleRenewClick = () => {
    setActiveTab("Your Membership");
    const startTime = Date.now();
    const tryScroll = () => {
      const el = document.getElementById("renew");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (Date.now() - startTime < 1500) {
        setTimeout(tryScroll, 50);
      }
    };
    setTimeout(tryScroll, 50);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* ── Hero with Tab bar */}
        <MembersAndDonorsHero activeTab={activeTab} setActiveTab={handleTabChange} />

        {/* ── Tab Content */}
        <section className="bg-white">
          <AnimatePresence mode="wait">
            {activeTab === "Members" && (
              <motion.div key="members" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                <MembersTab onRenewClick={handleRenewClick} />
              </motion.div>
            )}
            {activeTab === "Donors" && (
              <motion.div key="donors" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                <DonorsTab />
              </motion.div>
            )}
            {activeTab === "Your Membership" && (
              <motion.div key="yourmembership" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                <YourMembershipTab loadedMember={loadedMember} setLoadedMember={setLoadedMember} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ── Become a Member / Donor CTA */}
        <BecomeMemberCTA onApplyNow={handleApplyNow} />

        {/* ── Application Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4 }}>
              <div className="relative">
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 z-50 p-2 bg-white rounded-full shadow-md text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition"
                  title="Close Form"
                >
                  <X className="w-5 h-5" />
                </button>
                <ApplicationFormSection
                  preSelectedCategory={preSelectedCategory}
                  onViewMembership={() => handleTabChange("Your Membership")}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
