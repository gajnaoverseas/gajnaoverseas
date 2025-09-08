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
  'plantation-pb': {
    slug: 'plantation-pb',
    name: 'Plantation PB',
    subtitle: 'Washed Arabica Plantation',
    heroImage: '/products/plantation-pb/main.webp',
    gallery: [
      '/products/plantation-pb/main.webp',
      '/products/plantation-pb/1.webp',
      '/products/plantation-pb/2.webp',
      '/products/plantation-pb/3.webp',
    ],
    category: 'Commercial Grade',
    variety: 'Arabica',
    description:
      'Clean garbled, washed Arabica "Plantation" (Wet Processed). Uniform layout renders these details dynamically from data.',
    specs: [
      { label: 'Category', value: 'Commercial Grade' },
      { label: 'Variety', value: 'Arabica' },
      { label: 'Processing', value: 'Washed Arabica – “Plantation” (Wet Processed)' },
      { label: 'Sieve Standards', value: 'No sieve requirement' },
      { label: 'Grading Status', value: 'Clean Garbled' },
      { label: 'Tolerance (PB%)', value: '2% by weight' },
      { label: 'PB Triage', value: '3% by weight' },
      { label: 'Moisture Standard', value: '12.5% maximum' },
      { label: 'Loadability in 20-ft container', value: '60 kg bags, 19.2 Tons, or 19,200 kg' },
      { label: 'Packaging', value: 'Jute bags with polyliner, or per PO' },
    ],
    related: ['plantation-a', 'plantation-b', 'plantation-c'],
    groupTitle: 'Other Washed Arabica Grades',
  },
  'plantation-a': {
    slug: 'plantation-a',
    name: 'Plantation A',
    subtitle: 'Washed Arabica',
    heroImage: '/products/plantation-a/main.webp',
    gallery: ['/products/plantation-a/main.webp'],
    category: 'Commercial Grade',
    variety: 'Arabica',
    specs: [
      { label: 'Processing', value: 'Washed' },
      { label: 'Grade', value: 'A' },
      { label: 'Packaging', value: '60 kg bags' },
    ],
    related: ['plantation-b', 'plantation-c', 'plantation-pb'],
    groupTitle: 'Other Washed Arabica Grades',
  },
  'plantation-b': {
    slug: 'plantation-b',
    name: 'Plantation B',
    subtitle: 'Washed Arabica',
    heroImage: '/products/plantation-b/main.webp',
    gallery: ['/products/plantation-b/main.webp'],
    category: 'Commercial Grade',
    variety: 'Arabica',
    specs: [
      { label: 'Processing', value: 'Washed' },
      { label: 'Grade', value: 'B' },
      { label: 'Packaging', value: '60 kg bags' },
    ],
    related: ['plantation-a', 'plantation-c', 'plantation-pb'],
    groupTitle: 'Other Washed Arabica Grades',
  },
  'plantation-c': {
    slug: 'plantation-c',
    name: 'Plantation C',
    subtitle: 'Washed Arabica',
    heroImage: '/products/plantation-c/main.webp',
    gallery: ['/products/plantation-c/main.webp'],
    category: 'Commercial Grade',
    variety: 'Arabica',
    specs: [
      { label: 'Processing', value: 'Washed' },
      { label: 'Grade', value: 'C' },
      { label: 'Packaging', value: '60 kg bags' },
    ],
    related: ['plantation-a', 'plantation-b', 'plantation-pb'],
    groupTitle: 'Other Washed Arabica Grades',
  },
};

export const allProducts = Object.values(products);