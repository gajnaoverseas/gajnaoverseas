"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import MegaMenu from "@/components/MegaMenu";
import { allProducts } from "@/data/products";
import { ChevronDown } from "lucide-react";

import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMegaMenuOpen, setMobileMegaMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => setMobileMenuOpen((s) => !s);

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
            <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-serif text-coffee-brown">
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
            className="md:hidden fixed right-4 top-4 text-white bg-coffee-brown rounded-full p-2 z-50"
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

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 bg-coffee-brown z-40 w-80 shadow-lg">
            <div className="p-6">
              + {/* Language switcher (mobile) */}+{" "}
              <div className="mb-4 bg-white rounded-lg p-3">
                + <LanguageSwitcher />+{" "}
              </div>
              <button
                onClick={() => {
                  setMobileMegaMenuOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200 w-full text-left"
              >
                Products
              
              </button>
              <Link
                href="/certificates"
                className="block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200"
              >
                Registrations & Certificates
              </Link>
              <Link
                href="/blog"
                className="block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200"
              >
                Blogs
              </Link>
              <Link
                href="/trade-enquiry"
                className="block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200"
              >
                Trade Enquiry
              </Link>
              <Link
                href="/about"
                className="block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200"
              >
                About Us
              </Link>
              <Link
                href="/become-supplier"
                className="block text-white text-lg font-medium py-3 border-b border-amber-700 hover:text-amber-200"
              >
                Become a Supplier with us
              </Link>
              <Link
                href="/careers"
                className="block text-white text-lg font-medium py-3 hover:text-amber-200"
              >
                Careers
              </Link>
            </div>
          </div>
        )}

        {/* Desktop Top Info Bar */}
        <div className="hidden md:block border-t border-gray-200">
          <nav className="flex items-center justify-between px-6 py-1 bg-[#434d35] text-white">
            <div className="flex justify-center items-center space-x-8 flex-1">
              <span className="text-white font-medium">Physical Location</span>
              <a href="tel:+919811789665" className="hover:text-amber-200">
                Call Us
              </a>
              <a href="tel:+919811789665" className="hover:text-amber-200">
                Mobile
              </a>
              <a
                href="mailto:info@gajnaoverseas.com"
                className="hover:text-amber-200"
              >
                Send Us Email
              </a>
              <a
                href="https://meet.google.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-200"
              >
                Video Conferencing
              </a>
              <a
                href="mailto:info@gajnaoverseas.com?subject=Quick Enquiry"
                className="hover:text-amber-200"
              >
                Quick Enquiry
              </a>
              <a
                href="https://wa.me/919811789665"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-200"
              >
                Chat With Us
              </a>
              <a href="sms:+919811789665" className="hover:text-amber-200">
                Send Us SMS
              </a>
            </div>
            <div className="pl-6">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>

        {/* Desktop Primary Navigation (center) */}
        <nav className="hidden md:flex justify-center space-x-8 font-semibold relative">
          <div className="flex justify-center items-center gap-10 py-1">
            {/* Products - open mega menu on hover/focus */}
            <div
              className="relative "
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
              onFocus={() => setMegaMenuOpen(true)}
              onBlur={() => setMegaMenuOpen(false)}
            >
              <Link
                href="/products"
                className=" text-black text-sm font-medium hover:text-[#7D4B3C] transition-colors flex flex-row"
              >
                Products
                  <ChevronDown className="text-coffee-brown " />
              </Link>
              {megaMenuOpen && (
                <MegaMenu
                  isOpen={megaMenuOpen}
                  onClose={() => setMegaMenuOpen(false)}
                  isMobile={false}
                />
              )}
            </div>

            <Link
              href="/certificates"
              className="block text-black text-sm font-medium hover:text-[#7D4B3C] transition-colors"
            >
              Registrations & Certificates
            </Link>
            <Link
              href="/blog"
              className="block text-black text-sm font-medium hover:text-[#7D4B3C] transition-colors"
            >
              Blogs
            </Link>
            <Link
              href="/trade-enquiry"
              className="block text-black text-sm font-medium hover:text-[#7D4B3C] transition-colors"
            >
              Trade Enquiry
            </Link>
            <Link
              href="/about"
              className="block text-black text-sm font-medium hover:text-[#7D4B3C] transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/become-supplier"
              className="block text-black text-sm font-medium hover:text-[#7D4B3C] transition-colors"
            >
              Become a Supplier with us
            </Link>
            <Link
              href="/careers"
              className="block text-black text-sm font-medium hover:text-[#7D4B3C] transition-colors"
            >
              Careers
            </Link>
          </div>
        </nav>

        {/* Mobile MegaMenu (modal-style) */}
        <MegaMenu
          isOpen={mobileMegaMenuOpen}
          onClose={() => setMobileMegaMenuOpen(false)}
          isMobile={true}
        />
      </div>
    </header>
  );
}
