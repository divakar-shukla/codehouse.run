import { Navbar } from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='w-full min-h-screen '>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Layout