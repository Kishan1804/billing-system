import { useNavigate, useOutletContext } from "react-router-dom"
import Button from "../components/common/Button"
import AdminDashboard from "../components/dashboards/AdminDashboard"
import StaffDashboard from "../components/dashboards/StaffDashboard"
import CustomerDashboard from "../components/dashboards/CustomerDashboard"
import { useState } from "react"
import axios from '../utils/axiosInstance';
import { useEffect } from "react"
import LoadingScreen from "../components/common/LoadingScreen"
import { Toaster } from 'react-hot-toast'
import MinCard from "../components/cards/MinCard"
import { CircleAlert } from "lucide-react"



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

  console.log(recentInvoices)


  const navigate = useNavigate()
  const [totalCustomer, setTotalCustomer] = useState()

  const handleViewAll = () => {
    navigate('/invoices')
  }

  const fetchCustomer = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('/customer')
      setTotalCustomer(data.length)
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
      <Toaster />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-black">Dashboard</h1>
              <p className="mt-1 text-gray-400"> Manage your payment & invoices</p>
            </div>

            {/* <div className="grid md:grid-cols-4 gap-6"> */}
              {role === "admin" && <AdminDashboard totalCustomer={totalCustomer} totalInvoices={totalInvoices} paidInvoice={totalPaidInvoices} />}
              {role === "staff" && <StaffDashboard invoiceCreated={totalInvoiceCreated} pendingCount={pendingCount} />}
              {role === "customer" && <CustomerDashboard />}
            {/* </div> */}
            {/* <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <div className="rounded-lg border shadow-sm bg-white">
                <div className="space-y-1.5 p-6 flex flex-row items-center justify-between">
                  <div>
                    <div className="text-2xl font-semibold leading-none tracking-tight">Product Stock</div>
                    <div className="text-sm text-gray-400">Manage your product</div>
                  </div>
                  <Button onClick={handleViewAll} children={"View All"} variant="outline" />
                </div>
                <div className="p-6 pt-0">
                  <MinCard customerName={"Bag"} stock={true} />
                </div>
              </div>

              <div className="rounded-lg border shadow-sm bg-white">
                <div className="space-y-1.5 p-6 flex flex-row items-center justify-between">
                  <div>
                    <div className="text-2xl font-semibold leading-none tracking-tight">Recent Invoices</div>
                    <div className="text-sm text-gray-400">Manage your payment & invoices</div>
                  </div>
                  <Button onClick={handleViewAll} children={"View All"} variant="outline" />
                </div>
                <div className="p-6 pt-0">
                  {recentInvoices?.map((inv) => (
                    <MinCard 
                    key={inv._id} 
                    customerName={inv.customerId.firstName +' '+inv.customerId.lastName}  
                    billNo={inv.invoiceNumber}
                    date={inv.createdAt}
                    totalAmount={inv.totalAmount}
                    icon={CircleAlert}
                    status={inv.status}
                    />
                    
                  ))}
                  <div className="text-center py-12">
                    <p className="text-gray-400">No Invoices found</p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </main>
    </>
  )
}

export default Dashboard