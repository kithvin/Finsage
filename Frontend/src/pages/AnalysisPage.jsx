// // src/pages/ReportPage.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";

// import DashboardNavbar from "../components/dashbord/DashboardNavbar";
// import DashbordSidebar from "../components/dashbord/DashbordSidebar";
// import DashboardFooter from "../components/dashbord/DashboardFooter";
// import ChatBotWidget from "../components/dashbord/ChatBotWidget";

// const API_BASE = import.meta.env.VITE_API_BASE_URL;

// function clsx(...arr) {
//   return arr.filter(Boolean).join(" ");
// }

// function toCurrency(n) {
//   const num = Number(n || 0);
//   return `$${num.toLocaleString()}`;
// }

// function safePct(n) {
//   const x = Number(n || 0);
//   if (Number.isNaN(x)) return 0;
//   return Math.max(0, Math.min(100, Math.round(x)));
// }

// function downloadCSV(filename, rows) {
//   const escape = (v) => `"${String(v ?? "").replaceAll('"', '""')}"`;
//   const csv = rows.map((r) => r.map(escape).join(",")).join("\n");
//   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//   const url = URL.createObjectURL(blob);

//   const a = document.createElement("a");
//   a.href = url;
//   a.download = filename;
//   document.body.appendChild(a);
//   a.click();
//   a.remove();

//   URL.revokeObjectURL(url);
// }

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
//   const l = String(line || "").toLowerCase();
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

// export default function ReportPage() {
//   const [collapsed, setCollapsed] = useState(true);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // raw lists (from your existing endpoints)
//   const [incomes, setIncomes] = useState([]);
//   const [assets, setAssets] = useState([]);
//   const [liabilities, setLiabilities] = useState([]);
//   const [cards, setCards] = useState([]);
//   const [recText, setRecText] = useState("");

//   // UI filter for recommendations list
//   const [recFilter, setRecFilter] = useState("all"); // all | high | medium | low
//   const [recQuery, setRecQuery] = useState("");

//   // optional date filters (UI only)
//   const today = new Date().toISOString().slice(0, 10);
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState(today);

//   useEffect(() => {
//     async function loadAll() {
//       setLoading(true);
//       setError("");

//       try {
//         const reqs = [
//           axios.get(`${API_BASE}/api/incomes`, { withCredentials: true }),
//           axios.get(`${API_BASE}/api/assets`, { withCredentials: true }),
//           axios.get(`${API_BASE}/api/liabilities`, { withCredentials: true }),
//           axios.get(`${API_BASE}/api/cards`, { withCredentials: true }),
//           axios.get(`${API_BASE}/api/recommendations`, {
//             withCredentials: true,
//           }),
//         ];

//         const [incRes, assetRes, liabRes, cardRes, recRes] = await Promise.all(
//           reqs
//         );

//         const incList = incRes?.data?.data?.incomes || [];
//         const assetList = assetRes?.data?.data?.assets || [];
//         const liabList = liabRes?.data?.data?.liabilities || [];
//         const cardList = cardRes?.data?.data?.cards || [];
//         const aiText = recRes?.data?.data?.recommendations || "";

//         // map into UI-friendly structures (keeps your fields)
//         setIncomes(
//           incList.map((i) => ({
//             id: i._id,
//             source: i.incomeSource,
//             amount: Number(i.amount || 0),
//             frequency: String(i.frequency || "Monthly").toLowerCase(), // monthly/yearly/one-time
//           }))
//         );

//         setAssets(
//           assetList.map((a) => ({
//             id: a._id,
//             name: a.assetName,
//             type: a.assetType,
//             value: Number(a.currentValue || 0),
//           }))
//         );

//         setLiabilities(
//           liabList.map((x) => ({
//             id: x._id,
//             name: x.liabilityName ?? x.name ?? "",
//             type: x.type ?? "",
//             amount: Number(x.amount || 0),
//             interestRate: Number(x.interestRate || 0),
//             dueDate: x.paymentDueDate
//               ? new Date(x.paymentDueDate).toISOString().slice(0, 10)
//               : x.dueDate
//               ? new Date(x.dueDate).toISOString().slice(0, 10)
//               : "",
//           }))
//         );

//         setCards(
//           cardList.map((c) => ({
//             id: c._id,
//             name: c.cardName,
//             limit: Number(c.creditLimit || 0),
//             balance: Number(c.currentBalance || 0),
//             apr: Number(c.apr || 0),
//             dueDate: c.paymentDueDate
//               ? new Date(c.paymentDueDate).toISOString().slice(0, 10)
//               : "",
//           }))
//         );

