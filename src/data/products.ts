export type Spec = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  subtitle?: string;
  heroImage: string;
  gallery: string[];
  category: string; // e.g., Commercial Grade
  variety: string; // e.g., Arabica
  description?: string;
  specs: Spec[]; // flexible labeled data points
  related?: string[]; // slugs of related products
  groupTitle?: string; // title to show above related items
};

// Centralized, slug-keyed product dictionary so content updates do not require layout changes
export const products: Record<string, Product> = {
  "plantation-pb": {
    slug: "plantation-pb",
    name: "Plantation PB",
    subtitle: "Washed Arabica Plantation",
    heroImage: "/products/Plantation-PB/main.webp",
    gallery: [
      "/products/Plantation-PB/main.webp",
      "/products/Plantation-PB/1.webp",
      "/products/Plantation-PB/2.webp",
      "/products/Plantation-PB/3.webp",
    ],
    category: "Commercial Grade",
    variety: "Arabica",
    description:
      'Clean garbled, washed Arabica "Plantation" (Wet Processed). Uniform layout renders these details dynamically from data.',
    specs: [
      { label: "Grading Designation", value: "Clean Garbled" },
      { label: "Category", value: "Commercial Grade" },
      { label: "HSN Code", value: "090111" },

      { label: "Coffee Type", value: "Arabica" },
      {
        label: "Processing",
        value: "Washed Arabica – “Plantation” (Wet Processed)",
      },
      { label: "Sieve Standards", value: "No sieve requirement" },
      { label: "Garbling Status", value: "Clean Garbled" },
      { label: "Tolerance", value: "Flats (AB): 2% by weight | PB Triage: 3% by weight" },
      { label: "Moisture Standard", value: "12.5% maximum" },
      {
        label: "Loadability in 20-ft container",
        value: "320 Bags of 60Kg each",
      },
      {
        label: "Packaging",
        value:
          "Food-grade jute bags ( IJIRA Bags ) with inner  Grainpro bag / Ecotact Bag / Pro Harvest bag.",
      },
    ],
    related: ["plantation-a", "plantation-b", "plantation-c"],
    groupTitle: "Other Washed Arabica Grades",
  },
  "plantation-a": {
    slug: "plantation-a",
    name: "Plantation A",
    subtitle: "Washed Arabica",
    heroImage: "/products/Plantation-A/main.webp",
    gallery: ["/products/Plantation-A/main.webp"],
    category: "Commercial Grade",
    variety: "Arabica",
    specs: [
      { label: "Processing", value: "Washed" },
      { label: "Grade", value: "A" },
      { label: "Packaging", value: "60 kg bags" },
    ],
    related: ["plantation-b", "plantation-c", "plantation-pb"],
    groupTitle: "Other Washed Arabica Grades",
  },
  "plantation-b": {
    slug: "plantation-b",
    name: "Plantation B",
    subtitle: "Washed Arabica",
    heroImage: "/products/Plantation-B/main.webp",
    gallery: ["/products/Plantation-B/main.webp"],
    category: "Commercial Grade",
    variety: "Arabica",
    specs: [
      { label: "Processing", value: "Washed" },
      { label: "Grade", value: "B" },
      { label: "Packaging", value: "60 kg bags" },
    ],
    related: ["plantation-a", "plantation-c", "plantation-pb"],
    groupTitle: "Other Washed Arabica Grades",
  },
  "plantation-c": {
    slug: "plantation-c",
    name: "Plantation C",
    subtitle: "Washed Arabica",
    heroImage: "/products/Plantation-C/main.webp",
    gallery: ["/products/Plantation-C/main.webp"],
    category: "Commercial Grade",
    variety: "Arabica",
    specs: [
      { label: "Processing", value: "Washed" },
      { label: "Grade", value: "C" },
      { label: "Packaging", value: "60 kg bags" },
    ],
    related: ["plantation-a", "plantation-b", "plantation-pb"],
    groupTitle: "Other Washed Arabica Grades",
  },
};

export const allProducts = Object.values(products);
