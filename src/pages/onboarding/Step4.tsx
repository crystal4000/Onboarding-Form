import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormStore } from "@/store/formStore";
import { Button } from "@/components/ui/button";

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value?: string | number | boolean;
}) {
  if (value === undefined || value === null || value === "") return null;
  const display =
    typeof value === "boolean" ? (value ? "Yes" : "No") : String(value);
  return (
    <div className="flex justify-between py-2 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-900 text-right max-w-[60%]">
        {display}
      </span>
    </div>
  );
}

function Section({
  title,
  step,
  children,
}: {
  title: string;
  step: number;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { setStep } = useFormStore();

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          {title}
        </h3>
        <button
          type="button"
          onClick={() => {
            setStep(step);
            navigate(`/onboarding/${step}`);
          }}
          className="text-xs text-indigo-600 hover:underline font-medium"
        >
          Edit
        </button>
      </div>
      <div className="bg-slate-50 rounded-lg px-4">{children}</div>
    </div>
  );
}

function SuccessScreen() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-slate-900 mb-2">
        You're all set!
      </h2>
      <p className="text-slate-500 text-sm max-w-sm">
        Thanks for completing the onboarding. We'll be in touch shortly based on
        your preferences.
      </p>
    </div>
  );
}

export default function Step4() {
  const { formData, setStep, resetForm } = useFormStore();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    setSubmitted(true);
    resetForm();
  };

  if (submitted) return <SuccessScreen />;

  const formatBudget = (val?: number) =>
    val ? `$${val.toLocaleString()}` : undefined;
  const formatDateTime = (val?: string) => {
    if (!val) return undefined;
    return new Date(val).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };
  const formatEnum = (val?: string) => {
    if (!val) return undefined;
    return val.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-900 mb-1">
        Review & Submit
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Check everything looks right before submitting.
      </p>

      <Section title="Personal Information" step={1}>
        <ReviewRow label="First name" value={formData.firstName} />
        <ReviewRow label="Last name" value={formData.lastName} />
        <ReviewRow label="Email" value={formData.email} />
        <ReviewRow label="Phone" value={formData.phone} />
        <ReviewRow label="Country" value={formData.country} />
      </Section>

      <Section title="Purchase Preferences" step={2}>
        <ReviewRow
          label="Purchase type"
          value={formatEnum(formData.purchaseType)}
        />
        <ReviewRow
          label="Vehicle type"
          value={formatEnum(formData.vehicleType)}
        />
        <ReviewRow
          label="Budget minimum"
          value={formatBudget(formData.budgetMin)}
        />
        <ReviewRow
          label="Budget maximum"
          value={formatBudget(formData.budgetMax)}
        />
        <ReviewRow
          label="Credit score range"
          value={formatEnum(formData.creditScoreRange)}
        />
        <ReviewRow
          label="Employment status"
          value={formatEnum(formData.employmentStatus)}
        />
        <ReviewRow label="Home charging" value={formData.homeCharging} />
      </Section>

      <Section title="Contact & Schedule" step={3}>
        <ReviewRow
          label="Contact method"
          value={formatEnum(formData.contactMethod)}
        />
        <ReviewRow label="Address" value={formData.addressLine1} />
        <ReviewRow label="City" value={formData.city} />
        <ReviewRow label="Postal code" value={formData.postalCode} />
        <ReviewRow
          label="Test drive"
          value={formatDateTime(formData.testDriveDateTime)}
        />
      </Section>

      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(3)}
          className="cursor-pointer"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="cursor-pointer"
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}
