
import {z} from "zod"

const loginSchema = z.object({
    email:z.string().email("Enter a valid email"),
    password:z.string().min(6, "Password must be atleast 6 charactor long"),
})
const registerSchema = z.object({
    email:z.string().email("Enter a valid email"),
    password:z.string().min(6, "Password must be atleast 6 charactor long"),
    confirmPassword:z.string().min(6, "Confirm password is not matched"),
})



export {loginSchema, registerSchema }