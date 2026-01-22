// // src/pages/IncomePage.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import DashboardNavbar from "../components/dashbord/DashboardNavbar";
// import DashbordSidebar from "../components/dashbord/DashbordSidebar";
// import DashboardFooter from "../components/dashbord/DashboardFooter";
// import ChatBotWidget from "../components/dashbord/ChatBotWidget";

// export default function IncomePage() {
//   const [collapsed, setCollapsed] = useState(true);

//   // simple list (later: replace with backend fetch)
//   const [incomes, setIncomes] = useState([]);

//   // simple modal state
//   const [open, setOpen] = useState(false);

//   // simple form object (easy to send to backend)
//   const [form, setForm] = useState({
//     source: "",
//     amount: "",
//     frequency: "monthly",
//   });

//   const API_BASE = import.meta.env.VITE_API_BASE_URL;

//   useEffect(() => {
//     async function fetchIncomes() {
//       try {
//         const res = await axios.get(`${API_BASE}/api/incomes`, {
//           withCredentials: true,
//         });

//         const list = res.data?.data?.incomes || [];

//         setIncomes(
//           list.map((i) => ({
//             id: i._id,
//             source: i.incomeSource,
//             amount: i.amount,
//             frequency: String(i.frequency || "Monthly").toLowerCase(),
//           }))
//         );
//       } catch (err) {
//         console.error("Fetch incomes error:", err);
//       }
//     }

//     fetchIncomes();
//   }, [API_BASE]);

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setForm((p) => ({ ...p, [name]: value }));
//   }

//   function calcAnnual(item) {
//     const amt = Number(item.amount || 0);

//     if (item.frequency === "monthly") return amt * 12;
//     if (item.frequency === "yearly") return amt;
//     return amt; // one-time
//   }

//   function calcTotalAnnual(list) {
//     let total = 0;
//     for (let i = 0; i < list.length; i++) {
//       total += calcAnnual(list[i]);
//     }
//     return total;
//   }

//   const totalAnnualIncome = calcTotalAnnual(incomes);

//   async function addIncome(e) {
//     e.preventDefault();

//     try {
//       const payload = {
//         incomeSource: form.source.trim(),
//         amount: Number(form.amount || 0),
//         frequency:
//           form.frequency.charAt(0).toUpperCase() + form.frequency.slice(1),
//       };

//       const res = await axios.post(`${API_BASE}/api/incomes`, payload, {
//         withCredentials: true,
//       });

//       const saved = res.data?.data?.income;

//       setIncomes((p) => [
//         {
//           id: saved._id,
//           source: saved.incomeSource,
//           amount: saved.amount,
//           frequency: String(saved.frequency || "Monthly").toLowerCase(),
//         },
//         ...p,
//       ]);

//       // reset form
//       setForm({ source: "", amount: "", frequency: "monthly" });
//       setOpen(false);
//     } catch (err) {
//       console.error("Create income error:", err);
//     }
//   }

//   async function deleteIncome(id) {
//     try {
//       await axios.delete(`${API_BASE}/api/incomes/${id}`, {
//         withCredentials: true,
//       });

//       setIncomes((p) => p.filter((x) => x.id !== id));
//     } catch (err) {
//       console.error("Delete income error:", err);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       <DashboardNavbar/>

//       <div className="flex flex-1 min-h-0">
//         <DashbordSidebar
//           collapsed={collapsed}
//           onToggle={() => setCollapsed((prev) => !prev)}
//         />

//         <main className="flex-1 min-w-0 bg-white overflow-auto">
//           <div className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
//             {/* Header */}
//             <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
//               <div>
//                 <h1 className="text-3xl font-bold text-[#040303]">Income</h1>
//                 <p className="text-sm text-[#BFC0C0]">
//                   Track and manage your income sources
//                 </p>
//               </div>

//               <button
//                 onClick={() => setOpen(true)}
//                 className="bg-[#EF8354] text-white px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition"
//               >
//                 Add Income
//               </button>
//             </div>

//             {/* Total Annual Income */}
//             <div className="bg-white border border-[#BFC0C0] rounded-lg p-6">
//               <h3 className="font-semibold text-[#040303]">
//                 Total Annual Income
//               </h3>
//               <p className="text-xs text-[#BFC0C0] mt-1">
//                 Estimated yearly income from all sources
//               </p>

