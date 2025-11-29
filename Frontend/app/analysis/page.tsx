"use client"

import { useFinance } from "@/lib/finance-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { TrendingUp, AlertCircle, CheckCircle, Info, ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AnalysisPage() {
  const { income, assets, liabilities, creditCards } = useFinance()
  const router = useRouter()

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0)
  const totalAssets = assets.reduce((sum, item) => sum + item.value, 0)
  const totalLiabilities = liabilities.reduce((sum, item) => sum + item.amount, 0)
  const totalCreditDebt = creditCards.reduce((sum, card) => sum + card.balance, 0)
  const netWorth = totalAssets - totalLiabilities - totalCreditDebt

  // Asset distribution data
  const assetsByType = assets.reduce(
    (acc, asset) => {
      acc[asset.type] = (acc[asset.type] || 0) + asset.value
      return acc
    },
    {} as Record<string, number>,
  )

  const assetChartData = Object.entries(assetsByType).map(([type, value]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value,
  }))

  // Financial comparison data
  const comparisonData = [
    { name: "Income", value: totalIncome },
    { name: "Assets", value: totalAssets },
    { name: "Liabilities", value: totalLiabilities },
    { name: "Credit Debt", value: totalCreditDebt },
  ]

  const COLORS = ["#EF8354", "#040303", "#BFC0C0", "#6B7280"]

  // Financial health indicators
  const monthlyIncome = income
    .filter((item) => item.frequency === "monthly")
    .reduce((sum, item) => sum + item.amount, 0)
  const yearlyIncome = income.filter((item) => item.frequency === "yearly").reduce((sum, item) => sum + item.amount, 0)
  const totalMonthlyIncome = monthlyIncome + yearlyIncome / 12

  const debtToIncomeRatio =
    totalMonthlyIncome > 0 ? ((totalLiabilities + totalCreditDebt) / (totalMonthlyIncome * 12)) * 100 : 0
  const avgCreditUtilization =
    creditCards.length > 0
      ? creditCards.reduce((sum, card) => sum + (card.balance / card.limit) * 100, 0) / creditCards.length
      : 0

  const healthIndicators = [
    {
      title: "Net Worth",
      value: netWorth >= 0 ? "Positive" : "Negative",
      status: netWorth >= 0 ? "good" : "warning",
      icon: netWorth >= 0 ? CheckCircle : AlertCircle,
      description:
        netWorth >= 0 ? "Your assets exceed your liabilities" : "Consider reducing debt or increasing assets",
    },
    {
      title: "Debt-to-Income Ratio",
      value: `${debtToIncomeRatio.toFixed(1)}%`,
      status: debtToIncomeRatio < 36 ? "good" : debtToIncomeRatio < 50 ? "warning" : "alert",
      icon: debtToIncomeRatio < 36 ? CheckCircle : AlertCircle,
      description: debtToIncomeRatio < 36 ? "Healthy debt level" : "Consider debt reduction strategies",
    },
    {
      title: "Credit Utilization",
      value: `${avgCreditUtilization.toFixed(1)}%`,
      status: avgCreditUtilization < 30 ? "good" : avgCreditUtilization < 50 ? "warning" : "alert",
      icon: avgCreditUtilization < 30 ? CheckCircle : AlertCircle,
      description: avgCreditUtilization < 30 ? "Excellent credit management" : "Try to keep utilization below 30%",
    },
    {
      title: "Income Diversification",
      value: `${income.length} sources`,
      status: income.length >= 2 ? "good" : "info",
      icon: income.length >= 2 ? CheckCircle : Info,
      description: income.length >= 2 ? "Good income diversification" : "Consider additional income streams",
    },
  ]

  const handleRefresh = () => {
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <Link href="/dashboard" className="flex-1 min-w-[200px]">
          <Button
            variant="outline"
            className="h-auto justify-start w-full px-5 rounded-lg text-center font-medium bg-transparent"
          >
            <div className="flex items-center gap-3 p-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <ArrowLeft className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-medium">Back to Dashboard</p>
                <p className="text-xs text-muted-foreground">Return to main view</p>
              </div>
            </div>
          </Button>
        </Link>

        <Button
          variant="outline"
          onClick={handleRefresh}
          className="h-auto justify-start flex-1 min-w-[200px] px-5 rounded-lg text-center font-medium bg-transparent"
        >
          <div className="flex items-center gap-3 p-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="font-medium">Refresh / Reload Data</p>
              <p className="text-xs text-muted-foreground">Update analysis data</p>
            </div>
          </div>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Financial Analysis</h1>
        <p className="text-muted-foreground mt-2">Deep insights into your financial health and trends</p>
      </div>

      {/* Health Indicators */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {healthIndicators.map((indicator, index) => {
          const Icon = indicator.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{indicator.title}</CardTitle>
                <Icon
                  className={`h-4 w-4 ${
                    indicator.status === "good"
                      ? "text-green-600"
                      : indicator.status === "warning"
                        ? "text-yellow-600"
                        : indicator.status === "alert"
                          ? "text-red-600"
                          : "text-blue-600"
                  }`}
                />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{indicator.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{indicator.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>Comparison of your financial components</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Bar dataKey="value" fill="#EF8354" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Asset Distribution</CardTitle>
            <CardDescription>Breakdown of your assets by type</CardDescription>
          </CardHeader>
          <CardContent>
            {assetChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={assetChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {assetChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                No asset data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Key Insights & Recommendations
          </CardTitle>
          <CardDescription>Personalized financial insights based on your data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {netWorth < 0 && (
              <div className="flex gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-900">Negative Net Worth</p>
                  <p className="text-sm text-red-700 mt-1">
                    Your liabilities exceed your assets. Focus on debt reduction and building emergency savings.
                  </p>
                </div>
              </div>
            )}

            {debtToIncomeRatio > 36 && (
              <div className="flex gap-3 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-900">High Debt-to-Income Ratio</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Your debt ratio is above the recommended 36%. Consider debt consolidation or increasing income.
                  </p>
                </div>
              </div>
            )}

            {avgCreditUtilization > 30 && (
              <div className="flex gap-3 p-4 rounded-lg bg-orange-50 border border-orange-200">
                <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-orange-900">High Credit Utilization</p>
                  <p className="text-sm text-orange-700 mt-1">
                    Your average credit utilization is {avgCreditUtilization.toFixed(1)}%. Aim to keep it below 30% to
                    improve your credit score.
                  </p>
                </div>
              </div>
            )}

            {income.length < 2 && (
              <div className="flex gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Limited Income Sources</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Consider diversifying your income with side projects, investments, or passive income streams.
                  </p>
                </div>
              </div>
            )}

            {netWorth >= 0 && debtToIncomeRatio < 36 && avgCreditUtilization < 30 && (
              <div className="flex gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900">Excellent Financial Health</p>
                  <p className="text-sm text-green-700 mt-1">
                    You're managing your finances well! Consider increasing investments and building long-term wealth.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
