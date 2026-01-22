// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   DollarSign,
//   Building2,
//   FileText,
//   TrendingUp,
//   PlusCircle,
//   CreditCard,
// } from "lucide-react";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";

// const COLORS = {
//   black: "#040303",
//   silver: "#BFC0C0",
//   white: "#FFFFFF",
//   coral: "#EF8354",
// };

// const incomeExpenseData = [
//   { month: "Jan", income: 5000, expenses: 3200 },
//   { month: "Feb", income: 5200, expenses: 3400 },
//   { month: "Mar", income: 5100, expenses: 3300 },
//   { month: "Apr", income: 5400, expenses: 3600 },
//   { month: "May", income: 5600, expenses: 3800 },
//   { month: "Jun", income: 5800, expenses: 4000 },
// ];

// const spendingData = [
//   { name: "Housing", value: 1500 },
//   { name: "Food", value: 600 },
//   { name: "Transport", value: 400 },
//   { name: "Entertainment", value: 300 },
//   { name: "Utilities", value: 200 },
//   { name: "Other", value: 500 },
// ];

// function StatCard({ title, value, subtitle, icon: Icon }) {
//   return (
//     <Card className="rounded-2xl border shadow-sm bg-[#FFFFFF] border-[#BFC0C0]/50">
//       <CardHeader className="flex flex-row items-center justify-between pb-2">
//         <CardTitle className="text-sm font-medium text-[#040303]/70">
//           {title}
//         </CardTitle>

//         <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-[#EF8354]/15">
//           <Icon className="h-4 w-4 text-[#EF8354]" />
//         </div>
//       </CardHeader>

//       <CardContent>
//         <div className="text-2xl font-bold text-[#040303]">{value}</div>
//         <p className="text-xs mt-1 text-[#040303]/60">{subtitle}</p>
//       </CardContent>
//     </Card>
//   );
// }

// function ActionTile({ title, desc, icon: Icon, to }) {
//   return (
//     <Link to={to} className="group block">
//       <div className="flex items-center gap-3 rounded-2xl border bg-[#FFFFFF] border-[#BFC0C0]/50 p-4 shadow-sm transition hover:shadow-md">
//         <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-[#EF8354]/15">
//           <Icon className="h-5 w-5 text-[#EF8354]" />
//         </div>

//         <div className="flex-1">
//           <p className="font-semibold leading-tight text-[#040303]">{title}</p>
//           <p className="text-xs mt-1 text-[#040303]/60">{desc}</p>
//         </div>

//         <PlusCircle className="h-5 w-5 text-[#040303]/40 transition group-hover:text-[#EF8354]" />
//       </div>
//     </Link>
//   );
// }

// export default function Dashboard() {
//   // later: replace with backend data
//   const totals = {
//     income: 0,
//     assets: 0,
//     liabilities: 0,
//     netWorth: 0,
//   };

//   return (
//     <div className="space-y-8">
//       {/* Page header */}
//       <div>
//         <h1 className="text-3xl font-bold md:text-center text-[#040303]">Dashboard</h1>
//         <p className="text-sm mt-2 md:text-center text-[#040303]/60">
//         A clear overview of your overall financial health and progress.
//         </p>
//       </div>

//       {/* KPI cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
//         <StatCard
//           title="Total Income"
//           value={`$${totals.income}`}
//           subtitle="Annual income"
//           icon={DollarSign}
//         />
//         <StatCard
//           title="Total Assets"
//           value={`$${totals.assets}`}
//           subtitle="Current value"
//           icon={Building2}
//         />
//         <StatCard
//           title="Total Liabilities"
//           value={`$${totals.liabilities}`}
//           subtitle="Outstanding debt"
//           icon={FileText}
//         />
//         <StatCard
//           title="Net Worth"
//           value={`$${totals.netWorth}`}
//           subtitle="Assets - Liabilities"
//           icon={TrendingUp}
//         />
//       </div>

