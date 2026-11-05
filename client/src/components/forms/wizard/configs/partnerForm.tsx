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

const isIndividual = (v: Values) => v.partnerType === "Individual";
const isOrg = (v: Values) => Boolean(v.partnerType) && v.partnerType !== "Individual";

const PARTNER_TYPES = [
  "Individual",
  "Company / Corporate",
  "CSR Foundation / CSR Initiative",
  "NGO / Civil Society Organisation",
  "Educational Institution",
  "University / Research Institution",
  "Government / Public Institution",
  "Professional Body",
  "Community Organisation",
  "Other",
];

export const partnerFormConfig: WizardConfig = {
  id: "partner",
  applicationType: "partner",
  refPrefix: "PAR",
  initial: { ...locationInitial(), whatsappCode: "+91" },
  toPayload: (v) => ({
    fullName: (isIndividual(v) ? v.fullName : v.contactName).trim(),
    email: v.email.trim(),
    phone: v.phone,
    countryCode: v.countryCode || "+91",
    city: v.city,
    state: v.state,
    organization: isIndividual(v) ? v.affiliation : v.orgName,
    message: v.contributionDetail,
  }),
  steps: [
    {
      title: "Partner Details",
      sections: [
        {
          title: "Partner category",
          fields: [
            {
              key: "partnerType",
              type: "select",
              options: PARTNER_TYPES,
              label: "What type of partner are you applying as?",
              required: true,
              placeholder: "Select partner type",
              hint: "The fields below adapt to your selection.",
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
              maxLength: 60,
            },
            {
              key: "designation",
              type: "text",
              label: "Professional Designation / Occupation",
              optional: true,
            },
            {
              key: "affiliation",
              type: "text",
              label: "Organisation / Affiliation",
              optional: true,
            },
            {
              key: "profileUrl",
              type: "text",
              inputType: "url",
              label: "Website / Professional Profile",
              optional: true,
              placeholder: "https://",
            },
          ],
        },
        {
          title: "Organisation details",
          desc: "Registration details may be requested during due diligence.",
          visibleIf: isOrg,
          fields: [
            {
              key: "orgName",
              type: "text",
              label: "Legal Name of Organisation",
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
                "Government Body",
                "Educational Institution",
                "Other",
              ],
            },
            {
              key: "orgYear",
              type: "text",
              variant: "year",
              label: "Year of Establishment",
              optional: true,
              placeholder: "YYYY",
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
              key: "orgRegNumber",
              type: "text",
              label: "Registration Number / Legal ID",
              optional: true,
              hint: "Where applicable.",
            },
          ],
        },
        { ...locationSection({ title: "Address", visibleIf: (v) => Boolean(v.partnerType) }) },
        {
          title: "Authorised contact",
          desc: "For organisations, the contact person should be authorised to communicate on its behalf.",
          visibleIf: (v) => Boolean(v.partnerType),
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
              required: isOrg,
              optional: false,
              visibleIf: isOrg,
            },
            {
              key: "email",
              type: "text",
              inputType: "email",
              label: "Official Email Address",
              required: true,
              placeholder: "name@organisation.org",
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
          ],
        },
      ],
    },
    {
      title: "Partnership Proposal",
      sections: [
        {
          title: "Areas of interest",
          desc: "Which areas of ISLAH's work are you interested in supporting?",
          columns: 1,
          fields: [
            { key: "sectors", type: "sectors", label: "Areas of interest", required: true },
            {
              key: "preferredSector",
              type: "select",
              label: "Preferred Sector / First Choice",
              optional: true,
              options: (v) => v.sectors?.sectors ?? [],
            },
          ],
        },
        {
          title: "Type of partnership & contribution",
          fields: [
            {
              key: "partnershipTypes",
              type: "chips",
              columns: 3,
              span: 2,
              label: "What type of partnership are you interested in?",
              required: true,
              options: [
                "CSR Partnership",
                "Programme / Project Partnership",
                "Institutional Collaboration",
                "Knowledge & Research Partnership",
                "Technical / Professional Partnership",
                "Infrastructure / Equipment / Resource Support",
                "Training & Capacity-Building Partnership",
                "Joint Community Initiative",
                "Networking / Strategic Alliance",
                "Other — prefer to discuss",
              ],
            },
            {
              key: "contributions",
              type: "chips",
              columns: 3,
              span: 2,
              label: "What would you like to contribute?",
              required: true,
              options: [
                "Financial Support / Programme Funding",
                "Technical or Professional Expertise",
                "Technology / Digital Solutions",
                "Training / Capacity Building",
                "Infrastructure / Equipment / Materials",
                "Knowledge / Research / Publications",
                "Volunteers / Human Resources",
                "Networks / Institutional Linkages",
                "Community Outreach / Field Support",
                "Other — prefer to discuss",
              ],
            },
            {
              key: "contributionDetail",
              type: "textarea",
              rows: 3,
              span: 2,
              label: "Please describe your proposed contribution",
              required: true,
              placeholder:
                "Resources, expertise, services, funding or opportunities you could offer",
              validate: (val) =>
                String(val).trim().length < 20 ? "Please write at least 20 characters." : undefined,
            },
          ],
        },
        {
          title: "Proposed collaboration & outcomes",
          fields: [
            {
              key: "collaboration",
              type: "textarea",
              rows: 3,
              label: "How do you envision working with ISLAH?",
              required: true,
              placeholder: "Your proposed role and any programme you'd like to develop jointly",
              validate: (val) =>
                String(val).trim().length < 20 ? "Please write at least 20 characters." : undefined,
            },
            {
              key: "outcomes",
              type: "textarea",
              rows: 3,
              label: "What would you like to achieve through this partnership?",
              optional: true,
              placeholder: "Intended outcomes, beneficiaries, geography and impact",
            },
            {
              key: "proposedLocation",
              type: "text",
              label: "Proposed Location / Area of Operation",
              optional: true,
              placeholder: "Village / Block / District / State",
            },
            {
              key: "targetCommunity",
              type: "text",
              label: "Target Community / Beneficiary Group",
              optional: true,
            },
            {
              key: "timeline",
              type: "pills",
              span: 2,
              label: "Proposed Timeline",
              options: [
                "Immediate / Short-Term",
                "Within 3–6 Months",
                "Within 6–12 Months",
                "Long-Term Collaboration",
                "To Be Discussed",
              ],
            },
          ],
        },
        {
          title: "Supporting documents",
          desc: "Optional at the application stage. PDF, DOC or images up to 5 MB each.",
          columns: 3,
          fields: [
            {
              key: "docProfile",
              type: "file",
              accept: DOC_ACCEPT,
              label: "Organisation Profile",
              optional: true,
            },
            {
              key: "docRegistration",
              type: "file",
              accept: DOC_ACCEPT,
              label: "Registration / Credentials",
              optional: true,
            },
            {
              key: "docCsr",
              type: "file",
              accept: DOC_ACCEPT,
              label: "CSR Profile / Funding Guidelines",
              optional: true,
            },
            {
              key: "docConcept",
              type: "file",
              accept: DOC_ACCEPT,
              label: "Concept Note / Proposal",
              optional: true,
            },
            {
              key: "docAuthorisation",
              type: "file",
              accept: DOC_ACCEPT,
              label: "Letter of Interest / Authorisation",
              optional: true,
            },
            {
              key: "docCredentials",
              type: "file",
              accept: DOC_ACCEPT,
              label: "Professional Credentials",
              optional: true,
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
              "Existing ISLAH Partner",
              "Event / Workshop / Community Programme",
              "Institutional / Professional Network",
              "Other",
            ]),
            {
              key: "comments",
              type: "textarea",
              rows: 2,
              span: 2,
              label: "Additional Comments",
              optional: true,
            },
          ],
        },
        {
          title: "Partner directory recognition",
          desc: "Public listing happens only after partnership approval. Logo use requires separate permission.",
          columns: 3,
          fields: [
            recognitionField(
              "Would you like ISLAH to display your name or organisation in its Partner Directory if approved?",
              [
                {
                  id: "public",
                  title: "Public Recognition",
                  desc: "Display my name or my organisation's approved name in the Partner Directory.",
                },
                {
                  id: "private",
                  title: "Private Recognition",
                  desc: "Don't display my name or organisation publicly.",
                },
                {
                  id: "anonymous",
                  title: "Anonymous Recognition",
                  desc: "Any recognition will be non-identifying.",
                },
              ],
            ),
          ],
        },
        {
          title: "Public listing details",
          visibleIf: (v) => isOrg(v) && v.recognition === "public",
          fields: [
            {
              key: "displayName",
              type: "text",
              label: "Display Name of Organisation",
              optional: true,
            },
            {
              key: "displayWebsite",
              type: "text",
              inputType: "url",
              label: "Approved Website Link",
              optional: true,
              placeholder: "https://",
            },
            {
              key: "displayDescription",
              type: "text",
              label: "Approved Partnership / Sector Description",
              optional: true,
              span: 2,
            },
            {
              key: "logoConsent",
              type: "checkbox",
              label: "Logo permission",
              text: "I am authorised to permit ISLAH to display our organisation logo.",
              span: 2,
            },
          ],
        },
        {
          title: "Declaration & consent",
          columns: 1,
          fields: [
            declaration(
              "declAccurate",
              "I confirm that the information provided is accurate to the best of my knowledge and that I am authorised to submit it where applicable.",
            ),
            policyDeclaration(
              "declPolicy",
              "I have read and agree to ISLAH's",
              "Partnership Policy & Code of Conduct",
              "/partnership-policy",
            ),
            declaration(
              "declNoGuarantee",
              "I acknowledge that submitting this application does not guarantee approval, funding, endorsement or formal partnership.",
            ),
            policyDeclaration(
              "declPrivacy",
              "I have read the",
              "Privacy Notice",
              "/privacy-policy",
              " and consent to the use of my information for application review, communication, due diligence and partnership administration.",
            ),
            updatesDeclaration(
              "I would like to receive updates about ISLAH's programmes, partnership opportunities and community impact.",
            ),
          ],
        },
      ],
    },
  ],
  success: {
    title: "Partnership Application Received",
    body: "Thank you for your interest in collaborating with ISLAH. Our coordination team will review your application and aims to contact you within 7 working days regarding the next step. This is a target response time, not a guarantee of approval.",
    nextSteps: [
      { title: "Initial Review", desc: "We review your application and eligibility." },
      {
        title: "Discussion & Mapping",
        desc: "We understand your interests, resources and objectives.",
      },
      {
        title: "Partnership Concept",
        desc: "Together we identify a suitable collaboration opportunity.",
      },
      {
        title: "Agreement & Launch",
        desc: "Roles and terms are documented, then implementation begins.",
      },
    ],
  },
};
