import { useFormStore } from "@/store/formStore";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  label: string;
}

export default function Stepper({ steps }: { steps: Step[] }) {
  const { currentStep, completedSteps } = useFormStore();

  return (
    <div className="flex items-start justify-center w-full">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.number);
        const isActive = currentStep === step.number;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.number} className="flex items-start">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors shrink-0",
                  isCompleted && "bg-[#004208] border-[#004208] text-white",
                  isActive &&
                    !isCompleted &&
                    "border-[#004208] text-[#004208] bg-white",
                  !isActive &&
                    !isCompleted &&
                    "border-slate-300 text-slate-400 bg-white",
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.number}
              </div>
              <span
                className={cn(
                  "hidden sm:block text-xs font-medium mt-1 text-center w-16",
                  isActive ? "text-[#004208]" : "text-slate-400",
                )}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "h-0.5 w-12 sm:w-20 mx-1 mt-[18px] shrink-0 transition-colors",
                  isCompleted ? "bg-[#004208]" : "bg-slate-200",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
