import { useEffect } from "react";

const useUXSignalScript = (ready: boolean) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://uxsignals-frontend.uxsignals.app.iterate.no/embed.js";
    if (ready) {
      document.body.appendChild(script);
    }

    return () => {
      try {
        document.body.removeChild(script);
      } catch {
      }
    };
  }, [ready]);
};

export default useUXSignalScript;
