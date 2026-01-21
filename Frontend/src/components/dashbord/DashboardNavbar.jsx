// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function DashboardNavbar({ userName = "Finsage" }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     navigate("/login");
//   };

//   return (
//     <header className="bg-[#FFFFFF] border-b border-[#BFC0C0]/60">
//       <div className="max-w-[1700px] mx-auto px-6">
//         <div className="h-14 flex items-center justify-between">
          
//           {/* Left: Brand */}
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg bg-[#EF8354] text-white flex items-center justify-center font-bold text-sm shadow-sm">
//               F
//             </div>
//             <span className="text-lg font-semibold text-[#040303]">
//               FinSage
//             </span>
//           </div>

//           {/* Right: User + Logout */}
//           <div className="flex items-center gap-4">
//             <span className="text-sm text-[#040303]/60">
//               Welcome to ,{" "}
//               <span className="font-medium text-[#040303]">
//                 {userName}
//               </span>
//             </span>

//             <button
//               onClick={handleLogout}
//               className="px-4 py-1.5 text-sm rounded-lg border border-[#BFC0C0] text-[#040303]
//                          hover:bg-[#EF8354] hover:text-white hover:border-[#EF8354]
//                          transition"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

import React from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="bg-[#FFFFFF] border-b border-[#BFC0C0]/60">
      <div className="max-w-[1700px] mx-auto px-6">
        <div className="h-14 flex items-center justify-between">
          
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#EF8354] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              F
            </div>
            <span className="text-lg font-semibold text-[#040303]">
              FinSage
            </span>
          </div>

          {/* Right: Welcome + Logout */}
          <div className="flex items-center gap-6">
            <span className="text-sm text-[#040303]/60">
              Welcome to{" "}
              <span className="font-semibold text-[#EF8354]">
                FinSage
              </span>
            </span>

            <button
              onClick={handleLogout}
              className="px-4 py-1.5 text-sm rounded-lg border border-[#BFC0C0] text-[#040303]
                         hover:bg-[#EF8354] hover:text-white hover:border-[#EF8354]
                         transition"
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
