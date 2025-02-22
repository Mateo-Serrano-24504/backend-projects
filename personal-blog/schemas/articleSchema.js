import { z } from "zod";

const articleSchema = z.object({
    title: z.string(),
    content: z.string()
})

export const parseArticle = article => articleSchema.safeParse(article);