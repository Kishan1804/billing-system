import { Clock, FilePlus, TrendingUp, UserCheck } from 'lucide-react'
import React from 'react'
import Statcard from '../cards/Statcard'

const StaffDashboard = ({ invoiceCreated, pendingCount }) => {
    return (
        <>
            <Statcard title="Invoices Created" value={invoiceCreated} desc="Bills Generated" icon={FilePlus} color="text-blue-600" />
            <Statcard title="Pending Invoices" value={pendingCount} desc="Awaiting Payment" icon={Clock} color="text-green-600" />
            <Statcard title="Customers Served" value={`${10}`} desc="Clients Handled" icon={UserCheck} color="text-amber-600" />
            <Statcard title="Today Revenue" value={`INR ${3500}`} desc="Daily Earnings" icon={TrendingUp} color="text-cyan-600" />
        </>
    )
}

export default StaffDashboard