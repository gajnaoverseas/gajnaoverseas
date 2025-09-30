import Image from "next/image";
import Link from "next/link";
import { allProducts } from "@/data/products";

export const metadata = {
  title: "Arabica Coffee Grades - Premium Indian Coffee | Gajna Overseas",
  description: "Explore our premium Arabica coffee grades from India. From Plantation PB to specialty Monsooned Malabar varieties, discover the finest Indian Arabica coffee beans.",
};

export default function ArabicaPage() {
  // Filter and categorize Arabica products
  const arabicaProducts = allProducts.filter(product => product.variety === "Arabica");
  
  // Group by category
  const commercialGrade = arabicaProducts.filter(p => p.category === "Commercial Grade");
  const premiumGrade = arabicaProducts.filter(p => p.category === "Premium Grade");
  const specialtyGrade = arabicaProducts.filter(p => p.category === "Specialty Coffee");
  
  // Further group commercial grade by processing type
  const plantationGrades = commercialGrade.filter(p => p.specs.some(spec => spec.value.includes("Plantation")));
  const cherryGrades = commercialGrade.filter(p => p.specs.some(spec => spec.value.includes("Cherry")));
  
  // Premium Arabica split by processing
  const premiumWashed = premiumGrade.filter(p => 
    (p.subtitle && p.subtitle.includes("Washed Arabica Plantation")) ||
    p.specs.some(spec => spec.label === "Processing" && spec.value.includes(" Washed Arabica Plantation"))
  );
  const premiumUnwashed = premiumGrade.filter(p => 
    (p.subtitle && p.subtitle.includes("Unwashed Arabica Cherry")) ||
    p.specs.some(spec => spec.label === "Processing" && spec.value.includes("Unwashed Arabica Cherry"))
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-coffee-light">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-coffee-brown via-amber-800 to-coffee-brown py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>


        
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <div className="mb-8">
            <Image 
              src="/coffee-beans/arabica.webp" 
              alt="Arabica Coffee Bean" 
              width={120} 
              height={120} 
              className="mx-auto mb-6 mt-28 rounded-full shadow-2xl border-4 border-white/30"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
           Indian Arabica Coffee Grades
          </h1>
         
          
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-coffee-brown mb-12">Categories of Indian Arabica Coffee</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {/* <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-lg">
               <div className="text-sm text-gray-600 mb-4"><span className="font-semibold">Arabica - </span>Total Grades </div>
              <div className="text-3xl font-bold text-coffee-brown mb-2">{arabicaProducts.length}</div>

            </div> */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg">
               <div className="text-sm text-gray-600 mb-4"><span className="font-semibold">Arabica - </span>Commercial Grades</div>
              <div className="text-3xl font-bold text-coffee-brown mb-2">{commercialGrade.length}</div>

            </div>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg">
               <div className="text-sm text-gray-600 mb-4"><span className="font-semibold">Arabica - </span>Premium Grades</div>
              <div className="text-3xl font-bold text-coffee-brown mb-2">{premiumGrade.length}</div>

            </div>
            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg">
               <div className="text-sm text-gray-600 mb-4"><span className="font-semibold">Arabica - </span>Specialty Grades</div>
              <div className="text-3xl font-bold text-coffee-brown mb-2">{specialtyGrade.length}</div>

            </div>
          </div>
        </div>
      </section>

      {/* Commercial Grade - Plantation Varieties */}
      {plantationGrades.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4">
                     <h2 className="text-5xl font-bold text-center text-red-500 mb-10">Arabica - Commercial Grades </h2>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-coffee-brown mb-4">Washed Arabica </h2>
                <p className="text-lg text-[#15803D] max-w-3xl mx-auto">
                The grade designations of Commercial Washed Arabica Coffees are :
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {plantationGrades.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-amber-100">
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-coffee-brown mb-2 group-hover:text-amber-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">{product.subtitle}</p>
                      <div className="space-y-2">
                        {product.specs.slice(0, 2).map((spec, index) => (
                          <div key={index} className="text-xs">
                            <span className="font-medium text-gray-700">{spec.label}:</span>
                            <span className="text-gray-600 ml-1">{spec.value.length > 50 ? spec.value.substring(0, 50) + '...' : spec.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-amber-600">View Details</span>
                        <svg className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Commercial Grade - Cherry Varieties */}
      {cherryGrades.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-coffee-brown mb-4">Unwashed Arabica </h2>
              <p className="text-lg text-[#15803D] max-w-3xl mx-auto">
                The grade designations of Commercial Unwashed Arabica Coffees are :
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cherryGrades.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-green-100">
   
                      
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-coffee-brown mb-2 group-hover:text-green-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">{product.subtitle}</p>
                      <div className="space-y-2">
                        {product.specs.slice(0, 2).map((spec, index) => (
                          <div key={index} className="text-xs">
                            <span className="font-medium text-gray-700">{spec.label}:</span>
                            <span className="text-gray-600 ml-1">{spec.value.length > 50 ? spec.value.substring(0, 50) + '...' : spec.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-green-600">View Details</span>
                        <svg className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Premium Grade */}
      {premiumGrade.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
                      <h2 className="text-5xl font-bold text-center text-red-500 mb-10">Premium Arabica Grades </h2>
          <div className="max-w-7xl mx-auto px-4">
            {/* Manual Washed Arabica (Plantation) - fallback */}
            {premiumWashed.length === 0 && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-coffee-brown mb-2">Washed Arabica (Plantation)</h2>
                  <p className="text-lg text-[#15803D] max-w-3xl mx-auto">
                  The grade designations of Premium Washed Arabica Coffees are :
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <Link href="/products/plantation-aa">
                    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-blue-100">
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-coffee-brown mb-2 group-hover:text-blue-600 transition-colors">
                          Plantation AA
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">Washed Arabica Plantation</p>
                        <div className="space-y-2">
                          <div className="text-xs">
                            <span className="font-medium text-gray-700">Processing:</span>
                            <span className="text-gray-600 ml-1">Washed Arabica Plantation</span>
                          </div>
                          <div className="text-xs">
                            <span className="font-medium text-gray-700">Category:</span>
                            <span className="text-gray-600 ml-1">Premium Grade</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-600">View Details</span>
                          <svg className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/products/plantation-pb-bold">
                    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-blue-100">
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-coffee-brown mb-2 group-hover:text-blue-600 transition-colors">
                          Plantation PB Bold
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">Washed Arabica Plantation</p>
                        <div className="space-y-2">
                          <div className="text-xs">
                            <span className="font-medium text-gray-700">Processing:</span>
                            <span className="text-gray-600 ml-1">Washed Arabica Plantation</span>
                          </div>
                          <div className="text-xs">
                            <span className="font-medium text-gray-700">Category:</span>
                            <span className="text-gray-600 ml-1">Premium Grade</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-600">View Details</span>
                          <svg className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </>
            )}
            {/* Washed Premium Arabica (Plantation) */}
            {premiumWashed.length > 0 && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-coffee-brown mb-2"> Washed Arabica (Plantation)</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                   The grade designations of Premium Unwashed Arabica Coffees are :
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {premiumWashed.map((product) => (
                    <Link key={product.slug} href={`/products/${product.slug}`}>
                      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-blue-100">
                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-coffee-brown mb-2 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">{product.subtitle}</p>
                          <div className="space-y-2">
                            {product.specs.slice(0, 3).map((spec, index) => (
                              <div key={index} className="text-xs">
                                <span className="font-medium text-gray-700">{spec.label}:</span>
                                <span className="text-gray-600 ml-1">{spec.value.length > 60 ? spec.value.substring(0, 60) + '...' : spec.value}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm font-medium text-blue-600">View Details</span>
                            <svg className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {/* Unwashed Premium Arabica (Cherry) */}
            {premiumUnwashed.length > 0 && (
              <>
                <div className="text-center mt-12 mb-8">
                  <h2 className="text-3xl font-bold text-coffee-brown mb-2">Unwashed Arabica (Cherry)</h2>
                  <p className="text-lg   text-[#15803D] max-w-3xl mx-auto">
                   The grade designations of Premium Unwashed Arabica Coffees are :
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {premiumUnwashed.map((product) => (
                    <Link key={product.slug} href={`/products/${product.slug}`}>
                      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-blue-100">
                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-coffee-brown mb-2 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">{product.subtitle}</p>
                          <div className="space-y-2">
                            {product.specs.slice(0, 3).map((spec, index) => (
                              <div key={index} className="text-xs">
                                <span className="font-medium text-gray-700">{spec.label}:</span>
                                <span className="text-gray-600 ml-1">{spec.value.length > 60 ? spec.value.substring(0, 60) + '...' : spec.value}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm font-medium text-blue-600">View Details</span>
                            <svg className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* Specialty Coffee */}
      {specialtyGrade.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-coffee-brown mb-4">Specialty Arabica Coffees</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Exceptional single-origin and specialty processed Arabica varieties for the most discerning coffee connoisseurs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specialtyGrade.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-purple-100 relative">

                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-coffee-brown mb-2 group-hover:text-purple-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">{product.subtitle}</p>
                      <div className="space-y-2">
                        {product.specs.slice(0, 3).map((spec, index) => (
                          <div key={index} className="text-xs">
                            <span className="font-medium text-gray-700">{spec.label}:</span>
                            <span className="text-gray-600 ml-1">{spec.value.length > 60 ? spec.value.substring(0, 60) + '...' : spec.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-purple-600">View Details</span>
                        <svg className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-coffee-brown to-amber-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Source Premium Arabica Coffee?</h2>
          <p className="text-xl mb-8 text-amber-100">
            Contact us for detailed specifications, pricing, and availability of our Arabica coffee grades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-coffee-brown px-8 py-4 rounded-full font-semibold hover:bg-amber-50 transition-colors">
              Get Quote
            </Link>
            <Link href="/products" className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-coffee-brown transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}