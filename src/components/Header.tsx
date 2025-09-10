"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import MegaMenu from "@/components/MegaMenu";
import { allProducts } from "@/data/products";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMegaMenuOpen, setMobileMegaMenuOpen] = useState(false);

  // Update body overflow style when mobile menu state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (mobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
    
    // Cleanup function to reset overflow when component unmounts
    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = 'auto';
      }
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white fixed w-[100vw]  top-0 z-[9999] overflow-hidden shadow-sm">
      <div className="">
        {/* Header */}
        <div className="flex justify-between lg:justify-center lg:gap-20 items-center py-3 md:py-4 px-4 md:px-6">
          <div className="flex items-center justify-center flex-col">
            <Link
              href="/"
              className="text-xl font-bold text-coffee-brown flex items-center"
            >
              <Image
                src="/logo.webp"
                alt="Gaina Overseas Logo"
                width={150}
                height={80}
                className="w-32 h-auto md:w-40 lg:w-48 xl:w-56"
              />
            </Link>
          </div>
          <nav className="hidden md:block flex-1 text-center">
            <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-serif text-coffee-brown">
              Exporter of Green coffee Beans of Indian Origin
            </h2>
          </nav>
          <div className="hidden lg:block">
             <Image
                src="/slogo.webp"
                alt="Gaina Overseas Logo"
                width={50}
                height={50}
                className="w-12 h-12 lg:w-16 lg:h-16"
              />
          </div>
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden fixed right-4 top-4 text-white bg-coffee-brown rounded-full p-2 z-50 "
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 bg-coffee-brown z-40 w-80 shadow-lg">
            <div className="p-6">
              <button 
                onClick={() => {
                  setMobileMegaMenuOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200 w-full text-left"
              >
                Products
              </button>
              <Link href="/certificates" className="block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200">Registrations & Certificates</Link>
              <Link href="/blog" className="block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200">Blogs</Link>
              <Link href="/trade-enquiry" className="block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200">Trade Enquiry</Link>
              <Link href="/about" className="block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200">About Us</Link>
              <Link href="/become-supplier" className="block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200">Becomes a Supplier with us</Link>
              <Link href="/careers" className="block text-white text-lg font-medium py-3 hover:text-amber-200">Careers</Link>
            </div>
          </div>
        )}

        {/* Desktop Navigation */}
        <div className="hidden md:block border-t border-gray-200">
          <nav className="flex items-center justify-between px-6 py-1 bg-[#434d35] text-white">
            {/* Hamburger Menu Button */}
            
            
            {/* Contact Links */}
            <div className="flex justify-center items-center space-x-8 flex-1">
              {/* <button 
              className="text-white hover:text-amber-200 p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button> */}
              <span className="text-white font-medium">
                Physical Location
              </span>
              <a href="tel:+919811789665" className="text-white hover:text-amber-200">
                Call Us
              </a>
              <a href="tel:+919811789665" className="text-white hover:text-amber-200">
                Mobile
              </a>
              <a href="mailto:info@gajnaoverseas.com" className="text-white hover:text-amber-200">
                Send Us Email
              </a>
              <a href="https://meet.google.com/new" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-200">
                Video Conferencing
              </a>
              <a href="mailto:info@gajnaoverseas.com?subject=Quick Enquiry" className="text-white hover:text-amber-200">Quick Enquiry</a>
              <a href="https://wa.me/919811789665" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-200">Chat With Us</a>
              <a href="sms:+919811789665" className="text-white hover:text-amber-200">Send Us SMS</a>
            </div>
          </nav>
        </div>
        <nav className="hidden md:flex justify-center space-x-8 font-semibold relative">
          <div className="flex justify-center items-center gap-10 py-1">
              <div 
                className="relative"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={() => setMegaMenuOpen(false)}
              >
                <Link href="/products" className="block text-black text-sm font-medium hover:text-[#7D4B3C] transition-colors py-2">
                  Products
                  <svg className="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                {megaMenuOpen && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-screen bg-white shadow-lg border-t border-gray-200 z-[9999]">
                  <div className="max-w-7xl mx-auto p-8">
                    <div className="grid grid-cols-12 gap-8">
                      {/* Left Column - Categories */}
                      <div className="col-span-3">
                        <h3 className="text-xl font-serif text-[#562F23] mb-6">Product Categories</h3>
                        <div className="space-y-4">
                          <Link 
                            href="/products" 
                            className="block p-4 bg-[#E1A694] text-[#562F23] rounded-lg font-semibold hover:bg-[#d19a85] transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span>All Products</span>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                            <p className="text-sm mt-1 opacity-80">Browse our complete collection</p>
                          </Link>
                          
                          <div className="p-4 border border-gray-200 rounded-lg hover:border-[#E1A694] transition-colors">
                            <h4 className="font-semibold text-[#562F23] mb-2">Arabica Coffee</h4>
                            <p className="text-sm text-gray-600 mb-3">Premium high-altitude grown coffee beans</p>
                            <div className="text-sm text-[#7D4B3C]">
                              {allProducts.filter(p => p.variety === 'Arabica').length} varieties available
                            </div>
                          </div>
                          
                          <div className="p-4 border border-gray-200 rounded-lg hover:border-[#E1A694] transition-colors">
                            <h4 className="font-semibold text-[#562F23] mb-2">Robusta Coffee</h4>
                            <p className="text-sm text-gray-600 mb-3">Strong, full-bodied coffee beans</p>
                            <div className="text-sm text-[#7D4B3C]">
                              {allProducts.filter(p => p.variety === 'Robusta').length} varieties available
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Middle Column - Arabica Products */}
                      <div className="col-span-4">
                        <h3 className="text-xl font-serif text-[#562F23] mb-6">Arabica Varieties</h3>
                        <div className="grid grid-cols-1 gap-4">
                          {allProducts.filter(p => p.variety === 'Arabica').map((product) => (
                            <Link
                              key={product.slug}
                              href={`/products/${product.slug}`}
                              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#E1A694] hover:shadow-md transition-all group"
                            >
                              <div className="w-16 h-16 relative mr-4 flex-shrink-0">
                                <Image
                                  src={product.heroImage}
                                  alt={product.name}
                                  fill
                                  className="object-cover rounded-lg"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-[#562F23] group-hover:text-[#7D4B3C] transition-colors">
                                  {product.name}
                                </h4>
                                <p className="text-sm text-gray-600 mb-1">{product.subtitle}</p>
                                <p className="text-xs text-[#7D4B3C]">{product.category}</p>
                              </div>
                              <svg className="w-5 h-5 text-gray-400 group-hover:text-[#7D4B3C] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Right Column - Robusta Products & Quick Links */}
                      <div className="col-span-5">
                        <div className="grid grid-cols-1 gap-8">
                          {/* Robusta Products */}
                          {allProducts.filter(p => p.variety === 'Robusta').length > 0 && (
                            <div>
                              <h3 className="text-xl font-serif text-[#562F23] mb-6">Robusta Varieties</h3>
                              <div className="grid grid-cols-1 gap-4">
                                {allProducts.filter(p => p.variety === 'Robusta').map((product) => (
                                  <Link
                                    key={product.slug}
                                    href={`/products/${product.slug}`}
                                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#E1A694] hover:shadow-md transition-all group"
                                  >
                                    <div className="w-16 h-16 relative mr-4 flex-shrink-0">
                                      <Image
                                        src={product.heroImage}
                                        alt={product.name}
                                        fill
                                        className="object-cover rounded-lg"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-[#562F23] group-hover:text-[#7D4B3C] transition-colors">
                                        {product.name}
                                      </h4>
                                      <p className="text-sm text-gray-600 mb-1">{product.subtitle}</p>
                                      <p className="text-xs text-[#7D4B3C]">{product.category}</p>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-[#7D4B3C] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Quick Links */}
                          <div>
                            <h3 className="text-xl font-serif text-[#562F23] mb-6">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-4">
                              <Link 
                                href="/trade-enquiry" 
                                className="p-4 bg-[#7D4B3C] text-white rounded-lg hover:bg-[#6e4236] transition-colors text-center"
                              >
                                <div className="text-sm font-semibold">Trade Enquiry</div>
                                <div className="text-xs opacity-80 mt-1">Get a quote</div>
                              </Link>
                              <Link 
                                href="/certificates" 
                                className="p-4 border-2 border-[#7D4B3C] text-[#7D4B3C] rounded-lg hover:bg-[#7D4B3C] hover:text-white transition-colors text-center"
                              >
                                <div className="text-sm font-semibold">Certificates</div>
                                <div className="text-xs opacity-80 mt-1">View credentials</div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                   </div>
                )}
              </div>
              <Link href="/certificates" className="block text-black text-sm font-medium hover:text-[#7D4B3C] transition-colors">Registrations & Certificates</Link>
              <Link href="/blog" className="block text-black text-sm font-medium hover:text-[#7D4B3C] transition-colors">Blogs</Link>
              <Link href="/trade-enquiry" className="block text-black text-sm font-medium hover:text-[#7D4B3C] transition-colors">Trade Enquiry</Link>
              <Link href="/about" className="block text-black text-sm font-medium hover:text-[#7D4B3C] transition-colors">About Us</Link>
              <Link href="/become-supplier" className="block text-black text-sm font-medium hover:text-[#7D4B3C] transition-colors">Becomes a Supplier with us</Link>
              <Link href="/careers" className="block text-black text-sm font-medium hover:text-[#7D4B3C] transition-colors">Careers</Link>
            </div>
        </nav>
        
        {/* Mobile MegaMenu */}
        <MegaMenu 
          isOpen={mobileMegaMenuOpen} 
          onClose={() => setMobileMegaMenuOpen(false)} 
          isMobile={true}
        />
      </div>
    </header>
  );
}
