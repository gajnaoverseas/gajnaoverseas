// Certifications and registrations data for the EthicalSourcing component

export interface Certification {
  name: string;
  logo: string;
  alt: string;
  title: string;
  desc: string;
  hasViewButton?: boolean;
  certificateImages?: string[];
}

const certificationsData: Certification[] = [
  {
    name: "Coffee Board ",
    logo: "/logos/1.webp",
    alt: "Coffee Board of India logo",
    title: "Coffee Board",
    desc: "Registration-Cum-Membership Certificate",
    hasViewButton: true,
    certificateImages: ["/certificates/Certificate1.webp",],
  },
  {
    name: "Coffee Board",
    logo: "/logos/1.webp",
    alt: "Indian Coffee Association logo",
    title: "Coffee Board",
    desc: "Coffee Entrepreneurship Certificate of Participation",
    hasViewButton: true,
    certificateImages: ["/certificates/Certificate2.webp"],
  },
  {
    name: "Coffee Board",
    logo: "/logos/1.webp",
    alt: "Indian Coffee Association logo",
    title: "Coffee Board",
    desc: "Coffee Exporter’s Training Programme",
    hasViewButton: true,
    certificateImages: ["/certificates/Certificate3.webp"],
  },
  {
    name: "Federation of Indian Export Organizations",
    logo: "/logos/7.webp",
    alt: "Federation of Indian Export Organizations logo",
    desc: "",
    title: "Federation of Indian Export Organizations",
  },
  {
    name: "Directorate General of Foreign Trade",
    logo: "/logos/6.webp",
    alt: "Directorate General of Foreign Trade logo",
    title: "Directorate General of Foreign Trade",
    desc: "",
  },
    {
    name: "Certificate of Participation, VIKRAYAM, Coffee Entrepreneurship",
    logo: "/logos/3.webp",
    alt: "Certificate of Participation, VIKRAYAM, Coffee Entrepreneurship logo",
    title: "AIC CCRI CED",
    desc: "Coffee Exporter’s Training Programme",
    hasViewButton: true,
    certificateImages: ["/certificates/Certificate2.webp", "/certificates/Certificate3.webp"],
  },
    {
    name: "Certificate of Participation, VIKRAYAM, Coffee Entrepreneurship",
    logo: "/logos/3.webp",
    alt: "Certificate of Participation, VIKRAYAM, Coffee Entrepreneurship logo",
    title: "AIC CCRI CED",
    desc: "Coffee Entrepreneurship Certificate of Participation",
    hasViewButton: true,
    certificateImages: ["/certificates/Certificate3.webp", "/certificates/Certificate3.webp"],
  },
  {
    name: "Government of India",
    logo: "/logos/2.webp",
    alt: "Government of India logo",
    title: "Registration Certificate",
    desc: "",
    hasViewButton: true,
    certificateImages: ["/certificates/Certificate5.webp"],
  },
  {
    name: "Ministry of Corporate Affairs",
    logo: "/logos/8.webp",
    alt: "Ministry of Corporate Affairs logo",
    title: "Certificate of Incorporation",
    desc: "",
    hasViewButton: true,
    certificateImages: ["/certificates/Certificate4.webp", "/certificates/Certificate5.webp"],
  },
  {
    name: "MSME",
    logo: "/logos/9.webp",
    alt: "MSME logo",
    title: "Micro, Small, and Medium Enterprises",
    desc: "",
  },
  {
    name: "Importer-Exporter Code",
    logo: "/logos/11.webp",
    alt: "Importer-Exporter Code logo",
    title: "Importer-Exporter Code",
    desc: "", 
    hasViewButton: true,
    certificateImages: ["/certificates/Certificate6.webp"],
  },

  {
    name: "GST Registration Certificate",
    logo: "/logos/10.webp",
    alt: "GST Registration Certificate logo",
    title: "GST Registration Certificate",
    desc: "",
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
    title: "Income Tax Department",
  },
   {
    name: "Coffee Board",
    logo: "/logos/1.webp",
    alt: "Indian Coffee Association logo",
    title: "Coffee Board",
    desc: "Training Programme On Coffee Roasting & Brewing",
    hasViewButton: true,
    certificateImages: ["/certificates/Certificate8.webp"],
  },
];

export default certificationsData;
