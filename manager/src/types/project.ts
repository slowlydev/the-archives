import { z } from "astro:content";

export const project = z.object({
	title: z.string(),
	description: z.string(),
	creationDate: z.string().transform((val) => new Date(val)),
	archivalDate: z.string().transform((val) => new Date(val)),

	heroImage: z.string().optional(),
	repoLink: z.string().optional(),

	technologies: z.array(z.string()),
});

export type ProjectType = z.infer<typeof project>;
