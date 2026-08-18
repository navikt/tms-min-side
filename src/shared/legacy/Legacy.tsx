import { withApmErrorBoundary } from "@nais/apm/react";
import { useLogComposition } from "./useLogComposition";

interface Props {
  url: string;
}

const Legacy = ({ url }: Props) => {
  useLogComposition(url);

  return null;
};

export default withApmErrorBoundary(Legacy, {
  fingerprint: "legacy-composition-render",
});
