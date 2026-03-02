import React from 'react'
import Badge from '../common/Badge'
import { Link } from 'react-router-dom'
import { CircleAlert, CircleCheck } from 'lucide-react'

const MinCard = ({ name, billNo, date, product = false, totalAmount, icon: Icon, status, stock }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
    }
    const colors = {
        paid: "text-green-700",
        pending: "text-red-400",
    };
    return (
        <>
            <div className="w-full p-3 mt-4 bg-white flex border shadow-sm rounded-lg">
                {product ?
                    <>

                    </> :
                    <>
                        <div>
                            <Icon size={16} className={`h-full items-center ${colors[status]}`} />
                        </div>
                    </>}
                <div className='w-full flex items-center justify-between'>
                    <div className="pl-3">
                        <p className="focus:outline-none text-sm leading-none font-semibold">{name}</p>
                        {product ? 
                        <p className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">Current: {stock} • {formatDate(date)} </p>
                        :
                        <p className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">{billNo} • {formatDate(date)} </p>
                        }
                    </div>
                    {product ?
                        <>
                            <div className='flex gap-2 items-center'>
                                {stock <= 5 ?
                                    <Badge status="pending" title="Low Stock" />
                                    :
                                    <>
                                    </>}
                                <Link to='/products/create' className='text-xs font-medium text-blue-400'>Restock</Link>
                            </div>
                        </>
                        :
                        <>
                            <div className='flex'>
                                <span className='text-sm leading-none font-semibold'>₹{totalAmount}</span>
                            </div>
                        </>}

                </div>
            </div>
        </>
    )
}

export default MinCard