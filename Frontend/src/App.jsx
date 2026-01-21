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
import IncomePage from "./pages/IncomePage";

export default function App() {
  return (
    <Routes>
      
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      
      <Route path="/dashboard" element={<DashbordHomePage />} />
      <Route path="/income" element={<IncomePage />} /> 
    </Routes>
  );
}
