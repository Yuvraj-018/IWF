import { QUALIFICATIONS } from "@/components/forms/formRules";
import { SERVICE_LOCATIONS } from "@/content/sectorCatalogue";
import type { WizardConfig } from "../ApplicationWizard";
import {
  DOC_ACCEPT,
  PREFERRED_DAYS,
  declaration,
  hearAboutFields,
  locationInitial,
  locationSection,
  personalSection,
  policyDeclaration,
  recognitionField,
  updatesDeclaration,
} from "../fieldKit";

export const volunteerFormConfig: WizardConfig = {
  id: "volunteer",
  applicationType: "volunteer",
  refPrefix: "VOL",
  initial: { ...locationInitial() },
  toPayload: (v) => ({
    fullName: v.fullName.trim(),
    email: v.email.trim(),
    phone: v.phone,
    countryCode: v.countryCode || "+91",
    city: v.city,
    state: v.state,
    organization: v.organisation,
    message: v.motivation,
  }),
  steps: [
    {
      title: "About You",
      sections: [
        personalSection({
          ageGroups: ["Under 18", "18–24", "25–34", "35–44", "45–54", "55 and above"],
        }),
        locationSection(),
        {
          title: "Education & professional background",
          fields: [
            {
              key: "qualification",
              type: "select",
              options: QUALIFICATIONS,
              label: "Highest Educational Qualification",
              placeholder: "Select qualification",
            },
            {
              key: "occupation",
              type: "select",
              label: "Current Occupation",
              placeholder: "Select occupation",
              options: [
                "Student",
                "Employed — Private Sector",
                "Employed — Government / Public Sector",
                "Self-employed / Entrepreneur",
                "Academic / Research Professional",
                "Retired",
                "Homemaker",
                "Not currently employed",
                "Other",
              ],
            },
            {
              key: "organisation",
              type: "text",
              label: "Organisation / Institution",
              optional: true,
              placeholder: "College, university or employer",
            },
            {
              key: "fieldOfStudy",
              type: "text",
              label: "Professional Profile / Field of Study",
              optional: true,
              placeholder: "Your profession or subject",
            },
          ],
        },
      ],
    },
    {
      title: "Interests & Availability",
      sections: [
        {
          title: "Areas of interest",
          desc: "Select one or more sectors, then pick the specific areas you'd like to help with.",
          columns: 1,
          fields: [
            {
              key: "sectors",
              type: "sectors",
              label: "Which areas would you like to contribute to?",
              required: true,
              noReview: false,
            },
            {
              key: "preferredSector",
              type: "select",
              label: "Preferred Sector / First Choice",
              optional: true,
              placeholder: "Select your primary area",
              options: (v) => v.sectors?.sectors ?? [],
            },
          ],
        },
        {
          title: "Skills & experience",
          fields: [
            {
              key: "skills",
              type: "chips",
              label: "Skills / Expertise",
              required: true,
              span: 2,
              columns: 3,
              options: [
                "Teaching and mentoring",
                "Healthcare / medical expertise",
                "Research and analysis",
                "Accounting and finance",
                "Legal knowledge",
                "Information technology / digital skills",
                "Graphic design and creative work",
                "Communication and social media",
                "Event management",
                "Community mobilisation",
                "Agriculture and rural development",
                "Project management and administration",
                "Fundraising and partnership development",
                "Other",
              ],
            },
            {
              key: "volunteeredBefore",
              type: "pills",
              options: ["Yes", "No"],
              label: "Have you volunteered before?",
              required: true,
            },
            {
              key: "prevOrg",
              type: "text",
              label: "Previous Organisation / Initiative",
              optional: true,
              visibleIf: (v) => v.volunteeredBefore === "Yes",
            },
            {
              key: "prevExperience",
              type: "textarea",
              rows: 2,
              span: 2,
              label: "Brief Description of Previous Volunteering",
              optional: true,
              visibleIf: (v) => v.volunteeredBefore === "Yes",
              placeholder: "Your responsibilities and activities",
            },
            {
              key: "additionalSkills",
              type: "textarea",
              rows: 2,
              span: 2,
              label: "Additional Skills or Relevant Experience",
              optional: true,
            },
          ],
        },
        {
          title: "Availability & preferences",
          fields: [
            {
              key: "mode",
              type: "pills",
              options: ["On-site / Field-based", "Online / Remote", "Hybrid"],
              label: "Preferred Volunteer Mode",
              required: true,
              span: 2,
            },
            {
              key: "location",
              type: "chips",
              options: [...SERVICE_LOCATIONS, "Flexible / Remote"],
              columns: 3,
              label: "Preferred Location",
              required: true,
              span: 2,
            },
            {
              key: "otherLocation",
              type: "text",
              label: "Other Preferred Location",
              required: true,
              visibleIf: (v) => v.location?.includes("Other location"),
            },
            {
              key: "days",
              type: "chips",
              options: PREFERRED_DAYS,
              label: "Preferred Days",
              required: true,
              span: 2,
              columns: 3,
            },
            {
              key: "timeCommitment",
              type: "select",
              label: "Time Commitment",
              required: true,
              options: [
                "1–2 hours per week",
                "3–5 hours per week",
                "6–10 hours per week",
                "More than 10 hours per week",
                "Occasional / event-based",
                "To be discussed",
              ],
            },
            {
              key: "startDate",
              type: "date",
              futureOnly: true,
              label: "Preferred Start Date",
              optional: true,
            },
            {
              key: "contributionType",
              type: "chips",
              columns: 3,
              span: 2,
              label: "Preferred Contribution Type",
              required: true,
              options: [
                "Regular volunteering",
                "Project-based contribution",
                "Event-based volunteering",
                "Professional / technical assistance",
                "Mentoring",
                "Research or content contribution",
                "Flexible, depending on opportunity",
              ],
            },
          ],
        },
        {
          title: "Motivation",
          fields: [
            {
              key: "motivation",
              type: "textarea",
              rows: 3,
              span: 2,
              label: "Why would you like to volunteer with ISLAH?",
              required: true,
              placeholder:
                "What motivates you, which community issues matter to you, and how you hope to contribute",
              validate: (val) =>
                String(val).trim().length < 20 ? "Please write at least 20 characters." : undefined,
            },
            {
              key: "learnGoals",
              type: "textarea",
              rows: 2,
              span: 2,
              label: "What would you like to contribute or learn through volunteering?",
              optional: true,
            },
          ],
        },
        {
          title: "Documents",
          desc: "Upload only what is necessary. Don't upload sensitive documents unless requested.",
          columns: 3,
          fields: [
            {
              key: "photo",
              type: "file",
              accept: "image/jpeg,image/png,image/webp",
              imageOnly: true,
              label: "Profile Photograph",
              optional: true,
            },
            {
              key: "idProof",
              type: "file",
              accept: DOC_ACCEPT,
              label: "Identity Proof",
              optional: true,
              hint: "Only if appropriate for the role.",
            },
            {
              key: "supportingDoc",
              type: "file",
              accept: DOC_ACCEPT,
              label: "CV / Portfolio / Certificates",
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
            ...hearAboutFields(
              [
                "ISLAH website",
                "Social media",
                "Friend or family",
                "Educational institution",
                "Community organisation",
                "Volunteer / mentor referral",
                "Event or campaign",
                "Other",
              ],
              "If referred, please mention the name",
            ),
            {
              key: "anythingElse",
              type: "textarea",
              rows: 2,
              span: 2,
              label: "Anything else you would like us to know?",
              optional: true,
            },
          ],
        },
        {
          title: "Volunteer recognition",
          desc: "Public recognition is optional and does not affect your application. Photos, profiles or stories are never published without separate permission.",
          columns: 3,
          fields: [
            recognitionField(
              "Would you like your name displayed on the ISLAH website as a volunteer?",
              [
                {
                  id: "public",
                  title: "Public Recognition",
                  desc: "Display my name in an appropriate volunteer recognition area.",
                },
                {
                  id: "private",
                  title: "Private Recognition",
                  desc: "Don't display my name. ISLAH may recognise me directly.",
                },
                {
                  id: "anonymous",
                  title: "Anonymous",
                  desc: "I prefer not to be publicly identified or recognised.",
                },
              ],
            ),
          ],
        },
        {
          title: "Declaration & consent",
          columns: 1,
          fields: [
            declaration(
              "declAccurate",
              "I confirm that the information provided in this application is true and accurate to the best of my knowledge.",
            ),
            policyDeclaration(
              "declPolicy",
              "I have read and agree to the",
              "Volunteer Policy & Code of Conduct",
              "/volunteer-policy",
              ", and agree to abide by the applicable requirements if accepted as a volunteer.",
            ),
            declaration(
              "declProcessing",
              "I understand that ISLAH will use the information I provide to review my application and contact me about volunteering opportunities, in accordance with its privacy notice.",
            ),
            updatesDeclaration(
              "I would like to receive updates about ISLAH's programmes, volunteering opportunities and impact. I may opt out at any time.",
            ),
          ],
        },
      ],
    },
  ],
  success: {
    title: "Volunteer Application Received",
    body: "Thank you for your interest in volunteering with ISLAH. Our coordination team will review your application and aims to contact you within 7 working days regarding the next step. This is a target response time, not a guarantee of selection or placement.",
    nextSteps: [
      {
        title: "Application Review",
        desc: "We review your interests, skills, experience and availability.",
      },
      {
        title: "Volunteer Interaction",
        desc: "Where needed, we contact you for a brief conversation or clarification.",
      },
      {
        title: "Orientation & Guidance",
        desc: "Selected applicants receive orientation, role information and guidance.",
      },
      {
        title: "Begin Your Journey",
        desc: "Start contributing online, hybrid or in the field after onboarding.",
      },
    ],
  },
};
