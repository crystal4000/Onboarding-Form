import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { step1Schema, type Step1Data } from "@/lib/schema";
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
import PhoneInput from "react-phone-input-2";
import type { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useCountries } from "@/hooks/useCountries";

export default function Step1() {
  const navigate = useNavigate();
  const { formData, updateFormData, markStepComplete, setStep } =
    useFormStore();
  const { countries, loading } = useCountries();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      firstName: formData.firstName ?? "",
      lastName: formData.lastName ?? "",
      email: formData.email ?? "",
      phone: formData.phone ?? "",
      country: formData.country ?? "",
    },
  });

  const onSubmit = (data: Step1Data) => {
    updateFormData(data);
    markStepComplete(1);
    setStep(2);
    navigate("/onboarding/2");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="text-lg font-semibold text-slate-900 mb-1">
        Personal Information
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Tell us a bit about yourself.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            {...register("firstName")}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName && (
            <p id="firstName-error" className="text-xs text-red-500">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            {...register("lastName")}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            aria-invalid={!!errors.lastName}
          />
          {errors.lastName && (
            <p id="lastName-error" className="text-xs text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="phone">
            Phone <span className="text-slate-400 font-normal">(optional)</span>
          </Label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                country={"us"}
                value={field.value}
                onChange={(phone, countryData) => {
                  field.onChange(phone);
                  const matched = countries.find(
                    (c) =>
                      c.code.toLowerCase() ===
                      (countryData as CountryData).countryCode?.toLowerCase(),
                  );
                  if (matched) {
                    setValue("country", matched.name, { shouldValidate: true });
                  }
                }}
                inputProps={{
                  id: "phone",
                  name: "phone",
                }}
                containerClass="w-full"
                inputClass="!w-full !h-10 !text-sm !border-slate-200 !rounded-md"
                buttonClass="!border-slate-200 !rounded-l-md"
              />
            )}
          />
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Country */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="country">Country</Label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(val) => field.onChange(val)}
              >
                <SelectTrigger
                  id="country"
                  className="w-full"
                  aria-invalid={!!errors.country}
                >
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {loading ? (
                    <SelectItem value="loading" disabled>
                      Loading countries...
                    </SelectItem>
                  ) : (
                    countries.map((c) => (
                      <SelectItem key={c.code} value={c.name}>
                        {c.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {errors.country && (
            <p id="country-error" className="text-xs text-red-500">
              {errors.country.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}
