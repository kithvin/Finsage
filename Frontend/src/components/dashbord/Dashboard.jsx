import React from "react";
import { Link } from "react-router-dom";
import {
  DollarSign,
  Building2,
  FileText,
  TrendingUp,
  PlusCircle,
  CreditCard,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

const incomeExpenseData = [
  { month: "Jan", income: 5000, expenses: 3200 },
  { month: "Feb", income: 5200, expenses: 3400 },
  { month: "Mar", income: 5100, expenses: 3300 },
  { month: "Apr", income: 5400, expenses: 3600 },
  { month: "May", income: 5600, expenses: 3800 },
  { month: "Jun", income: 5800, expenses: 4000 },
];

const spendingData = [
  { name: "Housing", value: 1500 },
  { name: "Food", value: 600 },
  { name: "Transport", value: 400 },
  { name: "Entertainment", value: 300 },
  { name: "Utilities", value: 200 },
  { name: "Other", value: 500 },
];

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

export default function Dashboard() {
  // later: replace with backend data
  const totals = {
    income: 0,
    assets: 0,
    liabilities: 0,
    netWorth: 0,
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold md:text-center text-[#040303]">Dashboard</h1>
        <p className="text-sm mt-2 md:text-center text-[#040303]/60">
        A clear overview of your overall financial health and progress.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <StatCard
          title="Total Income"
          value={`$${totals.income}`}
          subtitle="Annual income"
          icon={DollarSign}
        />
        <StatCard
          title="Total Assets"
          value={`$${totals.assets}`}
          subtitle="Current value"
          icon={Building2}
        />
        <StatCard
          title="Total Liabilities"
          value={`$${totals.liabilities}`}
          subtitle="Outstanding debt"
          icon={FileText}
        />
        <StatCard
          title="Net Worth"
          value={`$${totals.netWorth}`}
          subtitle="Assets - Liabilities"
          icon={TrendingUp}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <Card className="rounded-2xl border shadow-sm bg-[#FFFFFF] border-[#BFC0C0]/50">
          <CardHeader>
            <CardTitle className="text-base text-[#040303]">
              Income vs Expenses
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
              Spending by Category
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
          <CardTitle className="text-base text-[#040303]">Quick Actions</CardTitle>

          {/* <Button
            size="sm"
            className="rounded-xl bg-[#EF8354] text-white hover:opacity-90"
          >
            View All
          </Button> */}
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
              desc="Add credit card"
              icon={CreditCard}
              to="/credit-cards"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
