// // src/pages/CreditCardsPage.jsx
// import React, { useEffect, useState } from "react";

// import DashboardNavbar from "../components/dashbord/DashboardNavbar";
// import DashbordSidebar from "../components/dashbord/DashbordSidebar";
// import DashboardFooter from "../components/dashbord/DashboardFooter";
// import ChatBotWidget from "../components/dashbord/ChatBotWidget";

// export default function CreditCardsPage() {
//   const [collapsed, setCollapsed] = useState(true);

//   // simple local list (now connected to backend)
//   const [cards, setCards] = useState([]);

//   // modal
//   const [isOpen, setIsOpen] = useState(false);

//   // simple fields
//   const [name, setName] = useState("");
//   const [limit, setLimit] = useState("");
//   const [balance, setBalance] = useState("");
//   const [apr, setApr] = useState("");
//   const [dueDate, setDueDate] = useState("");

//   const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
//   const CARDS_URL = `${API_BASE}/api/cards`;

//   function formatDateForUI(dateVal) {
//     if (!dateVal) return "";
//     // backend may return ISO string. We want yyyy-mm-dd for UI
//     const d = new Date(dateVal);
//     if (Number.isNaN(d.getTime())) return String(dateVal);
//     return d.toISOString().slice(0, 10);
//   }

//   function mapBackendToUI(doc) {
//     return {
//       id: doc?._id || doc?.id || Date.now(),
//       name: doc?.cardName || "",
//       limit: Number(doc?.creditLimit || 0),
//       balance: Number(doc?.currentBalance || 0),
//       apr: Number(doc?.apr || 0),
//       dueDate: formatDateForUI(doc?.paymentDueDate),
//     };
//   }

//   async function loadCards() {
//     try {
//       const res = await fetch(CARDS_URL, {
//         method: "GET",
//         credentials: "include",
//       });

//       const json = await res.json();

//       // supports your backend response style: { data: { cards: [...] } }
//       const list = json?.data?.cards || [];

//       const uiList = list.map(mapBackendToUI);
//       setCards(uiList);
//     } catch (err) {
//       console.error("Failed to load cards:", err);
//     }
//   }

//   useEffect(() => {
//     loadCards();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // totals (simple)
//   const totalBalance = cards.reduce((sum, c) => sum + (c.balance || 0), 0);
//   const totalLimit = cards.reduce((sum, c) => sum + (c.limit || 0), 0);

//   // simple utilization (avoid divide by 0)
//   const utilization =
//     totalLimit === 0 ? 0 : Math.round((totalBalance / totalLimit) * 100);

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       // backend expects:
//       // cardName, creditLimit, currentBalance, apr, paymentDueDate
//       const payload = {
//         cardName: name,
//         creditLimit: Number(limit),
//         currentBalance: Number(balance),
//         apr: Number(apr),
//         paymentDueDate: dueDate, // yyyy-mm-dd is fine; backend stores as Date
//       };

//       const res = await fetch(CARDS_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(payload),
//       });

//       const json = await res.json();

//       if (!res.ok) {
//         console.error("Create card failed:", json);
//         return;
//       }

//       const created = json?.data?.card;
//       if (created) {
//         const uiCard = mapBackendToUI(created);
//         setCards((prev) => [uiCard, ...prev]);
//       } else {
//         // fallback: reload if response shape is different
//         await loadCards();
//       }

//       // reset
//       setName("");
//       setLimit("");
//       setBalance("");
//       setApr("");
//       setDueDate("");
//       setIsOpen(false);
//     } catch (err) {
//       console.error("Failed to create card:", err);
//     }
//   }

//   async function deleteCard(id) {
//     try {
//       const res = await fetch(`${CARDS_URL}/${id}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       if (!res.ok) {
//         const json = await res.json().catch(() => null);
//         console.error("Delete card failed:", json);
//         return;
//       }

//       setCards((prev) => prev.filter((c) => c.id !== id));
//     } catch (err) {
//       console.error("Failed to delete card:", err);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       <DashboardNavbar userName="kithvin" />

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
//                 <h1 className="text-3xl font-bold text-[#040303]">
//                   Credit Cards
//                 </h1>
//                 <p className="text-sm text-[#BFC0C0]">
//                   Track and manage your credit cards
//                 </p>
//               </div>

//               <button
//                 onClick={() => setIsOpen(true)}
//                 className="bg-[#EF8354] text-white px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition"
//               >
//                 Add Credit Card
//               </button>
//             </div>

