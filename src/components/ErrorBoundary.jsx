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
      const err = this.state.error;
      const msg = err?.message || 'Неочаквана грешка';
      const stack = err?.stack || '';
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
          <div className="bg-white rounded-xl shadow-lg border border-red-200 p-8 max-w-2xl">
            <h2 className="text-xl font-semibold text-red-700 mb-2">Грешка при зареждане</h2>
            <p className="text-gray-700 mb-4 font-mono text-sm break-all">{msg}</p>
            {stack && (
              <details className="mb-4">
                <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">Покажи stack trace</summary>
                <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-40 font-mono text-gray-600">{stack}</pre>
              </details>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
              >
                Опитай отново
              </button>
              {stack && (
                <button
                  onClick={() => navigator.clipboard?.writeText(`${msg}\n\n${stack}`)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Копирай грешката
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
