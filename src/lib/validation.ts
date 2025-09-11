import { z } from "zod";

// Shared schema for contact form validation (client + server)
export const contactFormSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z
    .string({ message: "Email is required" })
    .email("Please enter a valid email address"),
  subject: z
    .string({ message: "Subject is required" })
    .min(3, "Subject must be at least 3 characters")
    .max(150, "Subject must be at most 150 characters"),
  message: z
    .string({ message: "Message is required" })
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
  // New optional fields
  phone: z
    .string()
    .trim()
    .min(7, "Phone number seems too short")
    .max(20, "Phone number seems too long")
    .regex(/^[+\d\s().-]+$/, "Please enter a valid phone number")
    .optional(),
  country: z
    .string()
    .trim()
    .min(2, "Country must be at least 2 characters")
    .max(100, "Country must be at most 100 characters")
    .optional(),
  linkedin: z
    .string()
    .url("Please enter a valid LinkedIn profile URL")
    .optional(),
  // Optional product enquiry context
  product: z.string().trim().min(1).max(200).optional(),
  grade: z.string().trim().min(1).max(200).optional(),
  quantity: z.coerce.number().int().positive({ message: "Quantity must be greater than 0" }).optional(),
  consent: z.boolean().refine(val => val === true, {
    message: "You must consent to data processing"
  }),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;