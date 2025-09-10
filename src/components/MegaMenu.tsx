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
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Group products by category and variety
  const arabicaProducts = allProducts.filter((product) => product.variety === "Arabica");
  const robustaProducts = allProducts.filter((product) => product.variety === "Robusta");

  // Static grades list based on Figma to ensure ALL grades are visible in the mega menu
  const slugMap: Record<string, string> = {
    "Plantation PB": "plantation-pb",
    "Plantation A": "plantation-a",
    "Plantation B": "plantation-b",
    "Plantation C": "plantation-c",
  };

  // Fallback: generate a URL-friendly slug from a grade name so each item can have its own page
  const slugifyGrade = (name: string) =>
    name
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "") // remove special chars
      .trim()
      .replace(/\s+/g, "-");

  type GradeGroup = {
    title: string; // Section, e.g., Commercial Grades
    blocks: Array<{
      heading: string; // Arabica | Robusta
      groups: Array<{
        subheading: string; // e.g., Washed Arabica Plantation
        variety: "Arabica" | "Robusta";
        items: string[];
      }>;
    }>;
  };

  const gradesData: GradeGroup[] = [
    {
      title: "Commercial Grades",
      blocks: [
        {
          heading: "Arabica",
          groups: [
            {
              subheading: "Washed Arabica Plantation",
              variety: "Arabica",
              items: [
                "Plantation A",
                "Plantation B",
                "Plantation C",
                "Plantation Blacks",
                "Plantation Bits",
                "Plantation Bulk",
              ],
            },
            {
              subheading: "Unwashed Arabica Cherry",
              variety: "Arabica",
              items: [
                "Arabica Cherry PB",
                "Arabica Cherry AB",
                "Arabica Cherry C",
                "Arabica Cherry Blacks/Brown",
                "Arabica Cherry Bits",
                "Arabica Cherry Bulk",
              ],
            },
          ],
        },
        {
          heading: "Robusta",
          groups: [
            {
              subheading: "Washed Robusta Parchment",
              variety: "Robusta",
              items: [
                "Robusta Parchment PB",
                "Robusta Parchment AB",
                "Robusta Parchment C",
                "Robusta Parchment Blacks/Browns",
                "Robusta Parchment Bits",
                "Robusta Parchment Bulk",
              ],
            },
            {
              subheading: "Unwashed Robusta Cherry",
              variety: "Robusta",
              items: [
                "Robusta Cherry PB",
                "Robusta Cherry AB",
                "Robusta Cherry C",
                "Robusta Cherry Blacks/Browns",
                "Robusta Cherry Bits",
                "Robusta Cherry Bulk",
                "Robusta Cherry Clean Bulk",
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Premium Grades",
      blocks: [
        {
          heading: "Arabica",
          groups: [
            {
              subheading: "Washed Arabica Plantation",
              variety: "Arabica",
              items: ["Plantation AA", "Plantation PB Bold"],
            },
            {
              subheading: "Unwashed Arabica Cherry",
              variety: "Arabica",
              items: ["Arabica Cherry AA", "Arabica Cherry AB", "Arabica Cherry PB Bold"],
            },
          ],
        },
        {
          heading: "Robusta",
          groups: [
            {
              subheading: "Washed Robusta Parchment",
              variety: "Robusta",
              items: ["Robusta Parchment A", "Robusta Parchment PB  Bold"],
            },
            {
              subheading: "Unwashed Robusta Cherry",
              variety: "Robusta",
              items: ["Robusta Cherry AA", "Robusta Cherry A", "Robusta Cherry PB  Bold"],
            },
          ],
        },
      ],
    },
    {
      title: "Specialty Grades",
      blocks: [
        {
          heading: "Arabica",
          groups: [
            {
              subheading: "Washed Arabica",
              variety: "Arabica",
              items: ["Mysore Nuggets Extra bold- Washed"],
            },
            {
              subheading: "Arabica Cherry",
              variety: "Arabica",
              items: [
                "Monsooned Malabar AAA -  Unwashed",
                "Monsooned Malabar AA -  unwashed",
                "Monsooned Malabar arabica Triage -  Unwashed",
              ],
            },
          ],
        },
        {
          heading: "Robusta",
          groups: [
            {
              subheading: "Robusta Parchment",
              variety: "Robusta",
              items: ["Robusta Kaapi Royale- Washed Coffee"],
            },
            {
              subheading: "Robusta Cherry",
              variety: "Robusta",
              items: [
                "Monsooned Malabar Robusta PR-  Unwashed",
                "Monsooned Malabar Robusta Triage -  Unwashed",
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Miscellaneous Grades",
      blocks: [
        {
          heading: "",
          groups: [
            {
              subheading: "",
              variety: "Arabica",
              items: [
                "Liberia Bulk (Bulk Coffee from Liberia)",
                "Excelsia Bulk (Bulk Coffee from Excelsia)",
              ],
            },
          ],
        },
      ],
    },
  ];

  if (!isOpen) return null;

  // ✅ Mobile version
  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998]">
        <div
          ref={menuRef}
          className="absolute top-0 left-0 w-full bg-white shadow-lg max-h-screen overflow-y-auto"
        >
          <div className="p-6">
            {/* Header */}


            {/* All Products Link */}
            <Link
              href="/products"
              onClick={onClose}
              className="block w-full text-left p-4 mb-4 bg-[#E1A694] text-[#562F23] rounded-lg font-semibold hover:bg-[#d19a85] transition-colors"
            >
              View All Products →
            </Link>

            {/* Full grade list per Figma */}
            <div className="space-y-8">
              {gradesData.map((section) => (
                <div key={section.title} className="mb-2">
                  <h3 className="text-lg font-semibold text-[#562F23] mb-4">{section.title}</h3>
                  {/* Special layout for Miscellaneous */}
                  {section.title === "Miscellaneous Grades" ? (
                    <div>
                      {(section.blocks[0]?.groups || []).map((g, i) => (
                        <div key={i} className="mt-2">
                          {g.subheading ? (
                            <p className="text-sm text-[#7D4B3C] font-medium mb-1">{g.subheading}</p>
                          ) : null}
                          <ol className="list-decimal pl-5 space-y-1">
                            {g.items.map((name) => {
                              const slug = slugMap[name] || slugifyGrade(name);
                              const href = `/products/${slug}`;
                              return (
                                <li key={name}>
                                  <Link href={href} onClick={onClose} className="text-sm text-[#562F23] hover:text-[#7D4B3C]">
                                    {name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ol>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {section.blocks.map((block, idx) => (
                        <div key={idx}>
                          {block.heading ? (
                            <h4 className="text-base font-semibold text-[#562F23]">{block.heading}</h4>
                          ) : null}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                            {block.groups.map((g, gIdx) => (
                              <div key={gIdx}>
                                {g.subheading ? (
                                  <p className="text-sm text-[#7D4B3C] font-medium mb-1">{g.subheading}</p>
                                ) : null}
                                <ol className="list-decimal pl-5 space-y-1">
                                  {g.items.map((name) => {
                                    const slug = slugMap[name] || slugifyGrade(name);
                                    const href = `/products/${slug}`;
                                    return (
                                      <li key={name}>
                                        <Link href={href} onClick={onClose} className="text-sm text-[#562F23] hover:text-[#7D4B3C]">
                                          {name}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ol>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Legacy mobile product previews disabled per Figma spec */}
            {false && arabicaProducts.length > 0 && (
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
                       <div className="w-10 h-10 relative mr-3 flex-shrink-0">
                         <Image
                           src={product.heroImage}
                           alt={`${product.name} thumbnail`}
                           fill
                           className="object-cover rounded-full ring-1 ring-gray-200"
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
            {false && robustaProducts.length > 0 && (
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
          </div>
        </div>
      </div>
    );
  }

  // ✅ Desktop version
  return (
    <div className="absolute top-full translate-x-[-15%] w-screen md:w-[90vw] max-h-[80vh] overflow-y-auto bg-white shadow-lg border-t border-gray-200 z-[9999] hidden md:block">
      <div ref={menuRef} className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-12 gap-8">


          {/* Middle Column - Arabica Products */}
          {/* Replaced the middle and right columns with the full grade matrix based on Figma */}
          <div className="col-span-12">
            {gradesData.map((section) => (
              <div key={section.title} className="mb-10">
                <h3 className="text-2xl font-serif text-[#562F23] mb-4">{section.title}</h3>
                {section.title === "Miscellaneous Grades" ? (
                  <div className="bg-white">
                    {(section.blocks[0]?.groups || []).map((g, i) => (
                      <div key={i} className="mb-4">
                        {g.subheading ? (
                          <p className="text-sm text-[#7D4B3C] font-medium mb-1">{g.subheading}</p>
                        ) : null}
                        <ol className="list-decimal pl-5 space-y-1 text-sm text-[#562F23]">
                          {g.items.map((name) => {
                            const slug = slugMap[name];
                            const href = slug ? `/products/${slug}` : "/products";
                            return (
                              <li key={name}>
                                <Link href={href} onClick={onClose} className="hover:text-[#7D4B3C]">
                                  {name}
                                </Link>
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {section.blocks.map((block, idx) => (
                      <div key={idx} className="lg:col-span-2">
                        {block.heading ? (
                          <h4 className="font-semibold text-[#562F23] mb-1">{block.heading}</h4>
                        ) : null}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {block.groups.map((g, gIdx) => (
                            <div key={gIdx}>
                              {g.subheading ? (
                                <p className="text-sm text-[#7D4B3C] font-medium mb-1">{g.subheading}</p>
                              ) : null}
                              <ol className="list-decimal pl-5 space-y-1 text-sm text-[#562F23]">
                                {g.items.map((name) => {
                                  const slug = slugMap[name] || slugifyGrade(name);
                                  const href = `/products/${slug}`;
                                  return (
                                    <li key={name}>
                                      <Link href={href} onClick={onClose} className="hover:text-[#7D4B3C]">
                                        {name}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ol>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
