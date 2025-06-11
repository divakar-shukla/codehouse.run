import React, {useState} from 'react'
import {useForm} from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { data, Link } from 'react-router-dom';
import {
  Code,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";

import {z} from "zod"

const signUpSchema = z.object({
    email:z.string().email("Enter a valid email"),
    password:z.string().min(6, "Password must be atleast 6 charactor long"),
    username:z.string().min(6).optional()
})
const SignUp = () => {

    const [showPassword, setshowPassword] = useState(false)
    const {register, handleSubmit, formState:{error}} = useForm({resolver:zodResolver(signUpSchema)})
    const onSubmit = async (data)=>{
        console.log(data)
    }
  return (
    <div>
       <div className='h-screen grid lg:grid-col-2'>
        Welcome To Our Code
       </div>
    </div>
  )
}

export default SignUp