//         setRecText(aiText);
//       } catch (e) {
//         const msg =
//           e?.response?.data?.message ||
//           e?.message ||
//           "Failed to load report data.";
//         setError(msg);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadAll();
//   }, []);

//   // calculations
//   const totalAssets = useMemo(
//     () => assets.reduce((sum, a) => sum + (Number(a.value) || 0), 0),
//     [assets]
//   );

//   const totalLiabilities = useMemo(
//     () => liabilities.reduce((sum, l) => sum + (Number(l.amount) || 0), 0),
//     [liabilities]
//   );

//   const netWorth = useMemo(
//     () => totalAssets - totalLiabilities,
//     [totalAssets, totalLiabilities]
//   );

//   function annualIncomeFor(item) {
//     const amt = Number(item.amount || 0);
//     if (item.frequency === "monthly") return amt * 12;
//     if (item.frequency === "yearly") return amt;
//     return amt; // one-time
//   }

//   const totalAnnualIncome = useMemo(() => {
//     let t = 0;
//     for (let i = 0; i < incomes.length; i++) t += annualIncomeFor(incomes[i]);
//     return t;
//   }, [incomes]);

//   const totalCardBalance = useMemo(
//     () => cards.reduce((sum, c) => sum + (Number(c.balance) || 0), 0),
//     [cards]
//   );

//   const totalCardLimit = useMemo(
//     () => cards.reduce((sum, c) => sum + (Number(c.limit) || 0), 0),
//     [cards]
//   );

//   const utilization = useMemo(() => {
//     if (!totalCardLimit) return 0;
//     return safePct((totalCardBalance / totalCardLimit) * 100);
//   }, [totalCardBalance, totalCardLimit]);

//   // derived “analysis”
//   const health = useMemo(() => {
//     // simple scoring (0-100)
//     let score = 70;

//     // utilization impact
//     if (utilization > 70) score -= 25;
//     else if (utilization > 30) score -= 12;
//     else score += 8;

//     // net worth impact
//     if (netWorth < 0) score -= 20;
//     else score += 8;

//     // liabilities vs income
//     if (totalAnnualIncome > 0 && totalLiabilities > totalAnnualIncome)
//       score -= 15;
//     else if (totalAnnualIncome > 0) score += 6;

//     score = Math.max(0, Math.min(100, score));

//     let label = "Good";
//     if (score < 45) label = "Needs Attention";
//     else if (score < 70) label = "Fair";

//     return { score, label };
//   }, [utilization, netWorth, totalAnnualIncome, totalLiabilities]);

//   // recommendations list
//   const recBullets = useMemo(() => splitToBullets(recText), [recText]);

//   const recItems = useMemo(() => {
//     return recBullets.map((line, idx) => ({
//       id: idx + 1,
//       title: line.length > 70 ? `${line.slice(0, 70)}...` : line,
//       description: line,
//       priority: makePriority(line),
//     }));
//   }, [recBullets]);

//   const filteredRecs = useMemo(() => {
//     const q = recQuery.trim().toLowerCase();
//     return recItems
//       .filter((r) => (recFilter === "all" ? true : r.priority === recFilter))
//       .filter((r) => {
//         if (!q) return true;
//         return (
//           r.title.toLowerCase().includes(q) ||
//           r.description.toLowerCase().includes(q)
//         );
//       });
//   }, [recItems, recFilter, recQuery]);

//   function exportReport() {
//     const rows = [
//       ["FinSage Report & Analysis"],
//       ["From", from || "—"],
//       ["To", to || "—"],
//       [""],
//       ["Total Annual Income", totalAnnualIncome],
//       ["Total Assets", totalAssets],
//       ["Total Liabilities", totalLiabilities],
//       ["Net Worth", netWorth],
//       ["Credit Card Balance", totalCardBalance],
//       ["Credit Card Limit", totalCardLimit],
//       ["Credit Utilization (%)", utilization],
//       ["Health Score", health.score],
//       ["Health Label", health.label],
//       [""],
//       ["Top Recommendations (First 5)"],
//       ...filteredRecs.slice(0, 5).map((r) => [r.priority, r.description]),
//     ];

//     downloadCSV(`finsage-report-analysis-${to || "today"}.csv`, rows);
//   }

//   function badgePriority(p) {
//     if (p === "high") return "bg-[#EF8354] text-white";
//     if (p === "medium") return "bg-[#BFC0C0] text-[#040303]";
//     return "bg-white border border-[#BFC0C0] text-[#040303]";
//   }

//   return (
//     <div className="min-h-screen bg-[#ebe4e1] flex flex-col">
//       <DashboardNavbar />

