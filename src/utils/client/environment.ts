let isDevelopmentClientSide: boolean = false;
let isLocalClientSide: boolean = false;
let devBaseUrl: string = "https://www.ansatt.dev.nav.no";

export const isAnsattClientSide = window.location.href.includes("ansatt.dev.nav.no");

if (!import.meta.env.SSR) {
  isDevelopmentClientSide = window.location.href.includes("dev.nav.no");
  isLocalClientSide = process.env.NODE_ENV === "development";
  if(window.location.href.includes("intern.dev.nav.no")){
    devBaseUrl = "https://www.intern.dev.nav.no";
  }
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

export const getDevBaseUrl = devBaseUrl;