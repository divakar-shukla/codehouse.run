import React from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import {Loader} from "lucide-react"
import { Navigate, Outlet } from 'react-router-dom'

const AdminLayout = () => {
const {authUser, isGetingProfile} = useAuthStore()
if(isGetingProfile){
    return <div className="flex items-center justify-center h-screen w-full"><Loader className="size-10 animate-spin"/></div>;
}
if(!authUser){
    return <Navigate to={"/login"}/>
}

if(authUser.role !== "ADMIN" || authUser.role !== "ADMIN"){
    return <Navigate to={"/"}/>
}

  return <Outlet/>
  
}

export default AdminLayout