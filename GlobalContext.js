import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};
