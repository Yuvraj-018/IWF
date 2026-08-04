export type ExtendedPolicySlug =
  | "cookie-policy"
  | "grievance-policy"
  | "medical-treatment-policy"
  | "child-protection-policy"
  | "code-of-conduct"
  | "financial-transparency-policy"
  | "governance-policy"
  | "anti-fraud-policy"
  | "volunteer-policy"
  | "partnership-policy"
  | "sponsorship-policy"
  | "mentorship-policy"
  | "donation-policy"
  | "employment-policy"
  | "disclaimer";

export interface PolicySection {
  heading: string;
  body: string | string[];
}

export interface PolicyData {
  title: string;
  subtitle: string;
  effectiveDate?: string;
  sections: PolicySection[];
}

export const EXTENDED_POLICY_CONTENT: Record<ExtendedPolicySlug, PolicyData> = {
  "cookie-policy": {
    title: "Cookie Policy",
    subtitle: "Understanding how Islah Welfare Foundation uses cookies and tracking technologies to improve visitor experience.",
    effectiveDate: "August 2026",
    sections: [
      {
        heading: "1. What Are Cookies?",
        body: "Cookies are small text files stored on your computer, mobile device, or browser when you visit a website. They help websites function efficiently, remember user preferences, and enhance overall browsing experience."
      },
      {
        heading: "2. How We Use Cookies",
        body: [
          "Ensure the proper functioning and security of the website.",
          "Improve website performance, load times, and user experience.",
          "Remember user preferences, language settings, and active filters.",
          "Analyse visitor traffic and website interaction patterns.",
          "Monitor the effectiveness of our content, awareness campaigns, and public outreach."
        ]
      },
      {
        heading: "3. Types of Cookies We Use",
        body: [
          "Essential Cookies: Necessary for the basic operation of our website, security, and page navigation.",
          "Performance & Analytics Cookies: Collect anonymous statistical data on visitor interactions to help us optimize page performance.",
          "Functional Cookies: Remember choices you make (such as language or region preferences) for a personalized experience.",
          "Third-Party Cookies: Set by trusted third-party providers for payment processing, embedded media, map location features, or analytics."
        ]
      },
      {
        heading: "4. Managing Cookies",
        body: "Most web browsers allow you to view, delete, or block cookies through browser settings. Please note that disabling certain essential cookies may affect website functionality and security."
      },
      {
        heading: "5. Third-Party Services",
        body: "We may integrate trusted third-party services for website analytics, secure payment gateway processing, embedded videos, and spam protection. These providers operate under their respective privacy policies."
      }
    ]
  },
  "grievance-policy": {
    title: "Grievance Redressal Policy",
    subtitle: "A fair, transparent, and respectful mechanism for addressing concerns and complaints at Islah Welfare Foundation.",
    effectiveDate: "August 2026",
    sections: [
      {
        heading: "1. Purpose & Commitment",
        body: "Islah Welfare Foundation (IWF) is committed to maintaining high standards of transparency, accountability, fairness, and ethical conduct. We value constructive feedback, concerns, and suggestions from beneficiaries, donors, members, volunteers, partners, and the public."
      },
      {
        heading: "2. Who Can Submit a Grievance?",
        body: [
          "Beneficiaries receiving medical, educational, or livelihood support.",
          "Donors, sponsors, and philanthropic partners.",
          "Registered members and active volunteers.",
          "Employees, consultants, and contractors.",
          "Any community member or individual affected by IWF's activities."
        ]
      },
      {
        heading: "3. Scope & Types of Grievances",
        body: [
          "Program implementation or service delivery concerns.",
          "Staff, volunteer, or representative conduct issues.",
          "Financial transparency and donation utilization queries.",
          "Discrimination, harassment, or non-compliance with organizational code.",
          "Website, data privacy, or communication issues."
        ]
      },
      {
        heading: "4. How to Submit a Grievance",
        body: "Grievances may be formally submitted in writing via email to grievance@iwfindia.org or info@iwfindia.org, or sent to our Registered Office: B-144, Shaheen Bagh, Jamia Nagar, Okhla, New Delhi."
      },
      {
        heading: "5. Resolution Process & Confidentiality",
        body: [
          "Every written grievance is formally acknowledged within 48 business hours.",
          "Complaints are reviewed confidentially and impartially by the designated Grievance Officer or Trustees.",
          "Appropriate verification or inquiry is conducted with strict non-retaliation protections for complainants.",
          "Findings and corrective measures are communicated to the complainant wherever applicable."
        ]
      }
    ]
  },
  "medical-treatment-policy": {
    title: "Fundraising for Critical Medical Treatment Policy",
    subtitle: "Governing the collection, verification, allocation, and management of funds raised for emergency healthcare patients.",
    effectiveDate: "August 2026",
    sections: [
      {
        heading: "1. Purpose & Scope",
        body: "Islah Welfare Foundation conducts medical fundraising campaigns to assist critically ill or injured individuals who cannot afford essential hospital care, surgeries, ICU support, or life-saving procedures."
      },
      {
        heading: "2. Individual Medical Campaigns & Treatment Targets",
        body: "Each fundraising campaign specifies an estimated treatment cost provided by treating hospitals or medical professionals. Actual treatment expenses may fluctuate based on patient diagnosis, medical complications, and hospital billing."
      },
      {
        heading: "3. Administrative & Program Management Cost Allocation",
        body: "Up to 20% of funds raised in medical fundraising campaigns may be allocated toward campaign verification, administrative overhead, compliance monitoring, diagnostic documentation, and program operational expenses. The actual percentage applied depends on individual campaign requirements."
      },
      {
        heading: "4. Shortfall & Surplus Fund Management",
        body: [
          "If funds raised are less than estimated costs, collected funds (after administrative allocation) are paid directly to treating hospitals/providers for eligible medical care.",
          "If total funds raised exceed required treatment costs or if treatment circumstances change (e.g. earlier discharge, hospital discount), verified medical expenses are settled first.",
          "Any remaining surplus is transferred to the IWF Medical Assistance Fund to support other needy medical emergency patients. Surplus amounts are non-refundable to individual donors."
        ]
      },
      {
        heading: "5. Direct Disbursement & Strict Verification",
        body: "Payments are made directly to hospitals, medical institutions, diagnostic centres, or pharmacies wherever possible. IWF reserves full right to verify identity, inspect medical documents, request progress updates, or suspend campaigns if fraudulent details are discovered."
      }
    ]
  },
  "child-protection-policy": {
    title: "Child Protection & Safeguarding Policy",
    subtitle: "Ensuring zero-tolerance against abuse, neglect, exploitation, and harm across all IWF child and youth initiatives.",
    effectiveDate: "August 2026",
    sections: [
      {
        heading: "1. Policy Statement & Commitment",
        body: "Islah Welfare Foundation has zero tolerance for any form of child abuse, exploitation, neglect, violence, harassment, or inappropriate conduct. The safety, dignity, and best interests of every child are central to our educational and community programs."
      },
      {
        heading: "2. Scope of Applicability",
        body: "This policy applies to all Trustees, staff members, volunteers, mentors, educators, partners, contractors, and visitors participating in or representing IWF programs, field visits, or online engagements."
      },
      {
        heading: "3. Mandatory Code of Conduct",
        body: [
          "Treat every child with dignity, equality, and utmost respect.",
          "Maintain clear professional boundaries at all times.",
          "Ensure all activities are conducted in safe, open, and supervised environments.",
          "Obtain proper consent from parents/guardians before taking photos or videos for official reporting.",
          "Physical abuse, corporal punishment, emotional intimidation, bullying, or abusive language are strictly prohibited."
        ]
      },
      {
        heading: "4. Safe Recruitment & Reporting",
        body: "All personnel working directly with children undergo identity verification and reference checks. Anyone who becomes aware of suspected child safeguarding concerns must report immediately through designated reporting channels."
      }
    ]
  },
  "code-of-conduct": {
    title: "Code of Conduct",
    subtitle: "Ethical standards, professional values, and behavioral guidelines for everyone associated with Islah Welfare Foundation.",
    effectiveDate: "August 2026",
    sections: [
      {
        heading: "1. Core Values",
        body: "Representatives of IWF must uphold integrity, honesty, human dignity, transparency, professionalism, non-discrimination, compassion, and strict compliance with applicable laws."
      },
      {
        heading: "2. Professional Standards & Inclusive Workplace",
        body: "All representatives must act responsibly, protect organizational reputation, use resources solely for authorized charitable purposes, and maintain an inclusive environment free from discrimination or harassment based on caste, gender, religion, age, or background."
      },
      {
        heading: "3. Integrity & Anti-Corruption",
        body: "Fraud, bribery, accepting improper gifts, falsification of records, or misrepresentation are strictly forbidden. Conflicts of interest must be disclosed promptly."
      },
      {
        heading: "4. Compliance & Reporting Misconduct",
        body: "Non-compliance with the Code of Conduct may result in corrective counseling, suspension, termination of engagement, or legal reporting where applicable."
      }
    ]
  },
  "financial-transparency-policy": {
    title: "Financial Transparency Policy",
    subtitle: "Principles of responsible stewardship, financial control, auditing, and public accountability at IWF.",
    effectiveDate: "August 2026",
    sections: [
      {
        heading: "1. Principle of Stewardship",
        body: "Islah Welfare Foundation manages every financial contribution with honesty, care, and statutory rigor to maximize social impact for rural and underserved communities."
      },
      {
        heading: "2. Financial Controls & Accounting",
        body: [
          "Maintaining complete, accurate books of accounts updated on daily computerized systems.",
          "Strict dual-authorization and internal financial controls for disbursements.",
          "Maintaining supporting documentation for all receipts and operational expenditures.",
          "Conducting regular internal, process, and statutory audits through qualified Chartered Accountants."
        ]
      },
      {
        heading: "3. Reporting & Public Disclosure",
        body: "IWF publishes audited financial statements, annual reports, program financial summaries, and statutory filings to maintain public confidence and donor trust."
      }
    ]
  },
  "governance-policy": {
    title: "Governance Policy",
    subtitle: "Four-tier organizational governance framework guiding leadership oversight and management at IWF.",
    effectiveDate: "August 2026",
    sections: [
      {
        heading: "1. Four-Tier Governance Framework",
        body: [
          "Board of Trustees: Highest decision-making authority defining vision, approving policies, and maintaining overall statutory oversight.",
          "Advisory Body: Experienced technical and sector experts providing strategic guidance and policy review.",
          "Executive Body / Management: Responsible for day-to-day operations, project execution, staff management, and financial control.",
          "Departments & Divisions: Operational teams conducting field implementation and monthly reviews."
        ]
      },
      {
        heading: "2. Accountability & Risk Management",
        body: "IWF remains accountable to beneficiaries, donors, government bodies, and the public by enforcing credibility norms, risk assessment procedures, and periodic reviews."
      }
    ]
  },
  "anti-fraud-policy": {
    title: "Anti-Fraud & Anti-Corruption Policy",
    subtitle: "Zero-tolerance policy against fraud, bribery, corruption, or financial misconduct.",
    effectiveDate: "August 2026",
    sections: [
      {
        heading: "1. Zero-Tolerance Statement",
        body: "IWF maintains zero tolerance for fraud, corruption, bribery, embezzlement, kickbacks, falsification of records, or abuse of authority across all operations."
      },
      {
        heading: "2. Prohibited Conduct & Controls",
        body: "No person representing IWF shall offer or accept bribes, misappropriate funds, submit false claims, or manipulate procurement processes. Financial segregation of duties and audit trails are enforced."
      },
      {
        heading: "3. Investigation & Non-Retaliation",
        body: "All reported concerns are investigated confidentially. Individuals reporting suspected misconduct in good faith are protected from retaliation."
      }
    ]
  },
  "volunteer-policy": {
    title: "Volunteer Policy",
    subtitle: "Rights, responsibilities, eligibility, and guidelines for individuals volunteering with Islah Welfare Foundation.",
    effectiveDate: "August 2026",
    sections: [
      {
        heading: "1. Principles of Volunteering",
        body: "Volunteers are vital partners in creating positive community impact. Volunteering with IWF is voluntary and does not constitute an employment relationship."
      },
      {
        heading: "2. Volunteer Rights & Responsibilities",
        body: [
          "Rights: To be treated with respect, receive clear orientation/guidance, work in safe environments, and receive certificates of appreciation.",
          "Responsibilities: Represent IWF ethically, uphold child safeguarding, protect confidential information, respect local customs, and refrain from political campaigning while representing IWF."
        ]
      },
      {
        heading: "3. Intellectual Property & Expenses",
        body: "Volunteering is unpaid unless specific prior written expense reimbursements are approved. Materials created during volunteer service remain organizational property."
      }
    ]
  },
  "partnership-policy": {
    title: "Partnership Policy",
    subtitle: "Guidelines for establishing and managing collaborations with CSR corporates, NGOs, institutions, and government bodies.",
    effectiveDate: "August 2026",
    sections: [
      {
        heading: "1. Purpose & Eligible Partners",
        body: "IWF welcomes strategic collaborations with CSR corporate entities, government departments, educational institutions, healthcare centers, NGOs, and philanthropic foundations to amplify social impact."
      },
      {
        heading: "2. Core Partnership Principles",
        body: [
          "Mutual trust, transparency, and shared ethical values.",
          "Compliance with applicable laws and statutory guidelines.",
          "Regular monitoring, progress reporting, and financial accountability.",
          "Proper branding compliance requiring prior written approval for name and logo usage."
        ]
      }
    ]
  },
  "sponsorship-policy": {
    title: "Sponsorship Policy",
    subtitle: "Terms governing program, project, event, and initiative sponsorships at IWF.",
    effectiveDate: "August 2026",
    sections: [
      {
        heading: "1. Types of Sponsorship",
        body: "IWF accepts Program, Project, Event, Education, Healthcare, Infrastructure, and In-kind sponsorships from corporate CSR entities, foundations, businesses, and individual sponsors."
      },
      {
        heading: "2. Transparency & Recognition",
        body: "Sponsorship funds are strictly utilized for agreed objectives. Sponsors may be acknowledged through website listings, annual reports, program publications, or certificates of appreciation without implying commercial endorsement."
      }
    ]
  },
  "mentorship-policy": {
    title: "Mentorship Policy",
    subtitle: "Connecting students, youth, and women with experienced mentors and subject matter experts.",
    effectiveDate: "August 2026",
    sections: [
      {
        heading: "1. Objectives of Mentorship",
        body: "Providing academic guidance, career support, skill enhancement, digital literacy, and leadership development to underprivileged youth, students, and women."
      },
      {
        heading: "2. Mentor Guidelines",
        body: [
          "Mentors must possess relevant academic or professional experience.",
          "Mentors must comply with IWF Code of Conduct and Child Safeguarding guidelines.",
          "Mentors act in a supportive capacity without seeking commercial or personal benefits."
        ]
      }
    ]
  },
  "donation-policy": {
    title: "Donation Policy",
    subtitle: "Guidelines governing voluntary contributions, tax exemptions (80G), and donor stewardship.",
    effectiveDate: "August 2026",
    sections: [
      {
        heading: "1. Voluntary Contributions",
        body: "All donations to IWF are voluntary contributions supporting education, healthcare, skill development, women empowerment, emergency relief, and rural development."
      },
      {
        heading: "2. Tax Exemption & Receipts",
        body: "Eligible Indian donations qualify for tax exemption benefits under Section 80G of the Income Tax Act, 1961. Official donation receipts and Form 10BE are issued upon successful payment verification."
      },
      {
        heading: "3. Non-Refundable Nature",
        body: "Donations are generally non-refundable as they are committed to ongoing charitable projects. Duplicate or technical error transactions may be reviewed under our Refund Policy."
      }
    ]
  },
  "employment-policy": {
    title: "Employment Policy",
    subtitle: "Recruitment standards, equal opportunity, workplace ethics, and professional conduct for IWF staff.",
    effectiveDate: "August 2026",
    sections: [
      {
        heading: "1. Equal Opportunity Employer",
        body: "IWF is an equal opportunity employer. Selection is strictly based on merit, qualifications, competence, and integrity without discrimination."
      },
      {
        heading: "2. Workplace Culture & Obligations",
        body: "Employees must maintain professional conduct, child safeguarding, confidentiality, safety standards, and dedication to social welfare mission."
      }
    ]
  },
  disclaimer: {
    title: "Disclaimer & Legal Notice",
    subtitle: "General informational disclaimer regarding programs, operational scope, and website content.",
    effectiveDate: "August 2026",
    sections: [
      {
        heading: "1. General Information Purpose",
        body: "Information provided on this website reflects the vision, objectives, and activities of Islah Welfare Foundation (IWF). Some featured programs are operational while others represent proposed or planned initiatives subject to funds, capacity, and community needs."
      },
      {
        heading: "2. Program Scope & Modifications",
        body: "Inclusion of any project or initiative does not guarantee immediate execution. IWF reserves the right to modify, adjust, postpone, or discontinue programs without prior notice as resources evolve."
      }
    ]
  }
};
