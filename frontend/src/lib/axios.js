import axios from "axios"

const axiosIntance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
    withCredentials:true,
    timeout:10000,
})

export default axiosIntance;