import React, {createContext, useState, useEffect} from 'react'

const TokenContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => {}
})

export const TokenProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          setIsAuthenticated(true);
        }
      }, []);

    return (
        <TokenContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </TokenContext.Provider>
    )
}


export default TokenContext