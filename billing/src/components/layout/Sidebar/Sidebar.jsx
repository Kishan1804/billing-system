<<<<<<< HEAD
import { useState } from 'react'
import SidebarItem from './SidebarItem'
import { LogOut, Menu } from 'lucide-react'
import Button from '../../common/Button'
import { sidebarConfig } from '../../../config/sidebarConfig';
import { useNavigate } from 'react-router-dom';
=======
import React, { useState } from 'react'
import SidebarItem from './SidebarItem'
import { FileText, LayoutDashboard, LogOut, Menu, Settings, User } from 'lucide-react'
import Button from '../../common/Button'
import { sidebarConfig } from '../../../config/sidebarConfig';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
>>>>>>> bfceb8eb1465516fbee04148322fc39bbe47ef25
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';

const Sidebar = () => {

<<<<<<< HEAD
    const { logout, role } = useAuth()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const menuItems = sidebarConfig[role] || []

    const handleLogOut = () => {
        logout()
        toast.success("Logged out")
        navigate('/login')
    }

    if (!role) return null

    return (
        <>
            <div className='md:hidden items-center justify-between p-4 bg-white shadow'>
                <button onClick={() => setOpen(!open)} aria-label='Toggle navigation menu'>
=======
    const { logout,role } = useAuth()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    if (!role) return null

    const menuItems = sidebarConfig[role] || []


    const handleLogOut = () => {
        logout()
        toast.success("Logged out")
        navigate('/login    ')
    }

    return (
        <>
            <div className='md:hidden items-center justify-between p-4 bg-white shadow'>
                <button onClick={() => setOpen(!open)}>
>>>>>>> bfceb8eb1465516fbee04148322fc39bbe47ef25
                    <Menu />
                </button>
            </div>

            {open && (
                <div className='fixed inset-0 bg-black/40 z-40 md:hidden' onClick={() => setOpen(false)} />
            )}

            <aside className={`fixed md:static z-50 top-0 left-0 w-64 h-screen shrink-0 bg-white shadow flex flex-col transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
                <div className='p-4 border-b'>
                    <h1 className='text-xl font-bold text-blue-800'>MERN Billing</h1>

                </div>


                <nav className='flex-1 p-4 space-y-2 overflow-y-auto'>
                    {menuItems.map((item) => (
<<<<<<< HEAD
                        <SidebarItem key={item.label} label={item.label} path={item.path} icon={item.icon} />
=======
                        < SidebarItem key={item.label} label={item.label} path={item.path} icon={item.icon} />
>>>>>>> bfceb8eb1465516fbee04148322fc39bbe47ef25
                    ))}
                </nav>
                <div className='p-4 border-t'>
                    <Button onClick={handleLogOut} children="Logout" variant='danger_outline' icon={LogOut} size={18} />
                </div>
            </aside>
        </>
    )
}

export default Sidebar