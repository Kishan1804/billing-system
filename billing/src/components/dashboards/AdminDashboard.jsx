import { CircleAlert, CircleCheckBig, DollarSign, FileText, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import Statcard from '../cards/Statcard'
import Button from '../common/Button'
import MinCard from '../cards/MinCard'
import { useNavigate, useOutletContext } from 'react-router-dom'
import axios from '../../utils/axiosInstance'
import LoadingScreen from "../common/LoadingScreen"

const AdminDashboard = ({ totalCustomer, totalInvoices, paidInvoice }) => {
    const formatAmount = (value) => {
        return Number(value || 0).toLocaleString('en-IN')
    }
    const [loading, setLoading] = useState(false)
    const [productList, setProductList] = useState([])
    const { invoiceList, invoiceCreated, role } = useOutletContext()
    const navigate = useNavigate()

    const recentInvoices = invoiceList.slice(0, 5)

    const totalRevenue = invoiceList.reduce((acc, inv) => acc + Number(inv.totalAmount || 0), 0)


    const handleViewAll = () => {
        navigate('/invoices')
    }

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get('/product/list')
            setProductList(data.productList)
        }
        catch (err) {

        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    console.log(productList)

    return (
        <>
            <div className="grid md:grid-cols-4 gap-6">

                <Statcard title="Total Revenue" value={`INR ${formatAmount(totalRevenue)}`} desc={`${totalInvoices} invoices`} icon={DollarSign} color="text-blue-600" />

                <Statcard title="Total Invoices" value={totalInvoices} desc="All time" icon={FileText} color="text-green-600" />

                <Statcard title="Total Customers" value={totalCustomer.length} desc="All" icon={User} color="text-amber-600" />

                <Statcard title="Paid Invoices" value={paidInvoice} desc="Paid" icon={CircleCheckBig} color="text-cyan-600" />

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
                        {productList?.map((item) => (
                            <MinCard
                                key={item._id}
                                name={item.name}
                                product={item.isActive}
                                date={item.createdAt}
                                stock={item.stock} />

                        ))}
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
                                name={inv.customerId.firstName + ' ' + inv.customerId.lastName}
                                billNo={inv.invoiceNumber}
                                date={inv.createdAt}
                                totalAmount={formatAmount(inv.totalAmount)}
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