import React from 'react'
import Button from '../components/common/Button';
import FeatureCard from '../components/common/FeatureCard';
import { ChartColumn, CircleCheckBig, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext'


const Home = () => {

  const navigate = useNavigate()
  const { auth, isAuthenticated, logout } = useAuth()

  const handleLogOut = () => {
    logout()
    toast.success("Logged out")
  }

  const handleLogin = () => {
    navigate('/login')
  }

  const handleSignUp = () => {
    navigate('/signup')
  }

  return (
    <>
     
      <div style={{ backgroundColor: "var(--background)" }}>
        <header className='border-b bg-white '>
          <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
            <div className='font-bold text-blue-800'>MERN Billing</div>
            <nav className='flex gap-4'>
              {isAuthenticated ?
                <>
                  <Button children="Logout" variant='danger' onClick={handleLogOut} />
                </> :
                <>
                  <Button children="Login" variant='primary' onClick={handleLogin} />
                  <Button children="Signup" variant='outline' onClick={handleSignUp} />
                </>}
            </nav>
          </div>
        </header>
        <section className='container mx-auto px-4 py-20'>
          <div className='text-center mb-4 flex flex-col gap-4'>
            <h1 className='text-6xl font-bold text-balance'>Billing System</h1>
            <p className='text-balance text-lg max-w-2xl mx-auto'>Manage invoices, process payments, and gain insights with our comprehensive billing platform. Built for modern businesses.</p>
            <div className='flex gap-4 pt-5 justify-center'>
              {isAuthenticated ?
                <>
                  <Button children="Go to Dashboard" variant='primary' onClick={() => navigate('/dashboard')} />
                </> :
                <>
                  <Button children="Signup" variant='outline' onClick={handleSignUp} />
                  <Button children="Login" variant='primary' onClick={handleLogin} />
                </>}
            </div>
          </div>
        </section>
        <section className='border-t bg-white py-20'>
          <div className='container max-w-6xl mx-auto px-4'>
            <h2 className='font-bold text-3xl text-center mb-12'>Features</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              <FeatureCard color="#db5612" title="Easy Invoicing" desc="Create and send professional invoices in seconds with customizable templates." icon={CircleCheckBig} />
              <FeatureCard color="#db5612" title="Smart Payments" desc="Accept payments through Razorpay with automatic invoice reconciliation." icon={Zap} />
              <FeatureCard color="#db5612" title="Analytics" desc="Track revenue, payment status, and customer insights with detailed reports." icon={ChartColumn} />
              <FeatureCard color="#db5612" title="Secure & Reliable" desc="Enterprise-grade security with role-based access control and data encryption." icon={Shield} />
            </div>
          </div>
        </section>
        <footer className='border-t border-border py-8 bg-white'>
          <div className='container max-w-6xl mx-auto px-4 text-center' style={{ color: "var(--muted-foreground)" }}>
            <p>© 2026 MERN Billing. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home