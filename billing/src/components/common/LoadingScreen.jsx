import React from 'react'

const LoadingScreen = ({ text = 'Loading...' }) => {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500">{text}</p>
            </div>
        </div>
    )
}

export default LoadingScreen