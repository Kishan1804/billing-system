import { useOutletContext } from 'react-router-dom'
import Invoicecard from '../components/cards/Invoicecard'
import { useState } from 'react'

const Invoices = () => {
  const { invoiceList, role, invoiceCreated } = useOutletContext()

  const sourceInvoice = role === 'staff' ? invoiceCreated : invoiceList


  return (
    <>
      {role == "customer" ?
        <>
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl font-bold text-black">All Invoices</h1>
            </div>
            <div className='rounded-lg border shadow-sm bg-white'>
              <div className='p-6'>
                {invoiceCreated.length === 0 ? (
                  <p className='text-gray-400 text-center'>No invoices found</p>
                ) : (
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-3 py-2'>
                    {invoiceCreated.map(inv => (
                      <Invoicecard key={inv._id} inv={inv} payButton={true} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
        </>
        :
        <>
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-6xl mx-auto">
              <div>
                <h1 className="text-3xl font-bold text-black">All Invoices</h1>
              </div>

              <div className="rounded-lg border shadow-sm bg-white">
                <div className='p-6'>
                  {sourceInvoice.length === 0 ? (
                    <p className='text-gray-400 text-center'>No invoices found</p>
                  ) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-3 py-2'>
                      {sourceInvoice.map(inv => (
                        <Invoicecard key={inv._id} inv={inv} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>

        </>
      }
    </>
  )
}

export default Invoices