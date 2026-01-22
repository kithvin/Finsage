import React, { useEffect, useState } from "react";
import axios from "axios";

import DashboardNavbar from "../components/dashbord/DashboardNavbar";
import DashbordSidebar from "../components/dashbord/DashbordSidebar";
import DashboardFooter from "../components/dashbord/DashboardFooter";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function LiabilitiesPage() {
  const [collapsed, setCollapsed] = useState(true);

  // form state
  const [liabilityName, setLiabilityName] = useState("");
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  // data state
  const [liabilities, setLiabilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch liabilities on page load
  useEffect(() => {
    const fetchLiabilities = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await axios.get(`${API_BASE}/api/liabilities`, {
          withCredentials: true,
        });

        // support both {data:[...]} or {data:{liabilities:[...]}}
        const list =
          res?.data?.data?.liabilities ||
          res?.data?.data ||
          res?.data?.liabilities ||
          [];

        setLiabilities(Array.isArray(list) ? list : []);
      } catch (e) {
        // keep UI working even if backend not ready
        const msg =
          e?.response?.data?.message ||
          e?.message ||
          "Failed to load liabilities.";
        setError(msg);
        setLiabilities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLiabilities();
  }, []);

  const resetForm = () => {
    setLiabilityName("");
    setAmount("");
    setInterestRate("");
    setDueDate("");
    setDescription("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      const payload = {
        name: liabilityName,
        amount: Number(amount),
        interestRate: Number(interestRate),
        dueDate,
        description,
      };

      const res = await axios.post(`${API_BASE}/api/liabilities`, payload, {
        withCredentials: true,
      });

      const created =
        res?.data?.data?.liability ||
        res?.data?.data ||
        res?.data?.liability ||
        payload;

      // add to UI list instantly
      setLiabilities((prev) => [
        { _id: created?._id || Date.now().toString(), ...created },
        ...prev,
      ]);

      resetForm();
    } catch (e2) {
      const msg =
        e2?.response?.data?.message ||
        e2?.message ||
        "Failed to save liability.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DashboardNavbar userName="kithvin" />

      <div className="flex flex-1 min-h-0">
        <DashbordSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((prev) => !prev)}
        />

        <main className="flex-1 min-w-0 bg-white overflow-auto">
          <div className="max-w-[1200px] mx-auto px-6 py-6 space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-2xl font-semibold text-[#040303] tracking-tight">
                Liabilities
              </h1>
              <p className="mt-1 text-sm font-normal text-[#BFC0C0]">
                Track and manage your debts and liabilities
              </p>
            </div>

            {/* Error */}
            {!!error && (
              <div className="bg-white border border-red-200 rounded-lg p-4">
                <p className="text-red-600 font-semibold">Error</p>
                <p className="text-sm text-red-500 mt-1">{error}</p>
              </div>
            )}

            {/* Form Card */}
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-[#BFC0C0] rounded-lg p-6 space-y-5"
            >
              {/* Liability Name */}
              <div>
                <label className="block text-sm font-medium text-[#040303]">
                  Liability Name <span className="text-[#EF8354]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={liabilityName}
                  onChange={(e) => setLiabilityName(e.target.value)}
                  placeholder="e.g. Personal Loan"
                  className="mt-1 w-full border border-[#BFC0C0] rounded-md px-3 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-[#EF8354]/30
                             focus:border-[#EF8354]"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-[#040303]">
                  Amount <span className="text-[#EF8354]">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 250000"
                  className="mt-1 w-full border border-[#BFC0C0] rounded-md px-3 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-[#EF8354]/30
                             focus:border-[#EF8354]"
                />
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-[#040303]">
                  Interest Rate (%) <span className="text-[#EF8354]">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="e.g. 12"
                  className="mt-1 w-full border border-[#BFC0C0] rounded-md px-3 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-[#EF8354]/30
                             focus:border-[#EF8354]"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-[#040303]">
                  Due Date <span className="text-[#EF8354]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="mt-1 w-full border border-[#BFC0C0] rounded-md px-3 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-[#EF8354]/30
                             focus:border-[#EF8354]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[#040303]">
                  Description <span className="text-[#EF8354]">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description about this liability"
                  className="mt-1 w-full border border-[#BFC0C0] rounded-md px-3 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-[#EF8354]/30
                             focus:border-[#EF8354]"
                />
              </div>

              {/* Required note */}
              <p className="text-xs text-[#BFC0C0]">
                <span className="text-[#EF8354]">*</span> Required fields
              </p>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#BFC0C0]/60">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-sm rounded-md border border-[#BFC0C0]
                             text-[#040303] hover:bg-[#ecebe8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 text-sm rounded-md bg-[#EF8354]
                             text-white font-semibold hover:opacity-90 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Liability"}
                </button>
              </div>
            </form>

            {/* List Card */}
            <div className="bg-white border border-[#BFC0C0] rounded-lg p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#040303]">
                  Saved Liabilities
                </h2>
                <span className="text-sm text-[#BFC0C0]">
                  {liabilities.length} items
                </span>
              </div>

              {loading ? (
                <p className="mt-4 text-sm text-[#BFC0C0]">
                  Loading liabilities...
                </p>
              ) : liabilities.length === 0 ? (
                <p className="mt-4 text-sm text-[#BFC0C0]">
                  No liabilities added yet.
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  {liabilities.map((l) => (
                    <div
                      key={l._id || l.id}
                      className="border border-[#BFC0C0]/70 rounded-lg p-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <p className="font-semibold text-[#040303]">
                            {l.name || l.liabilityName || "Unnamed Liability"}
                          </p>
                          <p className="text-sm text-[#BFC0C0] mt-1">
                            {l.description || "-"}
                          </p>
                        </div>

                        <div className="text-sm text-[#040303]/80">
                          <p>
                            Amount:{" "}
                            <span className="font-semibold text-[#040303]">
                              {l.amount ?? "-"}
                            </span>
                          </p>
                          <p>
                            Interest:{" "}
                            <span className="font-semibold text-[#040303]">
                              {l.interestRate ?? "-"}%
                            </span>
                          </p>
                          <p>
                            Due:{" "}
                            <span className="font-semibold text-[#040303]">
                              {l.dueDate
                                ? String(l.dueDate).slice(0, 10)
                                : "-"}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <DashboardFooter />
    </div>
  );
}
