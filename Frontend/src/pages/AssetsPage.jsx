
// // src/pages/AssetsPage.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import DashboardNavbar from "../components/dashbord/DashboardNavbar";
// import DashbordSidebar from "../components/dashbord/DashbordSidebar";
// import DashboardFooter from "../components/dashbord/DashboardFooter";
// import ChatBotWidget from "../components/dashbord/ChatBotWidget";

// export default function AssetsPage() {
//   const [collapsed, setCollapsed] = useState(true);

//   const [assets, setAssets] = useState([]);
//   const [open, setOpen] = useState(false);

//   const [name, setName] = useState("");
//   const [type, setType] = useState("");
//   const [value, setValue] = useState("");

//   const API_BASE = import.meta.env.VITE_API_BASE_URL;

//   useEffect(() => {
//     async function fetchAssets() {
//       try {
//         const res = await axios.get(`${API_BASE}/api/assets`, {
//           withCredentials: true,
//         });

//         const list = res.data?.data?.assets || [];

//         setAssets(
//           list.map((a) => ({
//             id: a._id,
//             name: a.assetName,
//             type: a.assetType,
//             value: a.currentValue,
//           }))
//         );
//       } catch (err) {
//         console.error("Fetch assets error:", err);
//       }
//     }

//     fetchAssets();
//   }, [API_BASE]);

//   const totalAssets = assets.reduce(
//     (sum, a) => sum + (Number(a.value) || 0),
//     0
//   );

//   async function addAsset(e) {
//     e.preventDefault();

//     try {
//       const payload = {
//         assetName: name.trim(),
//         assetType: type.trim(),
//         currentValue: Number(value || 0),
//       };

//       const res = await axios.post(`${API_BASE}/api/assets`, payload, {
//         withCredentials: true,
//       });

//       const saved = res.data?.data?.asset;

//       setAssets((prev) => [
//         {
//           id: saved._id,
//           name: saved.assetName,
//           type: saved.assetType,
//           value: saved.currentValue,
//         },
//         ...prev,
//       ]);

//       setName("");
//       setType("");
//       setValue("");
//       setOpen(false);
//     } catch (err) {
//       console.error("Create asset error:", err);
//     }
//   }

//   async function deleteAsset(id) {
//     try {
//       await axios.delete(`${API_BASE}/api/assets/${id}`, {
//         withCredentials: true,
//       });

//       setAssets((prev) => prev.filter((a) => a.id !== id));
//     } catch (err) {
//       console.error("Delete asset error:", err);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-[#ebe4e1] flex flex-col">
//       <DashboardNavbar />

//       <div className="flex flex-1 min-h-0">
//         <DashbordSidebar
//           collapsed={collapsed}
//           onToggle={() => setCollapsed((prev) => !prev)}
//         />

//         <main className="flex-1 min-w-0 bg-gray-50 overflow-auto">
//           <div className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
//             {/* Header */}
//             <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
//               <div>
//                 <h1 className="text-3xl font-bold text-[#040303]">Assets</h1>
//                 <p className="text-sm text-[#040303]/60">
//                   Track and manage your assets
//                 </p>
//               </div>

//               <button
//                 onClick={() => setOpen(true)}
//                 className="bg-[#EF8354] text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition"
//               >
//                 Add Asset
//               </button>
//             </div>

//             {/* Total Assets */}
//             <div className="bg-white border border-[#BFC0C0] rounded-2xl p-6">
//               <h3 className="font-bold text-[#040303]">Total Assets</h3>
//               <p className="text-xs text-[#040303]/60 mt-1">
//                 Combined value of all your assets
//               </p>

//               <div className="text-4xl font-extrabold mt-6 text-[#EF8354]">
//                 ${totalAssets.toLocaleString()}
//               </div>
//             </div>

//             {/* Assets table */}
//             <div className="bg-white border border-[#BFC0C0] rounded-2xl p-6">
//               <h3 className="font-bold text-[#040303]">Your Assets</h3>
//               <p className="text-xs text-[#040303]/60 mt-1">
//                 All your tracked assets
//               </p>