//       <div className="flex flex-1 min-h-0">
//         <DashbordSidebar
//           collapsed={collapsed}
//           onToggle={() => setCollapsed((prev) => !prev)}
//         />

//         <main className="flex-1 min-w-0 bg-gray-50 overflow-auto">
//           <div className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
//             {/* Header */}
//             <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
//               <div>
//                 <h1 className="text-3xl font-bold text-[#040303]">
//                   Report & Analysis
//                 </h1>
//                 <p className="text-sm text-[#040303]/60">
//                   One page summary + insights based on your data
//                 </p>
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={exportReport}
//                   className="border border-[#BFC0C0] bg-white rounded-xl px-4 py-2 text-sm font-semibold text-[#040303] hover:bg-[#ecebe8] transition"
//                 >
//                   Export CSV
//                 </button>
//                 <button
//                   onClick={() => window.location.reload()}
//                   className="bg-[#EF8354] text-white px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition"
//                 >
//                   Refresh
//                 </button>
//               </div>
//             </div>

//             {/* Filters (UI only) */}
//             <div className="bg-white border border-[#BFC0C0] rounded-2xl p-6">
//               <h3 className="font-semibold text-[#040303]">Filters</h3>
//               <p className="text-xs text-[#040303]/60 mt-1">
//                 Date range is optional (UI only unless backend supports it)
//               </p>

//               <div className="mt-4 grid gap-3 sm:grid-cols-3">
//                 <div>
//                   <label className="text-sm font-medium text-[#040303]">
//                     From
//                   </label>
//                   <input
//                     value={from}
//                     onChange={(e) => setFrom(e.target.value)}
//                     type="date"
//                     className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-[#040303]">To</label>
//                   <input
//                     value={to}
//                     onChange={(e) => setTo(e.target.value)}
//                     type="date"
//                     className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
//                   />
//                 </div>

//                 <div className="flex items-end">
//                   <button
//                     onClick={() => {
//                       setFrom("");
//                       setTo(today);
//                     }}
//                     className="w-full border border-[#BFC0C0] rounded-md px-3 py-2 text-sm font-semibold text-[#040303] hover:bg-[#ecebe8] transition bg-white"
//                   >
//                     Reset Filters
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Loading / Error */}
//             {loading && (
//               <div className="bg-white border border-[#BFC0C0] rounded-2xl p-6">
//                 <p className="font-bold text-[#040303]">Loading report...</p>
//                 <div className="mt-4 h-3 w-2/3 bg-[#ecebe8] rounded" />
//                 <div className="mt-2 h-3 w-1/2 bg-[#ecebe8] rounded" />
//               </div>
//             )}

//             {!loading && error && (
//               <div className="bg-white border border-red-200 rounded-2xl p-6">
//                 <p className="text-red-600 font-extrabold">Error</p>
//                 <p className="text-sm text-red-500 mt-1">{error}</p>
//                 <div className="mt-4 rounded-xl border border-[#BFC0C0] bg-[#ecebe8] p-4">
//                   <p className="text-sm text-[#040303]/80">
//                     Check backend:{" "}
//                     <span className="font-semibold">http://localhost:5000</span>{" "}
//                     and your routes:
//                     <span className="font-semibold">
//                       {" "}
//                       /api/incomes, /api/assets, /api/liabilities, /api/cards,
//                       /api/recommendations
//                     </span>
//                     .
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Summary cards */}
//             {!loading && (
//               <div className="grid gap-4 md:grid-cols-3">
//                 <div className="bg-white border border-[#BFC0C0] rounded-2xl p-6">
//                   <h3 className="font-semibold text-[#040303]">
//                     Total Annual Income
//                   </h3>
//                   <p className="text-xs text-[#040303]/60 mt-1">
//                     Estimated yearly income
//                   </p>
//                   <div className="text-4xl font-bold mt-6 text-[#EF8354]">
//                     {toCurrency(totalAnnualIncome)}
//                   </div>
//                 </div>

//                 <div className="bg-white border border-[#BFC0C0] rounded-2xl p-6">
//                   <h3 className="font-semibold text-[#040303]">Total Assets</h3>
//                   <p className="text-xs text-[#040303]/60 mt-1">
//                     Combined asset value
//                   </p>
//                   <div className="text-4xl font-bold mt-6 text-[#040303]">
//                     {toCurrency(totalAssets)}
//                   </div>
//                 </div>