//       {/* Charts row */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
//         <Card className="rounded-2xl border shadow-sm bg-[#FFFFFF] border-[#BFC0C0]/50">
//           <CardHeader>
//             <CardTitle className="text-base text-[#040303]">
//               Income vs Expenses
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="h-[320px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={incomeExpenseData}>
//                 <CartesianGrid stroke={COLORS.silver} strokeDasharray="3 3" />
//                 <XAxis dataKey="month" stroke={COLORS.black} />
//                 <YAxis stroke={COLORS.black} />
//                 <Tooltip
//                   contentStyle={{
//                     borderRadius: 12,
//                     border: `1px solid ${COLORS.silver}`,
//                     background: COLORS.white,
//                     color: COLORS.black,
//                   }}
//                 />
//                 <Legend />
//                 <Area
//                   type="monotone"
//                   dataKey="income"
//                   stroke={COLORS.coral}
//                   fill={COLORS.coral}
//                   fillOpacity={0.18}
//                   strokeWidth={2}
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="expenses"
//                   stroke={COLORS.black}
//                   fill={COLORS.black}
//                   fillOpacity={0.08}
//                   strokeWidth={2}
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card className="rounded-2xl border shadow-sm bg-[#FFFFFF] border-[#BFC0C0]/50">
//           <CardHeader>
//             <CardTitle className="text-base text-[#040303]">
//               Spending by Category
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="h-[320px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={spendingData}>
//                 <CartesianGrid stroke={COLORS.silver} strokeDasharray="3 3" />
//                 <XAxis dataKey="name" stroke={COLORS.black} />
//                 <YAxis stroke={COLORS.black} />
//                 <Tooltip
//                   contentStyle={{
//                     borderRadius: 12,
//                     border: `1px solid ${COLORS.silver}`,
//                     background: COLORS.white,
//                     color: COLORS.black,
//                   }}
//                 />
//                 <Bar dataKey="value" fill={COLORS.coral} radius={[10, 10, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Quick Actions */}
//       <Card className="rounded-2xl border shadow-sm bg-[#FFFFFF] border-[#BFC0C0]/50">
//         <CardHeader className="flex flex-row items-center justify-between">
//           <CardTitle className="text-base text-[#040303]">Quick Actions</CardTitle>

//           {/* <Button
//             size="sm"
//             className="rounded-xl bg-[#EF8354] text-white hover:opacity-90"
//           >
//             View All
//           </Button> */}
//         </CardHeader>

