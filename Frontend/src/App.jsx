import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashbordHomePage from "./pages/DashbordHomePage";
import IncomePage from "./pages/IncomePage";
import AssetsPage from "./pages/AssetsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<DashbordHomePage />} />
      <Route path="/income" element={<IncomePage />} />
      <Route path="/assets" element={<AssetsPage />} />
    </Routes>
  );
}