//                 <div className="bg-white border border-[#BFC0C0] rounded-2xl p-6">
//                   <h3 className="font-semibold text-[#040303]">
//                     Total Liabilities
//                   </h3>
//                   <p className="text-xs text-[#040303]/60 mt-1">
//                     Combined debt amount
//                   </p>
//                   <div className="text-4xl font-bold mt-6 text-[#040303]">
//                     {toCurrency(totalLiabilities)}
//                   </div>
//                 </div>

//                 <div className="bg-white border border-[#BFC0C0] rounded-2xl p-6 md:col-span-2">
//                   <h3 className="font-semibold text-[#040303]">Net Worth</h3>
//                   <p className="text-xs text-[#040303]/60 mt-1">
//                     Assets - liabilities
//                   </p>

//                   <div className="mt-6 flex items-center justify-between gap-4">
//                     <div className="text-4xl font-bold text-[#EF8354]">
//                       {toCurrency(netWorth)}
//                     </div>

//                     <div className="text-right text-xs text-[#040303]/60">
//                       {netWorth >= 0
//                         ? "Positive net worth"
//                         : "Negative net worth"}
//                       <div className="mt-1">
//                         {netWorth >= 0
//                           ? "Keep building assets and avoid unnecessary debt."
//                           : "Focus on debt reduction and building assets."}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white border border-[#BFC0C0] rounded-2xl p-6">
//                   <h3 className="font-semibold text-[#040303]">
//                     Credit Utilization
//                   </h3>
//                   <p className="text-xs text-[#040303]/60 mt-1">
//                     Balance / limit
//                   </p>

//                   <div className="text-4xl font-bold mt-6 text-[#040303]">
//                     {utilization}%
//                   </div>

//                   <div className="w-full h-2 bg-[#BFC0C0]/40 rounded-full mt-3 overflow-hidden">
//                     <div
//                       className={clsx(
//                         "h-2",
//                         utilization > 30 ? "bg-[#EF8354]" : "bg-[#040303]"
//                       )}
//                       style={{ width: `${utilization}%` }}
//                     />
//                   </div>

//                   <p className="mt-2 text-xs text-[#040303]/60">
//                     Tip: try to keep below 30%
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Health score */}
//             {!loading && (
//               <div className="bg-white border border-[#BFC0C0] rounded-2xl p-6">
//                 <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
//                   <div>
//                     <h3 className="font-semibold text-[#040303]">
//                       Financial Health Score
//                     </h3>
//                     <p className="text-xs text-[#040303]/60 mt-1">
//                       Simple estimate based on your current data
//                     </p>
//                   </div>

//                   <div className="text-right">
//                     <p className="text-sm text-[#040303]/60">Status</p>
//                     <p className="text-lg font-extrabold text-[#040303]">
//                       {health.label}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-5">
//                   <div className="flex items-center justify-between text-xs text-[#040303]/70">
//                     <span>Score</span>
//                     <span className="font-semibold text-[#040303]">
//                       {health.score}/100
//                     </span>
//                   </div>

//                   <div className="mt-2 h-2 rounded-full bg-[#ecebe8] overflow-hidden border border-[#BFC0C0]/70">
//                     <div
//                       className="h-full bg-[#EF8354]"
//                       style={{ width: `${health.score}%` }}
//                     />
//                   </div>

//                   <div className="mt-3 text-xs text-[#040303]/60">
//                     {health.score >= 70
//                       ? "You are on a good track. Keep updating your data and follow the recommendations."
//                       : health.score >= 45
//                       ? "You have some risk areas. Reduce utilization and high-interest liabilities."
//                       : "Needs attention. Focus on debt repayment, improve income stability, and avoid overdue payments."}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Recommendations (inside report page) */}
//             {!loading && (
//               <div className="bg-white border border-[#BFC0C0] rounded-2xl p-6">
//                 <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
//                   <div>
//                     <h3 className="font-semibold text-[#040303]">
//                       Recommendations Summary
//                     </h3>
//                     <p className="text-xs text-[#040303]/60 mt-1">
//                       Generated based on your income, assets, liabilities, and
//                       credit cards
//                     </p>
//                   </div>

//                   <div className="flex gap-2">
//                     <select
//                       value={recFilter}
//                       onChange={(e) => setRecFilter(e.target.value)}
//                       className="appearance-none border border-[#BFC0C0] rounded-xl px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354] bg-white"
//                     >
//                       <option value="all">All priority</option>
//                       <option value="high">High</option>
//                       <option value="medium">Medium</option>
//                       <option value="low">Low</option>
//                     </select>

