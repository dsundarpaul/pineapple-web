import { z } from "zod";

export const CreateProductFormSchema = z.object({
  name: z.string().min(2).max(50),
  domain: z.string().min(2).max(500),
})