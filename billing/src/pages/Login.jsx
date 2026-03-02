import React, { useState } from 'react'
import Input from '../components/common/Input'
import { Lock, LogIn, Mail, User } from 'lucide-react';
import Button from '../components/common/Button';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';

const Login = () => {

  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data } = await axios.post('/login', {
        email, password
      })

      // localStorage.setItem("userId", data.user._id)
      // localStorage.setItem("userEmail", data.user.email)
      // localStorage.setItem("userRole", data.user.role)
      // localStorage.setItem("token", data.token)
      login({
        token: data.token,
        userId: data.user._id,
        email: data.user.email,
        role: data.user.role
      })
      

      toast.success(data.message)
      navigate("/dashboard")

      setEmail('')
      setPassword('')

    } catch (err) {
      toast.error(err.response?.data?.message)
    } finally{
      setLoading(false)
    }
  }

  return (
    <>
    
      <div className='min-h-screen flex flex-col items-center p-3'>
        <div className='flex flex-col items-center mb-5'>
          <div className='font-bold text-3xl'>Log in to your account</div>
          <div>Or <Link to={'/signup'} className='text-blue-600 hover:cursor-pointer hover:text-blue-600/80'>create a new account</Link></div>
        </div>
        <div className='w-full max-w-md rounded-[0.625rem] border shadow-sm'>
          {/* <div>Dashboard</div> */}
          <div className='p-4'>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

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
              <a className='flex flex-row-reverse text-xs text-blue-600 hover:cursor-pointer hover:text-blue-600/80 '>Forget your password?</a>
              <Button type='submit' disabled={loading} children={loading ? "Logging in..." : "Log in"} variant='primary' icon={LogIn} />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login