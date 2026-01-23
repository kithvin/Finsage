import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowRight,
  Wallet,
  Sparkles,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ✅ REQUIRED for cookies
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Invalid email or password");
        return;
      }

      // ✅ JWT stored in httpOnly cookie
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard"); // ✅ go to dashboard
    } catch (err) {
      setError("Backend not reachable. Is server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#201e1e] p-12 flex-col justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-12 h-12 rounded-2xl bg-[#EF8354] text-white flex items-center justify-center font-bold text-2xl">
            F
          </div>
          <span className="text-3xl font-bold text-white">FinSage</span>
        </div>

        <div className="flex flex-col items-center text-center mt-16">
          <h1 className="text-5xl font-bold text-white leading-tight max-w-2xl">
            Manage Your Wealth with Intelligence
          </h1>
          <p className="mt-6 text-lg text-[#BFC0C0] max-w-xl">
            Track your finances and get AI recommendations.
          </p>
        </div>

        <div className="flex items-center justify-center gap-10 mb-8">
          <IconItem icon={<Wallet className="h-6 w-6" />} label="Wallet" />
          <IconItem icon={<Sparkles className="h-6 w-6" />} label="AI" />
          <IconItem icon={<BarChart3 className="h-6 w-6" />} label="Insights" />
          <IconItem icon={<ShieldCheck className="h-6 w-6" />} label="Secure" />
        </div>

        <p className="text-sm text-[#BFC0C0] text-center">
          © 2026 FinSage. All rights reserved.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-[#EF8354] text-white flex items-center justify-center font-bold text-xl">
              F
            </div>
            <span className="text-2xl font-bold text-[#040303]">FinSage</span>
          </div>

          <div className="border border-[#BFC0C0]/40 rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-[#040303]">Welcome back</h2>
            <p className="text-sm text-[#a5a8a8] mt-2">
              Sign in to your account to continue
            </p>

            {error && (
              <div className="mt-4 border border-red-300 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="text-sm font-medium text-[#040303]">
                  Email
                </label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#BFC0C0]" />
                  <input
                    type="email"
                    className="w-full border border-[#BFC0C0]/40 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#EF8354]/40"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#040303]">
                  Password
                </label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#BFC0C0]" />
                  <input
                    type="password"
                    className="w-full border border-[#BFC0C0]/40 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#EF8354]/40"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#EF8354] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>

              <p className="text-center text-sm text-[#a5a8a8]">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="text-[#EF8354] font-medium hover:underline"
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Icon Item */
function IconItem({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-14 h-14 rounded-2xl bg-[#EF8354]/20 text-[#EF8354] flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs text-[#BFC0C0]">{label}</span>
    </div>
  );
}
