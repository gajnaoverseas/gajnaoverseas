"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header className="bg-white sticky top-0 z-50">
      <div className="">
        {/* Desktop Header */}
        <div className="flex justify-center lg:gap-20 gap-4 items-center py-4 px-6">
          <div className="flex items-center justify-center flex-col">
            <Link
              href="/"
              className="text-xl font-bold text-coffee-brown flex items-center"
            >
              <Image
                src="/logo.webp"
                alt="Gaina Overseas Logo"
                width={180}
                height={100}
                className="lg:w-full lg:h-full w-56 h-full"
              />
            </Link>
          </div>
          <nav className="">
            <h2 className="md:text-4xl text-sm  lg:mr-0 mr-10">
              Exporter of Green coffee Beans of Indian Origin
            </h2>
          </nav>
          <div>
             <Image
                src="/slogo.webp"
                alt="Gaina Overseas Logo"
                width={50}
                height={50}
                className="lg:w-full lg:h-full w-52 h-full"
              />
          </div>
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden fixed right-4 top-4 text-white bg-coffee-brown rounded-full p-2 z-50"
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

        {/* Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 bg-coffee-brown z-40 w-80 shadow-lg">
            <div className="p-6">
              <Link href="/products" className="block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200">Products</Link>
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
          <nav className="flex items-center justify-between px-6 py-3 bg-coffee-brown text-white">
            {/* Hamburger Menu Button */}
            
            
            {/* Contact Links */}
            <div className="flex justify-center items-center space-x-8 flex-1">
              <button 
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
            </button>
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
        {/* <nav className="hidden md:flex justify-center space-x-8 py-3 font-semibold">
          <Link
            href="/coffee-grades"
            className="text-coffee-brown hover:text-coffee-lightGreen"
          >
            Our Coffee Grades
          </Link>
          <Link
            href="/about"
            className="text-coffee-brown hover:text-coffee-lightGreen"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-coffee-brown hover:text-coffee-lightGreen"
          >
            Contact Us
          </Link>
          <Link
            href="/trade"
            className="text-coffee-brown hover:text-coffee-lightGreen"
          >
            Trade Enquiry
          </Link>
          <Link
            href="/certificates"
            className="text-coffee-brown hover:text-coffee-lightGreen"
          >
            Registrations & Certificates
          </Link>
        </nav> */}
      </div>
    </header>
  );
}
