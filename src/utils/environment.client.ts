let isDevelopmentClientSide:boolean = false;
let isLocalClientSide:boolean = false;

if (!import.meta.env.SSR) {
  isDevelopmentClientSide = window.location.href.includes("dev.nav.no") ;
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

export const getDevBaseUrl = () => {
  if(window.location.href.includes("intern.dev.nav.no")){
    return "https://www.intern.dev.nav.no"
  }
  return "https://www.ansatt.dev.nav.no"
}