//         <CardContent>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <ActionTile
//               title="Add Income"
//               desc="Track new income"
//               icon={DollarSign}
//               to="/income"
//             />
//             <ActionTile
//               title="Add Asset"
//               desc="Record new asset"
//               icon={Building2}
//               to="/assets"
//             />
//             <ActionTile
//               title="Add Liability"
//               desc="Track new debt"
//               icon={FileText}
//               to="/liabilities"
//             />
//             <ActionTile
//               title="Add Card"
//               desc="Add credit card"
//               icon={CreditCard}
//               to="/credit-cards"
//             />
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  DollarSign,
  Building2,
  FileText,
  TrendingUp,
  PlusCircle,
  CreditCard,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = {
  black: "#040303",
  silver: "#BFC0C0",
  white: "#FFFFFF",
  coral: "#EF8354",
};

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function StatCard({ title, value, subtitle, icon: Icon }) {
  return (
    <Card className="rounded-2xl border shadow-sm bg-[#FFFFFF] border-[#BFC0C0]/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-[#040303]/70">
          {title}
        </CardTitle>

        <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-[#EF8354]/15">
          <Icon className="h-4 w-4 text-[#EF8354]" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold text-[#040303]">{value}</div>
        <p className="text-xs mt-1 text-[#040303]/60">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

function ActionTile({ title, desc, icon: Icon, to }) {
  return (
    <Link to={to} className="group block">
      <div className="flex items-center gap-3 rounded-2xl border bg-[#FFFFFF] border-[#BFC0C0]/50 p-4 shadow-sm transition hover:shadow-md">
        <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-[#EF8354]/15">
          <Icon className="h-5 w-5 text-[#EF8354]" />
        </div>

        <div className="flex-1">
          <p className="font-semibold leading-tight text-[#040303]">{title}</p>
          <p className="text-xs mt-1 text-[#040303]/60">{desc}</p>
        </div>

        <PlusCircle className="h-5 w-5 text-[#040303]/40 transition group-hover:text-[#EF8354]" />
      </div>
    </Link>
  );
}

function money(n) {
  const num = Number(n || 0);
  return `$${num.toLocaleString()}`;
}

// Match your IncomePage frequency logic
function incomeAnnual(amount, frequency) {
  const amt = Number(amount || 0);
  const f = String(frequency || "Monthly").toLowerCase();
  if (f === "monthly") return amt * 12;
  if (f === "yearly") return amt;
  return amt; // one-time
}

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // store DB values here
  const [incomes, setIncomes] = useState([]);
  const [assets, setAssets] = useState([]);
  const [liabilities, setLiabilities] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let alive = true;

    async function loadAll() {
      setLoading(true);
      setError("");

      try {
        // Load all your existing pages' data from DB (same routes you already use)
        const [incRes, assetRes, liabRes, cardRes] = await Promise.all([
          axios.get(`${API_BASE}/api/incomes`, { withCredentials: true }),
          axios.get(`${API_BASE}/api/assets`, { withCredentials: true }),
          axios.get(`${API_BASE}/api/liabilities`, { withCredentials: true }),
          axios.get(`${API_BASE}/api/cards`, { withCredentials: true }),
        ]);

        if (!alive) return;

        setIncomes(incRes?.data?.data?.incomes || []);
        setAssets(assetRes?.data?.data?.assets || []);
        setLiabilities(liabRes?.data?.data?.liabilities || []);
        setCards(cardRes?.data?.data?.cards || []);
      } catch (e) {
        if (!alive) return;
        setError(
          e?.response?.data?.message ||
            e?.message ||
            "Failed to load dashboard data."
        );
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadAll();
    return () => {
      alive = false;
    };
  }, []);

  // ---------- Totals from DB ----------
  const totalIncomeAnnual = useMemo(() => {
    return (incomes || []).reduce((sum, i) => {
      return sum + incomeAnnual(i?.amount, i?.frequency);
    }, 0);
  }, [incomes]);

  const totalAssets = useMemo(() => {
    return (assets || []).reduce((sum, a) => sum + Number(a?.currentValue || 0), 0);
  }, [assets]);

  const totalLiabilities = useMemo(() => {
    return (liabilities || []).reduce((sum, l) => sum + Number(l?.amount || 0), 0);
  }, [liabilities]);

  const netWorth = useMemo(() => {
    return totalAssets - totalLiabilities;
  }, [totalAssets, totalLiabilities]);

  // cards
  const totalCardBalance = useMemo(() => {
    return (cards || []).reduce((sum, c) => sum + Number(c?.currentBalance || 0), 0);
  }, [cards]);

  const totalCardLimit = useMemo(() => {
    return (cards || []).reduce((sum, c) => sum + Number(c?.creditLimit || 0), 0);
  }, [cards]);

  const utilization = useMemo(() => {
    if (!totalCardLimit) return 0;
    return Math.round((totalCardBalance / totalCardLimit) * 100);
  }, [totalCardBalance, totalCardLimit]);

  // ---------- Charts (built from your DB data) ----------
  // 1) Income vs "Estimated Monthly Liabilities" (simple + consistent)
  const incomeExpenseData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const monthlyIncome = Math.round((totalIncomeAnnual || 0) / 12);
    const monthlyLiability = Math.round((totalLiabilities || 0) / 12);

    return months.map((m) => ({
      month: m,
      income: monthlyIncome,
      expenses: monthlyLiability, // using liabilities as a monthly estimate (no separate expenses table in your app)
    }));
  }, [totalIncomeAnnual, totalLiabilities]);

  // 2) "Spending by Category" -> use Liabilities grouped by type
  const spendingData = useMemo(() => {
    const map = new Map();
    (liabilities || []).forEach((l) => {
      const key = (l?.type || "Other").trim() || "Other";
      const prev = map.get(key) || 0;
      map.set(key, prev + Number(l?.amount || 0));
    });

    const arr = Array.from(map.entries()).map(([name, value]) => ({
      name,
      value: Math.round(value),
    }));

    // keep it clean if too many types
    arr.sort((a, b) => b.value - a.value);
    return arr.slice(0, 8);
  }, [liabilities]);

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold md:text-center text-[#040303]">
          Dashboard
        </h1>
        <p className="text-sm mt-2 md:text-center text-[#040303]/60">
          A clear overview of your overall financial health and progress.
        </p>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-white p-4">
            <p className="font-semibold text-red-600">Dashboard load error</p>
            <p className="text-sm text-red-500 mt-1">{error}</p>
          </div>
        )}
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <StatCard
          title="Total Income"
          value={loading ? "..." : money(totalIncomeAnnual)}
          subtitle="Annual income (calculated)"
          icon={DollarSign}
        />
        <StatCard
          title="Total Assets"
          value={loading ? "..." : money(totalAssets)}
          subtitle="Current value"
          icon={Building2}
        />
        <StatCard
          title="Total Liabilities"
          value={loading ? "..." : money(totalLiabilities)}
          subtitle="Outstanding debt"
          icon={FileText}
        />
        <StatCard
          title="Net Worth"
          value={loading ? "..." : money(netWorth)}
          subtitle="Assets - Liabilities"
          icon={TrendingUp}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <Card className="rounded-2xl border shadow-sm bg-[#FFFFFF] border-[#BFC0C0]/50">
          <CardHeader>
            <CardTitle className="text-base text-[#040303]">
              Income vs Liabilities (Estimated Monthly)
            </CardTitle>
          </CardHeader>

          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={incomeExpenseData}>
                <CartesianGrid stroke={COLORS.silver} strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke={COLORS.black} />
                <YAxis stroke={COLORS.black} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: `1px solid ${COLORS.silver}`,
                    background: COLORS.white,
                    color: COLORS.black,
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke={COLORS.coral}
                  fill={COLORS.coral}
                  fillOpacity={0.18}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke={COLORS.black}
                  fill={COLORS.black}
                  fillOpacity={0.08}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border shadow-sm bg-[#FFFFFF] border-[#BFC0C0]/50">
          <CardHeader>
            <CardTitle className="text-base text-[#040303]">
              Liabilities by Type
            </CardTitle>
          </CardHeader>

          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendingData}>
                <CartesianGrid stroke={COLORS.silver} strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke={COLORS.black} />
                <YAxis stroke={COLORS.black} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: `1px solid ${COLORS.silver}`,
                    background: COLORS.white,
                    color: COLORS.black,
                  }}
                />
                <Bar dataKey="value" fill={COLORS.coral} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="rounded-2xl border shadow-sm bg-[#FFFFFF] border-[#BFC0C0]/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base text-[#040303]">
            Quick Actions
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ActionTile
              title="Add Income"
              desc="Track new income"
              icon={DollarSign}
              to="/income"
            />
            <ActionTile
              title="Add Asset"
              desc="Record new asset"
              icon={Building2}
              to="/assets"
            />
            <ActionTile
              title="Add Liability"
              desc="Track new debt"
              icon={FileText}
              to="/liabilities"
            />
            <ActionTile
              title="Add Card"
              desc={`Utilization: ${utilization}%`}
              icon={CreditCard}
              to="/credit-cards"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
