import React, { useState } from "react";

import DashboardNavbar from "../components/dashbord/DashboardNavbar";
import DashbordSidebar from "../components/dashbord/DashbordSidebar";
import DashboardFooter from "../components/dashbord/DashboardFooter";
import ChatBotWidget from "../components/dashbord/ChatBotWidget";

export default function RecommendationsPage() {
  const [collapsed, setCollapsed] = useState(true);

  // simple local list (later replace with backend)
  const [recommendations, setRecommendations] = useState([
    // keep empty if you want:
    // { id: 1, title: "Build an emergency fund", description: "Save 3–6 months of expenses.", priority: "high", status: "pending" },
  ]);

  // simple counts (no advanced logic)
  const pendingCount = recommendations.filter((r) => r.status === "pending").length;
  const progressCount = recommendations.filter((r) => r.status === "in-progress").length;
  const doneCount = recommendations.filter((r) => r.status === "completed").length;

  function updateStatus(id, newStatus) {
    const updated = recommendations.map((r) => {
      if (r.id === id) {
        return { ...r, status: newStatus };
      }
      return r;
    });
    setRecommendations(updated);
  }

  // super simple badge styles (no helper functions)
  function priorityClass(p) {
    if (p === "high") return "bg-[#EF8354] text-white";
    if (p === "medium") return "bg-[#BFC0C0] text-[#040303]";
    return "bg-white border border-[#BFC0C0] text-[#040303]";
  }

  function statusClass(s) {
    if (s === "completed") return "bg-[#040303] text-white";
    if (s === "in-progress") return "bg-[#EF8354] text-white";
    return "bg-white border border-[#BFC0C0] text-[#040303]";
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DashboardNavbar userName="kithvin" />

      <div className="flex flex-1 min-h-0">
        <DashbordSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((prev) => !prev)}
        />

        <main className="flex-1 min-w-0 bg-white overflow-auto">
          <div className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-[#040303]">Recommendations</h1>
              <p className="text-sm text-[#BFC0C0]">
                AI-powered insights to improve your financial health
              </p>
            </div>

            {/* Summary cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-white border border-[#BFC0C0] rounded-lg p-6">
                <h3 className="font-semibold text-[#040303]">Pending</h3>
                <p className="text-xs text-[#BFC0C0] mt-1">Recommendations to review</p>
                <div className="text-4xl font-bold mt-6 text-[#EF8354]">{pendingCount}</div>
              </div>

              <div className="bg-white border border-[#BFC0C0] rounded-lg p-6">
                <h3 className="font-semibold text-[#040303]">In Progress</h3>
                <p className="text-xs text-[#BFC0C0] mt-1">Currently working on</p>
                <div className="text-4xl font-bold mt-6 text-[#040303]">{progressCount}</div>
              </div>

              <div className="bg-white border border-[#BFC0C0] rounded-lg p-6">
                <h3 className="font-semibold text-[#040303]">Completed</h3>
                <p className="text-xs text-[#BFC0C0] mt-1">Successfully implemented</p>
                <div className="text-4xl font-bold mt-6 text-[#040303]">{doneCount}</div>
              </div>
            </div>

            {/* List */}
            <div className="space-y-4">
              {recommendations.length === 0 ? (
                <div className="bg-white border border-[#BFC0C0] rounded-lg p-6">
                  <div className="py-8 text-center text-[#BFC0C0]">
                    <p>No recommendations available yet.</p>
                    <p className="text-sm">
                      Add your financial data to receive personalized recommendations.
                    </p>
                  </div>
                </div>
              ) : (
                recommendations.map((r) => (
                  <div
                    key={r.id}
                    className="bg-white border border-[#BFC0C0] rounded-lg p-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl font-semibold text-[#040303]">
                            {r.title}
                          </h2>

                          <span
                            className={`text-xs px-2 py-1 rounded-md ${priorityClass(
                              r.priority
                            )}`}
                          >
                            {r.priority} priority
                          </span>
                        </div>

                        <p className="text-sm text-[#BFC0C0] mt-2">{r.description}</p>
                      </div>

                      <div className="flex flex-col items-start sm:items-end gap-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-md ${statusClass(
                            r.status
                          )}`}
                        >
                          {r.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <p className="text-sm text-[#BFC0C0]">Update Status</p>

                      <select
                        value={r.status}
                        onChange={(e) => updateStatus(r.id, e.target.value)}
                        className="border border-[#BFC0C0] rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                      >
                        <option value="pending">pending</option>
                        <option value="in-progress">in-progress</option>
                        <option value="completed">completed</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Info card */}
            <div className="bg-white border border-[#BFC0C0] rounded-lg p-6">
              <h3 className="font-semibold text-[#040303]">How Recommendations Work</h3>
              <p className="text-sm text-[#BFC0C0] mt-2">
                FinSage analyzes your financial data to provide simple recommendations to improve
                your financial health.
              </p>

              <ul className="mt-3 list-disc list-inside text-sm text-[#040303] space-y-1">
                <li>Update status to track progress</li>
                <li>Focus on high priority items first</li>
                <li>New recommendations appear when new data is added</li>
              </ul>
            </div>
          </div>
        </main>
        <ChatBotWidget />
      </div>

      <DashboardFooter />
    </div>
  );
}
