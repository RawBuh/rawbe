import React, { createContext, useContext, useState } from 'react';

const defaultContextValue = { quoteData: null, setQuoteData: () => {} };
const QuoteContext = createContext(defaultContextValue);

export const QuoteProvider = ({ children }) => {
  const [quoteData, setQuoteData] = useState(null);
  return (
    <QuoteContext.Provider value={{ quoteData, setQuoteData }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => useContext(QuoteContext) ?? defaultContextValue;
