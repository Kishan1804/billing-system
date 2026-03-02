import React from 'react'

const Productcard = ({ product }) => {
    return (
        <>
            <div className='max-w-xs w-full bg-white rounded-lg shadow-lg overflow-hidden'>
                <div>
                    <img className='object-cover h-64 w-full' src={`http://localhost:3000/uploads/${product.image}`} alt="Converse sneakers" />
                </div>
                <div className='flex flex-col gap-1 mt-4 px-4'>
                    <h2 className='text-lg font-semibold text-gray-800'>{product.name}</h2>
                    <span className='font-normal text-gray-600'>{product.description}</span>
                    <span className='font-bold text-gray-800'>₹ {product.price}</span>
                    <span className='flex justify-end font-semibold text-gray-800'>Stock - {product.stock}</span>
                </div>

                <div className='mt-4 p-4 border-t border-gray-200'>
                    <span className='text-taupe-700 font-semibold '>Contact staff to order items</span>
                </div>

            </div>
        </>

    )
}

export default Productcard