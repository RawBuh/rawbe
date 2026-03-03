import React, { createContext, useContext, useState } from 'react';

const QuoteContext = createContext(null);

export const QuoteProvider = ({ children }) => {
  const [quoteData, setQuoteData] = useState(null);
  return (
    <QuoteContext.Provider value={{ quoteData, setQuoteData }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => useContext(QuoteContext);
