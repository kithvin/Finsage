// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";

// import DashboardNavbar from "../components/dashbord/DashboardNavbar";
// import DashbordSidebar from "../components/dashbord/DashbordSidebar";
// import DashboardFooter from "../components/dashbord/DashboardFooter";
// import ChatBotWidget from "../components/dashbord/ChatBotWidget";

// const API_BASE = import.meta.env.VITE_API_BASE_URL;

// function splitToBullets(text) {
//   if (!text) return [];

//   const rawLines = String(text)
//     .split("\n")
//     .map((l) => l.trim())
//     .filter(Boolean);

//   const cleaned = rawLines.map((l) => l.replace(/^[-*•\d+.)\s]+/, "").trim());

//   if (cleaned.length <= 1) {
//     return String(text)
//       .split(". ")
//       .map((s) => s.trim())
//       .filter((s) => s.length > 8)
//       .slice(0, 10);
//   }

//   return cleaned.slice(0, 12);
// }

// function makePriority(line) {
//   const l = line.toLowerCase();
//   if (
//     l.includes("urgent") ||
//     l.includes("high") ||
//     l.includes("immediately") ||
//     l.includes("asap") ||
//     l.includes("debt") ||
//     l.includes("overdue")
//   )
//     return "high";
//   if (l.includes("consider") || l.includes("improve") || l.includes("reduce"))
//     return "medium";
//   return "low";
// }

// function clsx(...arr) {
//   return arr.filter(Boolean).join(" ");
// }

// export default function RecommendationsPage() {
//   const [collapsed, setCollapsed] = useState(true);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [recommendations, setRecommendations] = useState([]);

//   // UI-only states (no backend changes)
//   const [query, setQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [priorityFilter, setPriorityFilter] = useState("all");

//   useEffect(() => {
//     const fetchRecommendations = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const res = await axios.get(`${API_BASE}/api/recommendations`, {
//           withCredentials: true,
//         });

//         const aiText = res?.data?.data?.recommendations;
//         const bullets = splitToBullets(aiText);

//         const list = bullets.map((line, idx) => ({
//           id: idx + 1,
//           title: line.length > 70 ? `${line.slice(0, 70)}...` : line,
//           description: line,
//           priority: makePriority(line),
//           status: "pending",
//         }));

//         setRecommendations(list);
//       } catch (e) {
//         const msg =
//           e?.response?.data?.message ||
//           e?.message ||
//           "Failed to load recommendations.";
//         setError(msg);
//         setRecommendations([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecommendations();
//   }, []);

//   const pendingCount = useMemo(
//     () => recommendations.filter((r) => r.status === "pending").length,
//     [recommendations]
//   );

  
//   const progressCount = useMemo(
//     () => recommendations.filter((r) => r.status === "in-progress").length,
//     [recommendations]
//   );

//   const doneCount = useMemo(
//     () => recommendations.filter((r) => r.status === "completed").length,
//     [recommendations]
//   );

//   const completionPct = useMemo(() => {
//     const total = recommendations.length || 0;
//     if (!total) return 0;
//     return Math.round((doneCount / total) * 100);
//   }, [recommendations.length, doneCount]);

//   //  normalize: if user selects "In progress" from older saved state
//   function normalizeStatus(s) {
//     if (s === "In progress") return "in-progress";
//     return s;
//   }

//   function updateStatus(id, newStatus) {
//     setRecommendations((prev) =>
//       prev.map((r) =>
//         r.id === id ? { ...r, status: normalizeStatus(newStatus) } : r
//       )
//     );
//   }

//   function priorityBadge(p) {
//     if (p === "high") return "bg-[#EF8354] text-white";
//     if (p === "medium") return "bg-[#BFC0C0] text-[#040303]";
//     return "bg-white border border-[#BFC0C0] text-[#040303]";
//   }

//   function statusBadge(s) {
    
