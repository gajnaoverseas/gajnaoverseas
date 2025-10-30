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
    "Monsooned Malabar Robusta Triage -  Unwashed": "monsooned-malabar-robusta-triage",
    "Liberia Bulk (Bulk Coffee from Liberia)": "liberia-bulk",
    "Excelsia Bulk (Bulk Coffee from Excelsia)": "excelsia-bulk",
    "Arabica Cherry Blacks/Browns": "arabica-cherry-blacks-browns",
    "Robusta Parchment Blacks/Browns": "robusta-parchment-blacks-browns",
    "Robusta Cherry Blacks/Browns": "robusta-cherry-blacks-browns",
    "Plantation AA": "plantation-aa",
    "Plantation PB Bold": "plantation-pb-bold",
    "Arabica Cherry AA": "arabica-cherry-aa",
    "Arabica Cherry A": "arabica-cherry-a",
    "Arabica Cherry PB Bold": "arabica-cherry-pb-bold",
    "Robusta Parchment A": "robusta-parchment-a",
    "Robusta Parchment PB Bold": "robusta-parchment-pb-bold",
    "Robusta Cherry AA": "robusta-cherry-aa",
    "Robusta Cherry A": "robusta-cherry-a",
    "Robusta Cherry PB Bold": "robusta-cherry-pb-bold",
    "Mysore Nuggets Extra bold- Washed": "mysore-nuggets-extra-bold",
    "Monsooned Malabar AAA -  Unwashed": "monsooned-malabar-aaa",
    "Monsooned Malabar AA -  unwashed": "monsooned-malabar-aa",
    "Monsooned Malabar arabica Triage -  Unwashed": "monsooned-malabar-arabica-triage",
    "Robusta Kaapi Royale- Washed Coffee": "robusta-kaapi-royale",
    "Monsooned Malabar Robusta PR -  Unwashed": "monsooned-malabar-robusta-pr",
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
              subheading: "Washed Arabica (Arabica Parchment)",
              variety: "Arabica",
              items: [
                "Plantation PB",
                "Plantation A",
                "Plantation B",
                "Plantation C",
                "Plantation Blacks",
                "Plantation Bits",
                "Plantation Bulk",
              ],
            },
            {
              subheading: "Unwashed Arabica (Arabica Cherry)",
              variety: "Arabica",
              items: [
                "Arabica Cherry PB",
                "Arabica Cherry AB",
                "Arabica Cherry C",
                "Arabica Cherry Blacks/Browns",
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
              subheading: "Washed Robusta (Robusta Parchment)",
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
              subheading: "Unwashed Robusta (Robusta Cherry)",
              variety: "Robusta",
              items: [
                "Robusta Cherry PB",
                "Robusta Cherry AB",
                "Robusta Cherry C",
                "Robusta Cherry Blacks/Browns",
                "Robusta Cherry Bits",
                "Robusta Cherry Bulk",
                "Robusta Cherry Clean/Bulk",
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
              items: ["Arabica Cherry AA", "Arabica Cherry A", "Arabica Cherry PB Bold"],
            },
          ],
        },
        {
          heading: "Robusta",
          groups: [
            {
              subheading: "Washed Robusta Parchment",
              variety: "Robusta",
              items: ["Robusta Parchment A", "Robusta Parchment PB Bold"],
            },
            {
              subheading: "Unwashed Robusta Cherry",
              variety: "Robusta",
              items: ["Robusta Cherry AA", "Robusta Cherry A", "Robusta Cherry PB Bold"],
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
              items: ["Mysore Nuggets Extra bold"],
            },
            {
              subheading: "Arabica Cherry",
              variety: "Arabica",
              items: [
                "Monsooned Malabar AAA",
                "Monsooned Malabar AA",
                "Monsooned Malabar A",
                "Monsooned Malabar arabica Triage",
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
              items: ["Robusta Kaapi Royale"],
            },
            {
              subheading: "Robusta Cherry",
              variety: "Robusta",
              items: [
                "Monsooned Malabar Robusta PR ",
                "Monsooned Malabar Robusta Triage ",
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
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998] ">
        <div
          ref={menuRef}
          className="absolute top-0 left-0 w-full bg-white shadow-lg max-h-screen overflow-y-auto border-t-2 border-[#562F23]"
        >
          
          <div className="p-4">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#7D4B3C] to-[#61714D] text-white p-3 mb-4 rounded-lg flex items-center justify-center">
              <Image
                src="/slogo.webp"
                alt="Gajna Logo"
                width={32}
                height={32}
                className="w-8 h-8 mr-2"
              />
              <h2 className="text-lg font-bold text-center">Our Coffee Grades</h2>
            </div>

            {/* All Products Link */}
            <Link
              href="/products"
              onClick={onClose}
              className="block w-full text-center p-3 mb-4 bg-[#E1A694] text-[#562F23] rounded-lg font-medium hover:bg-[#d19a85] transition-colors text-sm"
            >
              View All Products →
            </Link>

            {/* Clean mobile layout */}
            <div className="space-y-6">
              {gradesData.map((section) => (
                <div key={section.title} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-bold text-red-700 mb-3 text-center border-b border-red-200 pb-2">
                    {section.title}
                  </h3>
                  
                  {/* Special layout for Miscellaneous */}
                  {section.title === "Miscellaneous Grades" ? (
                    <div className="space-y-3">
                      {(section.blocks[0]?.groups || []).map((g, i) => (
                        <div key={i}>
                          {g.subheading && (
                            <p className="text-sm font-medium text-[#7D4B3C] mb-2">{g.subheading}</p>
                          )}
                          <div className="space-y-2">
                            {g.items.map((name, idx) => {
                              const slug = slugMap[name] || slugifyGrade(name);
                              const href = `/products/${slug}`;
                              return (
                                <div key={name} className="bg-white rounded-md p-2 border border-gray-200">
                                  <Link 
                                    href={href} 
                                    onClick={onClose} 
                                    className="text-sm text-[#562F23] hover:text-[#7D4B3C] font-medium block"
                                  >
                                    {idx + 1}. {name}
                                  </Link>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {section.blocks.map((block, idx) => (
                        <div key={idx}>
                          {block.heading && (
                            <h4 className="text-sm font-semibold text-green-700 text-center mb-3 bg-green-50 py-1 rounded">
                              {block.heading}
                            </h4>
                          )}
                          
                          <div className="grid grid-cols-1 gap-3">
                            {block.groups.map((g, gIdx) => (
                              <div key={gIdx} className="bg-white rounded-md p-3 border border-gray-200">
                                {g.subheading && (
                                  <p className="text-sm font-medium text-green-600 mb-2 text-center bg-green-50 py-1 rounded">
                                    {g.subheading}
                                  </p>
                                )}
                                <div className="space-y-2">
                                  {g.items.map((name, idx) => {
                                    const slug = slugMap[name] || slugifyGrade(name);
                                    const href = `/products/${slug}`;
                                    return (
                                      <div key={name} className="border-l-2 border-green-200 pl-3">
                                        <Link 
                                          href={href} 
                                          onClick={onClose} 
                                          className="text-sm text-[#562F23] hover:text-[#7D4B3C] font-medium block"
                                        >
                                          {idx + 1}. {name}
                                        </Link>
                                      </div>
                                    );
                                  })}
                                </div>
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
    <div className="absolute left-1/2 -translate-x-[57%] top-full w-[90vw] md:w-[80vw] max-h-[75vh] overflow-y-auto bg-white shadow-xl border border-[#562F23] ring-1 ring-[#562F23]/20 z-[9999] rounded-2xl hidden md:block">
      <div ref={menuRef} className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="shadow-2xl text-coffee-brown p-4 mb-6 rounded-lg flex items-center border border-black  w-[85%] mx-auto  justify-center">
          <Image
            src="/logos/1.webp"
            alt="Gajna Logo"
            width={40}
            height={40}
            className="w-20 h-24 mr-3"
          />
          <h2 className="text-2xl font-bold text-center">Classification and Grading of Indian Coffees as per the Coffee Board of India</h2>
        </div>
        
        <div className="grid grid-cols-12 gap-8">
          {/* Middle Column - Arabica Products */}
          <div className="col-span-12">
            {gradesData.map((section) => (
              <div key={section.title} className="mb-10">
                <h3 className="text-2xl font-serif text-red-700 mb-4 text-center">{section.title}</h3>
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
                          <h4 className="font-semibold text-coffee-brown mb-1 text-center">{block.heading}</h4>
                        ) : null}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {block.groups.map((g, gIdx) => (
                            <div key={gIdx}>
                              {g.subheading ? (
                                <p className="text-sm text-green-700 font-semibold mb-1 text-center">{g.subheading}</p>
                              ) : null}
                              <ol className="list-decimal pl-20 space-y-1 text-sm text-[#562F23]">
                                {g.items.map((name) => {
                                  const slug = slugMap[name] || slugifyGrade(name);
                                  const href = `/products/${slug}`;
                                  return (
                                    <li key={name}>
                                      <Link href={href} onClick={onClose} className="hover:text-[#7D4B3C] text-xs">
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
