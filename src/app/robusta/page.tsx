import Image from "next/image";
import Link from "next/link";
import { allProducts } from "@/data/products";

export const metadata = {
  title: "Robusta Coffee Grades - Premium Indian Coffee | Gajna Overseas",
  description: "Explore our premium Robusta coffee grades from India. From commercial parchment varieties to specialty monsooned coffees, discover the finest Indian Robusta coffee beans.",
};

export default function RobustaPage() {
  // Filter and categorize Robusta products
  const robustaProducts = allProducts.filter(product => product.variety === "Robusta");

  // Group by category
  const commercialGrade = robustaProducts.filter(p => p.category === "Commercial Grade");
  const premiumGrade = robustaProducts.filter(p => p.category === "Premium Grade");
  const specialtyGrade = robustaProducts.filter(p => p.category === "Specialty Coffee");

  // Further group commercial grade by processing type
  const parchmentGrades = commercialGrade.filter(p => p.specs.some(spec => spec.value.includes("Parchment")));
  const cherryGrades = commercialGrade.filter(p => p.specs.some(spec => spec.value.includes("Cherry")));

  // Premium Robusta split by processing
  const premiumWashed = premiumGrade.filter(p => p.specs.some(spec => spec.label === "Processing" && spec.value.includes("Washed Robusta Parchment")));
  const premiumUnwashed = premiumGrade.filter(p => p.specs.some(spec => spec.label === "Processing" && spec.value.includes("Unwashed Robusta Cherry")));
  const otherCommercial = commercialGrade.filter(p => !p.specs.some(spec => spec.value.includes("Parchment")) && !p.specs.some(spec => spec.value.includes("Cherry")));

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-900 via-orange-800 to-red-900 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>



        <div className="relative max-w-7xl mt-36 mx-auto px-4 text-center text-white">
          <div className="mb-8">
            <img
              src="/coffee-beans/robusta.webp"
              alt="Robusta Coffee Bean"
              width={120}
              height={120}
              className="mx-auto mb-6 rounded-full shadow-2xl border-4 border-white/30"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-200 to-white bg-clip-text text-transparent">
            Indian Robusta Coffee Grades
          </h1>


        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-coffee-brown mb-12">Categories of Indian Robusta Coffee</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {/* <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-lg">
              <div className="text-sm text-gray-600 mb-4"><span className="font-semibold">Robusta - </span>Total Grades </div>
              <div className="text-3xl font-bold text-coffee-brown mb-2">{robustaProducts.length}</div>

            </div> */}
            <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-lg">

              <div className="text-sm text-gray-600 mb-4"><span className="font-semibold">Robusta - </span>Commercial Grades</div>
              <div className="text-3xl font-bold text-coffee-brown mb-2">{commercialGrade.length}</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-lg">

              <div className="text-sm text-gray-600 mb-4"><span className="font-semibold">Robusta - </span>Premium Grades</div>
              <div className="text-3xl font-bold text-coffee-brown mb-2">{premiumGrade.length}</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl shadow-lg">

              <div className="text-sm text-gray-600 mb-4"><span className="font-semibold">Robusta - </span>Specialty Grades</div>
              <div className="text-3xl font-bold text-coffee-brown mb-2">{specialtyGrade.length}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Grade - Parchment Varieties */}
      {parchmentGrades.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-orange-50 to-red-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-5xl font-bold text-center text-red-500 mb-10">Robusta Commercial Grades </h2>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-coffee-brown mb-4">Washed Robusta (Parchment)</h2>
              <p className="text-lg text-[#15803D] max-w-3xl mx-auto">
                The grade designations of Commercial Washed Robusta Coffees are :
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {parchmentGrades.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-orange-100">

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-coffee-brown mb-2 group-hover:text-orange-600 transition-colors">
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
                        <span className="text-sm font-medium text-orange-600">View Details</span>
                        <svg className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <section className="py-16 bg-gradient-to-r from-red-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4">

            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-coffee-brown mb-4">Unwashed Robusta (Cherry)</h2>
              <p className="text-lg text-[#15803D] max-w-3xl mx-auto">
                The grade designations of Commercial Unwashed Robusta Coffees are :
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cherryGrades.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-red-100">

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-coffee-brown mb-2 group-hover:text-red-600 transition-colors">
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
                        <span className="text-sm font-medium text-red-600">View Details</span>
                        <svg className="w-4 h-4 text-red-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Other Commercial Grades */}
      {otherCommercial.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-coffee-brown mb-4">Other Commercial Robusta Grades</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Additional commercial Robusta varieties including bulk and specialty processed coffees.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {otherCommercial.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-yellow-100">

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-coffee-brown mb-2 group-hover:text-yellow-600 transition-colors">
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
                        <span className="text-sm font-medium text-yellow-600">View Details</span>
                        <svg className="w-4 h-4 text-yellow-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="max-w-7xl mx-auto px-4">
                      <h2 className="text-5xl font-bold text-center text-red-500 mb-10">Robusta Premium Grades </h2>
            {/* Washed Premium Robusta (Parchment) */}
            {premiumWashed.length > 0 && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-coffee-brown mb-2">Washed Robusta (Parchment)</h2>
                  <p className="text-lg text-[#15803D] max-w-3xl mx-auto">
                   The grade designations of Premium  Washed Robusta Coffees are :
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

            {/* Unwashed Premium Robusta (Cherry) */}
            {premiumUnwashed.length > 0 && (
              <>
                <div className="text-center mt-12 mb-8">
                  <h2 className="text-3xl font-bold text-coffee-brown mb-2">Unwashed Robusta (Cherry)</h2>
                  <p className="text-lg text-[#15803D]  max-w-3xl mx-auto">
                    The grade designations of Premium Unwashed Robusta Coffees are :
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
        <section className="py-16 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-red-500 mb-4"> Specialty Robusta  Grades</h2>
              <p className="text-lg text-[#15803D] max-w-3xl mx-auto">
                The grade designations of Specialty Robusta Coffees are :
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specialtyGrade.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-teal-100 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-cyan-500"></div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-coffee-brown mb-2 group-hover:text-teal-600 transition-colors">
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
                        <span className="text-sm font-medium text-teal-600">View Details</span>
                        <svg className="w-4 h-4 text-teal-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <section className="py-20 bg-gradient-to-r from-red-900 to-orange-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           
            <Link href="/products" className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-red-900 transition-colors">
              View All Indian Coffee Grades
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}