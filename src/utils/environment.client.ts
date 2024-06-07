let isDevelopmentClientSide: boolean = false;
let isLocalClientSide: boolean = false;

if (!import.meta.env.SSR) {
  isDevelopmentClientSide = window.location.href.includes("dev.nav.no");
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

const devInternUrl: string = "https://www.intern.dev.nav.no"
const devAnsattUrl: string = "https://www.ansatt.dev.nav.no"
export const getDevBaseUrl =
  window.location.href.includes("intern.dev.nav.no") ? devInternUrl: devAnsattUrl;

