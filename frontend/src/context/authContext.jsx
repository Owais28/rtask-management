import { createContext, useState } from "react";

export const AuthContext = createContext({ isLoggedIn: false })

export function AuthContextProvider({ children }) {

  const [authData, setAuthData] = useState({ isLoggedIn: true })
  return <AuthContext.Provider value={{ authData, setAuthData }}>
    {children}
  </AuthContext.Provider>
} 