"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import type { Product } from "@/data/products";
import ContactForm from "@/components/ContactForm";
import { BiCategory } from "react-icons/bi";

type Props = {
  product: Product;
};

export default function ProductDetailClient({ product }: Props) {
  const [selectedImage, setSelectedImage] = useState<string>(
    product.heroImage || product.gallery?.[0] || ""
  );
  const [qty, setQty] = useState<number>(0);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  const dec = () => setQty((q) => Math.max(0, q - 1));
  const inc = () => setQty((q) => q + 1);

  // Design: Render a special "Tolerance" block with two sub-columns (Flats AB, PB Triage)
  // Support two data shapes:
  // 1) Combined spec: { label: "Tolerance", value: "Flats (AB): 2% | PB Triage: 3%" }
  // 2) Separate specs: { label: "Tolerance Flats", value: "2%" } + { label: "PB Triage", value: "3%" }
  const iTolCombined = product.specs.findIndex(
    (s) => /^(tolerance)$/i.test(s.label) && s.value.includes("|")
  );
  const iFlats = product.specs.findIndex((s) =>
    /tolerance\s*flats|flats\s*\(ab\)/i.test(s.label)
  );
  const iPB = product.specs.findIndex((s) => /pb\s*triage/i.test(s.label));

  type TolData = {
    flatsLabel: string;
    flatsValue: string;
    pbLabel: string;
    pbValue: string;
  };
  let toleranceBlockAt = -1 as number;
  let tolData: TolData | null = null;

  // Try combined first
  if (iTolCombined >= 0) {
    const raw = product.specs[iTolCombined].value;
    const parts = raw.split("|").map((p) => p.trim());
    if (parts.length >= 2) {
      const [p1, p2] = parts;
      const [l1, v1] = p1.split(":").map((x) => x.trim());
      const [l2, v2] = p2.split(":").map((x) => x.trim());
      if (l1 && v1 && l2 && v2) {
        toleranceBlockAt = iTolCombined;
        tolData = {
          flatsLabel: l1 || "Flats (AB)",
          flatsValue: v1,
          pbLabel: l2 || "PB Triage",
          pbValue: v2,
        };
      }
    }
  }

  // Fallback to separate specs if combined not available
  if (tolData == null && iFlats >= 0 && iPB >= 0) {
    const first = Math.min(iFlats, iPB);
    toleranceBlockAt = first;
    tolData = {
      flatsLabel: product.specs[iFlats].label || "Flats (AB)",
      flatsValue: product.specs[iFlats].value,
      pbLabel: product.specs[iPB].label || "PB Triage",
      pbValue: product.specs[iPB].value,
    };
  }
  // No component-level grouping; data (products.ts) provides final presentation shape.

  return (
    <div className="">
      {/* Left: hero image and gallery thumbnails */}
      {/* <div>
        <div className="relative aspect-[16/9]">
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt={product.name}
              width={1200}
              height={100}
              className="object-contain p-2 w-[100%] h-auto"
            />
          ) : (
            <div className="w-full h-full bg-[#FFF7F2]" />
          )}
        </div>

        {product.gallery?.length ? (
          <div className="flex gap-3 mt-4 ml-4">
            {product.gallery.map((src, idx) => {
              const isActive = src === selectedImage;
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setSelectedImage(src)}
                  className={`relative w-20 h-16 rounded-md bg-[#FFF7F2] border overflow-hidden transition ring-offset-2 focus:outline-none focus:ring-2 ${
                    isActive
                      ? "ring-2 ring-[#7D4B3C] border-[#7D4B3C]"
                      : "border-gray-200 hover:ring-1 hover:ring-gray-300"
                  }`}
                  aria-label={`Show image ${idx + 1}`}
                >
                  {src ? (
                    <Image
                      src={src}
                      alt={`${product.name} ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#FFF7F2]" />
                  )}
                </button>
              );
            })}
        ) : null}
      </div>

      {/* Right: specs */}
      <div className="mx-4 text-center">
        <h2 className="text-2xl text-green-700 font-semibold mb-6 text-center">Quality Specifications</h2>
        <div className="divide-y border rounded-xl overflow-hidden max-w-3xl mx-auto">

          <div className="px-4 py-3 flex justify-between items-center bg-amber-50">
            <span className="text-gray-600 text-sm">Grade Designation</span>
            <h3 className="text-sm text-black">{product.name}</h3>
          </div>

          {/* Specialty Coffee Line - Only for Mysore Nuggets Extra Bold and Robusta Kaapi Royale */}
          {(product.slug === "mysore-nuggets-extra-bold" || product.slug === "robusta-kaapi-royale") && (
            <div className="px-4 py-3 bg-green-50 border-l-4 border-green-500">
              <p className="text-green-800 font-medium text-sm italic">
                It is a grade-specific speciality coffee.
              </p>
            </div>
          )}

          {/* Special line for process-specific specialty coffee (Monsooned Malabar) */}
          {(product.slug === "monsooned-malabar-robusta-triage" ||
            product.slug === "monsooned-malabar-aaa" ||
            product.slug === "monsooned-malabar-aa" ||
            product.slug === "monsooned-malabar-a" ||
            product.slug === "monsooned-malabar-arabica-triage" ||
            product.slug === "monsooned-malabar-robusta-pr") && (
              <div className="px-4 py-3 bg-blue-50 border-l-4 border-blue-500">
                <p className="text-blue-800 font-medium text-sm italic">
                  It is a process-specific specialty coffee.
                </p>
              </div>
            )}
          <div className="px-4 py-3 flex justify-between items-center bg-white">
            <span className="text-gray-600 text-sm">HSN Code</span>
            <h3 className="text-sm text-black">090111</h3>
          </div>
          {product.specs.map((s, i) => {
            // Render special tolerance block once at the correct position
            if (i === toleranceBlockAt && tolData) {
              return (
                <div
                  key="tolerance-block"
                  className="px-4 py-3 flex justify-between items-center"
                >
                  <div className="text-base text-gray-700 mb-2">
                    Tolerance
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">
                        {tolData.flatsLabel || "Flats (AB)"}
                      </span>
                      <span className="text-black font-medium text-sm ">
                        {tolData.flatsValue}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm">
                        {tolData.pbLabel || "PB Triage"}
                      </span>
                      <span className="text-black font-medium text-sm ">
                        {tolData.pbValue}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            // Skip individual specs if they are part of the tolerance block
            if (
              tolData &&
              (i === iTolCombined || i === iFlats || i === iPB)
            ) {
              return null;
            }

            return (
              <div
                key={i}
                className={`flex items-start justify-between gap-4 px-4 py-2 text-sm ${(i + 2) % 2 === 0 ? 'bg-amber-50' : 'bg-white'}`}
              >
                <span className="text-gray-600">{s.label}</span>
                {s.label === "Sieve Standards" ? (
                  <div className="text-right max-w-[70%]">
                    <div className="flex items-start justify-start">
                      <div className="text-gray-900 font-medium text-left">
                        {typeof s.value === "string" &&
                          s.value.includes("\n") ? (
                          s.value.split("\n").map((point, idx) => (
                            <div
                              key={idx}
                              className="flex items-start mb-1 last:mb-0"
                            >
                              <span className="mr-2">•</span>
                              <span>{point.trim()}</span>
                            </div>
                          ))
                        ) : (
                          <span>{s.value}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-900 font-medium text-left max-w-[48%]">
                    {s.value}
                  </span>
                )}
              </div>
            );
          })}

          {/* Moisture placed below Tolerance and above Loadability */}
          <div className={`px-4 py-3 flex justify-between items-center text-sm ${(product.specs.length + 2) % 2 === 0 ? 'bg-amber-50' : 'bg-white'}`}>
            <span className="text-gray-600">Moisture Standard</span>
            <span className="text-gray-900 font-medium">12.5% Maximum</span>
          </div>

          {/* Static Loadability and Packaging Information */}
          <div className={`px-4 py-3 flex justify-between items-center text-sm ${(product.specs.length + 3) % 2 === 0 ? 'bg-amber-50' : 'bg-white'}`}>
            <span className="text-gray-600">
              Loadability in 20-Foot Container
            </span>
            <span className="text-gray-900 text-sm font-medium text-left max-w-[48%]">
              320 bags of 60kg each
            </span>
          </div>

          <div className={`px-4 py-3 flex justify-between items-start gap-4 text-sm ${(product.specs.length + 4) % 2 === 0 ? 'bg-amber-50' : 'bg-white'}`}>
            <span className="text-gray-600">Packaging</span>
            <div className="max-w-[70%]">
              <div className="text-gray-900 font-medium text-left text-sm">
                <div className="mb-2">
                  <span className="font-semibold">Outer:</span> Food-grade
                  Jute Bags (IJIRA Bags)
                </div>
                <div>
                  <span className="font-semibold">Inner:</span> GrainPro Bags
                  / Ecotact Bags / Proharvest Bags
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-6 flex items-center justify-center gap-3 flex-col md:flex-row">
          {/* <div>
            <button
              type="button"
              onClick={dec}
              disabled={qty === 0}
              className="px-4 py-2 rounded-full border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-4" aria-live="polite" aria-atomic="true">
              {qty}
            </span>

            <button
              type="button"
              onClick={inc}
              className="px-4 py-2 rounded-full border border-gray-300"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div> */}
          <button
            className="ml-4 px-6 py-3 bg-[#7D4B3C] text-white rounded-full hover:bg-[#6e4236]"
            type="button"
            onClick={() => {
              setEnquiryModalOpen(true);
            }}
          >
            Submit Requirement
          </button>
        </div>
      </div>

      {/* Product Enquiry Modal */}
      {enquiryModalOpen && (
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
                onClick={() => setEnquiryModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <ContactForm
                initial={{
                  subject: `Enquiry for ${product.name}`,
                  message: `I am interested in ${product.name}. Please provide more details about pricing, availability, and shipping.`,
                  product: "Green Coffee Beans",
                  grade: product.name, // Using product name as grade for now
                  quantity: qty > 0 ? qty : undefined,
                }}
                submitLabel="Send Product Enquiry"
                onSuccess={() => setEnquiryModalOpen(false)}
                isModal={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
