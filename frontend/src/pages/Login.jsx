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
      await login(data)
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
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
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
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
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