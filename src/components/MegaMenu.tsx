"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { allProducts } from "@/data/products";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

export default function MegaMenu({ isOpen, onClose, isMobile = false }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Group products by category and variety
  const arabicaProducts = allProducts.filter(product => product.variety === 'Arabica');
  const robustaProducts = allProducts.filter(product => product.variety === 'Robusta');

  if (!isOpen) return null;

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-auto">
        <div 
          ref={menuRef}
          className="absolute top-0 left-0 w-full bg-white shadow-lg max-h-screen overflow-y-auto"
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-[#562F23]">Our Products</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* All Products Link */}
            <Link 
              href="/products" 
              onClick={onClose}
              className="block w-full text-left p-4 mb-4 bg-[#E1A694] text-[#562F23] rounded-lg font-semibold hover:bg-[#d19a85] transition-colors"
            >
              View All Products →
            </Link>

            {/* Arabica Products */}
            {arabicaProducts.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#562F23] mb-4 border-b border-gray-200 pb-2">
                  Arabica Coffee
                </h3>
                <div className="space-y-3">
                  {arabicaProducts.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="w-12 h-12 relative mr-3 flex-shrink-0">
                        <Image
                          src={product.heroImage}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#562F23]">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.subtitle}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Robusta Products */}
            {robustaProducts.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#562F23] mb-4 border-b border-gray-200 pb-2">
                  Robusta Coffee
                </h3>
                <div className="space-y-3">
                  {robustaProducts.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="w-12 h-12 relative mr-3 flex-shrink-0">
                        <Image
                          src={product.heroImage}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#562F23]">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.subtitle}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Links */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-[#562F23] mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link 
                  href="/trade-enquiry" 
                  onClick={onClose}
                  className="block p-3 text-[#562F23] hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Trade Enquiry
                </Link>
                <Link 
                  href="/certificates" 
                  onClick={onClose}
                  className="block p-3 text-[#562F23] hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Certificates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop version
  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 z-[150] hidden md:block">
      <div ref={menuRef} className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Categories */}
          <div className="col-span-3">
            <h3 className="text-xl font-serif text-[#562F23] mb-6">Product Categories</h3>
            <div className="space-y-4">
              <Link 
                href="/products" 
                onClick={onClose}
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
                  {arabicaProducts.length} varieties available
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg hover:border-[#E1A694] transition-colors">
                <h4 className="font-semibold text-[#562F23] mb-2">Robusta Coffee</h4>
                <p className="text-sm text-gray-600 mb-3">Strong, full-bodied coffee beans</p>
                <div className="text-sm text-[#7D4B3C]">
                  {robustaProducts.length} varieties available
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Arabica Products */}
          <div className="col-span-4">
            <h3 className="text-xl font-serif text-[#562F23] mb-6">Arabica Varieties</h3>
            <div className="grid grid-cols-1 gap-4">
              {arabicaProducts.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  onClick={onClose}
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
              {robustaProducts.length > 0 && (
                <div>
                  <h3 className="text-xl font-serif text-[#562F23] mb-6">Robusta Varieties</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {robustaProducts.map((product) => (
                      <Link
                        key={product.slug}
                        href={`/products/${product.slug}`}
                        onClick={onClose}
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
                    onClick={onClose}
                    className="p-4 bg-[#7D4B3C] text-white rounded-lg hover:bg-[#6e4236] transition-colors text-center"
                  >
                    <div className="text-sm font-semibold">Trade Enquiry</div>
                    <div className="text-xs opacity-80 mt-1">Get a quote</div>
                  </Link>
                  <Link 
                    href="/certificates" 
                    onClick={onClose}
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
  );
}