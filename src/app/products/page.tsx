"use client";
import Image from "next/image";
import Link from "next/link";
import { allProducts, Product } from "@/data/products";


export const dynamic = "force-static";

// Extract unique categories, varieties, and processing methods for filters
const categories = [...new Set(allProducts.map(p => p.category))] as string[];
const varieties = [...new Set(allProducts.map(p => p.variety))] as string[];

// Extract processing methods from specs
const getProcessingMethod = (product: Product): string => {
  const processingSpec = product.specs.find(spec => spec.label === "Processing");
  return processingSpec ? processingSpec.value.split('–')[0].trim() : "Unknown";
};

// Normalize processing strings to canonical labels for filtering
const normalizeProcessing = (value?: string): string => {
  if (!value) return "";
  const v = value.toLowerCase();
  // Check specific cases first to avoid substring collisions (e.g., "unwashed" contains "washed")
  if (v.includes("unwashed arabica")) return "Unwashed Arabica";
  if (v.includes("washed arabica")) return "Washed Arabica";
  if (v.includes("unwashed robusta")) return "Unwashed Robusta";
  if (v.includes("washed robusta")) return "Washed Robusta";
  if (v.includes("monsooned")) return "Monsooned";
  // Fallback to the part before en dash if present
  return value.split('–')[0].trim();
};

const processingMethods = [...new Set(allProducts.map(getProcessingMethod))] as string[];

// Predefined quick-select filters grouped into rows as requested
const quickFilterRows: Array<
  { label: string; params: { category?: string; variety?: string; processing?: string } }[]
> = [
  [
    { label: "All Arabica Commercial Grades", params: { category: "Commercial Grade", variety: "Arabica" } },
    { label: "Washed Arabica - Commercial Grades", params: { category: "Commercial Grade", variety: "Arabica", processing: "Washed Arabica" } },
    { label: "Unwashed Arabica - Commercial Grades", params: { category: "Commercial Grade", variety: "Arabica", processing: "Unwashed Arabica" } },
    { label: "All Arabica Premium Grades", params: { category: "Premium Grade", variety: "Arabica" } },
    { label: "Washed Arabica - Premium Grades", params: { category: "Premium Grade", variety: "Arabica", processing: "Washed Arabica" } },
    { label: "Unwashed Arabica - Premium Grades", params: { category: "Premium Grade", variety: "Arabica", processing: "Unwashed Arabica" } },
    { label: "Arabica Specialty Grades", params: { category: "Specialty Coffee", variety: "Arabica" } },
  ],
  [
    { label: "All Robusta Commercial Grades", params: { category: "Commercial Grade", variety: "Robusta" } },
    { label: "Washed Robusta - Commercial Grades", params: { category: "Commercial Grade", variety: "Robusta", processing: "Washed Robusta" } },
    { label: "Unwashed Robusta - Commercial Grades", params: { category: "Commercial Grade", variety: "Robusta", processing: "Unwashed Robusta" } },
    { label: "All Robusta Premium Grades", params: { category: "Premium Grade", variety: "Robusta" } },
    { label: "Washed Robusta - Premium Grades", params: { category: "Premium Grade", variety: "Robusta", processing: "Washed Robusta" } },
    { label: "Unwashed Robusta - Premium Grades", params: { category: "Premium Grade", variety: "Robusta", processing: "Unwashed Robusta" } },
    { label: "Robusta Specialty Grades", params: { category: "Specialty Coffee", variety: "Robusta" } },
  ],
  [
    { label: "Miscellaneous Grades", params: { category: "Miscellaneous Grade" } },
  ],
];

// Helper to build a link for given params
const buildLink = (params: { category?: string; variety?: string; processing?: string }) => {
  const qs = new URLSearchParams();
  if (params.category) qs.set("category", params.category);
  if (params.variety) qs.set("variety", params.variety);
  if (params.processing) qs.set("processing", params.processing);
  const query = qs.toString();
  return query ? `/products?${query}` : "/products";
};

// Helper to determine active state for a chip
const isActive = (
  current: { category?: string; variety?: string; processing?: string },
  selected: { category?: string; variety?: string; processing?: string }
) => {
  return (
    (current.category || "") === (selected.category || "") &&
    (current.variety || "") === (selected.variety || "") &&
    (current.processing || "") === (selected.processing || "")
  );
};

