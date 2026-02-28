import React, { useState } from 'react'
import { CircleUser, Lock, LogIn, Mail, Phone, User } from 'lucide-react';
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import toast, { Toaster } from 'react-hot-toast';
import axios from '../utils/axiosInstance'
import { Link } from 'react-router-dom';


const Signup = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [duPassword, setDuPassword] = useState("")
    const [number, setNumber] = useState("")

    const handlePassword = (item) => {
        console.log(item)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password != duPassword) {
            return toast.error("Password don't match")
        }
        try {
            const { data } = await axios.post('/register', {
                firstName, lastName, email, password, number
            })

            toast.success(data.message)


        }
        catch (err) {
            toast.error(err.response.data.message)
        }

    }

    return (
        <>
            <Toaster />
            <div className='min-h-screen flex flex-col items-center p-3'>
                <div className='flex flex-col items-center mb-5'>
                    <div className='font-black text-3xl'>Create your account</div>
                    <div>Or <Link to={'/login'} className='text-blue-600 hover:cursor-pointer hover:text-blue-600/80'>log in to your existing account</Link></div>
                </div>
                <div className='w-full max-w-md rounded-[0.625rem] border shadow-sm'>
                    {/* <div>Dashboard</div> */}
                    <div className='p-4'>

                        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                            <div className='flex gap-4'>
                                <Input
                                    label="First Name"
                                    icon={User}
                                    type="text"
                                    placeholder="Kishan"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <Input
                                    label="Last Name"
                                    type="text"
                                    placeholder="Patel"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <Input
                                label="Email"
                                icon={Mail}
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                label="Password"
                                icon={Lock}
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Input
                                label="Confirm password"
                                icon={Lock}
                                type="password"
                                name="confirm_password"
                                placeholder="••••••••"
                                required
                                value={duPassword}
                                onChange={(e) => setDuPassword(e.target.value)}
                            />
                            <Input
                                label="Phone No."
                                icon={Phone}
                                type="number"
                                name="phone_no"
                                placeholder="+91 1234567890"
                                required
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                            <Input
                                label="Account Type"
                                icon={CircleUser}
                                type="text"
                                name="type"
                                value="Customer"
                                required
                                disabled
                            />

                            <Button children="Create account" variant='primary' />

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup