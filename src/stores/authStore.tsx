import React from "react";
import {getTokens} from "./tokenStore.ts";


export interface AuthContextType {
    isAuthorized: boolean
    setAuthorized: (value: boolean) => void
}

export const useAuth = () => React.useContext(AuthContext)

export const AuthContext = React.createContext<AuthContextType>(null!)

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [isAuthorized, setIsAuthorized] = React.useState<boolean>(getTokens().access_token !== null);

    const setAuthorized = React.useCallback((value: boolean) => {
        setIsAuthorized(value)
    }, [])

    return (
        <AuthContext.Provider
            value={{setAuthorized, isAuthorized}}>
            {children}
        </AuthContext.Provider>
    )
}