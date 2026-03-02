import React, { useState } from 'react'
import Badge from '../common/Badge'

const Invoicecard = ({ inv, payButton = false }) => {
  const subTotal = inv.items.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0)
  return (
    <>
      <div className='border rounded-md p-4 bg-green-50'>

        <div className='flex items-start justify-between pb-5'>
          <div>
            <h1 className='text-lg font-semibold'>{inv.invoiceNumber}</h1>
            <p className='text-sm text-gray-500'>{inv.createdAt}</p>
          </div>

          <Badge status={inv.status} title={inv.status} />
        </div>

        <div className='space-y-1'>
          <div className='flex justify-between'>
            <h4 className=''>Items:</h4>
            <p className='font-semibold'>{inv.items.length}</p>
          </div>

          <div className='flex justify-between'>
            <h4 className=''>Subtotal:</h4>
            <p className='font-semibold'>₹{subTotal}</p>
          </div>

          <div className='flex justify-between border-b-2 border-slate-300 pb-2'>
            <h4 className=''>Tax%:</h4>
            <p className='font-semibold'>{inv.taxPercent}%</p>
          </div>

          <div className='flex justify-between pt-2 text-lg'>
            <h4 className='font-semibold'>Total</h4>
            <p className='font-bold'>₹{inv.totalAmount}</p>
          </div>
        </div>

        <div className='mt-4 grid grid-cols-2 gap-3'>
          <button className='col-span-2 rounded-md bg-slate-600 py-2 text-sm font-medium text-white hover:bg-slate-700 transition'>View Details</button>

          <button className='rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 transition'>View PDF</button>

          <button className='rounded-md bg-green-600 py-2 text-sm font-medium text-white hover:bg-green-700 transition'>Download PDF</button>
          {payButton ?
            <>
              <button className='col-span-2 rounded-md bg-purple-600 py-2 text-sm font-medium text-white hover:bg-purple-700 transition'>Pay Bill (₹{inv.totalAmount})</button>
            </>
            :
            <>

            </>}

        </div>
      </div>
    </>
  )
}

export default Invoicecard