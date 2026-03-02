import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


const StaffRoute = () => {
    const { isAuthenticated, auth, loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    if(auth?.role !== 'admin' || auth?.role !== 'staff' ) {
        return <Navigate to='/dashboard' />
    }

    return <Outlet />

}

export default StaffRoute