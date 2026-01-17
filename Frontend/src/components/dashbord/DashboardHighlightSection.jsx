import React from "react";
import { ShieldCheck, Sparkles, TrendingUp, Clock } from "lucide-react";

export default function DashboardHighlightSection() {
  const items = [
    {
      title: "Smart Insights",
      desc: "Get quick financial hints based on your activity.",
      icon: Sparkles,
    },
    {
      title: "Secure Tracking",
      desc: "Your data stays private and protected in your system.",
      icon: ShieldCheck,
    },
    {
      title: "Growth Focused",
      desc: "Visualize progress and stay consistent every month.",
      icon: TrendingUp,
    },
    {
      title: "Time Saver",
      desc: "Fast actions + clean views keep you productive.",
      icon: Clock,
    },
  ];

  return (
    <section className="px-4 sm:px-6 pb-10">
      <div
        className="relative overflow-hidden rounded-3xl border border-white/10 shadow-sm
                   min-h-[520px] sm:min-h-[620px] md:min-h-[520px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=2000&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-[#040303]/70" />

        {/* content */}
        <div className="relative p-5 sm:p-8 md:p-12">
          <p className="text-xs tracking-[0.22em] text-white/70 font-semibold text-center">
            WHY FINSAGE
          </p>

          <h2 className="mt-3 text-2xl sm:text-3xl md:text-5xl font-extrabold text-white leading-tight text-center">
            Premium AI Powered Wealth Management
            <br className="hidden md:block" />
            You Can Trust
          </h2>

          <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {items.map((it) => {
              const Icon = it.icon;
              return (
                <div
                  key={it.title}
                  className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-4 sm:p-5
                             hover:bg-white/15 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-[#EF8354]" />
                    </div>
                    <h3 className="text-white font-semibold text-sm sm:text-base">
                      {it.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed">
                    {it.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* optional CTA (kept commented as before) */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
            {/*
            <button className="px-5 py-2.5 rounded-xl bg-[#EF8354] text-white font-medium hover:opacity-90 transition">
              View Insights
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-white/10 text-white font-medium border border-white/15 hover:bg-white/15 transition">
              Learn More
            </button>
            */}
          </div>
        </div>
      </div>
    </section>
  );
}
