import { z } from "zod";

// Shared schema for contact form validation (client + server)
export const contactFormSchema = z.object({
  // reCAPTCHA token (added for server-side validation)
  captchaToken: z.string().optional(),
  // Support both name field and firstName/lastName fields
  name: z.string().optional(),
  firstName: z
    .string({ message: "First name is required" })
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters")
    .optional(),
  lastName: z
    .string({ message: "Last name is required" })
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters")
    .optional(),
  email: z
    .string({ message: "Email is required" })
    .email("Please enter a valid email address"),
  subject: z
    .string()
    .max(150, "Subject must be at most 150 characters")
    .optional(),
  message: z
    .string({ message: "Message is required" })
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
  // Phone with country code (from PhoneInput component)
  phone: z
    .string({ message: "Phone number is required" })
    .trim()
    .min(7, "Phone number seems too short")
    .max(20, "Phone number seems too long")
    .regex(/^[+\d\s().-]+$/, "Please enter a valid phone number"),
  country: z
    .string({ message: "Country is required" })
    .trim()
    .min(2, "Country must be at least 2 characters")
    .max(100, "Country must be at most 100 characters"),
  postalCode: z
    .string({ message: "Postal/Zip code is required" })
    .trim()
    .min(3, "Postal code must be at least 3 characters")
    .max(20, "Postal code must be at most 20 characters")
    .regex(/^[A-Za-z0-9\s-]+$/, "Please enter a valid postal code"),
  linkedin: z
    .string({ message: "LinkedIn ID is required" })
    .url("Please enter a valid LinkedIn profile URL"),
  // Optional product enquiry context
  product: z.string().trim().min(1).max(200).optional(),
  grade: z.string().trim().min(1).max(200).optional(),
  quantity: z.coerce.number().int().positive({ message: "Quantity must be greater than 0" }).optional(),
  consent: z.boolean().refine(val => val === true, {
    message: "You must consent to data processing"
  }),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;