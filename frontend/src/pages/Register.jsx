import {useForm} from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';
import { registerSchema } from '../zodSchema/auth.schema.js';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Footer from "@/components/Footer.jsx";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const AccountRegister = () => {
  const {isRegistering, Register} = useAuthStore()
  const navigation = useNavigate()
  const [isMatchedPassword, setIsMatchedPassword] = useState("")
  const {register, handleSubmit, formState:{errors}} = useForm({resolver:zodResolver(registerSchema)})

  const submitLoginForm = async (data) =>{
    try {
        if(data.password !== data.confirmPassword){
            setIsMatchedPassword("Password is not matched")
            return false;
        }
     const isRegistered = await Register(data)
    //  console.log(isRegistered)
     if(isRegistered){
        navigation("/")
     } 
      
    console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
<div className="min-h-screen flex flex-col justify-around max-w-[1300px] m-auto">
    <div className="w-full flex items-center justify-center px-6 mx-auto mt-30">
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Register your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
         <Link to="/login"><Button variant="link">Login</Button></Link> 
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitLoginForm)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
               {...register("name")}
                id="name"
                type="text"
                placeholder="Name"
                required
                className={`${errors.name ? "border-red-500":""}`}
              />
              <div className="">{errors.name && (<p className="text-red-500 text-sm mt-1">{ errors.name.message}</p>)}</div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
              {...register("email")}
                id="email"
                type="email"
                placeholder="m@example.com"
                className={`${errors.email ? "border-red-500":""}`}
                required
              />
               <div className="">{errors.email && (<p className="text-red-500 text-sm mt-1">{ errors.email.message}</p>)}</div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
              {...register("password")}
               id="password" 
               type="password" 
               placeholder="******" 
               className={`${errors.password ? "border-red-500":""}`} required 
               />
              <div className="">{errors.password && (<p className="text-red-500 text-sm mt-1">{ errors.password.message}</p>)}</div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirm Password</Label>
              </div>
              <Input 
              {...register("confirmPassword")}
              id="confirmPassword" 
              type="text" placeholder="******" 
              className={`${(errors.confirmPassword || isMatchedPassword) ? "border-red-500":""}`} required 
              />
              <div className="">
                {errors.confirmPassword && (<p className="text-red-500 text-sm mt-1">{ errors.confirmPassword.message}</p>)}
                {isMatchedPassword && (<p className="text-red-500 text-sm mt-1">{isMatchedPassword}</p>)}
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Button 
                type="submit" 
                className="w-full"
                disabled={isRegistering }
                >
                    {isRegistering ? "Registering" : "Register"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
     
        <Button variant="outline" className="w-full">
          Register with Google
        </Button>
      </CardFooter>
    </Card>
    </div>
   <div className="flex h-full items-end">
     <Footer/>
   </div>
</div>
    
  
  )
}

export default AccountRegister