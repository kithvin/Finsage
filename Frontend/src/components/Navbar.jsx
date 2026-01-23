import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="w-full bg-white border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer min-w-0"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#EF8354] text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-sm shrink-0">
              F
            </div>

            <span className="text-xl sm:text-2xl font-bold text-[#040303] tracking-wide truncate">
              FinSage
            </span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-10">
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-medium text-[#040303] hover:text-[#EF8354] transition px-3 py-2 rounded-lg"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="bg-[#EF8354] text-white px-4 sm:px-7 py-2 sm:py-2.5 rounded-xl text-sm font-medium shadow-sm hover:shadow-md hover:opacity-90 transition whitespace-nowrap"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
