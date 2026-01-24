import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {

  const navigate = useNavigate();

  return (
    <section className="bg-white pt-24 sm:pt-28 md:pt-32 pb-24 sm:pb-32 md:pb-36 text-center px-4 sm:px-6">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#040303] leading-tight tracking-tight">
        <span className="text-[#EF8354] font-semibold">Finsage</span> AI Powered Wealth <br className="hidden sm:block" />
        Management System
      </h1>

      {/* Description */}
      <p className="mt-6 sm:mt-8 text-[#4c4d4d] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
      Track your income, assets, liabilities, and credit cards in one place. Get personalized recommendations to optimize your financial health.
      </p>

      {/* Actions */}
      <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
        <button className="border border-gray-300 px-6 sm:px-7 py-3 rounded-xl text-sm font-medium text-[#040303] hover:bg-gray-110 transition w-full sm:w-auto" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="bg-[#EF8354] px-6 sm:px-7 py-3 rounded-xl text-sm font-medium text-white shadow-sm hover:shadow-md hover:opacity-90 transition w-full sm:w-auto" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
    </section>
  );
}