//     const v = normalizeStatus(s);
//     if (v === "completed") return "bg-[#040303] text-white";
//     if (v === "In progress") return "bg-[#EF8354] text-white";
//     return "bg-white border border-[#BFC0C0] text-[#040303]";
//   }

//   function leftAccent(priority) {
//     if (priority === "high") return "bg-[#EF8354]";
//     if (priority === "medium") return "bg-[#BFC0C0]";
//     return "bg-[#ecebe8]";
//   }

//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();

//     return recommendations
//       .filter((r) => {
//         if (statusFilter === "all") return true;
//         //  normalize compare
//         return normalizeStatus(r.status) === statusFilter;
//       })
//       .filter((r) => {
//         if (priorityFilter === "all") return true;
//         return r.priority === priorityFilter;
//       })
//       .filter((r) => {
//         if (!q) return true;
//         return (
//           r.title.toLowerCase().includes(q) ||
//           r.description.toLowerCase().includes(q)
//         );
//       });
//   }, [recommendations, query, statusFilter, priorityFilter]);

//   const tabs = [
//     { key: "all", label: "All", count: recommendations.length },
//     { key: "pending", label: "Pending", count: pendingCount },
//     { key: "in-progress", label: "In Progress", count: progressCount },
//     { key: "completed", label: "Completed", count: doneCount },
//   ];

//   return (
//     //  only background fix (no redesign)
//     <div className="min-h-screen bg-[#ebe4e1] flex flex-col">
//       <DashboardNavbar />

//       <div className="flex flex-1 min-h-0">
//         <DashbordSidebar
//           collapsed={collapsed}
//           onToggle={() => setCollapsed((prev) => !prev)}
//         />

//         <main className="flex-1 min-w-0 bg-gray-50 overflow-auto">
//           <div className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
//             {/* HERO HEADER */}
//             <div className="border border-[#BFC0C0] rounded-2xl p-6 bg-white">
//               <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
//                 <div>
//                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#BFC0C0] bg-white">
//                     <span className="w-2 h-2 rounded-full bg-[#EF8354]" />
//                     <span className="text-xs font-semibold text-[#040303]">
//                       AI Insights
//                     </span>
//                     <span className="text-xs text-[#BFC0C0]">
//                       • Personalized
//                     </span>
//                   </div>

//                   <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#040303]">
//                     Recommendations
//                   </h1>
//                   <p className="mt-2 text-sm text-[#040303]/70 max-w-2xl">
//                     Actionable steps based on your income, assets, liabilities,
//                     and cards track progress and improve your financial health.
//                   </p>

//                   {/* Progress bar */}
//                   <div className="mt-5">
//                     <div className="flex items-center justify-between text-xs text-[#040303]/70">
//                       <span>Overall progress</span>
//                       <span className="font-semibold text-[#040303]">
//                         {completionPct}%
//                       </span>
//                     </div>
//                     <div className="mt-2 h-2 rounded-full bg-[#ecebe8] overflow-hidden border border-[#BFC0C0]/70">
//                       <div
//                         className="h-full bg-[#EF8354]"
//                         style={{ width: `${completionPct}%` }}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
//                   <button
//                     onClick={() => window.location.reload()}
//                     className="border border-[#BFC0C0] rounded-xl px-4 py-2 text-sm font-semibold text-[#040303] hover:bg-[#ecebe8] transition"
//                   >
//                     Refresh
//                   </button>

//                   <div className="border border-[#BFC0C0] rounded-xl px-4 py-2 bg-white">
//                     <p className="text-xs text-[#040303]/60">Total items</p>
//                     <p className="text-xl font-extrabold text-[#040303] text-center">
//                       {recommendations.length}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Search + Priority Filter */}
//               <div className="mt-6 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
//                 <div className="flex-1">
//                   <input
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     placeholder="Search recommendations..."
//                     className="w-full border border-[#BFC0C0] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
//                   />
//                 </div>

