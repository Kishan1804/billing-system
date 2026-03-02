import axios from '../utils/axiosInstance'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Textarea from '../components/common/Textarea'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const ProductCreate = () => {
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [img, setImg] = useState()
    const [price, setPrice] = useState()
    const [quantity, setQuantity] = useState()
    const [productList, setProductList] = useState()



    const fetchProduct = async () => {
        try {
            const { data } = await axios.get('/product/list')
            setProductList(data.productList)
        }
        catch (err) {
            console.log()
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();

        formData.append('name', name)
        formData.append('image', img)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('quantity', quantity)

        try {
            const { data } = await axios.post('/product/add', formData)
            setName('')
            setDescription('')
            setPrice('')
            setQuantity('')
            fetchProduct()
            toast.success(data.message)
        }

        catch (err) {
            toast.error(err.response?.data?.message)
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`/product/delete/${id}`)
            toast.success(data.message)
            fetchProduct()
        }
        catch (err) {
            toast.error(err.response?.data?.message)
        }
    }

    return (
        <>
            
            <main className="flex-1 overflow-auto p-6">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-black">Manage Product</h1>
                        <p className="mt-1 text-gray-400">Create, edit, & delete product</p>
                    </div>
                    <div className="max-w-2xl mx-auto">
                        <div className="rounded-lg border shadow-sm bg-white text-lg">
                            <form onSubmit={handleSubmit} className="space-y-8 p-6 flex flex-col">

                                <Input label="Product name" type="text" placeholder="T-Shirt" value={name} onChange={(e) => { setName(e.target.value) }} />

                                <Textarea label="Product Description" rows="4" placeholder="Describe this product" value={description} onChange={(e) => { setDescription(e.target.value) }} />

                                <Input label="Product Image" type="file" accept="image/*" onChange={(e) => { setImg(e.target.files[0]) }} />

                                <Input label="Product Price" type="number" placeholder="₹ 1,234" value={price} onChange={(e) => { setPrice(e.target.value) }} />

                                <Input label="Product Quantity" type="number" placeholder="10" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />

                                <Button children="Add Product" />
                            </form>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-black">All Product</h1>
                        <div className='shadow-lg rounded-lg overflow-hidden'>
                            <table className='w-full table-fixed'>
                                <thead>
                                    <tr className='bg-gray-500'>
                                        <th class="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">Image</th>
                                        <th class="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">Name</th>
                                        <th class="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">Description</th>
                                        <th class="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">Price</th>
                                        <th class="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">Stock</th>
                                        <th class="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white'>
                                    {productList == 0 ?
                                        <h1>No Product Found</h1> :
                                        productList?.map((item) => (
                                            <tr>
                                                <th className='py-4 px-6 border-b border-gray-200' scope='row'>
                                                    <img width={50} height={50} src={`http://localhost:3000/uploads/${item.image}`} alt=''></img>
                                                </th>
                                                <td className='py-4 px-6 border-b border-gray-200'>{item.name}</td>
                                                <td className='py-4 px-6 border-b border-gray-200 truncate'>{item.description}</td>
                                                <td className='py-4 px-6 border-b border-gray-200'>{item.price}</td>
                                                <td className='py-4 px-6 border-b border-gray-200'>{item.stock}</td>
                                                <td className='space-x-2 py-4 px-6 border-b border-gray-200'>
                                                    <Button children='Edit' />
                                                    <Button children='Delete' variant='danger' onClick={() => handleDelete(item._id)} />
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ProductCreate