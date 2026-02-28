import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


const ProtectesRoute = () => {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return null
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return <Outlet />

}

export default ProtectesRoute