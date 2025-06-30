import {create} from "zustand"
// import {axiosInstance} from "../lib/axios"
import authService from "../lib/authService";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser:null,
    isSigningup:false,
    isLoging:false,
    isGetingProfile:false,

    getProfile:async()=>{
        try {
            set({isGetingProfile:true})
            const res = await authService.profile()
            console.log(res.data)
            set({authUser:res.data.data})
            toast.success(res.data.message)
        } catch (error) {
            console.log("Something went wrong in fetch profile", error)
            toast.error(error.response ? error.response.data.message : error.message)
            set({authUser:null})
        }finally{
            set({isGetingProfile:false})
        }
    },
    login:async(data)=>{
        try {
            set({isLoging:true})
            const res = await authService.login(data)
            console.log(res.data)
            set({authUser:res.data.data})
            toast.success(res.data.message)
        } catch (error) {
            console.log("Error while login", error)
            toast.error(error.response ? error.response.data.message : error.message)
            set({authUser:null})
        }finally{
            set({isLoging:false})
        }
    },
    register:async(data)=>{
        try {
            set({isSigningup:true})
            const res = await authService.register()
            console.log(res.data)
            set({authUser:res.data.data})   
            toast.success(res.data.message)
        } catch (error) {
            console.error("Error while signing up", error)
            toast.error(error.response ? error.response.data.message : error.message)
            set({authUser:null})
        }finally{
            set({isSigningup:false})
        }
    },
    LogOut:async()=>{
        try {
            const res = await authService.logOut()
            console.log(res.data)
            set({authUser:null})
            toast.success(res.data.message)
        } catch (error) {
            console.log("Error in logout proccessing", error)
            toast.error(error.response ? error.response.data.message : error.message)
        }
    }
}))