let isDevelopmentClientSide:boolean = false;
let isLocalClientSide:boolean = false;

if (!import.meta.env.SSR) {
  isDevelopmentClientSide = window.location.href.includes("www.intern.dev.nav.no");
  isLocalClientSide = process.env.NODE_ENV === "development";
}

export const getEnvironmentClientSide = () => {
  if (isLocalClientSide) {
    return "local";
  }

  if (isDevelopmentClientSide) {
    return "dev";
  }

  return "prod";
};
