// import { Routes, Route } from "react-router-dom";

// import HomePage from "./pages/HomePage";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import DashbordHomePage from "./pages/DashbordHomePage";

// export default function App() {
//   return (
//     <Routes>
//       {/* Public pages */}
//       <Route path="/" element={<HomePage />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />

//       {/* Dashboard */}
//       <Route path="/dashboard" element={<DashbordHomePage />} />
//     </Routes>
//   );
// }


import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashbordHomePage from "./pages/DashbordHomePage";


export default function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Dashboard (Protected) */}
      <Route
        path="/dashboard"
        element={
          
            <DashbordHomePage />
          
        }
      />
    </Routes>
  );
}
