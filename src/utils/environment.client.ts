const isDevelopmentClientSide = window.location.href.includes("www.intern.dev.nav.no");
const isLocalClientSide = process.env.NODE_ENV === "development";

export const getEnvironmentClientSide = () => {
  if (isLocalClientSide) {
    return "local";
  }

  if (isDevelopmentClientSide) {
    return "dev";
  }

  return "prod";
};
