import React from "react";

const features = [
  {
    title: "Income Tracking",
    desc: "Monitor all your income sources and track growth over time.",
    icon: "💰",
  },
  {
    title: "Asset Management",
    desc: "Keep track of all your assets and their current values.",
    icon: "📊",
  },
  {
    title: "Liability Tracking",
    desc: "Manage debts and liabilities with payment reminders.",
    icon: "📉",
  },
  {
    title: "Credit Cards",
    desc: "Track spending, limits, and payment due dates.",
    icon: "💳",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#040303] mb-10 sm:mb-14">
       Everything You Need to Manage Your Wealth
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 px-0 sm:px-4 md:px-8">
        {features.map((f) => (
          <div
            key={f.title}
            className="group bg-white
              border border-solid border-gray-300
              rounded-2xl p-6 sm:p-8
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-md"
          >
            {/* Icon */}
            <div
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#EF8354]/10
                text-[#EF8354] flex items-center justify-center
                text-lg sm:text-xl mb-5 sm:mb-6
                group-hover:bg-[#EF8354]
                group-hover:text-white
                transition"
            >
              {f.icon}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-base sm:text-lg text-[#040303] mb-2 sm:mb-3">
              {f.title}
            </h3>

            {/* Description */}
            <p className="text-sm leading-relaxed text-[#6b7280]">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