//                 <div className="flex gap-3">
//                   {/* PRIORITY DROPDOWN */}
//                   <div className="relative">
//                     <select
//                       value={priorityFilter}
//                       onChange={(e) => setPriorityFilter(e.target.value)}
//                       className="appearance-none border border-[#BFC0C0] rounded-xl px-4 py-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354] bg-white"
//                     >
//                       <option value="all">All priorities</option>
//                       <option value="high">High priority</option>
//                       <option value="medium">Medium priority</option>
//                       <option value="low">Low priority</option>
//                     </select>

//                     <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#BFC0C0] pointer-events-none">
//                       ▼
//                     </span>
//                   </div>

//                   <button
//                     onClick={() => {
//                       setQuery("");
//                       setStatusFilter("all");
//                       setPriorityFilter("all");
//                     }}
//                     className="border border-[#BFC0C0] rounded-xl px-4 py-3 text-sm font-semibold text-[#040303] hover:bg-[#ecebe8] transition"
//                   >
//                     Reset
//                   </button>
//                 </div>
//               </div>

//               {/* Tabs */}
//               <div className="mt-5 flex flex-wrap gap-2">
//                 {tabs.map((t) => {
//                   const active = statusFilter === t.key;
//                   return (
//                     <button
//                       key={t.key}
//                       onClick={() => setStatusFilter(t.key)}
//                       className={clsx(
//                         "px-4 py-2 rounded-full text-sm font-semibold border transition",
//                         active
//                           ? "bg-[#EF8354] text-white border-[#EF8354]"
//                           : "bg-white text-[#040303] border-[#BFC0C0] hover:bg-[#ecebe8]"
//                       )}
//                     >
//                       {t.label}
//                       <span
//                         className={clsx(
//                           "ml-2 text-xs px-2 py-0.5 rounded-full",
//                           active
//                             ? "bg-white/15 text-white"
//                             : "bg-[#ecebe8] text-[#040303]"
//                         )}
//                       >
//                         {t.count}
//                       </span>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* ... YOUR REST CODE SAME ... */}

//             {!loading && !error && (
//               <div className="space-y-4">
//                 {filtered.map((r) => (
//                   <div
//                     key={r.id} //  add key back (necessary)
//                     className="group border border-[#BFC0C0] rounded-2xl bg-white overflow-hidden hover:shadow-sm transition"
//                   >
//                     <div className="flex">
//                       <div className={clsx("w-2", leftAccent(r.priority))} />

//                       <div className="flex-1 p-6">
//                         <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
//                           <div className="flex-1 min-w-0">
//                             <div className="flex flex-wrap items-center gap-2">
//                               <h2 className="text-xl font-bold text-[#040303]">
//                                 {r.title}
//                               </h2>

//                               <span
//                                 className={clsx(
//                                   "text-xs px-3 py-2 rounded-full font-semibold",
//                                   priorityBadge(r.priority)
//                                 )}
//                               >
//                                 {r.priority} priority
//                               </span>

//                               <span
//                                 className={clsx(
//                                   "text-xs px-3 py-2 rounded-full font-semibold",
//                                   statusBadge(r.status)
//                                 )}
//                               >
//                                 {normalizeStatus(r.status)}
//                               </span>
//                             </div>

//                             <p className="text-sm text-[#040303]/70 mt-3 leading-relaxed">
//                               {r.description}
//                             </p>
//                           </div>

//                           <div className="flex items-center gap-2">
//                             <span className="text-xs text-[#040303]/50 hidden sm:inline">
//                               Update status
//                             </span>

//                             <div className="relative">
//                               <select
//                                 value={normalizeStatus(r.status)}
//                                 onChange={(e) =>
//                                   updateStatus(r.id, e.target.value)
//                                 }
//                                 className="appearance-none border border-[#BFC0C0] rounded-xl px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354] bg-white"
//                               >
//                                 <option value="pending">Pending</option>
//                                 <option value="in-progress">In progress</option>
//                                 <option value="completed">Completed</option>
//                               </select>

