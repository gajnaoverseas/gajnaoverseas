"use client";
import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { ChevronUp } from "lucide-react";

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  // Back-to-top visibility state
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Function to check if all images are loaded
    const checkImagesLoaded = () => {
      const images = document.querySelectorAll('img');
      const imagePromises = Array.from(images).map((img) => {
        if (img.complete) {
          return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = resolve; // Still resolve on error to not block loading
        });
      });
      return Promise.all(imagePromises);
    };

    // Function to wait for window load and all images
    const waitForFullLoad = async () => {
      // Wait for DOM content to be loaded
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve);
        });
      }

      // Wait for window load event (all resources including images)
      if (document.readyState !== 'complete') {
        await new Promise(resolve => {
          window.addEventListener('load', resolve);
        });
      }

      // Additional check for any remaining images
      await checkImagesLoaded();

      // Minimum loading time to show the animation
      await new Promise(resolve => setTimeout(resolve, 1500));

      setContentLoaded(true);
    };

    waitForFullLoad();
  }, []);

  // Handle back-to-top button visibility
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setShowScrollTop(y > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // Initialize state based on current scroll (e.g., page refresh deep)
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {isLoading && (
        <Preloader 
          onLoadingComplete={handleLoadingComplete} 
          contentLoaded={contentLoaded}
        />
      )}
      {!isLoading && (
        <>
          <Header />
          {children}
          {/* Back to Top button (global) */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`${showScrollTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} fixed bottom-6 right-6 z-[10000] p-3 md:p-4 rounded-full bg-coffee-brown text-white shadow-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-opacity duration-300`}
          >
            <ChevronUp className="w-6 h-6" />
          </button>
          <Footer />
        </>
      )}
    </>
  );
};

export default ClientWrapper;