//             {/* Summary cards */}
//             <div className="grid gap-4 md:grid-cols-3">
//               <div className="bg-white border border-[#BFC0C0] rounded-lg p-6">
//                 <h3 className="font-semibold text-[#040303]">Total Balance</h3>
//                 <p className="text-xs text-[#BFC0C0] mt-1">
//                   Combined balance across all cards
//                 </p>
//                 <div className="text-4xl font-bold mt-6 text-[#EF8354]">
//                   ${totalBalance.toLocaleString()}
//                 </div>
//               </div>

//               <div className="bg-white border border-[#BFC0C0] rounded-lg p-6">
//                 <h3 className="font-semibold text-[#040303]">
//                   Total Credit Limit
//                 </h3>
//                 <p className="text-xs text-[#BFC0C0] mt-1">
//                   Combined credit limit across all cards
//                 </p>
//                 <div className="text-4xl font-bold mt-6 text-[#040303]">
//                   ${totalLimit.toLocaleString()}
//                 </div>
//               </div>

//               <div className="bg-white border border-[#BFC0C0] rounded-lg p-6">
//                 <h3 className="font-semibold text-[#040303]">
//                   Credit Utilization
//                 </h3>
//                 <p className="text-xs text-[#BFC0C0] mt-1">
//                   Percentage of credit used
//                 </p>

//                 <div className="text-4xl font-bold mt-6 text-[#040303]">
//                   {utilization}%
//                 </div>

//                 {/* simple progress bar */}
//                 <div className="w-full h-2 bg-[#BFC0C0]/40 rounded-full mt-3 overflow-hidden">
//                   <div
//                     className="h-2 bg-[#EF8354]"
//                     style={{ width: `${utilization}%` }}
//                   />
//                 </div>

//                 <p className="mt-2 text-xs text-[#BFC0C0]">
//                   Try to keep below 30%
//                 </p>
//               </div>
//             </div>

//             {/* Cards Table */}
//             <div className="bg-white border border-[#BFC0C0] rounded-lg p-6">
//               <h3 className="font-semibold text-[#040303]">Your Credit Cards</h3>
//               <p className="text-xs text-[#BFC0C0] mt-1">
//                 All your tracked credit cards
//               </p>

//               <div className="mt-5">
//                 {cards.length === 0 ? (
//                   <div className="h-24 rounded-md bg-white border border-dashed border-[#BFC0C0] flex flex-col items-center justify-center text-sm text-[#BFC0C0]">
//                     <p>No credit cards added yet.</p>
//                     <p className="text-xs">
//                       Click “Add Credit Card” to get started.
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="overflow-auto">
//                     <table className="w-full text-sm">
//                       <thead className="text-left text-[#BFC0C0]">
//                         <tr className="border-b border-[#BFC0C0]/60">
//                           <th className="py-3">Card</th>
//                           <th className="py-3">Balance</th>
//                           <th className="py-3">Limit</th>
//                           <th className="py-3">APR</th>
//                           <th className="py-3">Due Date</th>
//                           <th className="py-3 text-right">Action</th>
//                         </tr>
//                       </thead>

//                       <tbody>
//                         {cards.map((c) => (
//                           <tr
//                             key={c.id}
//                             className="border-b border-[#BFC0C0]/40 last:border-b-0"
//                           >
//                             <td className="py-3 font-medium text-[#040303]">
//                               {c.name}
//                             </td>
//                             <td className="py-3 text-[#040303]">
//                               ${Number(c.balance).toLocaleString()}
//                             </td>
//                             <td className="py-3 text-[#040303]">
//                               ${Number(c.limit).toLocaleString()}
//                             </td>
//                             <td className="py-3 text-[#040303]">{c.apr}%</td>
//                             <td className="py-3 text-[#040303]">{c.dueDate}</td>
//                             <td className="py-3 text-right">
//                               <button
//                                 onClick={() => deleteCard(c.id)}
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
//             {isOpen ? (
//               <div className="fixed inset-0 z-50">
//                 <div
//                   className="absolute inset-0 bg-black/60"
//                   onClick={() => setIsOpen(false)}
//                 />

//                 <div className="relative min-h-screen flex items-center justify-center p-4">
//                   <div className="w-full max-w-xl bg-white rounded-lg shadow-xl border border-[#BFC0C0]">
//                     <div className="flex items-start justify-between px-6 pt-5">
//                       <div>
//                         <h3 className="text-lg font-semibold text-[#040303]">
//                           Add New Credit Card
//                         </h3>
//                         <p className="text-sm text-[#BFC0C0] mt-1">
//                           Add a card to track spending and payments
//                         </p>
//                       </div>

//                       <button
//                         onClick={() => setIsOpen(false)}
//                         className="text-[#BFC0C0] hover:text-[#040303] px-2"
//                       >
//                         ✕
//                       </button>
//                     </div>

