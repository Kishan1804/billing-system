import { CircleAlert, CircleCheckBig, DollarSign, FileText, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Statcard from '../cards/Statcard'
import Button from '../common/Button'
import MinCard from '../cards/MinCard'
import { useNavigate, useOutletContext } from 'react-router-dom'

const AdminDashboard = () => {
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
        <><div className="grid md:grid-cols-4 gap-6">
            <Statcard title="Total Revenue" value={`INR ${10000}`} desc={`${totalInvoices} invoices`} icon={DollarSign} color="text-blue-600" />
            <Statcard title="Total Invoices" value={totalInvoices} desc="All time" icon={FileText} color="text-green-600" />
            <Statcard title="Total Customers" value={totalCustomer} desc="All" icon={User} color="text-amber-600" />
            <Statcard title="Paid Invoices" value={"paidInvoice"} desc="Paid" icon={CircleCheckBig} color="text-cyan-600" />
        </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
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
                                customerName={inv.customerId.firstName + ' ' + inv.customerId.lastName}
                                billNo={inv.invoiceNumber}
                                date={inv.createdAt}
                                totalAmount={inv.totalAmount}
                                icon={CircleAlert}
                                status={inv.status}
                            />

                        ))}
                        {/* <div className="text-center py-12">
                    <p className="text-gray-400">No Invoices found</p>
                  </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard