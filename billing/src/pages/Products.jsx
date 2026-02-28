import axios from '../utils/axiosInstance'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import Button from '../components/common/Button'
import Productcard from '../components/cards/Productcard'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import LoadingScreen from '../components/common/LoadingScreen'

const Products = () => {
  const { role } = useOutletContext()
  const navigate = useNavigate()

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false)

  const handleCreate = () => {
    navigate('/products/create')
  }

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('/product/list')
      setProductList(data.productList)
    }
    catch (err) {
      console.log()
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  if (loading) {
    return <LoadingScreen text="Fetching products..." />
  }
  
  return (
    <>
      <Toaster />
      <main className='p-5'>
        {role !== 'customer' && (

          <Button onClick={handleCreate} children={"Add product"} variant="outline" />
        )}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {productList?.map((item) => (
            <Productcard product={item} />
          ))}
        </div>

      </main>
    </>
  )
}

export default Products