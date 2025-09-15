"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Load images from the gallery directory
  useEffect(() => {
    // Generate array of image paths from 1 to 65
    const imageArray = Array.from({ length: 65 }, (_, i) => `/gallery/${i + 1}.webp`);
    setImages(imageArray);
    setLoading(false);
  }, []);

  const openModal = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setModalOpen(true);
    setZoomLevel(1); // Reset zoom level when opening modal
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
    setZoomLevel(1); // Reset zoom level when closing modal
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  const navigateImage = (direction: "next" | "prev") => {
    setZoomLevel(1); // Reset zoom level when navigating
    if (direction === "next") {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setSelectedImage(images[(currentIndex + 1) % images.length]);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      setSelectedImage(images[(currentIndex - 1 + images.length) % images.length]);
    }
  };

  const handleZoom = (action: "in" | "out") => {
    if (action === "in" && zoomLevel < 3) {
      setZoomLevel((prev) => prev + 0.5);
    } else if (action === "out" && zoomLevel > 1) {
      setZoomLevel((prev) => prev - 0.5);
    }
  };

  return (
    <div className="pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto mt-24">
      <h1 className="text-3xl md:text-7xl font-serif text-coffee-brown text-center mb-8">
        Our Gallery
      </h1>


      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-coffee-brown"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => openModal(image, index)}
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority={index < 8} // Prioritize loading for first 8 images
                loading={index < 8 ? "eager" : "lazy"} // Lazy load images beyond the first 8
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <div className="bg-coffee-brown text-white px-4 py-2 rounded-full">
                    View Image
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Modal */}
      {modalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 ">
          <div className="max-w-2xl mx-auto">
          <div className="absolute bottom-44 right-96 z-10">
            <button
              onClick={closeModal}
              className="bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-6 w-6 text-gray-800" />
            </button>
          </div>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center space-x-4">
            <button
              onClick={() => handleZoom("out")}
              className="bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
              aria-label="Zoom out"
              disabled={zoomLevel <= 1}
            >
              <ZoomOut className={`h-6 w-6 ${zoomLevel <= 1 ? 'text-gray-400' : 'text-gray-800'}`} />
            </button>
            <span className="bg-white px-3 py-1 rounded-full text-sm">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => handleZoom("in")}
              className="bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
              aria-label="Zoom in"
              disabled={zoomLevel >= 3}
            >
              <ZoomIn className={`h-6 w-6 ${zoomLevel >= 3 ? 'text-gray-400' : 'text-gray-800'}`} />
            </button>
          </div>
          
          <button
            onClick={() => navigateImage("prev")}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
          
          <div 
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            style={{ maxHeight: "90vh" }}
          >
            <div
              className="transition-transform duration-300 ease-out"
              style={{ 
                transform: `scale(${zoomLevel})`,
                maxWidth: "90%",
                maxHeight: "90%",
              }}
            >
              <Image
                src={selectedImage}
                alt="Selected gallery image"
                width={1200}
                height={800}
                className="max-h-[60vh] w-auto object-contain mt-40"
                priority
              />
            </div>
          </div>
          
          <button
            onClick={() => navigateImage("next")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>
          
          <div className="absolute bottom-4 right-4 text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
        </div>
      )}
    </div>
  );
}