//               <div className="mt-5">
//                 {assets.length === 0 ? (
//                   <div className="h-24 rounded-xl bg-white border border-dashed border-[#BFC0C0] flex items-center justify-center text-sm text-[#040303]/60">
//                     No assets added yet
//                   </div>
//                 ) : (
//                   <div className="overflow-auto">
//                     <table className="w-full text-sm">
//                       <thead className="text-left text-[#040303]/60">
//                         <tr className="border-b border-[#BFC0C0]/60">
//                           <th className="py-3">Name</th>
//                           <th className="py-3">Type</th>
//                           <th className="py-3">Value</th>
//                           <th className="py-3 text-right">Action</th>
//                         </tr>
//                       </thead>

//                       <tbody>
//                         {assets.map((a) => (
//                           <tr
//                             key={a.id}
//                             className="border-b border-[#BFC0C0]/40 last:border-b-0"
//                           >
//                             <td className="py-3 font-semibold text-[#040303]">
//                               {a.name}
//                             </td>
//                             <td className="py-3 text-[#040303]">{a.type}</td>
//                             <td className="py-3 text-[#040303]">
//                               ${Number(a.value).toLocaleString()}
//                             </td>
//                             <td className="py-3 text-right">
//                               <button
//                                 onClick={() => deleteAsset(a.id)}
//                                 className="text-xs px-6 py-3 rounded-xl bg-[#EF8354] text-white hover:opacity-90 transition font-semibold"
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
//                   <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-[#BFC0C0]">
//                     <div className="flex items-start justify-between px-6 pt-5">
//                       <div>
//                         <h3 className="text-lg font-bold text-[#040303]">
//                           Add New Asset
//                         </h3>
//                         <p className="text-sm text-[#040303]/60 mt-1">
//                           Add a new asset to track your wealth
//                         </p>
//                       </div>

//                       <button
//                         onClick={() => setOpen(false)}
//                         className="text-[#040303]/50 hover:text-[#040303] px-2"
//                         aria-label="Close"
//                       >
//                         ✕
//                       </button>
//                     </div>

//                     <form
//                       onSubmit={addAsset}
//                       className="px-6 pb-6 pt-4 space-y-4"
//                     >
//                       <div>
//                         <label className="text-sm font-semibold text-[#040303]">
//                           Asset Name
//                         </label>
//                         <input
//                           value={name}
//                           onChange={(e) => setName(e.target.value)}
//                           className="w-full mt-2 border border-[#BFC0C0] rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
//                           placeholder="e.g., Savings Account"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="text-sm font-semibold text-[#040303]">
//                           Asset Type
//                         </label>
//                         <input
//                           value={type}
//                           onChange={(e) => setType(e.target.value)}
//                           className="w-full mt-2 border border-[#BFC0C0] rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
//                           placeholder="e.g., Cash, Property, Investment"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="text-sm font-semibold text-[#040303]">
//                           Current Value ($)
//                         </label>
//                         <input
//                           value={value}
//                           onChange={(e) => setValue(e.target.value)}
//                           type="number"
//                           className="w-full mt-2 border border-[#BFC0C0] rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
//                           placeholder="0"
//                           required
//                         />
//                       </div>

//                       <button
//                         type="submit"
//                         className="w-full bg-[#EF8354] text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition"
//                       >
//                         Add Asset
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

//       {/* Footer full background (prevents white gap) */}
//       <div className="w-full bg-[#ebe4e1]">
//         <DashboardFooter />
//       </div>
//     </div>
//   );
// }

