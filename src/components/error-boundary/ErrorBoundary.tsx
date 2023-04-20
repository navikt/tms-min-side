import React, { ErrorInfo } from "react";
import withStore from "../../store/withStore";
import { StoreState } from "../../store/store";

type Props = {
  children?: React.ReactNode;
  store: StoreState;
};

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.store.setIsError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export default withStore(ErrorBoundary);
