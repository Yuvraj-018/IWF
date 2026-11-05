import { GENERAL_PROGRAMME_OPTIONS, SECTOR_PROGRAMMES } from "@/content/sectorCatalogue";
import type { Values, WizardConfig } from "../ApplicationWizard";
import {
  DOC_ACCEPT,
  declaration,
  hearAboutFields,
  locationInitial,
  locationSection,
  policyDeclaration,
  recognitionField,
  updatesDeclaration,
} from "../fieldKit";

const isIndividual = (v: Values) => v.sponsorType === "Individual Sponsor";
const isOrg = (v: Values) => Boolean(v.sponsorType) && !isIndividual(v);

/** Programme options follow the sectors chosen above. */
const programmeOptions = (v: Values) => [
  ...((v.sectors?.sectors as string[]) ?? []).flatMap((s) => SECTOR_PROGRAMMES[s] ?? []),
  ...GENERAL_PROGRAMME_OPTIONS,
];

export const sponsorFormConfig: WizardConfig = {
  id: "sponsor",
  applicationType: "sponsor",
  refPrefix: "SPO",
  initial: { ...locationInitial(), whatsappCode: "+91" },
  toPayload: (v) => ({
    fullName: (isIndividual(v) ? v.fullName : v.contactName).trim(),
    email: v.email.trim(),
    phone: v.phone,
    countryCode: v.countryCode || "+91",
    city: v.city,
    state: v.state,
    organization: isIndividual(v) ? v.affiliation : v.orgName,
    message: v.objective,
  }),
  steps: [
    {
      title: "Sponsor Details",
      sections: [
        {
          title: "Sponsor type",
          fields: [
            {
              key: "sponsorType",
              type: "select",
              label: "How would you like to support ISLAH?",
              required: true,
              placeholder: "Select sponsor type",
              hint: "The fields below adapt to your selection.",
              options: [
                "Individual Sponsor",
                "Company / Corporate",
                "CSR Foundation / CSR Initiative",
                "NGO / Institution",
                "Community Organisation",
                "Other",
              ],
            },
          ],
        },
        {
          title: "Your details",
          visibleIf: isIndividual,
          fields: [
            {
              key: "fullName",
              type: "text",
              variant: "name",
              label: "Full Name",
              required: true,
              span: 2,
              maxLength: 60,
            },
            {
              key: "occupation",
              type: "text",
              label: "Occupation / Professional Designation",
              optional: true,
            },
            {
              key: "affiliation",
              type: "text",
              label: "Organisation / Professional Affiliation",
              optional: true,
            },
          ],
        },
        {
          title: "Organisation details",
          visibleIf: isOrg,
          fields: [
            {
              key: "orgName",
              type: "text",
              label: "Organisation / Institution Name",
              required: true,
              span: 2,
              maxLength: 120,
            },
            {
              key: "orgType",
              type: "select",
              label: "Organisation Type",
              required: true,
              options: [
                "Private Limited Company",
                "Public Limited Company",
                "LLP / Partnership",
                "Trust",
                "Society",
                "Section 8 Company",
                "Educational Institution",
                "Other",
              ],
            },
            {
              key: "orgWebsite",
              type: "text",
              inputType: "url",
              label: "Official Website",
              optional: true,
              placeholder: "https://",
            },
            {
              key: "orgYear",
              type: "text",
              variant: "year",
              label: "Year Established",
              optional: true,
              placeholder: "YYYY",
            },
            {
              key: "orgRegNumber",
              type: "text",
              label: "Registration Number",
              optional: true,
              hint: "Where applicable.",
            },
          ],
        },
        {
          title: "Contact details",
          visibleIf: (v) => Boolean(v.sponsorType),
          fields: [
            {
              key: "contactName",
              type: "text",
              variant: "name",
              label: "Contact Person's Full Name",
              required: true,
              visibleIf: isOrg,
              maxLength: 60,
            },
            {
              key: "contactRole",
              type: "text",
              label: "Designation / Role",
              required: true,
              visibleIf: isOrg,
            },
            {
              key: "phone",
              type: "phone",
              codeKey: "countryCode",
              label: "Mobile Number",
              required: true,
            },
            {
              key: "whatsapp",
              type: "phone",
              codeKey: "whatsappCode",
              label: "WhatsApp Number (if different)",
              optional: true,
            },
            {
              key: "email",
              type: "text",
              inputType: "email",
              label: "Email Address",
              required: true,
              placeholder: "name@example.com",
            },
          ],
        },
        locationSection({ title: "Address", visibleIf: (v) => Boolean(v.sponsorType) }),
      ],
    },
    {
      title: "Sponsorship Interest",
      sections: [
        {
          title: "Areas & programmes",
          desc: "Choose the sectors you'd like to support — the programme list updates to match.",
          columns: 1,
          fields: [
            {
              key: "sectors",
              type: "sectors",
              label: "Which areas would you like to support?",
              required: true,
            },
            {
              key: "preferredSector",
              type: "select",
              label: "Preferred Sector / First Choice",
              optional: true,
              options: (v) => v.sectors?.sectors ?? [],
            },
            {
              key: "programmes",
              type: "chips",
              columns: 2,
              label: "Preferred Programme / Initiative",
              optional: true,
              options: programmeOptions,
            },
          ],
        },
        {
          title: "Type of support & contribution",
          fields: [
            {
              key: "supportTypes",
              type: "chips",
              columns: 3,
              span: 2,
              label: "What type of support would you like to provide?",
              required: true,
              options: [
                "Programme Sponsorship",
                "Project Sponsorship",
                "Community / Village Initiative Sponsorship",
                "Financial Support",
                "In-Kind Support",
                "Equipment / Infrastructure / Resource Support",
                "CSR Support",
                "Recurring Sponsorship",
                "Training / Technical / Professional Support",
                "Other — prefer to discuss",
              ],
            },
            {
              key: "estimate",
              type: "select",
              label: "Estimated Sponsorship Contribution",
              placeholder: "Select a range",
              options: [
                "Below ₹5,000",
                "₹5,000 – ₹25,000",
                "₹25,001 – ₹50,000",
                "₹50,001 – ₹1,00,000",
                "₹1,00,001 and above",
                "Sponsorship of a complete programme / project",
                "Prefer to discuss",
              ],
            },
            {
              key: "amount",
              type: "text",
              variant: "digits",
              maxLength: 10,
              label: "Proposed Amount (₹)",
              optional: true,
              placeholder: "Amount in rupees",
            },
            {
              key: "contributionType",
              type: "select",
              label: "Sponsorship Contribution Type",
              placeholder: "Select",
              options: [
                "Monetary Contribution",
                "Goods / Materials / Equipment",
                "Professional Services / Expertise",
                "Combination of Financial and Non-Financial Support",
                "To Be Discussed",
              ],
            },
            {
              key: "duration",
              type: "select",
              label: "Preferred Sponsorship Duration",
              required: true,
              options: [
                "One-Time Sponsorship",
                "Monthly Sponsorship",
                "Quarterly Sponsorship",
                "Annual Sponsorship",
                "Multi-Year Sponsorship",
                "Linked to a Specific Programme / Project",
                "Prefer to Discuss",
              ],
            },
          ],
        },
        {
          title: "Objective & expected impact",
          desc: "Amounts are indicative and not a binding commitment. Final scope and terms are mutually agreed.",
          fields: [
            {
              key: "objectives",
              type: "chips",
              columns: 3,
              span: 2,
              label: "What would you like your sponsorship to contribute towards?",
              required: true,
              options: [
                "Improving Access to Education",
                "Improving Access to Healthcare",
                "Skills Development and Employability",
                "Women Empowerment",
                "Youth Development and Leadership",
                "Agriculture and Rural Livelihoods",
                "Environmental Protection and Sustainability",
                "Humanitarian Assistance",
                "Community Infrastructure and Essential Resources",
                "Support for Vulnerable and Underserved Communities",
                "Other",
              ],
            },
            {
              key: "objective",
              type: "textarea",
              rows: 3,
              span: 2,
              label: "Please describe your sponsorship objective",
              required: true,
              placeholder:
                "The change you'd like to help achieve, intended beneficiaries or expected outcomes",
              validate: (val) =>
                String(val).trim().length < 20 ? "Please write at least 20 characters." : undefined,
            },
            {
              key: "targetArea",
              type: "text",
              label: "Village / Block / District",
              optional: true,
            },
            { key: "targetRegion", type: "text", label: "State / Region", optional: true },
            { key: "targetGroup", type: "text", label: "Target Beneficiary Group", optional: true },
            {
              key: "beneficiaries",
              type: "text",
              variant: "digits",
              maxLength: 7,
              label: "Estimated Number of Beneficiaries",
              optional: true,
            },
          ],
        },
        {
          title: "Engagement preferences",
          columns: 1,
          fields: [
            {
              key: "engagement",
              type: "chips",
              columns: 3,
              label: "How would you like to engage with ISLAH and the sponsored initiative?",
              optional: true,
              options: [
                "Financial Sponsorship Only",
                "Receive Programme Updates",
                "Receive Impact / Utilisation Reports",
                "Visit a Programme Location, Where Feasible",
                "Employee Volunteering",
                "Mentorship / Professional Expertise",
                "Knowledge-Sharing / Training",
                "Participate in Community Activities",
                "Explore a Long-Term Relationship",
                "Prefer to Discuss",
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Review & Submit",
      intro: "Check your details, then confirm the declarations below.",
      sections: [
        {
          title: "Additional information",
          fields: [
            ...hearAboutFields([
              "ISLAH Website",
              "Social Media",
              "Referral / Personal Contact",
              "Existing ISLAH Supporter or Partner",
              "Event / Workshop / Community Programme",
              "Corporate / Institutional Network",
              "Other",
            ]),
            {
              key: "comments",
              type: "textarea",
              rows: 2,
              label: "Additional Comments",
              optional: true,
            },
            {
              key: "supportingDoc",
              type: "file",
              accept: DOC_ACCEPT,
              label: "Supporting Document",
              optional: true,
              hint: "Proposal, organisation profile, CSR guidelines or concept note — up to 5 MB.",
            },
          ],
        },
        {
          title: "Sponsor recognition",
          desc: "Recognition applies only once a sponsorship is confirmed, and does not imply endorsement of any product or service.",
          columns: 3,
          fields: [
            recognitionField(
              "Would you like ISLAH to recognise your sponsorship publicly once confirmed?",
              [
                {
                  id: "public",
                  title: "Public Recognition",
                  desc: "Display my approved name or organisation name in the sponsor recognition section.",
                },
                {
                  id: "private",
                  title: "Private Recognition",
                  desc: "Keep my sponsorship private.",
                },
                {
                  id: "anonymous",
                  title: "Anonymous Recognition",
                  desc: "Recognise the sponsorship without disclosing my identity.",
                },
              ],
            ),
          ],
        },
        {
          title: "Public listing details",
          visibleIf: (v) => v.recognition === "public",
          fields: [
            { key: "displayName", type: "text", label: "Preferred Display Name", optional: true },
            {
              key: "displayWebsite",
              type: "text",
              inputType: "url",
              label: "Official Website Link",
              optional: true,
              placeholder: "https://",
            },
            {
              key: "displayDescription",
              type: "text",
              label: "Short Sponsorship Description",
              optional: true,
              span: 2,
            },
            {
              key: "logoConsent",
              type: "checkbox",
              label: "Logo permission",
              text: "I am authorised to permit ISLAH to display our organisation logo.",
              span: 2,
              visibleIf: isOrg,
            },
          ],
        },
        {
          title: "Declaration & consent",
          columns: 1,
          fields: [
            declaration(
              "declAccurate",
              "I confirm that the information provided is accurate to the best of my knowledge and that I am authorised to submit it, where applicable.",
            ),
            policyDeclaration(
              "declPolicy",
              "I have read and agree to ISLAH's",
              "Sponsorship Policy & Code of Conduct",
              "/sponsorship-policy",
            ),
            policyDeclaration(
              "declPrivacy",
              "I have read the",
              "Privacy Notice",
              "/privacy-policy",
              " and consent to the processing of my information for sponsorship enquiry management, review and communication.",
            ),
            declaration(
              "declNoGuarantee",
              "I understand that this application does not guarantee sponsorship approval, programme acceptance or public recognition, and that any sponsorship is subject to mutually agreed terms.",
            ),
            updatesDeclaration(
              "I would like to receive updates about ISLAH's programmes, sponsorship opportunities and community impact.",
            ),
          ],
        },
      ],
    },
  ],
  success: {
    title: "Sponsorship Application Received",
    body: "Thank you for your interest in supporting ISLAH. This is an enquiry, not a payment or a confirmed sponsorship. Our coordination team aims to contact you within 7 working days about suitable opportunities and next steps.",
    nextSteps: [
      {
        title: "Review",
        desc: "We review your interests, proposed contribution and preferred programme.",
      },
      {
        title: "Connect & Align",
        desc: "We clarify details and identify a suitable programme or initiative.",
      },
      {
        title: "Confirm",
        desc: "Scope, contribution, responsibilities and terms are mutually agreed.",
      },
      {
        title: "Support & Report",
        desc: "Your contribution supports the initiative, with agreed updates and documentation.",
      },
    ],
  },
};
