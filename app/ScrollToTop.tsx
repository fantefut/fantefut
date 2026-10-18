"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      type="button"
      aria-label="Yukarı Çık"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-md border border-gray-200 text-gray-700 text-xs font-semibold rounded-full shadow-sm hover:bg-white hover:text-green-600 transition-all duration-300 group active:scale-95"
    >
      <svg 
        xmlns="http://w3.org" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={2.5} 
        stroke="currentColor" 
        className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-300"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
      </svg>
      <span>Yukarı Çık</span>
    </button>
  );
}