//               <div className="text-4xl font-bold mt-6 text-[#EF8354]">
//                 ${totalAnnualIncome.toLocaleString()}
//               </div>
//             </div>

//             {/* Income Sources */}
//             <div className="bg-white border border-[#BFC0C0] rounded-lg p-6">
//               <h3 className="font-semibold text-[#040303]">Income Sources</h3>
//               <p className="text-xs text-[#BFC0C0] mt-1">
//                 All your tracked income sources
//               </p>

//               <div className="mt-5">
//                 {incomes.length === 0 ? (
//                   <div className="h-24 rounded-md bg-white border border-dashed border-[#BFC0C0] flex items-center justify-center text-sm text-[#BFC0C0]">
//                     No income sources added yet
//                   </div>
//                 ) : (
//                   <div className="overflow-auto">
//                     <table className="w-full text-sm">
//                       <thead className="text-left text-[#BFC0C0]">
//                         <tr className="border-b border-[#BFC0C0]/60">
//                           <th className="py-3">Source</th>
//                           <th className="py-3">Amount</th>
//                           <th className="py-3">Frequency</th>
//                           <th className="py-3">Annual</th>
//                           <th className="py-3 text-right">Action</th>
//                         </tr>
//                       </thead>

//                       <tbody>
//                         {incomes.map((it) => (
//                           <tr
//                             key={it.id}
//                             className="border-b border-[#BFC0C0]/40 last:border-b-0"
//                           >
//                             <td className="py-3 font-medium text-[#040303]">
//                               {it.source}
//                             </td>
//                             <td className="py-3 text-[#040303]">
//                               ${Number(it.amount).toLocaleString()}
//                             </td>
//                             <td className="py-3 text-[#040303] capitalize">
//                               {it.frequency}
//                             </td>
//                             <td className="py-3 text-[#040303]">
//                               ${calcAnnual(it).toLocaleString()}
//                             </td>
//                             <td className="py-3 text-right">
//                               <button
//                                 onClick={() => deleteIncome(it.id)}
//                                 className="mt-2 text-xs px-6 py-3 rounded-md bg-[#EF8354] text-white hover:opacity-90 transition font-semibold"
//                               >
//                                 Delete
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Modal */}
//             {open ? (
//               <div className="fixed inset-0 z-50">
//                 <div
//                   className="absolute inset-0 bg-black/60"
//                   onClick={() => setOpen(false)}
//                 />

//                 <div className="relative min-h-screen flex items-center justify-center p-4">
//                   <div className="w-full max-w-xl bg-white rounded-lg shadow-xl border border-[#BFC0C0]">
//                     <div className="flex items-start justify-between px-6 pt-5">
//                       <div>
//                         <h3 className="text-lg font-semibold text-[#040303]">
//                           Add New Income
//                         </h3>
//                         <p className="text-sm text-[#BFC0C0] mt-1">
//                           Add a new income source to track your earnings
//                         </p>
//                       </div>

//                       <button
//                         onClick={() => setOpen(false)}
//                         className="text-[#BFC0C0] hover:text-[#040303] px-2"
//                         aria-label="Close"
//                       >
//                         ✕
//                       </button>
//                     </div>

//                     <form
//                       onSubmit={addIncome}
//                       className="px-6 pb-6 pt-4 space-y-4"
//                     >
//                       <div>
//                         <label className="text-sm font-medium text-[#040303]">
//                           Income Source
//                         </label>
//                         <input
//                           name="source"
//                           value={form.source}
//                           onChange={handleChange}
//                           className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
//                           placeholder="e.g., Salary, Freelance, Investment"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="text-sm font-medium text-[#040303]">
//                           Amount ($)
//                         </label>
//                         <input
//                           name="amount"
//                           value={form.amount}
//                           onChange={handleChange}
//                           type="number"
//                           step="0.01"
//                           className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
//                           placeholder="0.00"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="text-sm font-medium text-[#040303]">
//                           Frequency
//                         </label>

