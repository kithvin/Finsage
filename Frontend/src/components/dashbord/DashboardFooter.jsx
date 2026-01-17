import React from "react";

export default function DashboardFooter() {
  const footerLinks = [
    {
      title: "Our Mission",
      links: [
        { text: "Empowering users with AI driven insights for better money management." },
      ],
    },
    {
      title: "Support & Guidance",
      links: [
        { text: "Get personalized tips, financial insights, and learning resources to stay in control." },
      ],
    },
    {
      title: "Data & Trust",
      links: [
        { text: "Your privacy and data security are our top priorities transparency you can rely on." },
      ],
    },
    {
      title: "Legal & Compliance",
      links: [
        { text: "FinSage follows responsible data policies and fair use standards." },
      ],
    },
  ];

  return (
    <footer className="bg-[#ebe4e1] mt-10 border-t border-gray-200">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Top section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-[#dfdbdb] text-gray-600">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EF8354]">
                <span className="text-xl font-bold text-white">F</span>
              </div>
              <span className="text-2xl font-bold text-[#040303]">FinSage</span>
            </div>

            <p className="max-w-[410px] mt-6">
              Monitor your financial health with real time dashboards. Track income streams,
              manage assets and liabilities, analyze credit card usage, and receive AI powered
              recommendations to optimize your wealth management strategy.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-between w-full md:w-[55%] gap-5">
            {footerLinks.map((section, index) => (
              <div key={index} className="flex-1 min-w-[200px]">
                <h3 className="font-semibold text-base text-[#040303] mb-2">
                  {section.title}
                </h3>

                <ul className="text-sm space-y-1">
                  {section.links.map((link, i) => (
                    <li key={i} className="text-gray-600">
                      {link.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <p className="py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} FinSage. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
