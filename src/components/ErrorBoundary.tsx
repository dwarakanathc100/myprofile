import { Component, type ReactNode } from "react";

export class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return this.props.fallback ?? <div className="fixed inset-0 bg-ink" />;
    }
    return this.props.children;
  }
}
