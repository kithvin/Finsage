import React, { useState } from "react";

import DashboardNavbar from "../components/dashbord/DashboardNavbar";
import DashbordSidebar from "../components/dashbord/DashbordSidebar";
import DashboardFooter from "../components/dashbord/DashboardFooter";
import ChatBotWidget from "../components/dashbord/ChatBotWidget";

export default function CreditCardsPage() {
  const [collapsed, setCollapsed] = useState(true);

  // simple local list (later replace with backend)
  const [cards, setCards] = useState([]);

  // modal
  const [isOpen, setIsOpen] = useState(false);

  // simple fields
  const [name, setName] = useState("");
  const [limit, setLimit] = useState("");
  const [balance, setBalance] = useState("");
  const [apr, setApr] = useState("");
  const [dueDate, setDueDate] = useState("");

  // totals (simple)
  const totalBalance = cards.reduce((sum, c) => sum + c.balance, 0);
  const totalLimit = cards.reduce((sum, c) => sum + c.limit, 0);

  // simple utilization (avoid divide by 0)
  const utilization =
    totalLimit === 0 ? 0 : Math.round((totalBalance / totalLimit) * 100);

  function handleSubmit(e) {
    e.preventDefault();

    const newCard = {
      id: Date.now(),
      name: name,
      limit: Number(limit),
      balance: Number(balance),
      apr: Number(apr),
      dueDate: dueDate,
    };

    setCards([newCard, ...cards]);

    // reset
    setName("");
    setLimit("");
    setBalance("");
    setApr("");
    setDueDate("");
    setIsOpen(false);
  }

  function deleteCard(id) {
    const filtered = cards.filter((c) => c.id !== id);
    setCards(filtered);
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
            <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
              <div>
                <h1 className="text-3xl font-bold text-[#040303]">
                  Credit Cards
                </h1>
                <p className="text-sm text-[#BFC0C0]">
                  Track and manage your credit cards
                </p>
              </div>

              <button
                onClick={() => setIsOpen(true)}
                className="bg-[#EF8354] text-white px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition"
              >
                Add Credit Card
              </button>
            </div>

            {/* Summary cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-white border border-[#BFC0C0] rounded-lg p-6">
                <h3 className="font-semibold text-[#040303]">Total Balance</h3>
                <p className="text-xs text-[#BFC0C0] mt-1">
                  Combined balance across all cards
                </p>
                <div className="text-4xl font-bold mt-6 text-[#EF8354]">
                  ${totalBalance.toLocaleString()}
                </div>
              </div>

              <div className="bg-white border border-[#BFC0C0] rounded-lg p-6">
                <h3 className="font-semibold text-[#040303]">
                  Total Credit Limit
                </h3>
                <p className="text-xs text-[#BFC0C0] mt-1">
                  Combined credit limit across all cards
                </p>
                <div className="text-4xl font-bold mt-6 text-[#040303]">
                  ${totalLimit.toLocaleString()}
                </div>
              </div>

              <div className="bg-white border border-[#BFC0C0] rounded-lg p-6">
                <h3 className="font-semibold text-[#040303]">
                  Credit Utilization
                </h3>
                <p className="text-xs text-[#BFC0C0] mt-1">
                  Percentage of credit used
                </p>

                <div className="text-4xl font-bold mt-6 text-[#040303]">
                  {utilization}%
                </div>

                {/* simple progress bar */}
                <div className="w-full h-2 bg-[#BFC0C0]/40 rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-2 bg-[#EF8354]"
                    style={{ width: `${utilization}%` }}
                  />
                </div>

                <p className="mt-2 text-xs text-[#BFC0C0]">
                  Try to keep below 30%
                </p>
              </div>
            </div>

            {/* Cards Table */}
            <div className="bg-white border border-[#BFC0C0] rounded-lg p-6">
              <h3 className="font-semibold text-[#040303]">Your Credit Cards</h3>
              <p className="text-xs text-[#BFC0C0] mt-1">
                All your tracked credit cards
              </p>

              <div className="mt-5">
                {cards.length === 0 ? (
                  <div className="h-24 rounded-md bg-white border border-dashed border-[#BFC0C0] flex flex-col items-center justify-center text-sm text-[#BFC0C0]">
                    <p>No credit cards added yet.</p>
                    <p className="text-xs">
                      Click “Add Credit Card” to get started.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-auto">
                    <table className="w-full text-sm">
                      <thead className="text-left text-[#BFC0C0]">
                        <tr className="border-b border-[#BFC0C0]/60">
                          <th className="py-3">Card</th>
                          <th className="py-3">Balance</th>
                          <th className="py-3">Limit</th>
                          <th className="py-3">APR</th>
                          <th className="py-3">Due Date</th>
                          <th className="py-3 text-right">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {cards.map((c) => (
                          <tr
                            key={c.id}
                            className="border-b border-[#BFC0C0]/40 last:border-b-0"
                          >
                            <td className="py-3 font-medium text-[#040303]">
                              {c.name}
                            </td>
                            <td className="py-3 text-[#040303]">
                              ${Number(c.balance).toLocaleString()}
                            </td>
                            <td className="py-3 text-[#040303]">
                              ${Number(c.limit).toLocaleString()}
                            </td>
                            <td className="py-3 text-[#040303]">{c.apr}%</td>
                            <td className="py-3 text-[#040303]">{c.dueDate}</td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => deleteCard(c.id)}
                                className="text-xs px-3 py-1.5 rounded-md bg-[#EF8354] text-white hover:opacity-90 transition"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Modal */}
            {isOpen ? (
              <div className="fixed inset-0 z-50">
                <div
                  className="absolute inset-0 bg-black/60"
                  onClick={() => setIsOpen(false)}
                />

                <div className="relative min-h-screen flex items-center justify-center p-4">
                  <div className="w-full max-w-xl bg-white rounded-lg shadow-xl border border-[#BFC0C0]">
                    <div className="flex items-start justify-between px-6 pt-5">
                      <div>
                        <h3 className="text-lg font-semibold text-[#040303]">
                          Add New Credit Card
                        </h3>
                        <p className="text-sm text-[#BFC0C0] mt-1">
                          Add a card to track spending and payments
                        </p>
                      </div>

                      <button
                        onClick={() => setIsOpen(false)}
                        className="text-[#BFC0C0] hover:text-[#040303] px-2"
                      >
                        ✕
                      </button>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="px-6 pb-6 pt-4 space-y-4"
                    >
                      <div>
                        <label className="text-sm font-medium text-[#040303]">
                          Card Name
                        </label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          placeholder="e.g., Visa, Master, Amex"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-[#040303]">
                          Credit Limit ($)
                        </label>
                        <input
                          value={limit}
                          onChange={(e) => setLimit(e.target.value)}
                          type="number"
                          className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          placeholder="0"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-[#040303]">
                          Current Balance ($)
                        </label>
                        <input
                          value={balance}
                          onChange={(e) => setBalance(e.target.value)}
                          type="number"
                          className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          placeholder="0"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-[#040303]">
                          APR (%)
                        </label>
                        <input
                          value={apr}
                          onChange={(e) => setApr(e.target.value)}
                          type="number"
                          className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          placeholder="0"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-[#040303]">
                          Payment Due Date
                        </label>
                        <input
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                          type="date"
                          className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#EF8354] text-white py-2.5 rounded-md font-medium hover:opacity-90 transition"
                      >
                        Add Credit Card
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </main>
        <ChatBotWidget />
      </div>

      <DashboardFooter />
    </div>
  );
}