//                     <form
//                       onSubmit={handleSubmit}
//                       className="px-6 pb-6 pt-4 space-y-4"
//                     >
//                       <div>
//                         <label className="text-sm font-medium text-[#040303]">
//                           Card Name
//                         </label>
//                         <input
//                           value={name}
//                           onChange={(e) => setName(e.target.value)}
//                           className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
//                           placeholder="e.g., Visa, Master, Amex"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="text-sm font-medium text-[#040303]">
//                           Credit Limit ($)
//                         </label>
//                         <input
//                           value={limit}
//                           onChange={(e) => setLimit(e.target.value)}
//                           type="number"
//                           className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
//                           placeholder="0"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="text-sm font-medium text-[#040303]">
//                           Current Balance ($)
//                         </label>
//                         <input
//                           value={balance}
//                           onChange={(e) => setBalance(e.target.value)}
//                           type="number"
//                           className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
//                           placeholder="0"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="text-sm font-medium text-[#040303]">
//                           APR (%)
//                         </label>
//                         <input
//                           value={apr}
//                           onChange={(e) => setApr(e.target.value)}
//                           type="number"
//                           className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
//                           placeholder="0"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="text-sm font-medium text-[#040303]">
//                           Payment Due Date
//                         </label>
//                         <input
//                           value={dueDate}
//                           onChange={(e) => setDueDate(e.target.value)}
//                           type="date"
//                           className="w-full mt-2 border border-[#BFC0C0] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
//                           required
//                         />
//                       </div>

//                       <button
//                         type="submit"
//                         className="w-full bg-[#EF8354] text-white py-2.5 rounded-md font-medium hover:opacity-90 transition"
//                       >
//                         Add Credit Card
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

// src/pages/CreditCardsPage.jsx
import React, { useEffect, useState } from "react";

import DashboardNavbar from "../components/dashbord/DashboardNavbar";
import DashbordSidebar from "../components/dashbord/DashbordSidebar";
import DashboardFooter from "../components/dashbord/DashboardFooter";
import ChatBotWidget from "../components/dashbord/ChatBotWidget";

