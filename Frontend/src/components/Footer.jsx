import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#EF8354] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              F
            </div>
            <span className="font-semibold text-[#040303]">
              FinSage
            </span>
          </div>

          {/* Tagline */}
          <p className="text-[#7d7e7e] text-center">
            AI Powered Smart Wealth Management
          </p>

          {/* Copyright */}
          <p className="text-[#7d7e7e] text-center">
            © 2026 FinSage. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}
