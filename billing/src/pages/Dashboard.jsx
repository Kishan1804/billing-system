import { useOutletContext } from "react-router-dom"
import AdminDashboard from "../components/dashboards/AdminDashboard"
import StaffDashboard from "../components/dashboards/StaffDashboard"
import CustomerDashboard from "../components/dashboards/CustomerDashboard"
import { useState, useEffect } from "react"
import axios from '../utils/axiosInstance';
import LoadingScreen from "../components/common/LoadingScreen"
import { Toaster } from 'react-hot-toast'



const Dashboard = () => {
  const { invoiceList } = useOutletContext()
  const { invoiceCreated } = useOutletContext()
  const { role } = useOutletContext()
  const [loading, setLoading] = useState(false)

  const totalInvoiceCreated = invoiceCreated.length
  const pendingCount = invoiceCreated.filter(invoice => invoice.status === 'pending').length
  const totalInvoices = invoiceList.length
  const totalPaidInvoices = invoiceList.filter(invoice => invoice.status === 'paid').length
  const recentInvoices = invoiceList.slice(0, 5)

  const [totalCustomer, setTotalCustomer] = useState()

  const fetchCustomer = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('/customer')
      setTotalCustomer(data)
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomer()
  }, [])

  if (loading) {
    return <LoadingScreen />
  }


  return (
    <>
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-black">Dashboard</h1>
              <p className="mt-1 text-gray-400"> Manage your payment & invoices</p>
            </div>

            {role === "admin" && <AdminDashboard totalCustomer={totalCustomer} totalInvoices={totalInvoices} paidInvoice={totalPaidInvoices} />}
            {role === "staff" && <StaffDashboard invoiceCreated={totalInvoiceCreated} pendingCount={pendingCount} />}
            {role === "customer" && <CustomerDashboard />}

          </div>
        </div>
      </main>
    </>
  )
}

export default Dashboard