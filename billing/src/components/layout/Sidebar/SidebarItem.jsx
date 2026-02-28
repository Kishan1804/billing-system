import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const SidebarItem = ({ label, icon: Icon, path }) => {
    return (
        <NavLink 
        key={label} 
        to={path} 
        className={({isActive}) => `gap-2 font-medium flex items-center px-2 py-1.5 rounded-lg ${isActive ? "bg-blue-100 text-blue-800 font-semibold" : "hover:bg-neutral-100 hover:text-blue-800"}`}>
            <Icon size={18} /> {label}
        </NavLink>
    )
}

export default SidebarItem