// import React from "react";
// import Dashboard from "../components/dashbord/Dashboard";
// import DashboardFooter from "../components/dashbord/DashboardFooter";

// export default function DashboardHomePage() {
//     const userName = "kithvin";

//     return (
//       <div className="">

//         <main className="max-w-[1800px] mx-auto px-6 py-6 flex-1">
//           <Dashboard />
//         </main>

//         <DashboardFooter />

//       </div>
//     );
//   }

// import React, { useState } from "react";
// import DashboardNavbar from "../components/dashbord/DashboardNavbar";
// import DashboardComponent from "../components/dashbord/Dashboard";
// import DashboardFooter from "../components/dashbord/DashboardFooter";
// import DashbordSidebar from "../components/dashbord/DashbordSidebar";
// import ChatBotWidget from "../components/dashbord/ChatBotWidget";
// import DashboardHighlightSection from "../components/dashbord/DashboardHighlightSection";
// import FinSageFeedbackCard from "../components/FinSageFeedbackCard";

// export default function DashbordHomePage() {
//   const [collapsed, setCollapsed] = useState(true);

//   return (
//     <div className="min-h-screen bg-[#ebe4e1] flex flex-col">
//       <DashboardNavbar userName="kithvin" />

//       <div className="flex flex-1 min-h-0">
//         <DashbordSidebar
//           collapsed={collapsed}
//           onToggle={() => setCollapsed((prev) => !prev)}
//         />

//         <main className="flex-1 min-w-0 bg-gray-50 overflow-auto">
//           <div className="max-w-[1600px] mx-auto px-6 py-6 space-y-8">
//             {/* Dashboard content */}
//             <DashboardComponent />

//             {/* mt + mb spacing */}
//             <div className="mt-16 mb-16">
//               <DashboardHighlightSection />
//             </div>
//             <FinSageFeedbackCard />
//           </div>
//         </main>
//       </div>

//       <DashboardFooter />

//       {/* Chatbot floating button */}
//       <ChatBotWidget />
//     </div>
//   );
// }

import React, { useState } from "react";
import DashboardNavbar from "../components/dashbord/DashboardNavbar";
import DashboardComponent from "../components/dashbord/Dashboard";
import DashboardFooter from "../components/dashbord/DashboardFooter";
import DashbordSidebar from "../components/dashbord/DashbordSidebar";
import ChatBotWidget from "../components/dashbord/ChatBotWidget";
import DashboardHighlightSection from "../components/dashbord/DashboardHighlightSection";
import FinSageFeedbackCard from "../components/FinSageFeedbackCard"; 

export default function DashbordHomePage() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="min-h-screen bg-[#ebe4e1] flex flex-col">
      <DashboardNavbar userName="kithvin" />

      {/* Body: sidebar + main */}
      <div className="flex flex-1 min-h-0 ">
        <DashbordSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((prev) => !prev)}
        />

        <main className="flex-1 min-w-0 bg-gray-50 overflow-auto">
          <div className="max-w-[1600px] mx-auto px-6 py-6 space-y-4 md:mt-10">
            {/* highlight section should be inside main */}
            <DashboardHighlightSection />

            {/* main dashboard cards */}
            <DashboardComponent />
            <div className="mt-16 mb-16">
            {/* feedback card */}
            <FinSageFeedbackCard />
            </div>
          </div>
        </main>
      </div>

      <DashboardFooter />

      {/* Chatbot floating button */}
      <ChatBotWidget />
    </div>
  );
}