//                               <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#BFC0C0] pointer-events-none">
//                                 ▼
//                               </span>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="mt-5 pt-4 border-t border-[#BFC0C0]/60 flex items-center justify-between text-xs text-[#040303]/60">
//                           <span>Tip: do high priority first to improve faster.</span>
//                           <span className="group-hover:text-[#040303] transition">
//                             FinSage AI
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </main>

//         <ChatBotWidget />
//       </div>

//       {/* footer background fix (necessary for full width look) */}
//       <div className="w-full bg-[#ebe4e1]">
//         <DashboardFooter />
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import DashboardNavbar from "../components/dashbord/DashboardNavbar";
import DashbordSidebar from "../components/dashbord/DashbordSidebar";
import DashboardFooter from "../components/dashbord/DashboardFooter";
import ChatBotWidget from "../components/dashbord/ChatBotWidget";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function splitToBullets(text) {
  if (!text) return [];

  const rawLines = String(text)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const cleaned = rawLines.map((l) => l.replace(/^[-*•\d+.)\s]+/, "").trim());

  if (cleaned.length <= 1) {
    return String(text)
      .split(". ")
      .map((s) => s.trim())
      .filter((s) => s.length > 8)
      .slice(0, 10);
  }

  return cleaned.slice(0, 12);
}

function makePriority(line) {
  const l = line.toLowerCase();
  if (
    l.includes("urgent") ||
    l.includes("high") ||
    l.includes("immediately") ||
    l.includes("asap") ||
    l.includes("debt") ||
    l.includes("overdue")
  )
    return "high";
  if (l.includes("consider") || l.includes("improve") || l.includes("reduce"))
    return "medium";
  return "low";
}

function clsx(...arr) {
  return arr.filter(Boolean).join(" ");
}

