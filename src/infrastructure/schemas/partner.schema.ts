import { z } from "zod";

export const createPartnerRequestSchema = z.object({
  id: z.string().min(3, "Id must have at least 3 characters").max(20).optional(),
  name: z.string().min(3, "Name must have at least 3 characters").max(20),
  active: z.boolean().default(true)
});

export const updatePartnerParamsSchema = z.object({
  id: z.string().min(3).max(20)
});

export const updatePartnerBodySchema = z.object({
  name: z.string().min(3).max(20).optional(),
  active: z.boolean().optional()
});