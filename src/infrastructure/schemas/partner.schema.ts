import { z } from "zod";

export const createPartnerRequestSchema = z.object({
  id: z.string().min(3, "Id must have at least 3 characters").max(36).optional(),
  name: z.string().min(3, "Name must have at least 3 characters").max(50),
  active: z.boolean().default(true)
});

export const updatePartnerParamsSchema = z.object({
  id: z.string().min(3).max(36)
});

export const updatePartnerBodySchema = z.object({
  name: z.string().min(3).max(50).optional(),
  active: z.boolean().optional()
});