//                     <input
//                       value={recQuery}
//                       onChange={(e) => setRecQuery(e.target.value)}
//                       placeholder="Search..."
//                       className="border border-[#BFC0C0] rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-5 space-y-3">
//                   {filteredRecs.length === 0 ? (
//                     <div className="h-24 rounded-md bg-white border border-dashed border-[#BFC0C0] flex flex-col items-center justify-center text-sm text-[#040303]/60">
//                       <p>No recommendations found.</p>
//                       <p className="text-xs">
//                         Add more financial data to get better insights.
//                       </p>
//                     </div>
//                   ) : (
//                     filteredRecs.slice(0, 8).map((r) => (
//                       <div
//                         key={r.id}
//                         className="border border-[#BFC0C0] rounded-xl p-4 bg-white"
//                       >
//                         <div className="flex items-start justify-between gap-3">
//                           <div>
//                             <p className="font-bold text-[#040303]">{r.title}</p>
//                             <p className="text-sm text-[#040303]/70 mt-1">
//                               {r.description}
//                             </p>
//                           </div>

//                           <span
//                             className={clsx(
//                               "text-xs px-3 py-2 rounded-full font-semibold shrink-0",
//                               badgePriority(r.priority)
//                             )}
//                           >
//                             {r.priority}
//                           </span>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>

//                 <div className="mt-5 pt-4 border-t border-[#BFC0C0]/60 text-xs text-[#040303]/60">
//                   Tip: focus high priority recommendations first.
//                 </div>
//               </div>
//             )}
//           </div>
//         </main>

//         <ChatBotWidget />
//       </div>

//       <DashboardFooter />
//     </div>
//   );
// }

// src/pages/ReportPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import DashboardNavbar from "../components/dashbord/DashboardNavbar";
import DashbordSidebar from "../components/dashbord/DashbordSidebar";
import DashboardFooter from "../components/dashbord/DashboardFooter";
import ChatBotWidget from "../components/dashbord/ChatBotWidget";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function clsx(...arr) {
  return arr.filter(Boolean).join(" ");
}

function toCurrency(n) {
  const num = Number(n || 0);
  return `$${num.toLocaleString()}`;
}

function safePct(n) {
  const x = Number(n || 0);
  if (Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(100, Math.round(x)));
}

