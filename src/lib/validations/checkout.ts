import { z } from 'zod';

export const addressSchema = z.object({
  firstName: z.string()
    .trim()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "First name contains invalid characters" }),
  lastName: z.string()
    .trim()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Last name contains invalid characters" }),
  email: z.string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .max(100, { message: "Email must be less than 100 characters" }),
  phone: z.string()
    .trim()
    .regex(/^[+]?[0-9\s()-]{0,20}$/, { message: "Invalid phone number format" })
    .optional()
    .or(z.literal('')),
  addressLine1: z.string()
    .trim()
    .min(1, { message: "Address is required" })
    .max(100, { message: "Address must be less than 100 characters" }),
  addressLine2: z.string()
    .trim()
    .max(100, { message: "Address line 2 must be less than 100 characters" })
    .optional()
    .or(z.literal('')),
  city: z.string()
    .trim()
    .min(1, { message: "City is required" })
    .max(50, { message: "City must be less than 50 characters" }),
  state: z.string()
    .trim()
    .min(1, { message: "State/County is required" })
    .max(50, { message: "State must be less than 50 characters" }),
  postalCode: z.string()
    .trim()
    .min(1, { message: "Postal code is required" })
    .regex(/^[A-Z0-9\s-]{3,10}$/i, { message: "Invalid postal code format" }),
  country: z.string()
    .trim()
    .min(1, { message: "Country is required" })
    .max(50, { message: "Country must be less than 50 characters" }),
});

export type ValidatedAddress = z.infer<typeof addressSchema>;

export const checkoutSchema = z.object({
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  sameAsShipping: z.boolean(),
});

export type ValidatedCheckout = z.infer<typeof checkoutSchema>;
