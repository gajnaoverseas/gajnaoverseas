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
      // { label: "Grading Designation", value: "Clean garbled, washed Arabica 'Plantation' (Wet Processed). Uniform layout renders these details dynamically from data." },
      { label: "Category", value: "Commercial Grade" },
      // { label: "HSN Code", value: "090111" },

      { label: "Coffee Type", value: "Arabica" },
      {
        label: "Processing",
        value: "Washed Arabica – 'Plantation' (Wet Processed)",
      },
      { label: "Sieve Standards", value: "No sieve requirement" },
      { label: "Garbling Status", value: "Clean Garbled" },
      { label: "Tolerance", value: "Flats (AB): 2% by weight | PB Triage: 3% by weight" },
      // { label: "Moisture Standard", value: "12.5% maximum" },
      // {
      //   label: "Loadability in 20-ft container",
      //   value: "320 Bags of 60Kg each",
      // },
      // {
      //   label: "Packaging",
      //   value:
      //     "Food-grade jute bags ( IJIRA Bags ) with inner  Grainpro bag / Ecotact Bag / Pro Harvest bag.",
      // },
    ],
    related: ["plantation-a", "plantation-b", "plantation-c"],
    groupTitle: "Other Washed Arabica Grades",
  },
  "plantation-a": {
    slug: "plantation-a",
    name: "Plantation A",
    subtitle: "Washed Arabica Plantation",
    heroImage: "/products/Plantation-A/main.webp",
    gallery: ["/products/Plantation-A/main.webp"],
    category: "Commercial Grade",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Washed Arabica – 'Plantation'" },
      {
        label: "Sieve Standards",
        value:[
          "Minimum 90% by weight retention on a sieve with round holes of 6.6mm.",
          "Not more than 1.5% by weight shall pass through a sieve with round holes of 6.00mm."
          ].join("\n"),
      },
      { label: "Garbling Status", value: "Clean Garbled" },
      { label: "Tolerance", value: "PB: 2% by weight | Triage: 2% by weight" },
    ],
    related: ["plantation-b", "plantation-c", "plantation-pb"],
    groupTitle: "Other Washed Arabica Grades",
  },
  "plantation-b": {
    slug: "plantation-b",
    name: "Plantation B",
    subtitle: "Washed Arabica Plantation",
    heroImage: "/products/Plantation-B/main.webp",
    gallery: ["/products/Plantation-B/main.webp"],
    category: "Commercial Grade",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Washed Arabica – 'Plantation'" },
      {
        label: "Sieve Standards",
        value: [
          "Minimum 75% by weight retention on sieve with round holes of 6.00mm (Screen 15)",
          "Not more than 1.5% by weight shall pass through a sieve with round holes of 5.50mm (Screen 14)"
        ].join("\n"),
      },
      { label: "Garbling Status", value: "Clean Garbled" },
      { label: "Tolerance", value: "PB: 2% by weight | Triage: 3% by weight" },
    ],
    related: ["plantation-a", "plantation-c", "plantation-pb"],
    groupTitle: "Other Washed Arabica Grades",
  },
  "plantation-c": {
    slug: "plantation-c",
    name: "Plantation C",
    subtitle: "Washed Arabica Plantation",
    heroImage: "/products/Plantation-C/main.webp",
    gallery: ["/products/Plantation-C/main.webp"],
    category: "Commercial Grade",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Washed Arabica – 'Plantation'" },
      {
        label: "Sieve Standards",
        value: [
          "Minimum 75% by weight retention on a sieve with round holes of 5.50mm (Screen 14)",
          "100% by weight shall stand on a sieve with round holes of 5.00mm (Screen 13)"
        ].join("\n"),
      },
      {
        label: "May include",
        value:
          "Triage, small whole beans of the prescribed sieve size, size, light beans, boat-shaped beans and spotted beans (less than quarter of a bean surface)",
      },
      { label: "Shall be free from", value: "Blacks and damaged beans" },
    ],
    related: ["plantation-a", "plantation-b", "plantation-pb"],
    groupTitle: "Other Washed Arabica Grades",
  },
  "plantation-blacks": {
    slug: "plantation-blacks",
    name: "Plantation Blacks",
    subtitle: "Washed Arabica Plantation",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Washed Arabica – 'Plantation'" },
      {
        label: "Sieve Standards",
        value: "100% by weight retention on a sieve with round holes of 5.00mm (Screen 13)",
      },
      {
        label: "May include",
        value:
          "Blacks beans with more than a quarter of the bean surface black, deep blue or dark brown.",
      },
      {
        label: "Includes damaged beans",
        value:
          "Bleached (spongy) beans, insect-damaged beans, spotted (more than a quarter of a bean surface) beans, stinker and sour beans.",
      },
    ],
    related: ["plantation-a", "plantation-b", "plantation-c"],
    groupTitle: "Other Washed Arabica Grades",
  },
  "plantation-bits": {
    slug: "plantation-bits",
    name: "Plantation Bits",
    subtitle: "Washed Arabica Plantation",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Washed Arabica – 'Plantation'" },
      {
        label: "Sieve Standards",
        value:
          "100% by weight shall pass through a sieve with round holes of 5.00mm (Screen 13).",
      },
      { label: "Garbling Status", value: "Ungarbled" },
      {
        label: "May contain",
        value:
          "Broken beans of less than 1/3 of a bean size, Blacks/Browns and defective beans of the prescribed size.",
      },
    ],
    related: ["plantation-a", "plantation-b", "plantation-c"],
    groupTitle: "Other Washed Arabica Grades",
  },
  "plantation-bulk": {
    slug: "plantation-bulk",
    name: "Plantation Bulk",
    subtitle: "Washed Arabica Plantation",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Washed Arabica – 'Plantation'" },
      { label: "Grading", value: "Ungraded" },
      { label: "Presence of Blacks/Browns/Bits", value: "Shall not contain more than 2% by weight" },
    ],
    related: ["plantation-a", "plantation-b", "plantation-c"],
    groupTitle: "Other Washed Arabica Grades",
  },
  
  // Unwashed Arabica - Arabica Cherry
  "arabica-cherry-pb": {
    slug: "arabica-cherry-pb",
    name: "Arabica Cherry PB",
    subtitle: "Unwashed Arabica Cherry",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Unwashed Arabica Cherry" },
      { label: "Sieve Standards", value: "No sieve requirement" },
      { label: "Garbling Status", value: "Clean Garbled" },
      { label: "Tolerance", value: "Flats (AB): 2% by weight | PB Triage: 3% by weight" },
    ],
    related: ["arabica-cherry-ab", "arabica-cherry-c", "arabica-cherry-blacks-browns"],
    groupTitle: "Other Unwashed Arabica Grades",
  },
  "arabica-cherry-ab": {
    slug: "arabica-cherry-ab",
    name: "Arabica Cherry AB",
    subtitle: "Unwashed Arabica Cherry",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Unwashed Arabica Cherry" },
      {
        label: "Sieve Standards",
        value: [
          "Minimum 90% by weight retention on a sieve with round holes of 6.00mm (Screen 15)",
          "Not more than 1.5% by weight shall pass through a sieve with round holes of 5.50mm (Screen 14)"
        ].join("\n"),
      },
      { label: "Garbling Status", value: "Clean Garbled" },
      { label: "Tolerance", value: "PB: 2% by weight | Triage: 3% by weight" },
    ],
    related: ["arabica-cherry-pb", "arabica-cherry-c", "arabica-cherry-blacks-browns"],
    groupTitle: "Other Unwashed Arabica Grades",
  },
  "arabica-cherry-c": {
    slug: "arabica-cherry-c",
    name: "Arabica Cherry C",
    subtitle: "Unwashed Arabica Cherry",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Unwashed Arabica Cherry" },
      {
        label: "Sieve Standards",
        value: [
          "Minimum 75% by weight retention on a sieve with round holes of 5.50mm (Screen 14)",
          "100% by weight shall stand on a sieve with round holes of 5.00mm (Screen 13)"
        ].join("\n"),
      },
      {
        label: "May include",
        value: "Triage, small whole beans of the prescribed sieve size, light beans, boat shaped beans and spotted beans (less than a quarter of a bean surface). It shall not contain more than 2% of Blacks/Browns or Bits."
      },
    ],
    related: ["arabica-cherry-pb", "arabica-cherry-ab", "arabica-cherry-blacks-browns"],
    groupTitle: "Other Unwashed Arabica Grades",
  },
  "arabica-cherry-blacks-browns": {
    slug: "arabica-cherry-blacks-browns",
    name: "Arabica Cherry Blacks/Browns",
    subtitle: "Unwashed Arabica Cherry",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Unwashed Arabica Cherry" },
      {
        label: "Sieve Standards",
        value: "100% by weight retention on a sieve with round holes of 5.00mm (Screen 13)."
      },
      {
        label: "May include",
        value: "Black/dark brown beans, damaged beans such as bleached (spongy) beans, insect-damaged beans, spotted (more than a quarter of a bean surface) beans, fungal-damaged beans, sour and greens"
      },
    ],
    related: ["arabica-cherry-pb", "arabica-cherry-ab", "arabica-cherry-c"],
    groupTitle: "Other Unwashed Arabica Grades",
  },
  "arabica-cherry-bits": {
    slug: "arabica-cherry-bits",
    name: "Arabica Cherry Bits",
    subtitle: "Unwashed Arabica Cherry",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Unwashed Arabica Cherry" },
      {
        label: "Sieve Standards",
        value: "100% by weight shall pass through a sieve with Round holes of 5.00mm (Screen 13)."
      },
      { label: "Garbling Status", value: "Ungarbled" },
      {
        label: "May contain",
        value: "Broken beans of less than 1/3 of a bean size, Blacks/Browns and defective beans of the prescribed size"
      },
    ],
    related: ["arabica-cherry-pb", "arabica-cherry-ab", "arabica-cherry-c"],
    groupTitle: "Other Unwashed Arabica Grades",
  },
  "arabica-cherry-bulk": {
    slug: "arabica-cherry-bulk",
    name: "Arabica Cherry Bulk",
    subtitle: "Unwashed Arabica Cherry",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Unwashed Arabica Cherry" },
      { label: "Grading", value: "Ungraded" },
      { label: "Presence of Blacks/Browns/Bits", value: "Shall not contain more than 10% by weight" },
    ],
    related: ["arabica-cherry-pb", "arabica-cherry-ab", "arabica-cherry-c"],
    groupTitle: "Other Unwashed Arabica Grades",
  },
  
  // Washed Robusta - Robusta Parchment
  "robusta-parchment-pb": {
    slug: "robusta-parchment-pb",
    name: "Robusta Parchment PB",
    subtitle: "Washed Robusta Parchment",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Robusta",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Robusta" },
      { label: "Processing", value: "Washed Robusta Parchment" },
      { label: "Sieve Standards", value: "No sieve requirement" },
      { label: "Garbling Status", value: "Clean Garbled" },
      { label: "Tolerance", value: "Flats (AB): 2% by weight | PB Triage: 3% by weight" },
    ],
    related: ["robusta-parchment-ab", "robusta-parchment-c", "robusta-parchment-blacks-browns"],
    groupTitle: "Other Washed Robusta Grades",
  },
  "robusta-parchment-ab": {
    slug: "robusta-parchment-ab",
    name: "Robusta Parchment AB",
    subtitle: "Washed Robusta Parchment",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Robusta",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Robusta" },
      { label: "Processing", value: "Washed Robusta Parchment" },
      {
        label: "Sieve Standards",
        value: "Minimum 90% by weight retention on a sieve with round holes of 6.00mm (Screen 15). Not more than 1.5% by weight shall pass through a sieve with round holes of 5.50mm (Screen 14)."
      },
      { label: "Garbling Status", value: "Clean Garbled" },
      { label: "Tolerance", value: "PB: 2% by weight | Triage: 3% by weight" },
    ],
    related: ["robusta-parchment-pb", "robusta-parchment-c", "robusta-parchment-blacks-browns"],
    groupTitle: "Other Washed Robusta Grades",
  },
  "robusta-parchment-c": {
    slug: "robusta-parchment-c",
    name: "Robusta Parchment C",
    subtitle: "Washed Robusta Parchment",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Robusta",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Robusta" },
      { label: "Processing", value: "Washed Robusta Parchment" },
      {
        label: "Sieve Standards",
        value: "Minimum 75% by weight retention on a sieve with round holes of 5.50mm (Screen 14). 100% by weight shall be retained on a sieve with round holes of 5.00mm (Screen 13)."
      },
      {
        label: "May include",
        value: "Triage small whole beans of the prescribed sieve size, light beans, boat-shaped beans and spotted beans (less than a quarter of a bean surface). It shall not contain more than 2% of Blacks/Browns or Bits."
      },
    ],
    related: ["robusta-parchment-pb", "robusta-parchment-ab", "robusta-parchment-blacks-browns"],
    groupTitle: "Other Washed Robusta Grades",
  },
  "robusta-parchment-blacks-browns": {
    slug: "robusta-parchment-blacks-browns",
    name: "Robusta Parchment Blacks/Browns",
    subtitle: "Washed Robusta Parchment",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Robusta",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Robusta" },
      { label: "Processing", value: "Washed Robusta Parchment" },
      {
        label: "Sieve Standards",
        value: "100% by weight retention on a sieve with round holes of 5.00mm (Screen 13)."
      },
      {
        label: "May include",
        value: "Blacks/ dark brown beans, damaged beans such as bleached (spongy) beans, insect-damaged beans, spotted (more than a quarter of a bean surface) beans, stinker and sour beans."
      },
    ],
    related: ["robusta-parchment-pb", "robusta-parchment-ab", "robusta-parchment-c"],
    groupTitle: "Other Washed Robusta Grades",
  },
  "robusta-parchment-bits": {
    slug: "robusta-parchment-bits",
    name: "Robusta Parchment Bits",
    subtitle: "Washed Robusta Parchment",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Robusta",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Robusta" },
      { label: "Processing", value: "Washed Robusta Parchment" },
      {
        label: "Sieve Standards",
        value: "100% by weight shall pass through a sieve with round holes of 5.00mm (Screen 13)."
      },
      { label: "Garbling Status", value: "Ungarbled" },
      {
        label: "May contain",
        value: "Broken beans of less than 1/3 of a bean size, Blacks/Browns and defective beans of the prescribed size."
      },
    ],
    related: ["robusta-parchment-pb", "robusta-parchment-ab", "robusta-parchment-c"],
    groupTitle: "Other Washed Robusta Grades",
  },
  "robusta-parchment-bulk": {
    slug: "robusta-parchment-bulk",
    name: "Robusta Parchment Bulk",
    subtitle: "Washed Robusta Parchment",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Robusta",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Robusta" },
      { label: "Processing", value: "Washed Robusta Parchment" },
      { label: "Grading", value: "Ungraded" },
      { label: "Presence of Blacks/Browns/Bits", value: "Shall not contain more than 2% by weight." },
    ],
    related: ["robusta-parchment-pb", "robusta-parchment-ab", "robusta-parchment-c"],
    groupTitle: "Other Washed Robusta Grades",
  },
  
  // Unwashed Robusta - Robusta Cherry
  "robusta-cherry-pb": {
    slug: "robusta-cherry-pb",
    name: "Robusta Cherry PB",
    subtitle: "Unwashed Robusta Cherry",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Robusta",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Robusta" },
      { label: "Processing", value: "Unwashed Robusta Cherry" },
      { label: "Sieve Standards", value: "No sieve requirement" },
      { label: "Garbling Status", value: "Clean Garbled" },
      { label: "Tolerance", value: "Flats (AB): 2% by weight | PB Triage: 3% by weight" },
    ],
    related: ["robusta-cherry-ab", "robusta-cherry-c", "robusta-cherry-blacks-browns"],
    groupTitle: "Other Unwashed Robusta Grades",
  },
  "robusta-cherry-ab": {
    slug: "robusta-cherry-ab",
    name: "Robusta Cherry AB",
    subtitle: "Unwashed Robusta Cherry",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Robusta",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Robusta" },
      { label: "Processing", value: "Unwashed Robusta Cherry" },
      {
        label: "Sieve Standards",
        value: "Minimum 90% by weight retention on a sieve with round holes of 6.00mm (Screen 15). Not more than 1.5% by weight shall pass through a sieve with round holes of 5.50mm (Screen-14)."
      },
      { label: "Garbling Status", value: "Clean Garbled" },
      { label: "Tolerance", value: "PB: 2% by weight | Triage: 3% by weight" },
    ],
    related: ["robusta-cherry-pb", "robusta-cherry-c", "robusta-cherry-blacks-browns"],
    groupTitle: "Other Unwashed Robusta Grades",
  },
  "robusta-cherry-c": {
    slug: "robusta-cherry-c",
    name: "Robusta Cherry C",
    subtitle: "Unwashed Robusta Cherry",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Robusta",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Robusta" },
      { label: "Processing", value: "Unwashed Robusta Cherry" },
      {
        label: "Sieve Standards",
        value: "Minimum 75% by weight retention on a sieve with round holes of 5.50mm (Screen 14). 100% by weight shall stand on a sieve with round holes of 5.00mm (Screen 13)."
      },
      {
        label: "May include",
        value: "Triages small whole beans of the prescribed sieve size, light beans, boat-shaped beans and spotted beans (Less than a quarter of a bean surface). It shall not contain more than 2% of Blacks/Browns or Bits"
      },
    ],
    related: ["robusta-cherry-pb", "robusta-cherry-ab", "robusta-cherry-blacks-browns"],
    groupTitle: "Other Unwashed Robusta Grades",
  },
  "robusta-cherry-blacks-browns": {
    slug: "robusta-cherry-blacks-browns",
    name: "Robusta Cherry Blacks/Browns",
    subtitle: "Unwashed Robusta Cherry",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Robusta",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Robusta" },
      { label: "Processing", value: "Unwashed Robusta Cherry" },
      {
        label: "Sieve Standards",
        value: "100% by weight retention on a sieve with round holes of 5.00mm (Screen 13)."
      },
      {
        label: "May include",
        value: "Black/dark brown beans, damaged beans such as bleached (spongy) beans, insect-damaged beans, spotted (more than a quarter of a bean surface) beans, fungal-damaged beans, sour and greens."
      },
    ],
    related: ["robusta-cherry-pb", "robusta-cherry-ab", "robusta-cherry-c"],
    groupTitle: "Other Unwashed Robusta Grades",
  },
  "robusta-cherry-bits": {
    slug: "robusta-cherry-bits",
    name: "Robusta Cherry Bits",
    subtitle: "Unwashed Robusta Cherry",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Robusta",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Robusta" },
      { label: "Processing", value: "Unwashed Robusta Cherry" },
      {
        label: "Sieve Standards",
        value: "100% by weight shall pass through a sieve with round holes of 5.00mm (Screen 13)."
      },
      { label: "Garbling Status", value: "Ungarbled" },
      {
        label: "May contain",
        value: "Broken beans of less than 1/3 of a bean in size, Blacks/Browns and defective beans of the prescribed size."
      },
    ],
    related: ["robusta-cherry-pb", "robusta-cherry-ab", "robusta-cherry-c"],
    groupTitle: "Other Unwashed Robusta Grades",
  },
  "robusta-cherry-bulk": {
    slug: "robusta-cherry-bulk",
    name: "Robusta Cherry Bulk",
    subtitle: "Unwashed Robusta Cherry",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Robusta",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Robusta" },
      { label: "Processing", value: "Unwashed Robusta Cherry" },
      { label: "Grading", value: "Ungraded" },
      { label: "Presence of Black/Browns/Bits", value: "Shall not contain more than 10% by weight." },
    ],
    related: ["robusta-cherry-pb", "robusta-cherry-ab", "robusta-cherry-c"],
    groupTitle: "Other Unwashed Robusta Grades",
  },
  "robusta-cherry-clean-bulk": {
    slug: "robusta-cherry-clean-bulk",
    name: "Robusta Cherry Clean/Bulk",
    subtitle: "Unwashed Robusta Cherry",
    heroImage: "",
    gallery: [],
    category: "Commercial Grade",
    variety: "Robusta",
    specs: [
      { label: "Category", value: "Commercial Grade" },
      { label: "Coffee Type", value: "Robusta" },
      { label: "Processing", value: "Unwashed Robusta Cherry" },
      { label: "Grading", value: "Ungraded" },
      { label: "Shall be free from", value: "Blacks/Brown/Bits" },
    ],
    related: ["robusta-cherry-pb", "robusta-cherry-ab", "robusta-cherry-c"],
    groupTitle: "Other Unwashed Robusta Grades",
  },
  "monsooned-malabar-robusta-triage": {
    slug: "monsooned-malabar-robusta-triage",
    name: "Monsooned Malabar Robusta Triage",
    subtitle: "Monsooned Robusta",
    heroImage: "",
    gallery: [],
    category: "Specialty Coffee",
    variety: "Robusta",
    specs: [
      { label: "Category", value: "Specialty Coffee" },
      { label: "Coffee Type", value: "Robusta" },
      { label: "Processing", value: "Monsooned" },
      { 
        label: "Sieve Standard", 
        value: "Minimum 90% by weight retention on a sieve with round holes of 6.00mm (Screen 15)" 
      },
      { label: "Tolerance", value: "BBB: 3% by weight" },
    ],
    related: ["monsooned-malabar-aa", "monsooned-malabar-a"],
    groupTitle: "Monsooned Coffees",
  },
  "liberia-bulk": {
    slug: "liberia-bulk",
    name: "Liberia Bulk",
    subtitle: "Bulk Coffee from Liberica",
    heroImage: "",
    gallery: [],
    category: "Miscellaneous Grade",
    variety: "Liberica",
    specs: [
      { label: "Category", value: "Miscellaneous Grade" },
      { label: "Coffee Type", value: "Liberica" },
      { label: "Grading", value: "Ungraded" },
      { 
        label: "Presence of Blacks/Browns/Bits", 
        value: "Shall not contain more than 20% by weight" 
      },
    ],
    related: ["excelsia-bulk"],
    groupTitle: "Miscellaneous Grades",
  },
  "excelsia-bulk": {
    slug: "excelsia-bulk",
    name: "Excelsia Bulk",
    subtitle: "Bulk Coffee from Excelsia",
    heroImage: "",
    gallery: [],
    category: "Miscellaneous Grade",
    variety: "Excelsia",
    specs: [
      { label: "Category", value: "Miscellaneous Grade" },
      { label: "Coffee Type", value: "Excelsia" },
      { label: "Grading", value: "Ungraded" },
      { 
        label: "Presence of Blacks/Browns/Bits", 
        value: "Shall not contain more than 20% by weight" 
      },
    ],
    related: ["liberia-bulk"],
    groupTitle: "Miscellaneous Grades",
  },
  
  // Premium Grades - Arabica
  "plantation-aa": {
    slug: "plantation-aa",
    name: "Plantation AA",
    subtitle: "Washed Arabica - Premium Grade",
    heroImage: "",
    gallery: [],
    category: "Premium Grade",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Premium Grade" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Washed Arabica - 'Plantation'" },
      { 
        label: "Sieve Standard", 
        value: "Minimum 90% by weight retention on a sieve with round holes of 7.10mm (Screen 18). 100% shall stand on a sieve with round holes of 6.65mm (Screen 17). The 10% beans passing through the sieve of 7.10mm and standing on the sieve of 6.65mm shall be whole beans." 
      },
      { label: "Garbling Status", value: "Clean garbled" },
      { label: "Tolerance", value: "PB: 2% by weight" },
    ],
    related: ["plantation-pb-bold"],
    groupTitle: "Premium Washed Arabica Grades",
  },
  "plantation-pb-bold": {
    slug: "plantation-pb-bold",
    name: "Plantation PB Bold",
    subtitle: "Washed Arabica - Premium Grade",
    heroImage: "",
    gallery: [],
    category: "Premium Grade",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Premium Grade" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Washed Arabica - 'Plantation'" },
      { 
        label: "Sieve Standard", 
        value: "100% by weight retention on a sieve with oblong holes of 4.75mm (Screen 12 oblong)." 
      },
      { label: "Garbling Status", value: "Clean garbled" },
      { label: "Tolerance", value: "AB: 2% by weight | PB Triage: 2% by weight" },
    ],
    related: ["plantation-aa"],
    groupTitle: "Premium Washed Arabica Grades",
  },
  "arabica-cherry-aa": {
    slug: "arabica-cherry-aa",
    name: "Arabica Cherry AA",
    subtitle: "Unwashed Arabica - Premium Grade",
    heroImage: "",
    gallery: [],
    category: "Premium Grade",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Premium Grade" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Unwashed Arabica Cherry" },
      { 
        label: "Sieve Standard", 
        value: "Minimum 90% by weight retention on a sieve with round holes of 7.10mm (Screen 18). 100% retention on a sieve with round holes of 6.65mm (Screen 17)." 
      },
      { label: "Garbling Status", value: "Clean garbled" },
      { label: "Tolerance", value: "PB: 2% by weight | Triage: 1% by weight" },
    ],
    related: ["arabica-cherry-a", "arabica-cherry-pb-bold"],
    groupTitle: "Premium Unwashed Arabica Grades",
  },
  "arabica-cherry-a": {
    slug: "arabica-cherry-a",
    name: "Arabica Cherry A",
    subtitle: "Unwashed Arabica - Premium Grade",
    heroImage: "",
    gallery: [],
    category: "Premium Grade",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Premium Grade" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Unwashed Arabica Cherry" },
      { 
        label: "Sieve Standard", 
        value: "Minimum 90% by weight retention on a sieve with round holes of 6.65mm (Screen 17). 100% by weight shall stand on a sieve with round holes of 6.00 mm (Screen 15)." 
      },
      { label: "Garbling Status", value: "Clean garbled" },
      { label: "Tolerance", value: "PB: 2% by weight | Triage: 2% by weight" },
    ],
    related: ["arabica-cherry-aa", "arabica-cherry-pb-bold"],
    groupTitle: "Premium Unwashed Arabica Grades",
  },
  "arabica-cherry-pb-bold": {
    slug: "arabica-cherry-pb-bold",
    name: "Arabica Cherry PB Bold",
    subtitle: "Unwashed Arabica - Premium Grade",
    heroImage: "",
    gallery: [],
    category: "Premium Grade",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Premium Grade" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Unwashed Arabica Cherry" },
      { 
        label: "Sieve Standard", 
        value: "100% by weight retention on a sieve with oblong holes of 4.75mm (Screen 12 oblong)." 
      },
      { label: "Garbling Status", value: "Clean garbled" },
      { label: "Tolerance", value: "AB: 2% by weight | PB Triage: 2% by weight" },
    ],
    related: ["arabica-cherry-aa", "arabica-cherry-a"],
    groupTitle: "Premium Unwashed Arabica Grades",
  },
  
  // Premium Grades - Robusta
  "robusta-parchment-a": {
    slug: "robusta-parchment-a",
    name: "Robusta Parchment A",
    subtitle: "Washed Robusta - Premium Grade",
    heroImage: "",
    gallery: [],
    category: "Premium Grade",
    variety: "Robusta",
    specs: [
      { label: "Category", value: "Premium Grade" },
      { label: "Coffee Type", value: "Robusta" },
      { label: "Processing", value: "Washed Robusta Parchment" },
      { 
        label: "Sieve Standard", 
        value: "Minimum 90% by weight retention on a sieve with round holes of 6.65mm (Screen 17). 100% shall stand on a sieve with round holes of 6.00mm (Screen 15)." 
      },
      { label: "Garbling Status", value: "Clean garbled" },
      { label: "Tolerance", value: "PB: 2% by weight | Triage: No tolerance" },
    ],
    related: ["robusta-parchment-pb-bold"],
    groupTitle: "Premium Washed Robusta Grades",
  },
  "robusta-parchment-pb-bold": {
    slug: "robusta-parchment-pb-bold",
    name: "Robusta Parchment PB Bold",
    subtitle: "Washed Robusta - Premium Grade",
    heroImage: "",
    gallery: [],
    category: "Premium Grade",
    variety: "Robusta",
    specs: [
      { label: "Category", value: "Premium Grade" },
      { label: "Coffee Type", value: "Robusta" },
      { label: "Processing", value: "Washed Robusta Parchment" },
      { 
        label: "Sieve Standard", 
        value: "100% by weight retention on a sieve with oblong holes of 4.50mm (Screen 11 oblong)." 
      },
      { label: "Garbling Status", value: "Clean garbled" },
      { label: "Tolerance", value: "AB: 2% by weight | Triage: 2% by weight" },
    ],
    related: ["robusta-parchment-a"],
    groupTitle: "Premium Washed Robusta Grades",
  },
  "robusta-cherry-aa": {
    slug: "robusta-cherry-aa",
    name: "Robusta Cherry AA",
    subtitle: "Unwashed Robusta - Premium Grade",
    heroImage: "",
    gallery: [],
    category: "Premium Grade",
    variety: "Robusta",
    specs: [
      { label: "Category", value: "Premium Grade" },
      { label: "Coffee Type", value: "Robusta" },
      { label: "Processing", value: "Unwashed Robusta Cherry" },
      { 
        label: "Sieve Standard", 
        value: "Minimum 90% by weight retention on a sieve with round holes of 7.10mm (Screen 18). 100% retention on a sieve with round holes of 6.65mm (Screen 17)." 
      },
      { label: "Garbling Status", value: "Clean garbled" },
      { label: "Tolerance", value: "PB: 2% by weight | Triage: 1% by weight" },
    ],
    related: ["robusta-cherry-a", "robusta-cherry-pb-bold"],
    groupTitle: "Premium Unwashed Robusta Grades",
  },
  "robusta-cherry-a": {
    slug: "robusta-cherry-a",
    name: "Robusta Cherry A",
    subtitle: "Unwashed Robusta - Premium Grade",
    heroImage: "",
    gallery: [],
    category: "Premium Grade",
    variety: "Robusta",
    specs: [
      { label: "Category", value: "Premium Grade" },
      { label: "Coffee Type", value: "Robusta" },
      { label: "Processing", value: "Unwashed Robusta Cherry" },
      { 
        label: "Sieve Standard", 
        value: "Minimum 90% by weight retention on a sieve with round holes of 6.65mm (Screen 17). 100% by weight shall stand on a sieve with round holes of 6.00mm (Screen 15)" 
      },
      { label: "Garbling Status", value: "Clean garbled" },
      { label: "Tolerance", value: "PB: 2% by weight | Triage: 2% by weight" },
    ],
    related: ["robusta-cherry-aa", "robusta-cherry-pb-bold"],
    groupTitle: "Premium Unwashed Robusta Grades",
  },
  "robusta-cherry-pb-bold": {
    slug: "robusta-cherry-pb-bold",
    name: "Robusta Cherry PB Bold",
    subtitle: "Unwashed Robusta - Premium Grade",
    heroImage: "",
    gallery: [],
    category: "Premium Grade",
    variety: "Robusta",
    specs: [
      { label: "Category", value: "Premium Grade" },
      { label: "Coffee Type", value: "Robusta" },
      { label: "Processing", value: "Unwashed Robusta Cherry" },
      { 
        label: "Sieve Standard", 
        value: "100% by weight retention on a sieve with oblong holes of 4.50mm (Screen 11 oblong)." 
      },
      { label: "Garbling Status", value: "Clean garbled" },
      { label: "Tolerance", value: "AB: 2% by weight | PB Triage: 2% by weight" },
    ],
    related: ["robusta-cherry-aa", "robusta-cherry-a"],
    groupTitle: "Premium Unwashed Robusta Grades",
  },
  
  // Specialty Coffees
  "mysore-nuggets-extra-bold": {
    slug: "mysore-nuggets-extra-bold",
    name: "Mysore Nuggets Extra Bold",
    subtitle: "Washed Arabica Plantation",
    heroImage: "",
    gallery: [],
    category: "Specialty Coffee",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Specialty Coffee" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Washed Arabica Plantation" },
      { 
        label: "Region of Growth", 
        value: "Shall be prepared from Plantation A coffee of Mysore, Coorg, Bababudan, Biligiris and Shevaroys." 
      },
      { 
        label: "Sieve Standard", 
        value: "Minimum 90% retention on a sieve with holes of 7.50mm (Screen 19). 100% retention on a sieve with holes of 6.65mm (Screen 17). The 10% beans passing through the sieve of 7.5mm and standing on the sieve of 6.65mm shall be whole beans." 
      },
      { label: "Processing/Garbling Standard", value: "Medium to well polished, clean garbled." },
      { 
        label: "Free from", 
        value: "PB, Brokens (inclusive of Triage and Elephant beans) or any extraneous matter. Defectives including bleached and spongy beans, Blacks, Browns, insect-damaged beans, fungal-damaged beans and pulper cuts" 
      },
    ],
    related: ["monsooned-malabar-aaa", "monsooned-malabar-aa", "monsooned-malabar-arabica-triage"],
    groupTitle: "Specialty Coffees",
  },
  "robusta-kaapi-royale": {
    slug: "robusta-kaapi-royale",
    name: "Robusta Kaapi Royale",
    subtitle: "Washed Robusta Parchment",
    heroImage: "",
    gallery: [],
    category: "Specialty Coffee",
    variety: "Robusta",
    specs: [
      { label: "Category", value: "Specialty Coffee" },
      { label: "Coffee Type", value: "Robusta" },
      { label: "Processing", value: "Washed Robusta Parchment" },
      { 
        label: "Region of Growth", 
        value: "Shall be prepared from Robusta Parchment AB Coffee of Mysore, Coorg, Travancore, Wayanad, Shevaroys, Pulneys and Bababudan Regions." 
      },
      { 
        label: "Sieve Standard", 
        value: "Minimum 90% retention on a sieve with holes of 6.70mm (Screen 17). 100% retention on a sieve with holes of 6.00mm (Screen 15). The 10% beans passing through the sieve of 6.70mm and standing on the sieve of 6.00mm shall be whole beans." 
      },
      { label: "Processing/Garbling Standard", value: "Medium to well polished, clean garbled." },
      { 
        label: "Free from", 
        value: "PB, Brokens (inclusive of Triage and Elephant beans) or any extraneous matter. Defectives including bleached and spongy beans, unwashed beans, Blacks, Browns, insects-damaged beans, fungal-damaged beans and pulper cuts" 
      },
    ],
    related: ["monsooned-malabar-robusta-pr", "monsooned-malabar-robusta-triage"],
    groupTitle: "Specialty Coffees",
  },
  "monsooned-malabar-aaa": {
    slug: "monsooned-malabar-aaa",
    name: "Monsooned Malabar AAA",
    subtitle: "Monsooned Arabica",
    heroImage: "",
    gallery: [],
    category: "Specialty Coffee",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Specialty Coffee" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Monsooned" },
      { 
        label: "Sieve Standard", 
        value: "Minimum 90% by weight retention on a sieve with round holes of 7.50 mm (Screen 19). Not more than 1.5% by weight shall pass through a sieve with round holes of 7.10mm (Screen 18)." 
      },
      { label: "Garbling Status", value: "Clean garbled" },
      { label: "Tolerance", value: "Triage: Maximum 2% by weight | BBB: Nil" },
    ],
    related: ["monsooned-malabar-aa", "monsooned-malabar-a", "monsooned-malabar-arabica-triage"],
    groupTitle: "Monsooned Coffees",
  },
  "monsooned-malabar-aa": {
    slug: "monsooned-malabar-aa",
    name: "Monsooned Malabar AA",
    subtitle: "Monsooned Arabica",
    heroImage: "",
    gallery: [],
    category: "Specialty Coffee",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Specialty Coffee" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Monsooned" },
      { 
        label: "Sieve Standard", 
        value: "Minimum 90% by weight retention on a sieve with round holes of 7.10 mm (Screen 18). Not more than 1.5% by weight shall pass through a sieve with round holes of 6.70 mm (Screen 1)." 
      },
      { label: "Garbling Status", value: "Clean garbled" },
      { label: "Tolerance", value: "Triage: Maximum 2% by weight | BBB: Nil" },
    ],
    related: ["monsooned-malabar-aaa", "monsooned-malabar-a", "monsooned-malabar-arabica-triage"],
    groupTitle: "Monsooned Coffees",
  },
  "monsooned-malabar-a": {
    slug: "monsooned-malabar-a",
    name: "Monsooned Malabar A",
    subtitle: "Monsooned Arabica",
    heroImage: "",
    gallery: [],
    category: "Specialty Coffee",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Specialty Coffee" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Monsooned" },
      { 
        label: "Sieve Standard", 
        value: "Minimum 75% by weight retention on a sieve with round holes of 6.70mm (Screen 17). Not more than 1.5% by weight shall pass through a sieve with round holes of 6.00 mm (Screen 15)." 
      },
      { label: "Tolerance", value: "Triage: Maximum 3% by weight | BBB: Nil" },
    ],
    related: ["monsooned-malabar-aaa", "monsooned-malabar-aa", "monsooned-malabar-arabica-triage"],
    groupTitle: "Monsooned Coffees",
  },
  "monsooned-malabar-arabica-triage": {
    slug: "monsooned-malabar-arabica-triage",
    name: "Monsooned Malabar Arabica Triage",
    subtitle: "Monsooned Arabica",
    heroImage: "",
    gallery: [],
    category: "Specialty Coffee",
    variety: "Arabica",
    specs: [
      { label: "Category", value: "Specialty Coffee" },
      { label: "Coffee Type", value: "Arabica" },
      { label: "Processing", value: "Monsooned" },
      { 
        label: "Sieve Standard", 
        value: "Minimum 90% by weight retention on a sieve with round holes of 6.00mm (Screen 15)." 
      },
      { label: "Tolerance", value: "BBB: 3%" },
    ],
    related: ["monsooned-malabar-aaa", "monsooned-malabar-aa", "monsooned-malabar-a"],
    groupTitle: "Monsooned Coffees",
  },
  "monsooned-malabar-robusta-pr": {
    slug: "monsooned-malabar-robusta-pr",
    name: "Monsooned Malabar Robusta PR",
    subtitle: "Monsooned Robusta",
    heroImage: "",
    gallery: [],
    category: "Specialty Coffee",
    variety: "Robusta",
    specs: [
      { label: "Category", value: "Specialty Coffee" },
      { label: "Coffee Type", value: "Robusta" },
      { label: "Processing", value: "Monsooned" },
      { 
        label: "Sieve Standard", 
        value: "Minimum 90% by weight retention on a sieve with round holes of 7.10mm (Screen 18)." 
      },
      { label: "Tolerance", value: "BBB: 3% by weight" },
    ],
    related: ["monsooned-malabar-robusta-triage"],
    groupTitle: "Monsooned Coffees",
  },
};

export const allProducts = Object.values(products);
