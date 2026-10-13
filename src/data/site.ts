// All site content lives here. Edit this file to update the site.

export const site = {
  name: "Stavros Giannis",
  role: "Senior Software Engineer",
  location: "Düsseldorf, Germany",
  email: "contact@stavros-giannis.de",
  description:
    "Stavros Giannis, Senior Software Engineer in Düsseldorf. Cloud platforms on Azure and .NET, with a background in cyber security.",
  intro:
    "I build secure, scalable platforms on Azure and .NET. Currently a senior software engineer at KPMG Deutschland, with a background in cyber security and ISO 27001 auditing.",
  links: [
    { label: "GitHub", handle: "@stavrosgiannis", href: "https://github.com/stavrosgiannis", icon: "github" },
    { label: "LinkedIn", handle: "in/stavros-giannis", href: "https://www.linkedin.com/in/stavros-giannis-76818719b/", icon: "linkedin" },
  ],
};

export const highlights = [
  { value: "90%", label: "faster report generation after refactoring to Azure Functions microservices" },
  { value: "40+", label: "engineers in the global team I co-lead at KPMG" },
  { value: "B.Sc.", label: "Cyber Security Management, Hochschule Niederrhein" },
];

export type Job = {
  company: string;
  role: string;
  period: string;
  summary?: string;
  points: string[];
};

export const experience: Job[] = [
  {
    company: "KPMG Deutschland",
    role: "Senior Software Engineer",
    period: "Jan 2026 – present",
    points: [
      "Co-lead a global team of 40+ engineers delivering KPMG's Transfer Pricing Reporting platform.",
      "Design and run the Azure infrastructure behind the platform's application services and report generation workloads.",
      "Cut report generation time by 90% through targeted refactoring and Azure Functions-based microservices.",
      "Introduced a modular RBAC architecture for role-based access across platform modules.",
      "Lead security scan remediation and compliance-focused reporting across the platform.",
    ],
  },
  {
    company: "KPMG Deutschland",
    role: "Software Engineer",
    period: "May 2025 – Jan 2026",
    summary: "Transfer Pricing Reporting System: automates how transfer pricing reports are managed and generated.",
    points: [
      "Gathered and analysed requirements with stakeholders.",
      "Contributed to architectural decisions.",
      "Delivered key features on schedule.",
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    title: "WLAN-CSI AI",
    description: "An AI project on WLAN Channel State Information (CSI).",
    tags: ["Python", "Machine Learning", "Security"],
  },
];

export const skills = [
  { group: "Languages", items: ["C#", "TypeScript", "Python", "C++", "Go", "Java"] },
  { group: "Frameworks", items: [".NET / ASP.NET", "Angular", "React", "Node.js", "WPF"] },
  { group: "Cloud & data", items: ["Azure", "Azure Functions", "PostgreSQL", "MongoDB", "Redis"] },
  { group: "Security", items: ["ISO 27001 auditing", "RBAC design", "Vulnerability remediation"] },
];

/** The big floating keys on the 3D homepage. `key` is the physical keyboard shortcut. */
export const sections = [
  { id: "about", key: "A", label: "About" },
  { id: "experience", key: "E", label: "Experience" },
  { id: "work", key: "W", label: "Work" },
  { id: "stack", key: "S", label: "Stack" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
