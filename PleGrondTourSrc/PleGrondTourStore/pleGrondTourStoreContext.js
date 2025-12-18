import React, { createContext, useContext, useState } from 'react';

export const StoreContext = createContext(undefined);

export const useStorage = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }) => {
  const [isEnabledBackgroundMusic, setIsEnabledBackgroundMusic] =
    useState(false);
  const [isEnabledVibration, setIsEnabledVibration] = useState(false);

  const contextValue = {
    isEnabledBackgroundMusic,
    setIsEnabledBackgroundMusic,
    isEnabledVibration,
    setIsEnabledVibration,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
