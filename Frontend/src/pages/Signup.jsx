import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // frontend validation (same as backend expectation)
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ✅ REQUIRED for cookies
          body: JSON.stringify({
            fullname: name, // ✅ backend expects "fullname"
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Signup failed");
        return;
      }

      // ✅ JWT stored in httpOnly cookie
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard"); // ✅ redirect after signup
    } catch (err) {
      setError("Backend not reachable. Is server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f7f7f7]">
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

        <div className="flex flex-col items-center text-center">
          <div className="mt-12">
            <h1 className="text-5xl font-bold text-white leading-tight">
              Start Your Financial Journey Today
            </h1>
            <p className="mt-8 text-lg text-[#BFC0C0] max-w-xl mx-auto">
              Join thousands managing wealth smarter with AI insights.
            </p>
          </div>

          <div className="mt-12 w-full max-w-xl space-y-6 pt-4 mx-auto">
            <Feature
              title="Track Everything"
              desc="Income, assets, liabilities, and credit cards"
            />
            <Feature
              title="AI Recommendations"
              desc="Get personalized financial advice"
            />
            <Feature
              title="Visual Insights"
              desc="Beautiful charts and analytics"
            />
          </div>
        </div>

        <p className="text-sm text-[#BFC0C0] text-center">
          © 2026 FinSage. All rights reserved.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 bg-[#ecebe8]">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-[#EF8354] text-white flex items-center justify-center font-bold text-xl">
              F
            </div>
            <span className="text-2xl font-bold text-[#040303]">FinSage</span>
          </div>

          <div className="border border-[#BFC0C0]/40 rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-[#040303]">
              Create an account
            </h2>
            <p className="text-sm text-[#BFC0C0] mt-2">
              Get started with FinSage today
            </p>

            {error && (
              <div className="mt-4 border border-red-300 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <InputField
                label="Full Name"
                icon={<User size={18} />}
                placeholder="John Doe"
                value={name}
                onChange={setName}
              />

              <InputField
                label="Email"
                icon={<Mail size={18} />}
                placeholder="you@example.com"
                value={email}
                onChange={setEmail}
                type="email"
              />

              <InputField
                label="Password"
                icon={<Lock size={18} />}
                placeholder="••••••••"
                value={password}
                onChange={setPassword}
                type="password"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#EF8354] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create Account"}
                {!loading && <ArrowRight size={16} />}
              </button>

              <p className="text-center text-sm text-[#BFC0C0]">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-[#EF8354] font-medium hover:underline"
                >
                  Sign in
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Helper Components ---------- */

function Feature({ title, desc }) {
  return (
    <div className="flex items-start gap-4 w-full justify-center">
      <div className="w-9 h-9 rounded-xl bg-[#EF8354]/20 text-[#EF8354] flex items-center justify-center font-bold shrink-0">
        ✓
      </div>
      <div className="text-left w-[320px]">
        <h3 className="text-white font-semibold">{title}</h3>
        <p className="text-sm text-[#BFC0C0]">{desc}</p>
      </div>
    </div>
  );
}

function InputField({
  label,
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>
      <label className="text-sm font-medium text-[#040303]">{label}</label>
      <div className="relative mt-2">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BFC0C0]">
          {icon}
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required
          className="w-full border border-[#BFC0C0]/40 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#EF8354]/40"
        />
      </div>
    </div>
  );
}
