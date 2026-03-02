import Button from '../components/common/Button'
import Input from '../components/common/Input'
import LoadingScreen from '../components/common/LoadingScreen'
import Select from '../components/common/Select'
import Textarea from '../components/common/Textarea'
import axios from '../utils/axiosInstance'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const Create = () => {
  const [customers, setCustomers] = useState([])
  const [customer, setCustomer] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [productList, setProductList] = useState([])
  const [taxPercent, setTaxPercent] = useState(0)
  const [notes, setNotes] = useState("")
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [items, setItems] = useState([
    {
      id: Date.now(),
      productId: '',
      productName: '',
      productDescription: '',
      productPrice: 0,
      quantity: 1,
    }
  ])

  const formatAmount = (value) => {
    return Number(value || 0).toLocaleString('en-IN')
  }

  const handleProductSelect = (index, productId) => {
    const product = productList.find(item => item._id === productId)

    if (!product) return

    const updated = [...items]
    updated[index] = {
      ...updated[index],
      productId: product._id,
      productName: product.name,
      productDescription: product.description,
      productPrice: product.price,
    }

    setItems(updated)
  }

  const handleQuantityChange = (index, value) => {
    const updated = [...items]
    updated[index].quantity = Number(value)
    setItems(updated)
  }

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        productId: '',
        productName: '',
        productDescription: '',
        productPrice: 0,
        quantity: 1
      }])
  }

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const subTotal = items.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0)
  const taxAmount = (subTotal * taxPercent) / 100
  const totalAmount = subTotal + taxAmount

  const fetchCustomers = async () => {
    try {
      const { data } = await axios.get('/customer')
      setCustomers(data)
    }
    catch (err) {
      console.log(err)
      toast.error("Failed to load customers")
    }
  }

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get('/product/list')
      setProductList(data.productList)
    }
    catch (err) {
      console.log(err)
    }
  }

  const generateInvoiceNumber = async () => {
    try {
      const { data } = await axios.get('/invoice/generate-number')
      setInvoiceNumber(data.invoiceNumber)
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    try {
      const hasEmptyItems = items.some(item => !item.productId)

      if (!customer) {
        toast.error("Please select a customer")
        return
      }
      if (!dueDate) {
        toast.error("Please set a due date")
        return
      }
      if (!hasEmptyItems) {
        toast.error("Please select a product for all items")
        return
      }

      const payload = {
        invoiceNumber,
        customerId: customer,
        dueDate,
        items,
        taxPercent,
        totalAmount,
        notes
      }

      const { data } = await axios.post('/invoice/create', payload)

      toast.success(data.message)

    }
    catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message)
    }
    finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true)
      try {
        await Promise.all([
          fetchCustomers(),
          fetchProduct(),
          generateInvoiceNumber()
        ])
      }
      finally {
        setLoading(false)
      }
    }

    loadAll()
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <>
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-black">Invoice Create</h1>
              <p className="mt-1 text-gray-400">Invoice No: <span className='font-medium'>{invoiceNumber}</span></p>
            </div>
            <div>
              <form className='space-y-6' onSubmit={handleSubmit}>
                {/* CUSTOMERS */}
                <div>
                  <Select label="Customer" options={customers} onChange={(e) => setCustomer(e.target.value)} valueKey='_id' labelKey='firstName' extraLabelKey='email' />
                </div>

                {/* DUE DATE */}
                <div>
                  <Input label="Due Date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>

                {/* ITEMS */}
                <div>
                  <h3 className='font-medium mb-2'>Invoice Items</h3>
                  {items.map((item, index) => (
                    <div key={item.id} className='grid grid-cols-12 gap-3 mb-3 items-end'>
                      <div className='col-span-4'>
                        <Select label='Product' options={productList} valueKey='_id' labelKey='name' value={item.productId} onChange={(e) => handleProductSelect(index, e.target.value)} />
                      </div>
                      <div className='col-span-2'>
                        <Input label="Qty" type="number" min='1' value={item.quantity} onChange={(e) => handleQuantityChange(index, e.target.value)} />
                      </div>
                      <div className='col-span-2'>
                        <Input label="Price" type="text" readOnly value={formatAmount(item.productPrice)} disabled />
                      </div>
                      <div className='col-span-2'>
                        <Input label='Item Total' type='text' value={formatAmount(item.productPrice * item.quantity)} readOnly disabled />
                      </div>
                      <div className='col-span-2'>

                        <Button type="button" children="Remove" variant='danger_outline' onClick={() => removeItem(item.id)} />
                      </div>
                    </div>
                  ))}

                  <Button type="button" children="+ Add Item" variant='outline' onClick={addItem} />
                </div>

                {/* TAX */}
                <div>
                  <Input type='Number' placeholder='Tax %' label='Tax' value={taxPercent}
                    onChange={(e) => setTaxPercent(Number(e.target.value))} />
                </div>

                {/* NOTES */}
                <div>
                  <Textarea label='Notes' rows='4' value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>

                {/* TOTALS */}
                <div className='bg-gray-50 p-4 rounded'>
                  <div className='flex justify-between'>
                    <span>SubTotal</span>
                    <span>₹{formatAmount(subTotal.toFixed(2))}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Tax</span>
                    <span>₹{formatAmount(taxAmount.toFixed(2))}</span>
                  </div>
                  <div className='flex justify-between font-semibold text-xl'>
                    <span>Total</span>
                    <span className='border-t-2'>₹{formatAmount(totalAmount.toFixed(2))}</span>
                  </div>
                </div>

                <Button type='submit' disabled={submitting} children={submitting ? "Creating..." : "Create"} variant='black' />

              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Create