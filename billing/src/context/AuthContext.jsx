import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)
    const [loading, setLoading] = useState(true)

    // Load auth from localStorage on app start
    useEffect(() => {
        const storedAuth = localStorage.getItem("user")
        if (storedAuth) {
            setAuth(JSON.parse(storedAuth))
        }
        setLoading(false)
    }, [])

    // Login → save user + token
    const login = (authData) => {
        localStorage.setItem("user", JSON.stringify(authData))
        setAuth(authData)
    }

    // Logout → clear everything
    const logout = () => {
        localStorage.removeItem("user")
        setAuth(null)
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                role: auth?.role,
                isAuthenticated: !!auth,
                loading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook
export const useAuth = () => {
    return useContext(AuthContext)
}