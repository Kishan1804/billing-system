import axios from '../utils/axiosInstance'
import Sidebar from '../components/layout/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

const DashboardLayout = () => {
  const [invoiceList, setInvoiceList] = useState([])
  const [role, setRole] = useState("")
  const [invoiceCreated, setInvoiceCreated] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchInvoice = async () => {
    try {
      const { data } = await axios.get('/invoice/list')
      setInvoiceList(data.invoiceList)
      setRole(data.role)
      setInvoiceCreated(data.invoiceCreated)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchInvoice()
  }, [])

  return (
    <>
      <div className='flex h-screen overflow-hidden '>

        <Sidebar />

        <div className='flex flex-col flex-1'>

          <header className="h-14 bg-white border-b shrink-0">

            <nav>navbar</nav>
          </header>

          <main className='flex-1 overflow-y-auto bg-gray-100'>
            <Outlet context={{ invoiceList, role, invoiceCreated, refreshInvoices: fetchInvoice }} />
          </main>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout