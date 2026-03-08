import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FormData } from "@/types/form";

interface FormStore {
  currentStep: number;
  formData: Partial<FormData>;
  completedSteps: number[];
  setStep: (step: number) => void;
  updateFormData: (data: Partial<FormData>) => void;
  markStepComplete: (step: number) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      formData: {},
      completedSteps: [],
      setStep: (step) => set({ currentStep: step }),
      updateFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),
      markStepComplete: (step) =>
        set((state) => ({
          completedSteps: [...new Set([...state.completedSteps, step])],
        })),
      resetForm: () =>
        set({ currentStep: 1, formData: {}, completedSteps: [] }),
    }),
    { name: "onboarding-draft" },
  ),
);
