import Stepper from "@/components/stepper/Stepper";
import { Outlet } from "react-router-dom";

const STEPS = [
  { number: 1, label: "Personal Info" },
  { number: 2, label: "Preferences" },
  { number: 3, label: "Contact" },
  { number: 4, label: "Review" },
];

export default function OnboardingLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          Get Started
        </h1>
        <p className="text-slate-500 mb-8">
          Complete the steps below to set up your profile.
        </p>
        <Stepper steps={STEPS} />
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
