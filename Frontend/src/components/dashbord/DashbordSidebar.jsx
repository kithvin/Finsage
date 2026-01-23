// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   LayoutGrid,
//   DollarSign,
//   Building2,
//   FileText,
//   CreditCard,
//   Sparkles,
//   ChevronLeft,
//   ChevronRight,

 
//   FileBarChart2,
// } from "lucide-react";

// const navItems = [
//   { label: "Dashboard", to: "/dashboard", icon: LayoutGrid },
//   { label: "Income", to: "/income", icon: DollarSign },
//   { label: "Assets", to: "/assets", icon: Building2 },
//   { label: "Liabilities", to: "/liabilities", icon: FileText },
//   { label: "Credit Cards", to: "/credit-cards", icon: CreditCard },
//   { label: "Recommendations", to: "/recommendations", icon: Sparkles },

  
//   { label: "Report & Analysis", to: "/AnalysisPage", icon: FileBarChart2 },
// ];

// export default function DashbordSidebar({ collapsed, onToggle }) {
//   return (
//     <aside
//       className={`h-screen sticky top-0  bg-[#FFFFFF] border-r border-[#BFC0C0]/50 transition-all duration-200
//       ${collapsed ? "w-[72px]" : "w-[260px]"}`}
//     >
//       {/* Top brand + collapse button */}
//       <div className="h-14 flex items-center justify-between px-4 border-b border-[#BFC0C0]/40">
//         <div
//           className={`flex items-center gap-2 ${
//             collapsed ? "justify-center w-full" : ""
//           }`}
//         >
//           {/* <div className="w-8 h-8 rounded-lg bg-[#EF8354] text-white flex items-center justify-center font-bold text-sm">
//             F
//           </div>
//           {!collapsed && (
//             <span className="text-base font-semibold text-[#040303]">FinSage</span>
//           )} */}
//         </div>

//         <button
//           onClick={onToggle}
//           className={`ml-2 p-1.5 rounded-lg border border-[#BFC0C0]/60 hover:bg-[#EF8354]/10 transition
//           ${collapsed ? "hidden" : "block"}`}
//           aria-label="Collapse sidebar"
//           title="Collapse"
//         >
//           <ChevronLeft className="h-4 w-4 text-[#040303]" />
//         </button>
//       </div>

//       {/* Collapsed toggle button (shows when collapsed) */}
//       {collapsed && (
//         <div className="px-3 pt-3">
//           <button
//             onClick={onToggle}
//             className="w-full p-2 rounded-lg border border-[#BFC0C0]/60 hover:bg-[#EF8354]/10 transition flex items-center justify-center"
//             aria-label="Expand sidebar"
//             title="Expand"
//           >
//             <ChevronRight className="h-4 w-4 text-[#040303]" />
//           </button>
//         </div>
//       )}

//       {/* Nav */}
//       <nav className="px-3 py-4 space-y-1">
//         {navItems.map((item) => {
//           const Icon = item.icon;

//           return (
//             <NavLink
//               key={item.to}
//               to={item.to}
//               className={({ isActive }) =>
//                 [
//                   "flex items-center gap-3 rounded-xl px-3 py-2.5 transition",
//                   "text-[#040303] hover:bg-[#EF8354]/10",
//                   isActive ? "bg-[#EF8354] text-white hover:bg-[#EF8354]" : "",
//                   collapsed ? "justify-center" : "",
//                 ].join(" ")
//               }
//               title={collapsed ? item.label : undefined}
//             >
//               <Icon className={`h-5 w-5 ${collapsed ? "" : ""}`} />
//               {!collapsed && (
//                 <span className="text-sm font-medium">{item.label}</span>
//               )}
//             </NavLink>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }

import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  DollarSign,
  Building2,
  FileText,
  CreditCard,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  FileBarChart2,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutGrid },
  { label: "Income", to: "/income", icon: DollarSign },
  { label: "Assets", to: "/assets", icon: Building2 },
  { label: "Liabilities", to: "/liabilities", icon: FileText },
  { label: "Credit Cards", to: "/credit-cards", icon: CreditCard },
  { label: "Recommendations", to: "/recommendations", icon: Sparkles },
  { label: "Report & Analysis", to: "/AnalysisPage", icon: FileBarChart2 },
];

export default function DashbordSidebar({ collapsed, onToggle }) {
  return (
    <aside
      className={[
        // keep visible always
        "h-screen sticky top-0 bg-[#FFFFFF] border-r border-[#BFC0C0]/50 transition-all duration-200",
        // responsive width (no hiding)
        collapsed
          ? "w-[64px] sm:w-[72px]"
          : "w-[220px] sm:w-[260px]",
      ].join(" ")}
    >
      {/* Top brand + collapse button */}
      <div className="h-14 flex items-center justify-between px-3 sm:px-4 border-b border-[#BFC0C0]/40">
        <div
          className={`flex items-center gap-2 ${
            collapsed ? "justify-center w-full" : ""
          }`}
        >
          {/* (kept commented) */}
        </div>

        <button
          onClick={onToggle}
          className={`ml-2 p-1.5 rounded-lg border border-[#BFC0C0]/60 hover:bg-[#EF8354]/10 transition
          ${collapsed ? "hidden" : "block"}`}
          aria-label="Collapse sidebar"
          title="Collapse"
        >
          <ChevronLeft className="h-4 w-4 text-[#040303]" />
        </button>
      </div>

      {/* Collapsed toggle button (shows when collapsed) */}
      {collapsed && (
        <div className="px-2 sm:px-3 pt-3">
          <button
            onClick={onToggle}
            className="w-full p-2 rounded-lg border border-[#BFC0C0]/60 hover:bg-[#EF8354]/10 transition flex items-center justify-center"
            aria-label="Expand sidebar"
            title="Expand"
          >
            <ChevronRight className="h-4 w-4 text-[#040303]" />
          </button>
        </div>
      )}

      {/* Nav */}
      <nav className="px-2 sm:px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-xl transition",
                  "text-[#040303] hover:bg-[#EF8354]/10",
                  isActive ? "bg-[#EF8354] text-white hover:bg-[#EF8354]" : "",
                  collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5",
                ].join(" ")
              }
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && (
                <span className="text-sm font-medium truncate">
                  {item.label}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
