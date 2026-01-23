// import React, { useState } from "react";
// import { MessageSquareText, User, Briefcase } from "lucide-react";

// export default function FinSageFeedbackCard() {
//   const [form, setForm] = useState({ name: "", role: "", comment: "" });
//   const [submitted, setSubmitted] = useState(false);

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setForm((p) => ({ ...p, [name]: value }));
//     setSubmitted(false);
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!form.name.trim() || !form.role.trim() || !form.comment.trim()) return;

//     console.log("Feedback:", form);
//     setSubmitted(true);
//     setForm({ name: "", role: "", comment: "" });
//   }

//   return (
//     <section className="my-12 px-4 sm:px-6 lg:px-0">
//       <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-sm">
//         {/* Background image like highlight section */}
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage:
//               "url('https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=2000&q=80')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         />
//         {/* Dark overlay for readable text */}
//         <div className="absolute inset-0 bg-[#040303]/80" />
//         {/* Soft accent glow */}
//         <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#EF8354]/25 blur-3xl" />
//         <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

//         <div className="relative p-6 sm:p-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
//             {/* LEFT: Highlight content */}
//             <div className="flex flex-col justify-between">
//               <div>
//                 <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 border border-white/10 px-3 py-2">
//                   <MessageSquareText className="h-4 w-4 text-[#EF8354]" />
//                   <span className="text-xs font-semibold tracking-widest text-white/80">
//                     SHARE YOUR FEEDBACK
//                   </span>
//                 </div>

//                 <h3 className="mt-6 text-2xl sm:text-3xl font-bold text-white leading-tight">
//                   Help us make{" "}
//                   <span className="text-[#EF8354]">FinSage</span> better for you
//                 </h3>

//                 <p className="mt-6 text-sm sm:text-base text-white/70 max-w-xl">
//                   Your opinion matters. Tell us what you like, what feels
//                   confusing, or what features you want to see next in FinSage.
//                 </p>

//                 {/* bullets for normal users */}
//                 <div className="mt-8 space-y-2">
//                   <div className="flex items-center gap-2 text-white/80 text-sm">
//                     <span className="h-2 w-2 rounded-full bg-[#EF8354]" />
//                     Share your experience using the app
//                   </div>
//                   <div className="flex items-center gap-2 text-white/80 text-sm">
//                     <span className="h-2 w-2 rounded-full bg-[#EF8354]" />
//                     Suggest new features (income, assets, debts, cards)
//                   </div>
//                   <div className="flex items-center gap-2 text-white/80 text-sm">
//                     <span className="h-2 w-2 rounded-full bg-[#EF8354]" />
//                     Report anything that feels hard or unclear
//                   </div>
//                 </div>
//               </div>

//               {/* footer note */}
//               <div className="mt-8 text-xs text-white/60">
//                 FinSage • Track • Plan • Grow
//               </div>
//             </div>

//             {/* RIGHT: Glass form card */}
//             <div className="rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl p-5 sm:p-6">
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {/* Name */}
//                 <div>
//                   <label className="text-xs text-white/70 flex items-center gap-2">
//                     <User className="h-4 w-4 text-white/60" />
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     placeholder="Ex: John Doe"
//                     autoComplete="name"
//                     inputMode="text"
//                     enterKeyHint="next"
//                     required
//                     maxLength={60}
//                     className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#EF8354]/70"
//                   />
//                 </div>

//                 {/* Job Role */}
//                 <div>
//                   <label className="text-xs text-white/70 flex items-center gap-2">
//                     <Briefcase className="h-4 w-4 text-white/60" />
//                     Job Role
//                   </label>
//                   <input
//                     type="text"
//                     name="role"
//                     value={form.role}
//                     onChange={handleChange}
//                     placeholder="Ex: Student / Employee / Business"
//                     autoComplete="organization-title"
//                     inputMode="text"
//                     enterKeyHint="next"
//                     required
//                     maxLength={80}
//                     className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#EF8354]/70"
//                   />
//                 </div>

//                 {/* Comment */}
//                 <div>
//                   <label className="text-xs text-white/70 flex items-center gap-2">
//                     <MessageSquareText className="h-4 w-4 text-white/60" />
//                     Comment
//                   </label>
//                   <textarea
//                     name="comment"
//                     value={form.comment}
//                     onChange={handleChange}
//                     rows={4}
//                     placeholder="Ex: I love the dashboard, but I want monthly reports..."
//                     autoComplete="off"
//                     enterKeyHint="send"
//                     required
//                     maxLength={500}
//                     className="mt-2 w-full resize-none rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#EF8354]/70"
//                   />
//                 </div>

