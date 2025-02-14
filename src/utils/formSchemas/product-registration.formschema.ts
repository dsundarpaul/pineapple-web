import { z } from "zod"

export const ProductRegistrationFormSchema = z.object({
  productName: z.string().min(2).max(50),
  productDocLink: z.string().url().optional(),
  githubRepoLink: z.string().url().regex(/github.com/).optional(),
})