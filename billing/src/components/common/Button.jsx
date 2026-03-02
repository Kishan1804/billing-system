import React from 'react'

const Button = ({ children, variant = "primary", icon: Icon, ...props }) => {

    const styles = {
        primary: "bg-blue-600 text-white hover:bg-blue-600/85 hover:cursor-pointer ",
        danger: "bg-red-500 text-white hover:bg-red-500/85 hover:cursor-pointer",
        outline: "border border-gray-300 hover:bg-blue-600 hover:cursor-pointer hover:text-white",
        danger_outline: "border-none text-red-600 hover:bg-red-50 hover:cursor-pointer justify-between flex w-full items-center ",
        black: "bg-black text-white px-6 py-2 rounded hover:cursor-pointer hover:bg-black/80",
    }

    return (
        <button {...props} className={`transition-colors duration-300 ease-in-out h-10 px-3 py-2 rounded-lg inline-flex items-center justify-center gap-3 text-sm font-medium whitespace-nowrap ${styles[variant]}`}>
            {Icon && (
                <Icon size={16} />
            )}
            {children}
        </button>
    )
}

export default Button