//                         <div className="relative mt-2">
//                           {/* Custom arrow – slightly left */}
//                           <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#BFC0C0] pointer-events-none">
//                             ▼
//                           </span>

//                           <select
//                             name="frequency"
//                             value={form.frequency}
//                             onChange={handleChange}
//                             className="appearance-none w-full border border-[#BFC0C0] rounded-md
//                             pl-2 pr-3 py-2 outline-none
//                             focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
//                           >
//                             <option value="monthly">Monthly</option>
//                             <option value="yearly">Yearly</option>
//                             <option value="one-time">One-time</option>
//                           </select>
//                         </div>
//                       </div>

//                       <button
//                         type="submit"
//                         className="w-full bg-[#EF8354] text-white py-2.5 rounded-md font-medium hover:opacity-90 transition"
//                       >
//                         Add Income
//                       </button>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             ) : null}
//           </div>
//         </main>
//         <ChatBotWidget />
//       </div>

//       <DashboardFooter />
//     </div>
//   );
// }

// src/pages/IncomePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

import DashboardNavbar from "../components/dashbord/DashboardNavbar";
import DashbordSidebar from "../components/dashbord/DashbordSidebar";
import DashboardFooter from "../components/dashbord/DashboardFooter";
import ChatBotWidget from "../components/dashbord/ChatBotWidget";

