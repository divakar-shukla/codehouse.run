import {useForm} from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';
import { loginSchema } from '../zodSchema/auth.schema.js';
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

const Login = () => {
  const {isLoging, login} = useAuthStore()
  const navigation = useNavigate()
  const {register, handleSubmit, formState:{errors}} = useForm({resolver:zodResolver(loginSchema)})

  const submitLoginForm = async (data) =>{
    try {
     const isLoggedIn = await login(data)
     if(isLoggedIn) navigation("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
<div className="min-h-screen flex flex-col justify-around max-w-[1300px] m-auto">
    <div className="w-full flex items-center justify-center px-6 mx-auto mt-30">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link to="/register"><Button variant="link">Sign Up</Button></Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitLoginForm)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="m@example.com"
                className={`${errors.email ? "border-red-500":""}`}
              />
               <div className="">{errors.email && (<p className="text-red-500 text-sm mt-1">{ errors.email.message}</p>)}</div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input 
              {...register("password")}
              id="password" 
              type="password" 
              className={`${errors.password ? "border-red-500":""}`}
              required 
              />
               <div className="">{errors.password && (<p className="text-red-500 text-sm mt-1">{ errors.password.message}</p>)}</div>
            </div>
            <Button 
            type="submit" 
            className="w-full"
            disabled={isLoging}
            >
              {isLoging ? "Loging in" : "Login"}
           </Button>
           
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        
        <Button variant="outline" className="w-full">
          Login with Google
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

export default Login