"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const plans = [
  {
    title: "Free",
    price: "₹0",
    description: "Great for trying out AI consultations.",
    features: [
      "Access to 2 AI consultants",
      "Basic chat consultation",
      "Limited voice calls (5 calls per month)",
    ],
    cta: "Start for Free",
    highlight: false,
  },
  {
    title: "Premium",
    price: "₹499/month",
    description: "Best for regular, in-depth medical support.",
    features: [
      "Unlimited AI consultants",
      "Voice & chat consultations",
      "Priority response speed",
      "Unlimited voice call duration",
    ],
    cta: "Upgrade to Premium",
    highlight: true,
  },
];

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  return (
    <section className="md:py-20 py-8 mt-6 bg-[#f0fdfa] px-6 rounded-xl">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="md:text-3xl text-2xl font-bold text-[#0f172a]">Simple Pricing</h2>
        <p className="text-gray-600 mt-2">
          Choose the plan that works best for your health journey.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {plans.map((plan, index) => {
          const isSelected = selectedPlan === plan.title;
          return (
            <div
              key={index}
              onClick={() => setSelectedPlan(plan.title)}
              className={`w-full max-w-sm rounded-2xl p-6 shadow-md cursor-pointer border-2 transition-all ${
                isSelected
                  ? "border-[#019c6f] ring-1 ring-[#019c6f]"
                  : "border-gray-200"
              } ${plan.highlight ? "bg-white" : "bg-white"}`}
            >
              <h3 className="text-xl font-semibold text-[#0f172a]">
                {plan.title}
              </h3>
              <p className="text-3xl font-bold text-[#019c6f] mt-2">
                {plan.price}
              </p>
              <p className="text-gray-500 mt-1 mb-4 text-sm">
                {plan.description}
              </p>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <CheckCircle2 className="text-[#019c6f]" size={16} />{" "}
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.highlight
                    ? "bg-[#019c6f] hover:bg-[#017a59] text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