export default function ProductsIndexPage({ searchParams }: { searchParams: { category?: string; variety?: string; processing?: string; search?: string } }) {
  // Filter products based on query parameters and search term
  const filteredProducts = allProducts.filter(product => {
    // Filter by category
    if (searchParams.category && product.category !== searchParams.category) {
      return false;
    }
    
    // Filter by variety
    if (searchParams.variety && product.variety !== searchParams.variety) {
      return false;
    }
    
    // Filter by processing method
    if (searchParams.processing) {
      const processingSpec = product.specs.find(spec => spec.label === "Processing");
      const productProc = normalizeProcessing(processingSpec?.value);
      const queryProc = normalizeProcessing(searchParams.processing);
      if (productProc !== queryProc) {
        return false;
      }
    }
    
    // Filter by search term
    if (searchParams.search) {
      const searchTerm = searchParams.search.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchTerm) ||
        (product.subtitle && product.subtitle.toLowerCase().includes(searchTerm)) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.variety.toLowerCase().includes(searchTerm)
      );
    }
    
    return true;
  });

  // Helper to display-friendly category label (pluralize common ones)
  const displayCategory = (category?: string): string => {
    if (!category) return "";
    switch (category) {
      case "Commercial Grade":
        return "Commercial Grades";
      case "Premium Grade":
        return "Premium Grades";
      case "Miscellaneous Grade":
        return "Miscellaneous Grades";
      default:
        return category;
    }
  };

  // Determine the title based on filters
  let pageTitle = "Our Coffee Grades";
  if (searchParams.processing && searchParams.category) {
    pageTitle = `${searchParams.processing} – ${displayCategory(searchParams.category)}`;
  } else if (searchParams.category && searchParams.variety) {
    pageTitle = `${searchParams.variety} – ${displayCategory(searchParams.category)}`;
  } else if (searchParams.category) {
    pageTitle = displayCategory(searchParams.category);
  } else if (searchParams.variety) {
    pageTitle = searchParams.variety;
  } else if (searchParams.processing) {
    pageTitle = `${searchParams.processing} Coffee`;
  } else if (searchParams.search) {
    pageTitle = `Search: ${searchParams.search}`;
  }

  return (
    <main className="min-h-screen bg-white overflow-x-hidden pt-24 sm:pt-32">
      <section className="bg-[#F7F2EE] py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm text-black mb-2">
            <Link href="/" className="hover:underline">Home</Link> › 
            <Link href="/products" className="hover:underline"> Products</Link>
            {searchParams.category && ` › ${searchParams.category}`}
            {searchParams.variety && ` › ${searchParams.variety}`}
            {searchParams.processing && ` › ${searchParams.processing}`}
            {searchParams.search && ` › Search: ${searchParams.search}`}
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold text-[#562F23] mb-2">{pageTitle}</h1>
          
          {/* Search Bar */}
          <div className="mt-6 mb-4">
            <form className="flex flex-col md:flex-row gap-4" action="/products" method="get">
              <input 
                type="text" 
                name="search" 
                placeholder="Search coffee grades..." 
                defaultValue={searchParams.search || ''}
                className="flex lg:w-[400px] w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 "
              />
              <button 
                type="submit" 
                className="px-6 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors"
              >
                Search
              </button>
            </form>

            {/* Quick-select grade categories (inside search bar) */}
            <div className="mt-4">
              <p className="text-sm text-gray-700 mb-2">Select coffee grade category from below by clicking on it.</p>
              {/* All reset */}
              <div className="mb-3">
                <Link 
                  href="/products"
                  className={`px-3 py-1 rounded-full text-sm ${!searchParams.category && !searchParams.variety && !searchParams.processing ? 'bg-amber-700 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                  All
                </Link>
              </div>
              {/* Rows: 1-7, 8-14, 15- */}
              {quickFilterRows.map((row, idx) => (
                <div key={idx} className="flex flex-wrap gap-2 mb-2">
                  {row.map(({ label, params }) => {
                    const href = buildLink(params);
                    const active = isActive(params, {
                      category: searchParams.category,
                      variety: searchParams.variety,
                      processing: searchParams.processing,
                    });
                    return (
                      <Link
                        key={label}
                        href={href}
                        className={`px-3 py-1 rounded-full text-sm ${active ? 'bg-amber-700 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 ">
        <div className="max-w-6xl mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl text-gray-700 mb-4">No coffee grades found</h2>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              <Link href="/products" className="mt-4 inline-block px-6 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors">
                View All Products
              </Link>
            </div>
          ) : (
            <>
              <p className="mb-4 text-gray-700">{filteredProducts.length} coffee grades found</p>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((p) => (
                  <Link key={p.slug} href={`/products/${p.slug}`} className="group hover:shadow-md transition-shadow rounded-2xl border-2">
                    <div className="p-4">
                      <h3 className="text-xl mb-2 text-[#562F23]">{p.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{p.subtitle}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded">{p.category}</span>
                        <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded">{p.variety}</span>
                        {p.specs.find(spec => spec.label === "Processing") && (
                          <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded">
                            {normalizeProcessing(p.specs.find(spec => spec.label === "Processing")?.value)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