export default function RecommendationsPage() {
  const [collapsed, setCollapsed] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [recommendations, setRecommendations] = useState([]);

  // UI-only states (no backend changes)
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await axios.get(`${API_BASE}/api/recommendations`, {
          withCredentials: true,
        });

        const aiText = res?.data?.data?.recommendations;
        const bullets = splitToBullets(aiText);

        const list = bullets.map((line, idx) => ({
          id: idx + 1,
          title: line.length > 70 ? `${line.slice(0, 70)}...` : line,
          description: line,
          priority: makePriority(line),
          status: "pending",
        }));

        setRecommendations(list);
      } catch (e) {
        const msg =
          e?.response?.data?.message ||
          e?.message ||
          "Failed to load recommendations.";
        setError(msg);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const pendingCount = useMemo(
    () => recommendations.filter((r) => r.status === "pending").length,
    [recommendations]
  );

  const progressCount = useMemo(
    () => recommendations.filter((r) => r.status === "in-progress").length,
    [recommendations]
  );

  const doneCount = useMemo(
    () => recommendations.filter((r) => r.status === "completed").length,
    [recommendations]
  );

  const completionPct = useMemo(() => {
    const total = recommendations.length || 0;
    if (!total) return 0;
    return Math.round((doneCount / total) * 100);
  }, [recommendations.length, doneCount]);

  function normalizeStatus(s) {
    if (s === "In progress") return "in-progress";
    return s;
  }

  function updateStatus(id, newStatus) {
    setRecommendations((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: normalizeStatus(newStatus) } : r
      )
    );
  }

  function priorityBadge(p) {
    if (p === "high") return "bg-[#EF8354] text-white";
    if (p === "medium") return "bg-[#BFC0C0] text-[#040303]";
    return "bg-white border border-[#BFC0C0] text-[#040303]";
  }

  function statusBadge(s) {
    const v = normalizeStatus(s);
    if (v === "completed") return "bg-[#040303] text-white";
    if (v === "In progress") return "bg-[#EF8354] text-white";
    return "bg-white border border-[#BFC0C0] text-[#040303]";
  }

  function leftAccent(priority) {
    if (priority === "high") return "bg-[#EF8354]";
    if (priority === "medium") return "bg-[#BFC0C0]";
    return "bg-[#ecebe8]";
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return recommendations
      .filter((r) => {
        if (statusFilter === "all") return true;
        return normalizeStatus(r.status) === statusFilter;
      })
      .filter((r) => {
        if (priorityFilter === "all") return true;
        return r.priority === priorityFilter;
      })
      .filter((r) => {
        if (!q) return true;
        return (
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q)
        );
      });
  }, [recommendations, query, statusFilter, priorityFilter]);

  const tabs = [
    { key: "all", label: "All", count: recommendations.length },
    { key: "pending", label: "Pending", count: pendingCount },
    { key: "in-progress", label: "In Progress", count: progressCount },
    { key: "completed", label: "Completed", count: doneCount },
  ];

  return (
    <div className="min-h-screen bg-[#ebe4e1] flex flex-col">
      <DashboardNavbar />

      <div className="flex flex-1 min-h-0">
        <DashbordSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((prev) => !prev)}
        />

        <main className="flex-1 min-w-0 bg-gray-50 overflow-auto">
          <div className="max-w-[1600px] mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
            {/* HERO HEADER */}
            <div className="border border-[#BFC0C0] rounded-2xl p-4 sm:p-6 bg-white">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#BFC0C0] bg-white">
                    <span className="w-2 h-2 rounded-full bg-[#EF8354]" />
                    <span className="text-xs font-semibold text-[#040303]">
                      AI Insights
                    </span>
                    <span className="text-xs text-[#BFC0C0]">
                      • Personalized
                    </span>
                  </div>

                  <h1 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-[#040303]">
                    Recommendations
                  </h1>
                  <p className="mt-2 text-sm text-[#040303]/70 max-w-2xl">
                    Actionable steps based on your income, assets, liabilities,
                    and cards track progress and improve your financial health.
                  </p>

                  {/* Progress bar */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs text-[#040303]/70">
                      <span>Overall progress</span>
                      <span className="font-semibold text-[#040303]">
                        {completionPct}%
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-[#ecebe8] overflow-hidden border border-[#BFC0C0]/70">
                      <div
                        className="h-full bg-[#EF8354]"
                        style={{ width: `${completionPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full sm:w-auto">
                  <button
                    onClick={() => window.location.reload()}
                    className="border border-[#BFC0C0] rounded-xl px-4 py-2 text-sm font-semibold text-[#040303] hover:bg-[#ecebe8] transition w-full sm:w-auto"
                  >
                    Refresh
                  </button>

                  <div className="border border-[#BFC0C0] rounded-xl px-4 py-2 bg-white w-full sm:w-auto">
                    <p className="text-xs text-[#040303]/60">Total items</p>
                    <p className="text-xl font-extrabold text-[#040303] text-center">
                      {recommendations.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Search + Priority Filter */}
              <div className="mt-6 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
                <div className="flex-1">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search recommendations..."
                    className="w-full border border-[#BFC0C0] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  {/* PRIORITY DROPDOWN */}
                  <div className="relative w-full sm:w-auto">
                    <select
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      className="appearance-none w-full border border-[#BFC0C0] rounded-xl px-4 py-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354] bg-white"
                    >
                      <option value="all">All priorities</option>
                      <option value="high">High priority</option>
                      <option value="medium">Medium priority</option>
                      <option value="low">Low priority</option>
                    </select>

                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#BFC0C0] pointer-events-none">
                      ▼
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setQuery("");
                      setStatusFilter("all");
                      setPriorityFilter("all");
                    }}
                    className="border border-[#BFC0C0] rounded-xl px-4 py-3 text-sm font-semibold text-[#040303] hover:bg-[#ecebe8] transition w-full sm:w-auto"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-5 flex flex-wrap gap-2">
                {tabs.map((t) => {
                  const active = statusFilter === t.key;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setStatusFilter(t.key)}
                      className={clsx(
                        "px-4 py-2 rounded-full text-sm font-semibold border transition",
                        active
                          ? "bg-[#EF8354] text-white border-[#EF8354]"
                          : "bg-white text-[#040303] border-[#BFC0C0] hover:bg-[#ecebe8]"
                      )}
                    >
                      {t.label}
                      <span
                        className={clsx(
                          "ml-2 text-xs px-2 py-0.5 rounded-full",
                          active
                            ? "bg-white/15 text-white"
                            : "bg-[#ecebe8] text-[#040303]"
                        )}
                      >
                        {t.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Loading / Error */}
            {loading && (
              <div className="border border-[#BFC0C0] rounded-2xl p-4 sm:p-6 bg-white">
                <p className="font-extrabold text-[#040303]">Loading...</p>
                <div className="mt-4 h-3 w-2/3 bg-[#ecebe8] rounded" />
                <div className="mt-2 h-3 w-1/2 bg-[#ecebe8] rounded" />
              </div>
            )}

            {!loading && error && (
              <div className="border border-red-200 rounded-2xl p-4 sm:p-6 bg-white">
                <p className="text-red-600 font-extrabold">Error</p>
                <p className="text-sm text-red-500 mt-1">{error}</p>
              </div>
            )}

            {/* List */}
            {!loading && !error && (
              <div className="space-y-4">
                {filtered.length === 0 ? (
                  <div className="border border-[#BFC0C0] rounded-2xl p-4 sm:p-6 bg-white">
                    <div className="py-10 text-center">
                      <div className="mx-auto w-14 h-14 rounded-2xl bg-[#ecebe8] border border-[#BFC0C0] flex items-center justify-center">
                        <span className="w-3 h-3 rounded-full bg-[#EF8354]" />
                      </div>
                      <p className="mt-4 font-extrabold text-[#040303]">
                        No recommendations found
                      </p>
                      <p className="mt-2 text-sm text-[#040303]/60 max-w-xl mx-auto">
                        Try changing filters or add more financial data
                        (income/assets/liabilities/cards) to generate better
                        insights.
                      </p>
                    </div>
                  </div>
                ) : (
                  filtered.map((r) => (
                    <div
                      key={r.id}
                      className="group border border-[#BFC0C0] rounded-2xl bg-white overflow-hidden hover:shadow-sm transition"
                    >
                      <div className="flex">
                        <div className={clsx("w-2", leftAccent(r.priority))} />

                        <div className="flex-1 p-4 sm:p-6">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-lg sm:text-xl font-bold text-[#040303]">
                                  {r.title}
                                </h2>

                                <span
                                  className={clsx(
                                    "text-xs px-3 py-2 rounded-full font-semibold",
                                    priorityBadge(r.priority)
                                  )}
                                >
                                  {r.priority} priority
                                </span>

                                <span
                                  className={clsx(
                                    "text-xs px-3 py-2 rounded-full font-semibold",
                                    statusBadge(r.status)
                                  )}
                                >
                                  {normalizeStatus(r.status)}
                                </span>
                              </div>

                              <p className="text-sm text-[#040303]/70 mt-3 leading-relaxed">
                                {r.description}
                              </p>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                              <span className="text-xs text-[#040303]/50 hidden sm:inline">
                                Update status
                              </span>

                              <div className="relative w-full sm:w-auto">
                                <select
                                  value={normalizeStatus(r.status)}
                                  onChange={(e) =>
                                    updateStatus(r.id, e.target.value)
                                  }
                                  className="appearance-none w-full sm:w-auto border border-[#BFC0C0] rounded-xl px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354] bg-white"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="in-progress">In progress</option>
                                  <option value="completed">Completed</option>
                                </select>

                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#BFC0C0] pointer-events-none">
                                  ▼
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-5 pt-4 border-t border-[#BFC0C0]/60 flex items-center justify-between text-xs text-[#040303]/60">
                            <span>
                              Tip: do high priority first to improve faster.
                            </span>
                            <span className="group-hover:text-[#040303] transition">
                              FinSage AI
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </main>

        <ChatBotWidget />
      </div>

      <div className="w-full bg-[#ebe4e1]">
        <DashboardFooter />
      </div>
    </div>
  );
}