//                 {/* Button */}
//                 <button
//                   type="submit"
//                   className="w-full rounded-xl bg-[#EF8354] py-4 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
//                 >
//                   Send Feedback
//                 </button>

//                 {/* Success */}
//                 {submitted && (
//                   <div className="rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-sm text-white/80">
//                     Thank you! Your feedback was received.
//                   </div>
//                 )}

//                 {/* Tiny helper note */}
//                 <p className="text-[11px] text-white/50 text-center mt-2">
//                   We use your feedback to improve your FinSage experience.
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import { MessageSquareText, User, Briefcase, Loader2 } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL; // ex: http://localhost:5000

export default function FinSageFeedbackCard() {
  const [form, setForm] = useState({ name: "", role: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setSubmitted(false);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(false);
    setError("");

    if (!form.name.trim() || !form.role.trim() || !form.comment.trim()) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_BASE}/api/feedback`, {
        name: form.name.trim(),
        role: form.role.trim(),
        comment: form.comment.trim(),
      });

      setSubmitted(true);
      setForm({ name: "", role: "", comment: "" });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to send feedback. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="my-12 px-4 sm:px-6 lg:px-0">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-sm">
        {/* Background image like highlight section */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=2000&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Dark overlay for readable text */}
        <div className="absolute inset-0 bg-[#040303]/80" />
        {/* Soft accent glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#EF8354]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
            {/* LEFT: Highlight content */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 border border-white/10 px-3 py-2">
                  <MessageSquareText className="h-4 w-4 text-[#EF8354]" />
                  <span className="text-xs font-semibold tracking-widest text-white/80">
                    SHARE YOUR FEEDBACK
                  </span>
                </div>

                <h3 className="mt-6 text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Help us make{" "}
                  <span className="text-[#EF8354]">FinSage</span> better for you
                </h3>

                <p className="mt-6 text-sm sm:text-base text-white/70 max-w-xl">
                  Your opinion matters. Tell us what you like, what feels
                  confusing, or what features you want to see next in FinSage.
                </p>

                {/* bullets for normal users */}
                <div className="mt-8 space-y-2">
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <span className="h-2 w-2 rounded-full bg-[#EF8354]" />
                    Share your experience using the app
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <span className="h-2 w-2 rounded-full bg-[#EF8354]" />
                    Suggest new features (income, assets, debts, cards)
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <span className="h-2 w-2 rounded-full bg-[#EF8354]" />
                    Report anything that feels hard or unclear
                  </div>
                </div>
              </div>

              {/* footer note */}
              <div className="mt-8 text-xs text-white/60">
                FinSage • Track • Plan • Grow
              </div>
            </div>

            {/* RIGHT: Glass form card */}
            <div className="rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl p-5 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="text-xs text-white/70 flex items-center gap-2">
                    <User className="h-4 w-4 text-white/60" />
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ex: John Doe"
                    autoComplete="name"
                    inputMode="text"
                    enterKeyHint="next"
                    required
                    maxLength={60}
                    className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#EF8354]/70"
                  />
                </div>

                {/* Job Role */}
                <div>
                  <label className="text-xs text-white/70 flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-white/60" />
                    Job Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    placeholder="Ex: Student / Employee / Business"
                    autoComplete="organization-title"
                    inputMode="text"
                    enterKeyHint="next"
                    required
                    maxLength={80}
                    className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#EF8354]/70"
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="text-xs text-white/70 flex items-center gap-2">
                    <MessageSquareText className="h-4 w-4 text-white/60" />
                    Comment
                  </label>
                  <textarea
                    name="comment"
                    value={form.comment}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Ex: I love the dashboard, but I want monthly reports..."
                    autoComplete="off"
                    enterKeyHint="send"
                    required
                    maxLength={500}
                    className="mt-2 w-full resize-none rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#EF8354]/70"
                  />
                </div>

                {/* Button (style same) */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-[#EF8354] py-4 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loading ? "Sending..." : "Send Feedback"}
                </button>

                {/* Error (new, style consistent) */}
                {error && (
                  <div className="rounded-2xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-white/90">
                    {error}
                  </div>
                )}

                {/* Success (same style) */}
                {submitted && (
                  <div className="rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-sm text-white/80">
                    Thank you! Your feedback was received.
                  </div>
                )}

                {/* Tiny helper note */}
                <p className="text-[11px] text-white/50 text-center mt-2">
                  We use your feedback to improve your FinSage experience.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

