import { defineCollection, z } from "astro:content";

import { project } from "../types/project";

const projectCollection = defineCollection({
	type: "content",
	schema: project,
});

export const collections = {
	websites: projectCollection,
	school: projectCollection,
	other: projectCollection,
};