export default function IncomePage() {
  const [collapsed, setCollapsed] = useState(true);

  const [incomes, setIncomes] = useState([]);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    source: "",
    amount: "",
    frequency: "monthly",
  });

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async function fetchIncomes() {
      try {
        const res = await axios.get(`${API_BASE}/api/incomes`, {
          withCredentials: true,
        });

        const list = res.data?.data?.incomes || [];

        setIncomes(
          list.map((i) => ({
            id: i._id,
            source: i.incomeSource,
            amount: i.amount,
            frequency: String(i.frequency || "Monthly").toLowerCase(),
          }))
        );
      } catch (err) {
        console.error("Fetch incomes error:", err);
      }
    }

    fetchIncomes();
  }, [API_BASE]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function calcAnnual(item) {
    const amt = Number(item.amount || 0);
    if (item.frequency === "monthly") return amt * 12;
    if (item.frequency === "yearly") return amt;
    return amt; // one-time
  }

  function calcTotalAnnual(list) {
    let total = 0;
    for (let i = 0; i < list.length; i++) total += calcAnnual(list[i]);
    return total;
  }

  const totalAnnualIncome = calcTotalAnnual(incomes);

  async function addIncome(e) {
    e.preventDefault();

    try {
      const payload = {
        incomeSource: form.source.trim(),
        amount: Number(form.amount || 0),
        frequency:
          form.frequency.charAt(0).toUpperCase() + form.frequency.slice(1),
      };

      const res = await axios.post(`${API_BASE}/api/incomes`, payload, {
        withCredentials: true,
      });

      const saved = res.data?.data?.income;

      setIncomes((p) => [
        {
          id: saved._id,
          source: saved.incomeSource,
          amount: saved.amount,
          frequency: String(saved.frequency || "Monthly").toLowerCase(),
        },
        ...p,
      ]);

      setForm({ source: "", amount: "", frequency: "monthly" });
      setOpen(false);
    } catch (err) {
      console.error("Create income error:", err);
    }
  }

  async function deleteIncome(id) {
    try {
      await axios.delete(`${API_BASE}/api/incomes/${id}`, {
        withCredentials: true,
      });
      setIncomes((p) => p.filter((x) => x.id !== id));
    } catch (err) {
      console.error("Delete income error:", err);
    }
  }

  return (
    <div className="min-h-screen bg-[#ebe4e1] flex flex-col">
      <DashboardNavbar />

      <div className="flex flex-1 min-h-0">
        <DashbordSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((prev) => !prev)}
        />

        <main className="flex-1 min-w-0 bg-gray-50 overflow-auto">
          <div className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
            {/* Header */}
            <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
              <div>
                <h1 className="text-3xl font-bold text-[#040303]">Income</h1>
                <p className="text-sm text-[#040303]/60">
                  Track and manage your income sources
                </p>
              </div>

              <button
                onClick={() => setOpen(true)}
                className="bg-[#EF8354] text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition"
              >
                Add Income
              </button>
            </div>

            {/* Total Annual Income */}
            <div className="bg-white border border-[#BFC0C0] rounded-2xl p-6">
              <h3 className="font-bold text-[#040303]">Total Annual Income</h3>
              <p className="text-xs text-[#040303]/60 mt-1">
                Estimated yearly income from all sources
              </p>

              <div className="text-4xl font-extrabold mt-6 text-[#EF8354]">
                ${totalAnnualIncome.toLocaleString()}
              </div>
            </div>

            {/* Income Sources */}
            <div className="bg-white border border-[#BFC0C0] rounded-2xl p-6">
              <h3 className="font-bold text-[#040303]">Income Sources</h3>
              <p className="text-xs text-[#040303]/60 mt-1">
                All your tracked income sources
              </p>

              <div className="mt-5">
                {incomes.length === 0 ? (
                  <div className="h-24 rounded-xl bg-white border border-dashed border-[#BFC0C0] flex items-center justify-center text-sm text-[#040303]/60">
                    No income sources added yet
                  </div>
                ) : (
                  <div className="overflow-auto">
                    <table className="w-full text-sm">
                      <thead className="text-left text-[#040303]/60">
                        <tr className="border-b border-[#BFC0C0]/60">
                          <th className="py-3">Source</th>
                          <th className="py-3">Amount</th>
                          <th className="py-3">Frequency</th>
                          <th className="py-3">Annual</th>
                          <th className="py-3 text-right">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {incomes.map((it) => (
                          <tr
                            key={it.id}
                            className="border-b border-[#BFC0C0]/40 last:border-b-0"
                          >
                            <td className="py-3 font-semibold text-[#040303]">
                              {it.source}
                            </td>
                            <td className="py-3 text-[#040303]">
                              ${Number(it.amount).toLocaleString()}
                            </td>
                            <td className="py-3 text-[#040303] capitalize">
                              {it.frequency}
                            </td>
                            <td className="py-3 text-[#040303]">
                              ${calcAnnual(it).toLocaleString()}
                            </td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => deleteIncome(it.id)}
                                className="text-xs px-4 py-2 rounded-xl bg-[#EF8354] text-white hover:opacity-90 transition font-semibold"
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
                  <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-[#BFC0C0]">
                    <div className="flex items-start justify-between px-6 pt-5">
                      <div>
                        <h3 className="text-lg font-bold text-[#040303]">
                          Add New Income
                        </h3>
                        <p className="text-sm text-[#040303]/60 mt-1">
                          Add a new income source to track your earnings
                        </p>
                      </div>

                      <button
                        onClick={() => setOpen(false)}
                        className="text-[#040303]/50 hover:text-[#040303] px-2"
                        aria-label="Close"
                      >
                        ✕
                      </button>
                    </div>

                    <form
                      onSubmit={addIncome}
                      className="px-6 pb-6 pt-4 space-y-4"
                    >
                      <div>
                        <label className="text-sm font-semibold text-[#040303]">
                          Income Source
                        </label>
                        <input
                          name="source"
                          value={form.source}
                          onChange={handleChange}
                          className="w-full mt-2 border border-[#BFC0C0] rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          placeholder="e.g., Salary, Freelance, Investment"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-[#040303]">
                          Amount ($)
                        </label>
                        <input
                          name="amount"
                          value={form.amount}
                          onChange={handleChange}
                          type="number"
                          step="0.01"
                          className="w-full mt-2 border border-[#BFC0C0] rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          placeholder="0.00"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-[#040303]">
                          Frequency
                        </label>

                        <div className="relative mt-2">
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BFC0C0] pointer-events-none">
                            ▼
                          </span>

                          <select
                            name="frequency"
                            value={form.frequency}
                            onChange={handleChange}
                            className="appearance-none w-full border border-[#BFC0C0] rounded-xl pl-3 pr-10 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          >
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                            <option value="one-time">One-time</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#EF8354] text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition"
                      >
                        Add Income
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

      {/* Footer full background */}
      <div className="w-full bg-[#ebe4e1]">
        <DashboardFooter />
      </div>
    </div>
  );
}
