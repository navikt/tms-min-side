import type { APIContext } from "astro";

export const isProduction = process.env.NAIS_CLUSTER_NAME === "prod-gcp";
export const isLocal = process.env.NODE_ENV === "development";
export const isInternal = (context: APIContext) => context.request.url.includes("/internal");

export const getDecoratorEnvironment = () => (isProduction ? "prod" : "dev");
