export type PurchaseType = "cash" | "financing";
export type VehicleType = "ev" | "hybrid" | "gas" | "unsure";
export type ContactMethod = "email" | "phone" | "whatsapp";
export type CreditScoreRange =
  | "poor"
  | "fair"
  | "good"
  | "very_good"
  | "exceptional";
export type EmploymentStatus =
  | "employed"
  | "self_employed"
  | "unemployed"
  | "student"
  | "retired";

export interface FormData {
  // Step 1
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country: string;

  // Step 2
  purchaseType?: PurchaseType;
  vehicleType?: VehicleType;
  budgetMin?: number;
  budgetMax?: number;
  creditScoreRange?: CreditScoreRange;
  employmentStatus?: EmploymentStatus;
  homeCharging?: boolean;

  // Step 3
  contactMethod?: ContactMethod;
  addressLine1: string;
  city: string;
  postalCode: string;
  testDriveDateTime?: string;
}
