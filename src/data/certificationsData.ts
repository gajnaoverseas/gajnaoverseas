// Certifications and registrations data for the EthicalSourcing component

export interface Certification {
  name: string;
  logo: string;
  alt: string;
  desc: string;
  hasViewButton?: boolean;
  certificateImages?: string[];
}

const certificationsData: Certification[] = [
  {
    name: "Coffee Board ",
    logo: "/logos/1.webp",
    alt: "Coffee Board of India logo",
    desc: "Registration-Cum-Membership Certificate",
    hasViewButton: true,
    certificateImages: ["/certificates/Certificate1.webp",],
  },
  {
    name: "Coffee Board",
    logo: "/logos/1.webp",
    alt: "Indian Coffee Association logo",
    desc: "Coffee Entrepreneurship Certificate of Participation",
    hasViewButton: true,
    certificateImages: ["/certificates/Certificate2.webp"],
  },
  {
    name: "Coffee Board",
    logo: "/logos/1.webp",
    alt: "Indian Coffee Association logo",
    desc: "Coffee Exporter’s Training Programme",
    hasViewButton: true,
    certificateImages: ["/certificates/Certificate3.webp"],
  },
  {
    name: "Federation of Indian Export Organizations",
    logo: "/logos/7.webp",
    alt: "Federation of Indian Export Organizations logo",
    desc: "Federation of Indian Export Organizations",
  },
  {
    name: "Directorate General of Foreign Trade",
    logo: "/logos/6.webp",
    alt: "Directorate General of Foreign Trade logo",
    desc: "Directorate General of Foreign Trade",
  },
  {
    name: "Government of India",
    logo: "/logos/2.webp",
    alt: "Government of India logo",
    desc: "Registration Certificate",
    hasViewButton: true,
    certificateImages: ["/certificates/Certificate5.webp"],
  },
  {
    name: "Ministry of Corporate Affairs",
    logo: "/logos/8.webp",
    alt: "Ministry of Corporate Affairs logo",
    desc: "Certificate of Incorporation",
    hasViewButton: true,
    certificateImages: ["/certificates/Certificate4.webp", "/certificates/Certificate5.webp"],
  },
  {
    name: "MSME",
    logo: "/logos/9.webp",
    alt: "MSME logo",
    desc: "Micro, Small, and Medium Enterprises",
  },
  {
    name: "Importer-Exporter Code",
    logo: "/logos/11.webp",
    alt: "Importer-Exporter Code logo",
    desc: "Importer-Exporter Code",
    hasViewButton: true,
    certificateImages: ["/certificates/Certificate6.webp"],
  },
  {
    name: "Certificate of Participation, VIKRAYAM, Coffee Entrepreneurship",
    logo: "/logos/3.webp",
    alt: "Certificate of Participation, VIKRAYAM, Coffee Entrepreneurship logo",
    desc: "Certificate of Participation, VIKRAYAM, Coffee Entrepreneurship",
    hasViewButton: true,
    certificateImages: ["/certificates/Certificate2.webp", "/certificates/Certificate3.webp"],
  },
  {
    name: "GST Registration Certificate",
    logo: "/logos/10.webp",
    alt: "GST Registration Certificate logo",
    desc: "GST Registration Certificate",
    hasViewButton: true,
    certificateImages: ["/certificates/Certificate5.webp"],
  },
  {
    name: "PAN Card",
    logo: "/logos/12.webp",
    alt: "PAN Card logo",
    desc: "PAN Card",
    hasViewButton: true,
    certificateImages: ["/certificates/Certificate7.webp"],
  },
];

export default certificationsData;
