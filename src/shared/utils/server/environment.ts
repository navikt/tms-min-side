export const isProduction = process.env.NAIS_CLUSTER_NAME === "prod-gcp";
export const isLocal = process.env.NODE_ENV === "development";

export const getDecoratorEnvironment = () => (isProduction ? "prod" : "dev");
