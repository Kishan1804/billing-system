import React from 'react'
import Statcard from '../cards/Statcard'
import { AlertCircle, CheckCircle, DollarSign, FileText, History, Receipt } from 'lucide-react'

const CustomerDashboard = () => {
  return (
    <>
      <Statcard title="My invoices" value={`${6}`} desc="Personal Bills" icon={Receipt} color="text-blue-600" />
      <Statcard title="Paid invoices" value={`${4}`} desc="Completed Payments" icon={CheckCircle} color="text-green-600" />
      <Statcard title="Pending amount" value={`INR ${5000}`} desc="Due Balance" icon={AlertCircle} color="text-amber-600" />
      <Statcard title="Last Invoice" value={`INR ${2500}`} desc="Recent Bill" icon={History} color="text-cyan-600" />
    </>
  )
}

export default CustomerDashboard