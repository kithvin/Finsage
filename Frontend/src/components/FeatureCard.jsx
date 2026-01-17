import React from "react";

export default function FeatureCard({ title, description }) {
  return (
    <div className="border rounded-xl p-6 hover:shadow-md transition">
      <div className="w-10 h-10 rounded bg-orange-100 text-orange-500 flex items-center justify-center mb-4">
        $
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
