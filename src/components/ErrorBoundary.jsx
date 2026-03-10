import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
          <div className="bg-white rounded-xl shadow-lg border border-red-200 p-8 max-w-lg">
            <h2 className="text-xl font-semibold text-red-700 mb-2">Грешка при зареждане</h2>
            <p className="text-gray-700 mb-4">{this.state.error?.message || 'Неочаквана грешка'}</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
            >
              Опитай отново
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
