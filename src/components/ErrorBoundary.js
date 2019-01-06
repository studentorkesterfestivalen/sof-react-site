import React from 'react'
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Uppdatera state så att den re-rendrar
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    //Möjlighet att logga till en service som sen kategoriserar
    //logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // Någon component sen med vettigt felmeddelande
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }

}

export default ErrorBoundary;
