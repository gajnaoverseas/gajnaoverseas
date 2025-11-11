"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
// Lazy-load heavy components to reduce header bundle size and speed up navigation
const MegaMenuLazy = dynamic(() => import("@/components/MegaMenu"), {
  ssr: false,
  loading: () => (
    <div className="absolute left-0 right-0 mx-auto p-4 text-sm text-gray-600">Loading menu…</div>
  ),
});
const GeneralContactFormLazy = dynamic(() => import("@/components/GeneralContactForm"), {
  ssr: false,
});
import { ChevronDown, X, Search, Phone, Mail, MessageCircle } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMegaMenuOpen, setMobileMegaMenuOpen] = useState(false);
  const [quickEnquiryOpen, setQuickEnquiryOpen] = useState(false);
  // Removed supplierModalOpen state
  const [supplierModalOpen, setSupplierModalOpen] = useState(false);

  // Prevent page scroll when mobile menu open
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    }
    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "auto";
      }
    };
  }, [mobileMenuOpen]);

  const pathname = usePathname();
  const isActivePath = (paths: string | string[]): boolean => {
    const current = pathname ?? "";
    const list = Array.isArray(paths) ? paths : [paths];
    return list.some((p) => current === p || current.startsWith(`${p}/`));
  };

  const toggleMobileMenu = () => setMobileMenuOpen((s) => !s);

  // Auto-close mobile menus when navigating to a new route
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileMegaMenuOpen(false);
  }, [pathname]);

  return (
    <header className="bg-white fixed w-full top-0 z-[9999] shadow-sm">
      <div>
        {/* Top Header: Logo + Title + Small Logo + Mobile Button */}
        <div className="flex justify-between lg:justify-center lg:gap-20 items-center py-3 md:py-4 px-4 md:px-6">
          {/* Logo */}
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

          {/* Center Title (hidden on small) */}
          <nav className="hidden md:block flex-1 text-center">
            <h2 className="text-lg md:text-2xl lg:text-4xl tracking-wide  font-semibold font-serif text-coffee-brown" style={{ wordSpacing: "4px" }}>
              Exporter of Green Coffee Beans of Indian Origin
            </h2>
          </nav>

          {/* Right small logo (desktop only) */}
          <div className="hidden lg:block">
            <Image
              src="/slogo.webp"
              alt="Small Logo"
              width={50}
              height={50}
              className="w-12 h-12 lg:w-16 lg:h-16"
            />
          </div>

          {/* Mobile Menu Button (visible on md down) */}
          <button
            className="md:hidden fixed right-4 top-4 text-white bg-coffee-brown rounded-lg p-2 z-50"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Quick Actions: replicate desktop communication channels with exact text */}
        <div className="md:hidden border-t border-gray-200 bg-[#15803D]">
          <nav className="flex items-center gap-2 px-4 py-2 overflow-x-auto">
            <Link
              href="https://maps.google.com/?q=Gajna+Overseas"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs text-gray-700 whitespace-nowrap"
              aria-label="Visit Us"
            >
              Visit Us
            </Link>
            <Link
              href="tel:+919811789665"
              className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs text-gray-700 whitespace-nowrap"
              aria-label="Call Us"
            >
              Call Us
            </Link>
            <Link
              href="mailto:info@gajnaoverseas.com"
              className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs text-gray-700 whitespace-nowrap"
              aria-label="Send Us Email"
            >
              Send Us Email
            </Link>
            <Link
              href="https://meet.google.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs text-gray-700 whitespace-nowrap"
              aria-label="Video Conferencing"
            >
              Video Conferencing
            </Link>
            <Link
              href="https://wa.me/919811789665"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs text-gray-700 whitespace-nowrap"
              aria-label="Chat With Us"
            >
              Chat With Us
            </Link>
            <Link
              href="sms:+919811789665"
              className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs text-gray-700 whitespace-nowrap"
              aria-label="Send Us SMS"
            >
              Send Us SMS
            </Link>
            <button
              onClick={() => setQuickEnquiryOpen(true)}
              className="px-3 py-1 bg-white text-[#374151] border border-white rounded-lg text-xs whitespace-nowrap"
              aria-label="Quick Enquiry"
            >
              Quick Enquiry
            </button>
          </nav>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 bg-coffee-brown z-40 w-80 shadow-lg">
            <div className="p-6">
              {/* Language switcher (mobile) */}
              <div className="mb-4 bg-white rounded-lg p-3">
                <LanguageSwitcher />
              </div>
              {/* Search Coffee Grades (mobile) */}
              <Link
                href="/search"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200 ${isActivePath("/search") ? "text-amber-200" : ""}`}
              >
                <Search size={18} />
                Search Coffee Grades
              </Link>
              <button
                onClick={() => {
                  setMobileMegaMenuOpen(true);
                  setMobileMenuOpen(false);
                }}
                className={`block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200 w-full text-left ${isActivePath(["/products", "/arabica", "/robusta"]) ? "text-amber-200" : ""}`}
              >
                Products
              </button>
              <Link
                href="/registrations"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200 ${isActivePath("/registrations") ? "text-amber-200" : ""}`}
              >
                Registrations & Certificates
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200 ${isActivePath("/blog") ? "text-amber-200" : ""}`}
              >
                Blogs
              </Link>
              <Link
                href="/gallery"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200 ${isActivePath("/gallery") ? "text-amber-200" : ""}`}
              >
                Gallery
              </Link>

              <Link
                href="/trade-enquiry"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200 ${isActivePath("/trade-enquiry") ? "text-amber-200" : ""}`}
              >
                Trade Enquiry
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200 ${isActivePath("/about") ? "text-amber-200" : ""}`}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200 ${isActivePath("/contact") ? "text-amber-200" : ""}`}
              >
                Contact Us
              </Link>
              <button
                onClick={() => setSupplierModalOpen(true)}
                className="block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200 w-full text-left"
              >
                Become a Supplier with us
              </button>
              <button
                onClick={() => {
                  setQuickEnquiryOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200 w-full text-left"
              >
                Quick Enquiry
              </button>

            </div>
          </div>
        )}

        {/* Desktop Top Info Bar */}
        <div className="hidden md:block border-t border-gray-200">
          <nav className="flex items-center justify-center px-6 py-1 bg-[#15803D]">
            <div className="flex flex-wrap justify-center items-center gap-2 lg:gap-4 xl:gap-6 font-semibold max-w-8xl mx-auto">
              <Link
                href="https://maps.google.com/?q=Gajna+Overseas"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Visit Us
              </Link>
              <Link
                href="tel:+919811789665"
                className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Call Us
              </Link>
              {/* <Link
                href="tel:+919811789665"
                className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Mobile
              </Link> */}
              <Link
                href="mailto:info@gajnaoverseas.com"
                className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Send Us Email
              </Link>
              <Link
                href="https://meet.google.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Video Conferencing
              </Link>

              <Link
                href="https://wa.me/919811789665"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Chat With Us
              </Link>
              <Link
                href="sms:+919811789665"
                className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Send Us SMS
              </Link>
              <button
                onClick={() => setQuickEnquiryOpen(true)}
                className="px-3 py-1 bg-white text-[#374151] border border-white rounded-lg text-xs hover:bg-white/80 transition-colors"
              >
                Quick Enquiry
              </button>

              <LanguageSwitcher />
              {/* Search Coffee Grades (desktop) */}
              <Link
                href="/search"
                className={`flex items-center gap-1 bg-[#F9C977] rounded-lg px-2 py-1 text-coffee-brown hover:text-amber-700 transition-colors ${isActivePath("/search") ? "text-amber-700" : ""}`}
              >
                <Search size={16} />
                <span className="text-sm">Search Coffee Grades</span>
              </Link>
            </div>


          </nav>
        </div>

        {/* Desktop Primary Navigation (center) */}
        <nav className="hidden md:flex justify-center space-x-8 font-semibold relative">
          <div className="flex justify-center items-center gap-10 py-1">
            {/* Products - open mega menu on hover/focus */}
            <div
              className=""
              onMouseEnter={() => setMegaMenuOpen(true)}
            >
              <button
                className={`text-xl font-medium hover:bg-coffee-brown hover:text-white hover:pl-[12px] hover:rounded-lg transition-colors flex flex-row items-center ${isActivePath(["/products", "/arabica", "/robusta"]) ? "bg-coffee-brown text-white pl-[12px] rounded-lg" : "text-black"}`}
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              >
                Products
                <ChevronDown className={`ml-1 ${isActivePath(["/products", "/arabica", "/robusta"]) ? "text-white" : "text-coffee-brown hover:text-white"}`} />
              </button>
              {megaMenuOpen && (
                <MegaMenuLazy
                  isOpen={megaMenuOpen}
                  onClose={() => setMegaMenuOpen(false)}
                  isMobile={false}
                  
                />
              )}
            </div>

            <Link
              href="/registrations"
              className={`block text-xl font-medium hover:bg-coffee-brown hover:text-white px-2 rounded-lg transition-colors ${isActivePath("/registrations") ? "bg-coffee-brown text-white" : "text-black"}`}
            >
              Registrations & Certificates
            </Link>
            <Link
              href="/blog"
              className={`block text-xl font-medium hover:bg-coffee-brown hover:text-white px-2 rounded-lg transition-colors ${isActivePath("/blog") ? "bg-coffee-brown text-white" : "text-black"}`}
            >
              Blogs
            </Link>
            <Link
              href="/gallery"
              className={`block text-xl font-medium hover:bg-coffee-brown hover:text-white px-2 rounded-lg transition-colors ${isActivePath("/gallery") ? "bg-coffee-brown text-white" : "text-black"}`}
            >
              Gallery
            </Link>

            <Link
              href="/trade-enquiry"
              className={`block text-xl font-medium hover:bg-coffee-brown hover:text-white px-2 rounded-lg transition-colors ${isActivePath("/trade-enquiry") ? "bg-coffee-brown text-white" : "text-black"}`}
            >
              Trade Enquiry
            </Link>
            <Link
              href="/about"
              className={`block text-xl font-medium hover:bg-coffee-brown hover:text-white px-2 rounded-lg transition-colors ${isActivePath("/about") ? "bg-coffee-brown text-white" : "text-black"}`}
            >
              About Us
            </Link>
            <Link
              href="/coffee-suppliers"
              className={`block text-xl font-medium hover:bg-coffee-brown hover:text-white px-2 rounded-lg transition-colors ${isActivePath("/coffee-suppliers") ? "bg-coffee-brown text-white" : "text-black"}`}
            >
              Become a Supplier with us
            </Link>

            <Link
              href="/contact"
              className={`block text-xl font-medium px-2 rounded-lg transition-colors hover:bg-coffee-brown hover:text-white ${isActivePath("/contact") ? "bg-coffee-brown text-white" : "text-black"}`}
            >
              Contact Us
            </Link>
          </div>
        </nav>

        {/* Mobile MegaMenu (modal-style) */}
        <MegaMenuLazy
          isOpen={mobileMegaMenuOpen}
          onClose={() => setMobileMegaMenuOpen(false)}
          isMobile={true}
        />

        {/* Quick Enquiry Modal */}
        {quickEnquiryOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[10000] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <Image src="/logo.webp" alt="Gajna Overseas Private Limited" width={100} height={50} />
                <div className="flex flex-col justify-center items-center text-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Gajna Overseas Private Limited
                  </h2>
                  <p>Exporter of Green Coffee Beans of Indian Origin</p>
                </div>
                <button
                  onClick={() => setQuickEnquiryOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 bg-[#15803D]/20">
                <GeneralContactFormLazy
                  initial={{ subject: "Quick Enquiry" }}
                  submitLabel="Send Enquiry"
                  onSuccess={() => setQuickEnquiryOpen(false)}
                  isModal={true}
                />
              </div>
            </div>
          </div>
        )}


      </div>
    </header>
  );
}
