"use client"

import { useFinance } from "@/lib/finance-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, TrendingDown, PieChart, ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ReportPage() {
  const { income, assets, liabilities, creditCards } = useFinance()
  const router = useRouter()

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0)
  const totalAssets = assets.reduce((sum, item) => sum + item.value, 0)
  const totalLiabilities = liabilities.reduce((sum, item) => sum + item.amount, 0)
  const totalCreditDebt = creditCards.reduce((sum, card) => sum + card.balance, 0)
  const netWorth = totalAssets - totalLiabilities - totalCreditDebt

  const monthlyIncome = income
    .filter((item) => item.frequency === "monthly")
    .reduce((sum, item) => sum + item.amount, 0)
  const yearlyIncome = income.filter((item) => item.frequency === "yearly").reduce((sum, item) => sum + item.amount, 0)
  const totalMonthlyIncome = monthlyIncome + yearlyIncome / 12

  const debtToIncomeRatio =
    totalMonthlyIncome > 0 ? ((totalLiabilities + totalCreditDebt) / (totalMonthlyIncome * 12)) * 100 : 0

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
              <p className="text-xs text-muted-foreground">Update report data</p>
            </div>
          </div>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Financial Report</h1>
        <p className="text-muted-foreground mt-2">Comprehensive overview of your financial status</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netWorth >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${netWorth.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Assets - Liabilities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">{income.length} income sources</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Debt</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ${(totalLiabilities + totalCreditDebt).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Liabilities + Credit Cards</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Debt-to-Income</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{debtToIncomeRatio.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {debtToIncomeRatio < 36 ? "Healthy ratio" : "Consider reducing debt"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Income Breakdown</CardTitle>
            <CardDescription>Your income sources and frequencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {income.length === 0 ? (
                <p className="text-sm text-muted-foreground">No income sources added yet</p>
              ) : (
                income.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{item.source}</p>
                      <p className="text-xs text-muted-foreground capitalize">{item.frequency}</p>
                    </div>
                    <p className="font-semibold text-green-600">${item.amount.toLocaleString()}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Asset Distribution</CardTitle>
            <CardDescription>Your assets by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assets.length === 0 ? (
                <p className="text-sm text-muted-foreground">No assets added yet</p>
              ) : (
                assets.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                    </div>
                    <p className="font-semibold">${item.value.toLocaleString()}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Liabilities Overview</CardTitle>
            <CardDescription>Your outstanding debts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {liabilities.length === 0 ? (
                <p className="text-sm text-muted-foreground">No liabilities added yet</p>
              ) : (
                liabilities.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                    </div>
                    <p className="font-semibold text-red-600">${item.amount.toLocaleString()}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credit Card Summary</CardTitle>
            <CardDescription>Your credit card balances and limits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {creditCards.length === 0 ? (
                <p className="text-sm text-muted-foreground">No credit cards added yet</p>
              ) : (
                creditCards.map((card) => {
                  const utilization = (card.balance / card.limit) * 100
                  return (
                    <div key={card.id} className="border-b pb-2">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium">{card.name}</p>
                        <p className="text-sm font-semibold">${card.balance.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Limit: ${card.limit.toLocaleString()}</span>
                        <span className={utilization > 30 ? "text-red-600" : "text-green-600"}>
                          {utilization.toFixed(1)}% used
                        </span>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
