import { z } from "zod";

// Shared schema for contact form validation (client + server)
export const contactFormSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email address"),
  subject: z
    .string({ required_error: "Subject is required" })
    .min(3, "Subject must be at least 3 characters")
    .max(150, "Subject must be at most 150 characters"),
  message: z
    .string({ required_error: "Message is required" })
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to data processing" }),
  }),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;