export default function CreditCardsPage() {
  const [collapsed, setCollapsed] = useState(true);

  const [cards, setCards] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("");
  const [limit, setLimit] = useState("");
  const [balance, setBalance] = useState("");
  const [apr, setApr] = useState("");
  const [dueDate, setDueDate] = useState("");

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const CARDS_URL = `${API_BASE}/api/cards`;

  function formatDateForUI(dateVal) {
    if (!dateVal) return "";
    const d = new Date(dateVal);
    if (Number.isNaN(d.getTime())) return String(dateVal);
    return d.toISOString().slice(0, 10);
  }

  function mapBackendToUI(doc) {
    return {
      id: doc?._id || doc?.id || Date.now(),
      name: doc?.cardName || "",
      limit: Number(doc?.creditLimit || 0),
      balance: Number(doc?.currentBalance || 0),
      apr: Number(doc?.apr || 0),
      dueDate: formatDateForUI(doc?.paymentDueDate),
    };
  }

  async function loadCards() {
    try {
      const res = await fetch(CARDS_URL, {
        method: "GET",
        credentials: "include",
      });

      const json = await res.json();
      const list = json?.data?.cards || [];
      setCards(list.map(mapBackendToUI));
    } catch (err) {
      console.error("Failed to load cards:", err);
    }
  }

  useEffect(() => {
    loadCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalBalance = cards.reduce((sum, c) => sum + (Number(c.balance) || 0), 0);
  const totalLimit = cards.reduce((sum, c) => sum + (Number(c.limit) || 0), 0);

  const utilization =
    totalLimit === 0 ? 0 : Math.round((totalBalance / totalLimit) * 100);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const payload = {
        cardName: name,
        creditLimit: Number(limit),
        currentBalance: Number(balance),
        apr: Number(apr),
        paymentDueDate: dueDate,
      };

      const res = await fetch(CARDS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        console.error("Create card failed:", json);
        return;
      }

      const created = json?.data?.card;
      if (created) {
        setCards((prev) => [mapBackendToUI(created), ...prev]);
      } else {
        await loadCards();
      }

      setName("");
      setLimit("");
      setBalance("");
      setApr("");
      setDueDate("");
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to create card:", err);
    }
  }

  async function deleteCard(id) {
    try {
      const res = await fetch(`${CARDS_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        console.error("Delete card failed:", json);
        return;
      }

      setCards((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to delete card:", err);
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
                <h1 className="text-3xl font-bold text-[#040303]">
                  Credit Cards
                </h1>
                <p className="text-sm text-[#040303]/60">
                  Track and manage your credit cards
                </p>
              </div>

              <button
                onClick={() => setIsOpen(true)}
                className="bg-[#EF8354] text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition"
              >
                Add Credit Card
              </button>
            </div>

            {/* Summary cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-white border border-[#BFC0C0] rounded-2xl p-6">
                <h3 className="font-bold text-[#040303]">Total Balance</h3>
                <p className="text-xs text-[#040303]/60 mt-1">
                  Combined balance across all cards
                </p>
                <div className="text-4xl font-extrabold mt-6 text-[#EF8354]">
                  ${totalBalance.toLocaleString()}
                </div>
              </div>

              <div className="bg-white border border-[#BFC0C0] rounded-2xl p-6">
                <h3 className="font-bold text-[#040303]">Total Credit Limit</h3>
                <p className="text-xs text-[#040303]/60 mt-1">
                  Combined credit limit across all cards
                </p>
                <div className="text-4xl font-extrabold mt-6 text-[#040303]">
                  ${totalLimit.toLocaleString()}
                </div>
              </div>

              <div className="bg-white border border-[#BFC0C0] rounded-2xl p-6">
                <h3 className="font-bold text-[#040303]">Credit Utilization</h3>
                <p className="text-xs text-[#040303]/60 mt-1">
                  Percentage of credit used
                </p>

                <div className="text-4xl font-extrabold mt-6 text-[#040303]">
                  {utilization}%
                </div>

                <div className="w-full h-2 bg-[#BFC0C0]/40 rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-2 bg-[#EF8354]"
                    style={{ width: `${utilization}%` }}
                  />
                </div>

                <p className="mt-2 text-xs text-[#040303]/60">
                  Try to keep below 30%
                </p>
              </div>
            </div>

            {/* Cards Table */}
            <div className="bg-white border border-[#BFC0C0] rounded-2xl p-6">
              <h3 className="font-bold text-[#040303]">Your Credit Cards</h3>
              <p className="text-xs text-[#040303]/60 mt-1">
                All your tracked credit cards
              </p>

              <div className="mt-5">
                {cards.length === 0 ? (
                  <div className="h-24 rounded-xl bg-white border border-dashed border-[#BFC0C0] flex flex-col items-center justify-center text-sm text-[#040303]/60">
                    <p>No credit cards added yet.</p>
                    <p className="text-xs">
                      Click “Add Credit Card” to get started.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-auto">
                    <table className="w-full text-sm">
                      <thead className="text-left text-[#040303]/60">
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
                            <td className="py-3 font-semibold text-[#040303]">
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
                                className="text-xs px-6 py-3 rounded-xl bg-[#EF8354] text-white hover:opacity-90 transition font-semibold"
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
                  <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-[#BFC0C0]">
                    <div className="flex items-start justify-between px-6 pt-5">
                      <div>
                        <h3 className="text-lg font-bold text-[#040303]">
                          Add New Credit Card
                        </h3>
                        <p className="text-sm text-[#040303]/60 mt-1">
                          Add a card to track spending and payments
                        </p>
                      </div>

                      <button
                        onClick={() => setIsOpen(false)}
                        className="text-[#040303]/50 hover:text-[#040303] px-2"
                      >
                        ✕
                      </button>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="px-6 pb-6 pt-4 space-y-4"
                    >
                      <div>
                        <label className="text-sm font-semibold text-[#040303]">
                          Card Name
                        </label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full mt-2 border border-[#BFC0C0] rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          placeholder="e.g., Visa, Master, Amex"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-[#040303]">
                          Credit Limit ($)
                        </label>
                        <input
                          value={limit}
                          onChange={(e) => setLimit(e.target.value)}
                          type="number"
                          className="w-full mt-2 border border-[#BFC0C0] rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          placeholder="0"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-[#040303]">
                          Current Balance ($)
                        </label>
                        <input
                          value={balance}
                          onChange={(e) => setBalance(e.target.value)}
                          type="number"
                          className="w-full mt-2 border border-[#BFC0C0] rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          placeholder="0"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-[#040303]">
                          APR (%)
                        </label>
                        <input
                          value={apr}
                          onChange={(e) => setApr(e.target.value)}
                          type="number"
                          className="w-full mt-2 border border-[#BFC0C0] rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          placeholder="0"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-[#040303]">
                          Payment Due Date
                        </label>
                        <input
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                          type="date"
                          className="w-full mt-2 border border-[#BFC0C0] rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#EF8354] text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition"
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

      {/* Footer full background */}
      <div className="w-full bg-[#ebe4e1]">
        <DashboardFooter />
      </div>
    </div>
  );
}

