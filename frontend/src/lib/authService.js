import axiosIntance from "./axios";
import { tokenKey } from "../utills/constants";

const authService = {
    register: async (userData) => {
        const response = await axiosIntance.post("/user/register", userData)
        return response.data

    },
    login:async (userData) =>{
        const response =  await axiosIntance.post("/user/login", userData)
        console.log(response)
        if(response.data?.accessToken){
             localStorage.setItem(tokenKey.ACCESS_TOKEN, response.data?.accessToken)
        }
        if(response.data?.refreshToken){
             localStorage.setItem(tokenKey.REFRESH_TOKEN, response.data?.refreshToken)
        }
        
        return response.data
    },
    logOut:async () =>{
        const response =  await axiosIntance.get("/user/logout")
        localStorage.removeItem(tokenKey.ACCESS_TOKEN) 
        localStorage.removeItem(tokenKey.REFRESH_TOKEN) 
        return response.data
    },
    profile:async () =>{
        const response =  await axiosIntance.get("/user/profile")
        return response.data
    }
}

export default authService;