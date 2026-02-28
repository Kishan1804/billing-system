import { Navigate, Route, Routes } from 'react-router-dom'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

import DashboardLayout from '../layouts/DashboardLayout'
import Dashboard from '../pages/Dashboard'
import Products from '../pages/Products'
import Invoices from '../pages/Invoices'
import Settings from '../pages/Settings'
import Contact from '../pages/Contact'
import InvoiceCreate from '../pages/InvoiceCreate'
import ProtectesRoute from '../route/ProtectesRoute'
import ProductCreate from '../pages/ProductCreate'
import AdminRoute from '../route/AdminRoute'
import StaffRoute from '../route/StaffRoute'

const RoutesConfig = () => {
    return (
        <>
            <Routes>
                {/* Public */}
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />


                {/* Protected */}
                <Route element={<ProtectesRoute />}>
                    <Route element={<DashboardLayout />} >
                        <Route path='/dashboard' element={<Dashboard />} />

                        <Route path='/products' element={<Products />} />

                        <Route path='/invoices' element={<Invoices />} />

                        <Route path='/profile' element={<Settings />} />

                        <Route path='/contact' element={<Contact />} />

                        {/* <Route element={<AdminRoute />} > */}
                            <Route path='/invoice/create' element={<InvoiceCreate />} />

                            <Route path='/products/create' element={<ProductCreate />} />
                        {/* </Route> */}

                    </Route>
                </Route>


                {/* Fallback */}
                <Route path='*' element={<Navigate to="/dashboard" />} />
            </Routes>
        </>
    )
}

export default RoutesConfig 