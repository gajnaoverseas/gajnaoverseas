import Image from "next/image";
import Link from "next/link";
import { allProducts, Product } from "@/data/products";
import { unstable_noStore as noStore } from "next/cache";
import GradeSelect from "@/components/GradeSelect";
import SearchByNameForm from "@/components/SearchByNameForm";

// Ensure this page renders dynamically so query params work on Vercel
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Extract unique categories, varieties, and processing methods for filters
const categories = [...new Set(allProducts.map(p => p.category))] as string[];
const varieties = [...new Set(allProducts.map(p => p.variety))] as string[];

// Normalize category strings to the canonical values used in product data
const normalizeCategory = (category?: string): string => {
  if (!category) return "";
  const c = category.toLowerCase().trim();
  if (c.includes("commercial grade")) return "Commercial Grade";
  if (c.includes("commercial grades")) return "Commercial Grade";
  if (c.includes("premium grade")) return "Premium Grade";
  if (c.includes("premium grades")) return "Premium Grade";
  if (c.includes("specialty coffee")) return "Specialty Coffee";
  if (c.includes("specialty coffees")) return "Specialty Coffee";
  if (c.includes("miscellaneous grade")) return "Miscellaneous Grade";
  if (c.includes("miscellaneous grades")) return "Miscellaneous Grade";
  // Fallback: title case original
  return category;
};

// Display-friendly category label (pluralize to match filter chips)
const displayCategory = (category?: string): string => {
  const normalized = normalizeCategory(category);
  switch (normalized) {
    case "Commercial Grade":
      return "Commercial Grades";
    case "Premium Grade":
      return "Premium Grades";
    case "Miscellaneous Grade":
      return "Miscellaneous Grades";
    default:
      return normalized;
  }
};

// Extract processing methods from specs
const getProcessingMethod = (product: Product): string => {
  const processingSpec = product.specs.find(spec => spec.label === "Processing");
  return processingSpec ? processingSpec.value.split('–')[0].trim() : "Unknown";
};

const processingMethods = [...new Set(allProducts.map(getProcessingMethod))] as string[];

// Normalize processing strings to canonical labels for filtering and chip display
const normalizeProcessing = (value?: string): string => {
  if (!value) return "";
  const v = value.toLowerCase();
  // Specific checks first to avoid substring collisions
  if (v.includes("unwashed arabica")) return "Unwashed Arabica";
  if (v.includes("washed arabica")) return "Washed Arabica";
  if (v.includes("unwashed robusta")) return "Unwashed Robusta";
  if (v.includes("washed robusta")) return "Washed Robusta";
  if (v.includes("monsooned")) return "Monsooned";
  // Fallback to the left of en dash
  return value.split('–')[0].trim();
};

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
  return query ? `/search?${query}` : "/search";
};

// Helper to determine active state for a chip
const isActive = (
  current: { category?: string; variety?: string; processing?: string },
  selected: { category?: string; variety?: string; processing?: string }
) => {
  return (
    normalizeCategory(current.category) === normalizeCategory(selected.category) &&
    (current.variety || "") === (selected.variety || "") &&
    normalizeProcessing(current.processing) === normalizeProcessing(selected.processing)
  );
};

export default function SearchCoffeeGradesPage({ searchParams }: { searchParams: { category?: string; variety?: string; processing?: string; search?: string } }) {
  // Disable caching to ensure query param filters work consistently on Vercel
  noStore();
  // Filter products based on query parameters and search term
  const filteredProducts = allProducts.filter(product => {
    // Filter by category
    if (searchParams.category && normalizeCategory(product.category) !== normalizeCategory(searchParams.category)) {
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

  // Determine the title based on filters
  let pageTitle = "Search Coffee Grades";
  if (searchParams.category && searchParams.processing) {
    // When processing is selected, prioritize it in the title and match chip wording
    pageTitle = `${searchParams.processing} - ${displayCategory(searchParams.category)}`;
  } else if (searchParams.category && searchParams.variety) {
    pageTitle = `${searchParams.variety} - ${displayCategory(searchParams.category)}`;
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
    <main className="min-h-screen bg-white  ">
      <section className="bg-[#F7F2EE] py-16 md:py-20 md:mt-32 mt-24 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-coffee-brown rounded-full mix-blend-multiply filter blur-3xl opacity-5 translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <p className="text-sm text-gray-600 mb-4 font-medium tracking-wide">
            <Link href="/" className="hover:text-amber-700 transition-colors">Home</Link> <span className="mx-2">›</span>
            <Link href="/search" className="hover:text-amber-700 transition-colors">Search Coffee Grades</Link>
            {searchParams.category && <span className="mx-2">› {searchParams.category}</span>}
            {searchParams.variety && <span className="mx-2">› {searchParams.variety}</span>}
            {searchParams.processing && <span className="mx-2">› {searchParams.processing}</span>}
            {searchParams.search && <span className="mx-2">› Search: {searchParams.search}</span>}
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-coffee-brown mb-4 text-center font-serif tracking-tight">{pageTitle}</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
            Explore our premium collection of Indian Arabica and Robusta coffee grades. Filter by category or search for specific grades.
          </p>

          {/* Search + Quick Filters Area */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-amber-50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

              {/* Left Column: Search & Select */}
              <div className="lg:col-span-5 flex flex-col gap-8 border-b lg:border-b-0 lg:border-r border-gray-100 pb-8 lg:pb-0 lg:pr-10">
                <div className="w-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Search by Name</label>
                  <SearchByNameForm defaultValue={searchParams.search || ''} />
                </div>

                <div className="w-full relative">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                    <span className="bg-white px-3 text-sm text-gray-400 font-medium absolute left-1/2 -translate-x-1/2">OR</span>
                  </div>
                </div>

                <div className="w-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Select Grade Directly</label>
                  <GradeSelect products={allProducts} />
                </div>
              </div>

              {/* Right Column: Quick Filters */}
              <div className="lg:col-span-7">
                <p className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">Filter by Category</p>

                {/* All reset */}
                <div className="mb-4">
                  <Link
                    href="/search"
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!searchParams.category && !searchParams.variety && !searchParams.processing ? 'bg-coffee-brown text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    All Coffee Grades
                  </Link>
                </div>

                <div className="space-y-4">
                  {quickFilterRows.map((row, idx) => (
                    <div key={idx} className="flex flex-wrap gap-2">
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
                            className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${active ? 'bg-amber-700 text-white shadow-md transform scale-105' : 'bg-[#FDFBF7] border border-amber-100 text-gray-700 hover:border-amber-300 hover:bg-amber-50'}`}
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
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl text-gray-700 mb-4">No coffee grades found</h2>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              <Link href="/search" className="mt-4 inline-block px-6 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors">
                View All Products
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-3xl md:text-5xl font-semibold text-coffee-brown mb-2 text-center">{pageTitle}</h1>
              <p className="mb-4 text-gray-700">{filteredProducts.length} coffee grades found</p>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((p) => (
                  <Link key={p.slug} href={`/products/${p.slug}`} className="group hover:shadow-md transition-shadow rounded-2xl border-2">
                    <div className="p-4">
                      <h3 className="text-xl mb-2 text-coffee-brown">{p.name}</h3>
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
