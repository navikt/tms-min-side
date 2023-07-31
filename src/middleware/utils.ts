import type { APIContext } from "astro";

export const isLocal = () => process.env.NODE_ENV === "development";
export const isInternal = (context: APIContext) => context.request.url.includes("/internal");
