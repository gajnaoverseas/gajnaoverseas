"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
};

export default function ProductDetailClient({ product }: Props) {
  const [selectedImage, setSelectedImage] = useState<string>(
    product.heroImage || product.gallery?.[0] || ""
  );
  const [qty, setQty] = useState<number>(0);

  const dec = () => setQty((q) => Math.max(0, q - 1));
  const inc = () => setQty((q) => q + 1);

  return (
    <div className="grid md:grid-cols-2 gap-8 ">
      {/* Left: hero image and gallery thumbnails */}
      <div>
        <div className="relative aspect-[16/9]">
  {selectedImage ? (
    <Image
      src={selectedImage}
      alt={product.name}
      width={1200}
      height={100}
      className="object-contain p-2 w-[100%] h-auto"
    />
  ) : null}
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
                  <Image
                    src={src}
                    alt={`${product.name} ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      {/* Right: specs */}
      <div className="mx-4">
        <div className="divide-y border rounded-xl ">
          {product.specs.map((s, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-4 px-4 py-2 text-sm"
            >
              <span className="text-gray-600">{s.label}</span>
              <span className="text-gray-900 font-medium text-right max-w-[60%]">
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6 flex items-center gap-3 flex-col md:flex-row">
          <div>
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
             </div>
          <button
            className="ml-4 px-6 py-3 bg-[#7D4B3C] text-white rounded-full hover:bg-[#6e4236]"
            type="button"
            onClick={() => {
              // Hook up to your enquiry flow as needed
              console.log("Submit Requirement", { slug: product.slug, qty });
            }}
          >
            Submit Requirement
          </button>
        </div>
      </div>
    </div>
  );
}