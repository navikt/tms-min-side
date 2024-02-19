import React from "react";
import { faro } from "@grafana/faro-web-sdk";
import { setIsError } from "../../store/store.ts";

type Props = {
  children?: React.ReactNode;
};

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    setIsError();
    faro.api.pushLog([`Feil i en mikrofrontend: ${error}`]);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
