"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);

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

  const handleLoadingComplete = () => {
    setIsLoading(false);
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
          <Footer />
        </>
      )}
    </>
  );
};

export default ClientWrapper;