import { z } from "zod";

export const step1Schema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  country: z.string().min(1, "Please select a country"),
});

export const step2Schema = z
  .object({
    purchaseType: z.enum(["cash", "financing"], {
      message: "Please select a purchase type",
    }),
    vehicleType: z.enum(["ev", "hybrid", "gas", "unsure"], {
      message: "Please select a vehicle type",
    }),
    budgetMin: z.coerce.number().min(1, "Budget minimum is required"),
    budgetMax: z.coerce.number().min(1, "Budget maximum is required"),
    creditScoreRange: z
      .enum(["poor", "fair", "good", "very_good", "exceptional"])
      .optional(),
    employmentStatus: z
      .enum(["employed", "self_employed", "unemployed", "student", "retired"])
      .optional(),
    homeCharging: z.boolean().optional(),
  })
  .refine((data) => data.budgetMin <= data.budgetMax, {
    message: "Budget minimum must be less than or equal to maximum",
    path: ["budgetMin"],
  });

export const step3Schema = z
  .object({
    contactMethod: z.enum(["email", "phone", "whatsapp"], {
      message: "Please select a contact method",
    }),
    addressLine1: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    testDriveDateTime: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.testDriveDateTime) return true;
      return new Date(data.testDriveDateTime) > new Date();
    },
    {
      message: "Test drive date must be in the future",
      path: ["testDriveDateTime"],
    },
  );

export type Step3Data = z.infer<typeof step3Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step1Data = z.infer<typeof step1Schema>;