// src/pages/AssetsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

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

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async function fetchAssets() {
      try {
        const res = await axios.get(`${API_BASE}/api/assets`, {
          withCredentials: true,
        });

        const list = res.data?.data?.assets || [];

        setAssets(
          list.map((a) => ({
            id: a._id,
            name: a.assetName,
            type: a.assetType,
            value: a.currentValue,
          }))
        );
      } catch (err) {
        console.error("Fetch assets error:", err);
      }
    }

    fetchAssets();
  }, [API_BASE]);

  const totalAssets = assets.reduce(
    (sum, a) => sum + (Number(a.value) || 0),
    0
  );

  async function addAsset(e) {
    e.preventDefault();

    try {
      const payload = {
        assetName: name.trim(),
        assetType: type.trim(),
        currentValue: Number(value || 0),
      };

      const res = await axios.post(`${API_BASE}/api/assets`, payload, {
        withCredentials: true,
      });

      const saved = res.data?.data?.asset;

      setAssets((prev) => [
        {
          id: saved._id,
          name: saved.assetName,
          type: saved.assetType,
          value: saved.currentValue,
        },
        ...prev,
      ]);

      setName("");
      setType("");
      setValue("");
      setOpen(false);
    } catch (err) {
      console.error("Create asset error:", err);
    }
  }

  async function deleteAsset(id) {
    try {
      await axios.delete(`${API_BASE}/api/assets/${id}`, {
        withCredentials: true,
      });

      setAssets((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Delete asset error:", err);
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
          <div className="max-w-[1600px] mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#040303]">
                  Assets
                </h1>
                <p className="text-xs sm:text-sm text-[#040303]/60">
                  Track and manage your assets
                </p>
              </div>

              <button
                onClick={() => setOpen(true)}
                className="bg-[#EF8354] text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition w-full sm:w-auto"
              >
                Add Asset
              </button>
            </div>

            {/* Total Assets */}
            <div className="bg-white border border-[#BFC0C0] rounded-2xl p-4 sm:p-6">
              <h3 className="font-bold text-[#040303]">Total Assets</h3>
              <p className="text-xs text-[#040303]/60 mt-1">
                Combined value of all your assets
              </p>

              <div className="text-3xl sm:text-4xl font-extrabold mt-6 text-[#EF8354]">
                ${totalAssets.toLocaleString()}
              </div>
            </div>

            {/* Assets table */}
            <div className="bg-white border border-[#BFC0C0] rounded-2xl p-4 sm:p-6">
              <h3 className="font-bold text-[#040303]">Your Assets</h3>
              <p className="text-xs text-[#040303]/60 mt-1">
                All your tracked assets
              </p>

              <div className="mt-5">
                {assets.length === 0 ? (
                  <div className="h-24 rounded-xl bg-white border border-dashed border-[#BFC0C0] flex items-center justify-center text-sm text-[#040303]/60 px-4 text-center">
                    No assets added yet
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[760px]">
                      <thead className="text-left text-[#040303]/60">
                        <tr className="border-b border-[#BFC0C0]/60">
                          <th className="py-3 whitespace-nowrap pr-6 sm:pr-0">
                            Name
                          </th>
                          <th className="py-3 whitespace-nowrap pr-6 sm:pr-0">
                            Type
                          </th>
                          <th className="py-3 whitespace-nowrap pr-6 sm:pr-0">
                            Value
                          </th>
                          <th className="py-3 text-right whitespace-nowrap pr-0">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {assets.map((a) => (
                          <tr
                            key={a.id}
                            className="border-b border-[#BFC0C0]/40 last:border-b-0"
                          >
                            <td className="py-3 font-semibold text-[#040303] whitespace-nowrap pr-6 sm:pr-0">
                              {a.name}
                            </td>
                            <td className="py-3 text-[#040303] whitespace-nowrap pr-6 sm:pr-0">
                              {a.type}
                            </td>
                            <td className="py-3 text-[#040303] whitespace-nowrap pr-6 sm:pr-0">
                              ${Number(a.value).toLocaleString()}
                            </td>
                            <td className="py-3 text-right whitespace-nowrap pr-0">
                              <button
                                onClick={() => deleteAsset(a.id)}
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
            {open ? (
              <div className="fixed inset-0 z-50">
                <div
                  className="absolute inset-0 bg-black/60"
                  onClick={() => setOpen(false)}
                />

                <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-4 overflow-auto">
                  <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-[#BFC0C0]">
                    <div className="flex items-start justify-between px-4 sm:px-6 pt-5">
                      <div>
                        <h3 className="text-lg font-bold text-[#040303]">
                          Add New Asset
                        </h3>
                        <p className="text-sm text-[#040303]/60 mt-1">
                          Add a new asset to track your wealth
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
                      onSubmit={addAsset}
                      className="px-4 sm:px-6 pb-6 pt-4 space-y-4"
                    >
                      <div>
                        <label className="text-sm font-semibold text-[#040303]">
                          Asset Name
                        </label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full mt-2 border border-[#BFC0C0] rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          placeholder="e.g., Savings Account"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-[#040303]">
                          Asset Type
                        </label>
                        <input
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="w-full mt-2 border border-[#BFC0C0] rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          placeholder="e.g., Cash, Property, Investment"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-[#040303]">
                          Current Value ($)
                        </label>
                        <input
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          type="number"
                          className="w-full mt-2 border border-[#BFC0C0] rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#EF8354]/30 focus:border-[#EF8354]"
                          placeholder="0"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#EF8354] text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition"
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

      <div className="w-full bg-[#ebe4e1]">
        <DashboardFooter />
      </div>
    </div>
  );
}
