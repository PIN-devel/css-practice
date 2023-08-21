import React, { PropsWithChildren } from "react";

export default class ErrorBoundary extends React.Component<
  PropsWithChildren,
  { hasError: boolean }
> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // componentDidCatch(error, info) {
  // Example "componentStack":
  //   in ComponentThatThrows (created by App)
  //   in ErrorBoundary (created by App)
  //   in div (created by App)
  //   in App
  // }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>error</div>;
    }

    return this.props.children;
  }
}
