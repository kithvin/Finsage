// src/pages/AssetsPage.jsx
import React, { useState } from "react";

import DashboardNavbar from "../components/dashbord/DashboardNavbar";
import DashbordSidebar from "../components/dashbord/DashbordSidebar";
import DashboardFooter from "../components/dashbord/DashboardFooter";
import ChatBotWidget from "../components/dashbord/ChatBotWidget";

export default function AssetsPage() {
  const [collapsed, setCollapsed] = useState(true);

  const [assets, setAssets] = useState([]);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [value, setValue] = useState("");

  // simplest total
  const totalAssets = assets.reduce((sum, a) => sum + (a.value || 0), 0);

  function addAsset(e) {
    e.preventDefault();

    const newAsset = {
      id: Date.now(),
      name: name,
      type: type,
      value: Number(value),
    };

    setAssets([newAsset, ...assets]);

    // reset
    setName("");
    setType("");
    setValue("");
    setOpen(false);
  }

  function deleteAsset(id) {
    const filtered = assets.filter((a) => a.id !== id);
    setAssets(filtered);
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
                <h1 className="text-3xl font-bold text-[#040303]">Assets</h1>
                <p className="text-sm text-[#BFC0C0]">
                  Track and manage your assets
                </p>
              </div>

              <button
                onClick={() => setOpen(true)}
                className="bg-[#EF8354] text-white px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition"
              >
                Add Asset
              </button>
            </div>

            {/* Total Assets */}
            <div className="bg-white border border-[#BFC0C0] rounded-lg p-6">
              <h3 className="font-semibold text-[#040303]">Total Assets</h3>
              <p className="text-xs text-[#BFC0C0] mt-1">
                Combined value of all your assets
              </p>

              <div className="text-4xl font-bold mt-6 text-[#EF8354]">
                ${totalAssets.toLocaleString()}
              </div>
            </div>

            {/* Assets table */}
            <div className="bg-white border border-[#BFC0C0] rounded-lg p-6">
              <h3 className="font-semibold text-[#040303]">Your Assets</h3>
              <p className="text-xs text-[#BFC0C0] mt-1">
                All your tracked assets
              </p>

              <div className="mt-5">
                {assets.length === 0 ? (
                  <div className="h-24 rounded-md bg-white border border-dashed border-[#BFC0C0] flex items-center justify-center text-sm text-[#BFC0C0]">
                    No assets added yet
                  </div>
                ) : (
                  <div className="overflow-auto">
                    <table className="w-full text-sm">
                      <thead className="text-left text-[#BFC0C0]">
                        <tr className="border-b border-[#BFC0C0]/60">
                          <th className="py-3">Name</th>
                          <th className="py-3">Type</th>
                          <th className="py-3">Value</th>
                          <th className="py-3 text-right">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {assets.map((a) => (
                          <tr
                            key={a.id}
                            className="border-b border-[#BFC0C0]/40 last:border-b-0"
                          >
                            <td className="py-3 font-medium text-[#040303]">
                              {a.name}
                            </td>
                            <td className="py-3 text-[#040303]">{a.type}</td>
                            <td className="py-3 text-[#040303]">
                              ${Number(a.value).toLocaleString()}
                            </td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => deleteAsset(a.id)}
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
            {open ? (
              <div className="fixed inset-0 z-50">
                <div
                  className="absolute inset-0 bg-black/60"
                  onClick={() => setOpen(false)}
                />

                <div className="relative min-h-screen flex items-center justify-center p-4">
                  <div className="w-full max-w-xl bg-white rounded-lg shadow-xl border border-[#BFC0C0]">
                    <div className="flex items-start justify-between px-6 pt-5">
                      <div>
                        <h3 className="text-lg font-semibold text-[#040303]">
                          Add New Asset
                        </h3>
                        <p className="text-sm text-[#BFC0C0] mt-1">
                          Add a new asset to track your wealth
                        </p>
                      </div>

                      <button
                        onClick={() => setOpen(false)}
                        className="text-[#BFC0C0] hover:text-[#040303] px-2"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={addAsset} className="px-6 pb-6 pt-4 space-y-4">
                      <div>
                        <label className="text-sm font-medium text-[#040303]">
                          Asset Name
                        </label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          placeholder="e.g., Savings Account"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-[#040303]">
                          Asset Type
                        </label>
                        <input
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          placeholder="e.g., Cash, Property, Investment"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-[#040303]">
                          Current Value ($)
                        </label>
                        <input
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          type="number"
                          className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          placeholder="0"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#EF8354] text-white py-2.5 rounded-md font-medium hover:opacity-90 transition"
                      >
                        Add Asset
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
