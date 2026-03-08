import { useForm, Controller, useWatch } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { step2Schema, type Step2Data } from "@/lib/schema";
import { useFormStore } from "@/store/formStore";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PURCHASE_TYPES = [
  { value: "cash", label: "Cash" },
  { value: "financing", label: "Financing" },
];

const VEHICLE_TYPES = [
  { value: "ev", label: "Electric (EV)" },
  { value: "hybrid", label: "Hybrid" },
  { value: "gas", label: "Gas" },
  { value: "unsure", label: "Unsure" },
];

const CREDIT_SCORE_RANGES = [
  { value: "poor", label: "Poor (300–579)" },
  { value: "fair", label: "Fair (580–669)" },
  { value: "good", label: "Good (670–739)" },
  { value: "very_good", label: "Very Good (740–799)" },
  { value: "exceptional", label: "Exceptional (800–850)" },
];

const EMPLOYMENT_STATUSES = [
  { value: "employed", label: "Employed" },
  { value: "self_employed", label: "Self-employed" },
  { value: "unemployed", label: "Unemployed" },
  { value: "student", label: "Student" },
  { value: "retired", label: "Retired" },
];

export default function Step2() {
  const navigate = useNavigate();
  const { formData, updateFormData, markStepComplete, setStep } =
    useFormStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema) as Resolver<Step2Data>,
    defaultValues: {
      purchaseType: formData.purchaseType,
      vehicleType: formData.vehicleType,
      budgetMin: formData.budgetMin,
      budgetMax: formData.budgetMax,
      creditScoreRange: formData.creditScoreRange,
      employmentStatus: formData.employmentStatus,
      homeCharging: formData.homeCharging,
    },
  });

  const purchaseType = useWatch({ control, name: "purchaseType" });
  const vehicleType = useWatch({ control, name: "vehicleType" });

  const onSubmit = (data: Step2Data) => {
    updateFormData(data);
    markStepComplete(2);
    setStep(3);
    navigate("/onboarding/3");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="text-lg font-semibold text-slate-900 mb-1">
        Purchase Preferences
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Help us understand what you're looking for.
      </p>

      <div className="flex flex-col gap-4">
        {/* Purchase Type */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="purchaseType">Purchase type</Label>
          <Controller
            name="purchaseType"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="purchaseType"
                  className="w-full"
                  aria-invalid={!!errors.purchaseType}
                >
                  <SelectValue placeholder="Select purchase type" />
                </SelectTrigger>
                <SelectContent>
                  {PURCHASE_TYPES.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.purchaseType && (
            <p className="text-xs text-red-500">
              {errors.purchaseType.message}
            </p>
          )}
        </div>

        {/* Conditional: Financing fields */}
        {purchaseType === "financing" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="creditScoreRange">Credit score range</Label>
              <Controller
                name="creditScoreRange"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="creditScoreRange" className="w-full">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      {CREDIT_SCORE_RANGES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="employmentStatus">Employment status</Label>
              <Controller
                name="employmentStatus"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="employmentStatus" className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {EMPLOYMENT_STATUSES.map((e) => (
                        <SelectItem key={e.value} value={e.value}>
                          {e.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        )}

        {/* Vehicle Type */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="vehicleType">Vehicle type</Label>
          <Controller
            name="vehicleType"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="vehicleType"
                  className="w-full"
                  aria-invalid={!!errors.vehicleType}
                >
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  {VEHICLE_TYPES.map((v) => (
                    <SelectItem key={v.value} value={v.value}>
                      {v.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.vehicleType && (
            <p className="text-xs text-red-500">{errors.vehicleType.message}</p>
          )}
        </div>

        {/* Conditional: EV home charging */}
        {vehicleType === "ev" && (
          <div className="flex flex-col gap-1.5 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <Label htmlFor="homeCharging">Home charging available?</Label>
            <Controller
              name="homeCharging"
              control={control}
              render={({ field }) => (
                <Select
                  value={
                    field.value === undefined ? "" : field.value ? "yes" : "no"
                  }
                  onValueChange={(val) => field.onChange(val === "yes")}
                >
                  <SelectTrigger id="homeCharging" className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        )}

        {/* Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="budgetMin">Budget minimum ($)</Label>
            <Input
              id="budgetMin"
              type="number"
              min={0}
              {...register("budgetMin")}
              aria-invalid={!!errors.budgetMin}
            />
            {errors.budgetMin && (
              <p className="text-xs text-red-500">{errors.budgetMin.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="budgetMax">Budget maximum ($)</Label>
            <Input
              id="budgetMax"
              type="number"
              min={0}
              {...register("budgetMax")}
              aria-invalid={!!errors.budgetMax}
            />
            {errors.budgetMax && (
              <p className="text-xs text-red-500">{errors.budgetMax.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={() => {
            setStep(1);
            navigate("/onboarding/1");
          }}
        >
          Back
        </Button>
        <Button
          type="submit"
          className="bg-[#004208] hover:bg-[#005a0a] text-white cursor-pointer"
        >
          Continue
        </Button>
      </div>
    </form>
  );
}