function downloadCSV(filename, rows) {
  const escape = (v) => `"${String(v ?? "").replaceAll('"', '""')}"`;
  const csv = rows.map((r) => r.map(escape).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}

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
  const l = String(line || "").toLowerCase();
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

export default function ReportPage() {
  const [collapsed, setCollapsed] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [incomes, setIncomes] = useState([]);
  const [assets, setAssets] = useState([]);
  const [liabilities, setLiabilities] = useState([]);
  const [cards, setCards] = useState([]);
  const [recText, setRecText] = useState("");

  const [recFilter, setRecFilter] = useState("all");
  const [recQuery, setRecQuery] = useState("");

  const today = new Date().toISOString().slice(0, 10);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState(today);

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      setError("");

      try {
        const reqs = [
          axios.get(`${API_BASE}/api/incomes`, { withCredentials: true }),
          axios.get(`${API_BASE}/api/assets`, { withCredentials: true }),
          axios.get(`${API_BASE}/api/liabilities`, { withCredentials: true }),
          axios.get(`${API_BASE}/api/cards`, { withCredentials: true }),
          axios.get(`${API_BASE}/api/recommendations`, {
            withCredentials: true,
          }),
        ];

        const [incRes, assetRes, liabRes, cardRes, recRes] = await Promise.all(
          reqs
        );

        const incList = incRes?.data?.data?.incomes || [];
        const assetList = assetRes?.data?.data?.assets || [];
        const liabList = liabRes?.data?.data?.liabilities || [];
        const cardList = cardRes?.data?.data?.cards || [];
        const aiText = recRes?.data?.data?.recommendations || "";

        setIncomes(
          incList.map((i) => ({
            id: i._id,
            source: i.incomeSource,
            amount: Number(i.amount || 0),
            frequency: String(i.frequency || "Monthly").toLowerCase(),
          }))
        );

        setAssets(
          assetList.map((a) => ({
            id: a._id,
            name: a.assetName,
            type: a.assetType,
            value: Number(a.currentValue || 0),
          }))
        );

        setLiabilities(
          liabList.map((x) => ({
            id: x._id,
            name: x.liabilityName ?? x.name ?? "",
            type: x.type ?? "",
            amount: Number(x.amount || 0),
            interestRate: Number(x.interestRate || 0),
            dueDate: x.paymentDueDate
              ? new Date(x.paymentDueDate).toISOString().slice(0, 10)
              : x.dueDate
              ? new Date(x.dueDate).toISOString().slice(0, 10)
              : "",
          }))
        );

        setCards(
          cardList.map((c) => ({
            id: c._id,
            name: c.cardName,
            limit: Number(c.creditLimit || 0),
            balance: Number(c.currentBalance || 0),
            apr: Number(c.apr || 0),
            dueDate: c.paymentDueDate
              ? new Date(c.paymentDueDate).toISOString().slice(0, 10)
              : "",
          }))
        );

        setRecText(aiText);
      } catch (e) {
        const msg =
          e?.response?.data?.message ||
          e?.message ||
          "Failed to load report data.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, []);

  const totalAssets = useMemo(
    () => assets.reduce((sum, a) => sum + (Number(a.value) || 0), 0),
    [assets]
  );

  const totalLiabilities = useMemo(
    () => liabilities.reduce((sum, l) => sum + (Number(l.amount) || 0), 0),
    [liabilities]
  );

  const netWorth = useMemo(
    () => totalAssets - totalLiabilities,
    [totalAssets, totalLiabilities]
  );

  function annualIncomeFor(item) {
    const amt = Number(item.amount || 0);
    if (item.frequency === "monthly") return amt * 12;
    if (item.frequency === "yearly") return amt;
    return amt;
  }

  const totalAnnualIncome = useMemo(() => {
    let t = 0;
    for (let i = 0; i < incomes.length; i++) t += annualIncomeFor(incomes[i]);
    return t;
  }, [incomes]);

  const totalCardBalance = useMemo(
    () => cards.reduce((sum, c) => sum + (Number(c.balance) || 0), 0),
    [cards]
  );

  const totalCardLimit = useMemo(
    () => cards.reduce((sum, c) => sum + (Number(c.limit) || 0), 0),
    [cards]
  );

  const utilization = useMemo(() => {
    if (!totalCardLimit) return 0;
    return safePct((totalCardBalance / totalCardLimit) * 100);
  }, [totalCardBalance, totalCardLimit]);

  const health = useMemo(() => {
    let score = 70;

    if (utilization > 70) score -= 25;
    else if (utilization > 30) score -= 12;
    else score += 8;

    if (netWorth < 0) score -= 20;
    else score += 8;

    if (totalAnnualIncome > 0 && totalLiabilities > totalAnnualIncome)
      score -= 15;
    else if (totalAnnualIncome > 0) score += 6;

    score = Math.max(0, Math.min(100, score));

    let label = "Good";
    if (score < 45) label = "Needs Attention";
    else if (score < 70) label = "Fair";

    return { score, label };
  }, [utilization, netWorth, totalAnnualIncome, totalLiabilities]);

  const recBullets = useMemo(() => splitToBullets(recText), [recText]);

  const recItems = useMemo(() => {
    return recBullets.map((line, idx) => ({
      id: idx + 1,
      title: line.length > 70 ? `${line.slice(0, 70)}...` : line,
      description: line,
      priority: makePriority(line),
    }));
  }, [recBullets]);

  const filteredRecs = useMemo(() => {
    const q = recQuery.trim().toLowerCase();
    return recItems
      .filter((r) => (recFilter === "all" ? true : r.priority === recFilter))
      .filter((r) => {
        if (!q) return true;
        return (
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q)
        );
      });
  }, [recItems, recFilter, recQuery]);

  function exportReport() {
    const rows = [
      ["FinSage Report & Analysis"],
      ["From", from || "—"],
      ["To", to || "—"],
      [""],
      ["Total Annual Income", totalAnnualIncome],
      ["Total Assets", totalAssets],
      ["Total Liabilities", totalLiabilities],
      ["Net Worth", netWorth],
      ["Credit Card Balance", totalCardBalance],
      ["Credit Card Limit", totalCardLimit],
      ["Credit Utilization (%)", utilization],
      ["Health Score", health.score],
      ["Health Label", health.label],
      [""],
      ["Top Recommendations (First 5)"],
      ...filteredRecs.slice(0, 5).map((r) => [r.priority, r.description]),
    ];

    downloadCSV(`finsage-report-analysis-${to || "today"}.csv`, rows);
  }

  function badgePriority(p) {
    if (p === "high") return "bg-[#EF8354] text-white";
    if (p === "medium") return "bg-[#BFC0C0] text-[#040303]";
    return "bg-white border border-[#BFC0C0] text-[#040303]";
  }

  return (
    <div className="min-h-screen bg-[#ebe4e1] flex flex-col">
      <DashboardNavbar />

      <div className="flex flex-1 min-h-0">
        <DashbordSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((prev) => !prev)}
        />

        {/* mobile responsive only: padding + spacing */}
        <main className="flex-1 min-w-0 bg-gray-50 overflow-auto">
          <div className="max-w-[1600px] mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#040303]">
                  Report & Analysis
                </h1>
                <p className="text-xs sm:text-sm text-[#040303]/60">
                  One page summary + insights based on your data
                </p>
              </div>

              {/* mobile wrap only */}
              <div className="flex gap-3 w-full sm:w-auto flex-col sm:flex-row">
                <button
                  onClick={exportReport}
                  className="border border-[#BFC0C0] bg-white rounded-xl px-4 py-2 text-sm font-semibold text-[#040303] hover:bg-[#ecebe8] transition w-full sm:w-auto"
                >
                  Export CSV
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-[#EF8354] text-white px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition w-full sm:w-auto"
                >
                  Refresh
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white border border-[#BFC0C0] rounded-2xl p-4 sm:p-6">
              <h3 className="font-semibold text-[#040303]">Filters</h3>
              <p className="text-xs text-[#040303]/60 mt-1">
                Date range is optional (UI only unless backend supports it)
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="text-sm font-medium text-[#040303]">
                    From
                  </label>
                  <input
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    type="date"
                    className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#040303]">To</label>
                  <input
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    type="date"
                    className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setFrom("");
                      setTo(today);
                    }}
                    className="w-full border border-[#BFC0C0] rounded-md px-3 py-2 text-sm font-semibold text-[#040303] hover:bg-[#ecebe8] transition bg-white"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Loading / Error */}
            {loading && (
              <div className="bg-white border border-[#BFC0C0] rounded-2xl p-4 sm:p-6">
                <p className="font-bold text-[#040303]">Loading report...</p>
                <div className="mt-4 h-3 w-2/3 bg-[#ecebe8] rounded" />
                <div className="mt-2 h-3 w-1/2 bg-[#ecebe8] rounded" />
              </div>
            )}

            {!loading && error && (
              <div className="bg-white border border-red-200 rounded-2xl p-4 sm:p-6">
                <p className="text-red-600 font-extrabold">Error</p>
                <p className="text-sm text-red-500 mt-1">{error}</p>
                <div className="mt-4 rounded-xl border border-[#BFC0C0] bg-[#ecebe8] p-4">
                  <p className="text-sm text-[#040303]/80">
                    Check backend:{" "}
                    <span className="font-semibold">http://localhost:5000</span>{" "}
                    and your routes:
                    <span className="font-semibold">
                      {" "}
                      /api/incomes, /api/assets, /api/liabilities, /api/cards,
                      /api/recommendations
                    </span>
                    .
                  </p>
                </div>
              </div>
            )}

            {/* Summary cards */}
            {!loading && (
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-white border border-[#BFC0C0] rounded-2xl p-4 sm:p-6">
                  <h3 className="font-semibold text-[#040303]">
                    Total Annual Income
                  </h3>
                  <p className="text-xs text-[#040303]/60 mt-1">
                    Estimated yearly income
                  </p>
                  <div className="text-3xl sm:text-4xl font-bold mt-6 text-[#EF8354]">
                    {toCurrency(totalAnnualIncome)}
                  </div>
                </div>

                <div className="bg-white border border-[#BFC0C0] rounded-2xl p-4 sm:p-6">
                  <h3 className="font-semibold text-[#040303]">Total Assets</h3>
                  <p className="text-xs text-[#040303]/60 mt-1">
                    Combined asset value
                  </p>
                  <div className="text-3xl sm:text-4xl font-bold mt-6 text-[#040303]">
                    {toCurrency(totalAssets)}
                  </div>
                </div>

                <div className="bg-white border border-[#BFC0C0] rounded-2xl p-4 sm:p-6">
                  <h3 className="font-semibold text-[#040303]">
                    Total Liabilities
                  </h3>
                  <p className="text-xs text-[#040303]/60 mt-1">
                    Combined debt amount
                  </p>
                  <div className="text-3xl sm:text-4xl font-bold mt-6 text-[#040303]">
                    {toCurrency(totalLiabilities)}
                  </div>
                </div>

                <div className="bg-white border border-[#BFC0C0] rounded-2xl p-4 sm:p-6 md:col-span-2">
                  <h3 className="font-semibold text-[#040303]">Net Worth</h3>
                  <p className="text-xs text-[#040303]/60 mt-1">
                    Assets - liabilities
                  </p>

                  {/* mobile: stack, desktop: row */}
                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-3xl sm:text-4xl font-bold text-[#EF8354]">
                      {toCurrency(netWorth)}
                    </div>

                    <div className="text-left sm:text-right text-xs text-[#040303]/60">
                      {netWorth >= 0
                        ? "Positive net worth"
                        : "Negative net worth"}
                      <div className="mt-1">
                        {netWorth >= 0
                          ? "Keep building assets and avoid unnecessary debt."
                          : "Focus on debt reduction and building assets."}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#BFC0C0] rounded-2xl p-4 sm:p-6">
                  <h3 className="font-semibold text-[#040303]">
                    Credit Utilization
                  </h3>
                  <p className="text-xs text-[#040303]/60 mt-1">
                    Balance / limit
                  </p>

                  <div className="text-3xl sm:text-4xl font-bold mt-6 text-[#040303]">
                    {utilization}%
                  </div>

                  <div className="w-full h-2 bg-[#BFC0C0]/40 rounded-full mt-3 overflow-hidden">
                    <div
                      className={clsx(
                        "h-2",
                        utilization > 30 ? "bg-[#EF8354]" : "bg-[#040303]"
                      )}
                      style={{ width: `${utilization}%` }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-[#040303]/60">
                    Tip: try to keep below 30%
                  </p>
                </div>
              </div>
            )}

            {/* Health score */}
            {!loading && (
              <div className="bg-white border border-[#BFC0C0] rounded-2xl p-4 sm:p-6">
                <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
                  <div>
                    <h3 className="font-semibold text-[#040303]">
                      Financial Health Score
                    </h3>
                    <p className="text-xs text-[#040303]/60 mt-1">
                      Simple estimate based on your current data
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-sm text-[#040303]/60">Status</p>
                    <p className="text-lg font-extrabold text-[#040303]">
                      {health.label}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs text-[#040303]/70">
                    <span>Score</span>
                    <span className="font-semibold text-[#040303]">
                      {health.score}/100
                    </span>
                  </div>

                  <div className="mt-2 h-2 rounded-full bg-[#ecebe8] overflow-hidden border border-[#BFC0C0]/70">
                    <div
                      className="h-full bg-[#EF8354]"
                      style={{ width: `${health.score}%` }}
                    />
                  </div>

                  <div className="mt-3 text-xs text-[#040303]/60">
                    {health.score >= 70
                      ? "You are on a good track. Keep updating your data and follow the recommendations."
                      : health.score >= 45
                      ? "You have some risk areas. Reduce utilization and high-interest liabilities."
                      : "Needs attention. Focus on debt repayment, improve income stability, and avoid overdue payments."}
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {!loading && (
              <div className="bg-white border border-[#BFC0C0] rounded-2xl p-4 sm:p-6">
                <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
                  <div>
                    <h3 className="font-semibold text-[#040303]">
                      Recommendations Summary
                    </h3>
                    <p className="text-xs text-[#040303]/60 mt-1">
                      Generated based on your income, assets, liabilities, and
                      credit cards
                    </p>
                  </div>

                  {/* mobile responsive only: stack controls */}
                  <div className="flex gap-2 w-full sm:w-auto flex-col sm:flex-row">
                    <select
                      value={recFilter}
                      onChange={(e) => setRecFilter(e.target.value)}
                      className="appearance-none border border-[#BFC0C0] rounded-xl px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354] bg-white w-full sm:w-auto"
                    >
                      <option value="all">All priority</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>

                    <input
                      value={recQuery}
                      onChange={(e) => setRecQuery(e.target.value)}
                      placeholder="Search..."
                      className="border border-[#BFC0C0] rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354] w-full sm:w-auto"
                    />
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {filteredRecs.length === 0 ? (
                    <div className="h-24 rounded-md bg-white border border-dashed border-[#BFC0C0] flex flex-col items-center justify-center text-sm text-[#040303]/60">
                      <p>No recommendations found.</p>
                      <p className="text-xs">
                        Add more financial data to get better insights.
                      </p>
                    </div>
                  ) : (
                    filteredRecs.slice(0, 8).map((r) => (
                      <div
                        key={r.id}
                        className="border border-[#BFC0C0] rounded-xl p-4 bg-white"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-bold text-[#040303] break-words">
                              {r.title}
                            </p>
                            <p className="text-sm text-[#040303]/70 mt-1 break-words">
                              {r.description}
                            </p>
                          </div>

                          <span
                            className={clsx(
                              "text-xs px-3 py-2 rounded-full font-semibold shrink-0",
                              badgePriority(r.priority)
                            )}
                          >
                            {r.priority}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-[#BFC0C0]/60 text-xs text-[#040303]/60">
                  Tip: focus high priority recommendations first.
                </div>
              </div>
            )}
          </div>
        </main>

        <ChatBotWidget />
      </div>

      <DashboardFooter />
    </div>
  );
}


