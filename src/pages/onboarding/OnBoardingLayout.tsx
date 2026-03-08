import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Stepper from "@/components/Stepper";
import SaveIndicator from "@/components/SaveIndicator";
import StepTransition from "@/components/StepTransition";
import { useFormStore } from "@/store/formStore";

const STEPS = [
  { number: 1, label: "Personal Info" },
  { number: 2, label: "Preferences" },
  { number: 3, label: "Contact" },
  { number: 4, label: "Review" },
];

export default function OnboardingLayout() {
  const location = useLocation();
  const { setStep } = useFormStore();

  useEffect(() => {
    const stepNumber = parseInt(location.pathname.split("/").pop() ?? "1");
    if (!isNaN(stepNumber)) setStep(stepNumber);
  }, [location.pathname, setStep]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-semibold text-slate-900">Get Started</h1>
          <SaveIndicator />
        </div>
        <p className="text-slate-500 mb-8">
          Complete the steps below to set up your profile.
        </p>
        <Stepper steps={STEPS} />
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mt-8">
          <StepTransition>
            <Outlet />
          </StepTransition>
        </div>
      </div>
    </div>
  );
}
