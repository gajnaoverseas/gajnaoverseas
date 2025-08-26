"use client";
import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface PreloaderProps {
  onLoadingComplete: () => void;
  contentLoaded: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete, contentLoaded }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Only start hiding when content is fully loaded
    if (contentLoaded) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Add a small delay for fade out animation
        setTimeout(() => {
          onLoadingComplete();
        }, 500);
      }, 500); // Small delay after content loads

      return () => clearTimeout(timer);
    }
  }, [contentLoaded, onLoadingComplete]);

  if (!isVisible) {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-coffee-brown to-amber-800 transition-opacity duration-500 opacity-0 pointer-events-none`}>
        {/* Fade out animation */}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* Background Pattern */}
     

      {/* Preloader Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Lottie Animation */}
        <div className="w-64 h-64 mb-8">
          <DotLottieReact
            src="/Coffee love.lottie"
            loop
            autoplay
            className="w-full h-full"
          />
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-3xl  font-bold text-coffee-brown mb-4">
            Gajna Coffee
          </h2>
          <p className="text-coffee-brown/80 mt-4 text-lg">
            {contentLoaded ? 'Almost Ready...' : 'Brewing Excellence...'}
          </p>
        </div>
      </div>

      {/* Coffee Bean Floating Animation */}
      <div className="absolute top-20 left-20 w-8 h-8 opacity-30">
        <div className="w-full h-full bg-white rounded-full animate-pulse"></div>
      </div>
      <div className="absolute top-40 right-32 w-6 h-6 opacity-20">
        <div className="w-full h-full bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="absolute bottom-32 left-40 w-4 h-4 opacity-25">
        <div className="w-full h-full bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      <div className="absolute bottom-20 right-20 w-5 h-5 opacity-30">
        <div className="w-full h-full bg-white rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
    </div>
  );
};

export default Preloader;