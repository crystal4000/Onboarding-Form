import { useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { step3Schema, type Step3Data } from "@/lib/schema";
import { useFormStore } from "@/store/formStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Step3() {
  const navigate = useNavigate();
  const { formData, updateFormData, markStepComplete, setStep } =
    useFormStore();

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema) as Resolver<Step3Data>,
    defaultValues: {
      contactMethod: formData.contactMethod,
      addressLine1: formData.addressLine1 ?? "",
      city: formData.city ?? "",
      postalCode: formData.postalCode ?? "",
      testDriveDateTime: formData.testDriveDateTime ?? "",
    },
  });

  const contactMethod = useWatch({ control, name: "contactMethod" });
  const watchedValues = useWatch({ control });

  // auto-save
  useEffect(() => {
    updateFormData(watchedValues);
  }, [watchedValues]);

  const onSubmit = (data: Step3Data) => {
    // cross-step validation: phone required if contact method is phone or whatsapp
    if (
      (data.contactMethod === "phone" || data.contactMethod === "whatsapp") &&
      !formData.phone
    ) {
      setError("contactMethod", {
        message:
          "You selected Phone/WhatsApp but didn't provide a phone number. Please go back to Step 1 and add one.",
      });
      return;
    }

    updateFormData(data);
    markStepComplete(3);
    setStep(4);
    navigate("/onboarding/4");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="text-lg font-semibold text-slate-900 mb-1">
        Contact & Schedule
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        How should we reach you, and where are you located?
      </p>

      <div className="flex flex-col gap-4">
        {/* Contact Method */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="contactMethod">Preferred contact method</Label>
          <Controller
            name="contactMethod"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="contactMethod"
                  className="w-full"
                  aria-invalid={!!errors.contactMethod}
                >
                  <SelectValue placeholder="Select contact method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.contactMethod && (
            <p className="text-xs text-red-500">
              {errors.contactMethod.message}
            </p>
          )}
        </div>

        {/* Cross-step warning */}
        {(contactMethod === "phone" || contactMethod === "whatsapp") &&
          !formData.phone && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-700">
                You haven't added a phone number yet.{" "}
                <button
                  type="button"
                  className="underline font-medium cursor-pointer"
                  onClick={() => {
                    setStep(1);
                    navigate("/onboarding/1");
                  }}
                >
                  Go back to Step 1
                </button>{" "}
                to add one.
              </p>
            </div>
          )}

        {/* Address */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="addressLine1">Address line 1</Label>
          <Input
            id="addressLine1"
            {...register("addressLine1")}
            aria-invalid={!!errors.addressLine1}
          />
          {errors.addressLine1 && (
            <p className="text-xs text-red-500">
              {errors.addressLine1.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* City */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              {...register("city")}
              aria-invalid={!!errors.city}
            />
            {errors.city && (
              <p className="text-xs text-red-500">{errors.city.message}</p>
            )}
          </div>

          {/* Postal Code */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="postalCode">Postal code</Label>
            <Input
              id="postalCode"
              {...register("postalCode")}
              aria-invalid={!!errors.postalCode}
            />
            {errors.postalCode && (
              <p className="text-xs text-red-500">
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>

        {/* Test Drive */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="testDriveDateTime">
            Test drive date & time{" "}
            <span className="text-slate-400 font-normal">(optional)</span>
          </Label>
          <Input
            id="testDriveDateTime"
            type="datetime-local"
            {...register("testDriveDateTime")}
            aria-invalid={!!errors.testDriveDateTime}
          />
          {errors.testDriveDateTime && (
            <p className="text-xs text-red-500">
              {errors.testDriveDateTime.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={() => {
            setStep(2);
            navigate("/onboarding/2");
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
