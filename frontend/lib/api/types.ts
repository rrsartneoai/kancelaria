import { z } from "zod";

// Core domain types
export const AddressSchema = z.object({
  street: z.string().min(1).max(255),
  city: z.string().min(1).max(100),
  postal_code: z.string().regex(/^\d{2}-\d{3}$/),
  country: z.string().length(2).default("PL"),
});

export const ContactSchema = z.object({
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
});

export const SpecializationSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  code: z.string(),
  description: z.string().optional(),
});

export const LawyerSchema = z.object({
  id: z.string().uuid(),
  first_name: z.string(),
  last_name: z.string(),
  title: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  bar_number: z.string().optional(),
});

export const LawFirmSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  tax_number: z.string().regex(/^\d{10}$/),
  krs_number: z
    .string()
    .regex(/^\d{10}$/)
    .optional(),
  founded_date: z.string().datetime().optional(),
  description: z.string().optional(),
  address: AddressSchema,
  contact: ContactSchema,
  business_hours: z.record(z.unknown()).optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  is_active: z.boolean(),
  lawyers: z.array(LawyerSchema).default([]),
  specializations: z.array(SpecializationSchema).default([]),
});

export const LawFirmCreateSchema = z.object({
  name: z.string().min(1).max(255),
  tax_number: z.string().regex(/^\d{10}$/),
  krs_number: z
    .string()
    .regex(/^\d{10}$/)
    .optional(),
  description: z.string().optional(),
  address: AddressSchema,
  contact: ContactSchema,
  specialization_ids: z.array(z.string().uuid()).default([]),
});

export const LawFirmUpdateSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  address: AddressSchema.optional(),
  contact: ContactSchema.optional(),
  specialization_ids: z.array(z.string().uuid()).optional(),
});

// JSON:API Response types
export const JSONAPIResponseSchema = z.object({
  data: z.unknown(),
  included: z.array(z.unknown()).optional(),
  meta: z.record(z.unknown()).optional(),
  links: z.record(z.string()).optional(),
});

export const PaginationMetaSchema = z.object({
  total: z.number(),
  page: z.number().default(1),
  per_page: z.number().default(20),
  pages: z.number(),
  has_next: z.boolean(),
  has_prev: z.boolean(),
});

// Inferred types
export type Address = z.infer<typeof AddressSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type Specialization = z.infer<typeof SpecializationSchema>;
export type Lawyer = z.infer<typeof LawyerSchema>;
export type LawFirm = z.infer<typeof LawFirmSchema>;
export type LawFirmCreate = z.infer<typeof LawFirmCreateSchema>;
export type LawFirmUpdate = z.infer<typeof LawFirmUpdateSchema>;
export type JSONAPIResponse = z.infer<typeof JSONAPIResponseSchema>;
export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

// API Error types
export class LawFirmAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public responseData?: unknown,
  ) {
    super(message);
    this.name = "LawFirmAPIError";
  }
}

// Search parameters
export interface SearchParams {
  q?: string;
  city?: string;
  specializations?: string[];
  page?: number;
  per_page?: number;
  sort?: string;
  order?: "asc" | "desc";
}
