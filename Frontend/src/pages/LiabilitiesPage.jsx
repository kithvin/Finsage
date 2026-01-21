// src/pages/LiabilitiesPage.jsx
import React, { useEffect, useState } from "react";

import DashboardNavbar from "../components/dashbord/DashboardNavbar";
import DashbordSidebar from "../components/dashbord/DashbordSidebar";
import DashboardFooter from "../components/dashbord/DashboardFooter";
import ChatBotWidget from "../components/dashbord/ChatBotWidget";

export default function LiabilitiesPage() {
  const [collapsed, setCollapsed] = useState(true);

  // backend list
  const [liabilities, setLiabilities] = useState([]);

  // modal
  const [isOpen, setIsOpen] = useState(false);

  // fields
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async function fetchLiabilities() {
      try {
        const res = await fetch(`${API_BASE}/api/liabilities`);
        const data = await res.json();

        const list = data?.data?.liabilities || [];

        setLiabilities(
          list.map((x) => ({
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
      } catch (err) {
        console.error("Fetch liabilities error:", err);
      }
    }

    fetchLiabilities();
  }, [API_BASE]);

  // total
  const totalLiabilities = liabilities.reduce(
    (sum, item) => sum + (Number(item.amount) || 0),
    0
  );

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const payload = {
        liabilityName: name.trim(),
        type: type.trim(),
        amount: Number(amount || 0),
        interestRate: Number(interestRate || 0),
        paymentDueDate: dueDate, // yyyy-mm-dd
      };

      const res = await fetch(`${API_BASE}/api/liabilities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const saved = data?.data?.liability;

      setLiabilities((prev) => [
        {
          id: saved?._id ?? Date.now(),
          name: saved?.liabilityName ?? payload.liabilityName,
          type: saved?.type ?? payload.type,
          amount: Number(saved?.amount ?? payload.amount ?? 0),
          interestRate: Number(saved?.interestRate ?? payload.interestRate ?? 0),
          dueDate: saved?.paymentDueDate
            ? new Date(saved.paymentDueDate).toISOString().slice(0, 10)
            : payload.paymentDueDate,
        },
        ...prev,
      ]);

      // reset
      setName("");
      setType("");
      setAmount("");
      setInterestRate("");
      setDueDate("");
      setIsOpen(false);
    } catch (err) {
      console.error("Create liability error:", err);
    }
  }

  async function deleteLiability(id) {
    try {
      await fetch(`${API_BASE}/api/liabilities/${id}`, {
        method: "DELETE",
      });

      setLiabilities((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Delete liability error:", err);
    }
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
                  Liabilities
                </h1>
                <p className="text-sm text-[#BFC0C0]">
                  Track and manage your debts and liabilities
                </p>
              </div>

              <button
                onClick={() => setIsOpen(true)}
                className="bg-[#EF8354] text-white px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition"
              >
                Add Liability
              </button>
            </div>

            {/* Total Liabilities card */}
            <div className="bg-white border border-[#BFC0C0] rounded-lg p-6">
              <h3 className="font-semibold text-[#040303]">
                Total Liabilities
              </h3>
              <p className="text-xs text-[#BFC0C0] mt-1">
                Combined amount of all your debts
              </p>

              <div className="text-4xl font-bold mt-6 text-[#EF8354]">
                ${totalLiabilities.toLocaleString()}
              </div>
            </div>

            {/* Liabilities table card */}
            <div className="bg-white border border-[#BFC0C0] rounded-lg p-6">
              <h3 className="font-semibold text-[#040303]">Your Liabilities</h3>
              <p className="text-xs text-[#BFC0C0] mt-1">
                All your tracked debts and liabilities
              </p>

              <div className="mt-5">
                {liabilities.length === 0 ? (
                  <div className="h-24 rounded-md bg-white border border-dashed border-[#BFC0C0] flex flex-col items-center justify-center text-sm text-[#BFC0C0]">
                    <p>No liabilities added yet.</p>
                    <p className="text-xs">
                      Click “Add Liability” to get started.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-auto">
                    <table className="w-full text-sm">
                      <thead className="text-left text-[#BFC0C0]">
                        <tr className="border-b border-[#BFC0C0]/60">
                          <th className="py-3">Name</th>
                          <th className="py-3">Type</th>
                          <th className="py-3">Amount</th>
                          <th className="py-3">Interest</th>
                          <th className="py-3">Due Date</th>
                          <th className="py-3 text-right">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {liabilities.map((l) => (
                          <tr
                            key={l.id}
                            className="border-b border-[#BFC0C0]/40 last:border-b-0"
                          >
                            <td className="py-3 font-medium text-[#040303]">
                              {l.name}
                            </td>
                            <td className="py-3 text-[#040303]">{l.type}</td>
                            <td className="py-3 text-[#040303]">
                              ${Number(l.amount).toLocaleString()}
                            </td>
                            <td className="py-3 text-[#040303]">
                              {Number(l.interestRate)}%
                            </td>
                            <td className="py-3 text-[#040303]">{l.dueDate}</td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => deleteLiability(l.id)}
                                className="mt-2 text-xs px-6 py-3 rounded-md bg-[#EF8354] text-white hover:opacity-90 transition font-semibold"
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
                          Add New Liability
                        </h3>
                        <p className="text-sm text-[#BFC0C0] mt-1">
                          Add a new debt or liability to track
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
                          Liability Name
                        </label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          placeholder="e.g., Student Loan, Mortgage"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-[#040303]">
                          Type
                        </label>
                        <input
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          placeholder="e.g., Loan, Mortgage, Personal Debt"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-[#040303]">
                          Amount ($)
                        </label>
                        <input
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          type="number"
                          step="0.01"
                          className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          placeholder="0.00"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-[#040303]">
                          Interest Rate (%)
                        </label>
                        <input
                          value={interestRate}
                          onChange={(e) => setInterestRate(e.target.value)}
                          type="number"
                          step="0.01"
                          className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          placeholder="0.00"
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
                        Add Liability
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
