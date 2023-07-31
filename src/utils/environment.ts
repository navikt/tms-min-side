const isDevelopment = process.env.NAIS_CLUSTER_NAME === "dev-gcp";

export const getEnvironment = () => {
  if (isDevelopment) {
    return "dev";
  }

  return "prod";
};
