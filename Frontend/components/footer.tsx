export function Footer() {
  const footerLinks = [
    {
      title: "Our Mission",
      links: [{ text: "Empowering users with AI-driven insights for better money management." }],
    },
    {
      title: "Support & Guidance",
      links: [{ text: "Get personalized tips, financial insights, and learning resources to stay in control." }],
    },
    {
      title: "Data & Trust",
      links: [{ text: "Your privacy and data security are our top priorities — transparency you can rely on." }],
    },
    {
      title: "Legal & Compliance",
      links: [{ text: "FinSage follows responsible data policies and fair use standards." }],
    },
  ]

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10">
      {/* Top section with logo, description, and footer links */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        {/* Logo and short description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <span className="text-xl font-bold text-accent-foreground">F</span>
            </div>
            <span className="text-2xl font-bold text-foreground">FinSage</span>
          </div>
          <p className="max-w-[410px] mt-6">
            Monitor your financial health with real-time dashboards. Track income streams, manage assets and
            liabilities, analyze credit card usage, and receive AI-powered recommendations to optimize your wealth
            management strategy.
          </p>
        </div>

        {/* Footer link sections */}
        <div className="flex flex-wrap justify-between w-full md:w-[55%] gap-5">
          {footerLinks.map((section, index) => (
            <div key={index} className="flex-1 min-w-[200px]">
              {/* Section title */}
              <h3 className="font-semibold text-base text-gray-900 md:mb-3 mb-2">{section.title}</h3>

              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <span className="cursor-default text-gray-600">{link.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom copyright text */}
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright {new Date().getFullYear()} © FinSage. All Rights Reserved.
      </p>
    </div>
  )
}
