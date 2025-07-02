import { data, Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore.js'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { registerSchema } from '../zodSchema/auth.schema.js'
import { _email } from 'zod/v4/core'
import { useState } from 'react'


const Register = () => {
      const {isRegistering, Register} = useAuthStore()
      const [matechedPassword, setMatchedPassword] = useState(null)
      const {register, handleSubmit, formState:{errors}} = useForm({resolver:zodResolver(registerSchema)})
      const submitRegisterForm = (data)=>{
        setMatchedPassword(null)
        if(data.password !== data.confirmPassword){
            setMatchedPassword("Password is not matched")
            return false
        }
      }
  return (
    <div className="w-full bg-white dark:bg-gray-900 flex items-center justify-center min-h-screen px-6 mx-auto">
        <form className="w-full max-w-md" onSubmit={handleSubmit(submitRegisterForm)}>
            <div className="flex justify-center mx-auto">
                <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
            </div>
            
            <div className="flex items-center justify-center mt-6">
                <Link to="/login" className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300">
                    Login
                </Link>

                <Link href="/register" className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
                    Register
                </Link>
            </div>

            <div className="relative flex items-center mt-6">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </span>

            <input type="email" className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${errors.email ? "input-error": ""}`} placeholder="Email address" {...register("email")} />
            </div>
            <div>{errors.email && (<p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>)}</div>
            <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input type="password" className={`block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${errors.password ? "input-error": ""}`} placeholder="Password" {...register("password")}/>
            </div>
            <div className=''>{errors.password && (<p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>)}</div>
            <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password" {...register("confirmPassword")} onChange={()=>setMatchedPassword(null)}/>
            </div>
            <div className=''>{errors.confirmPassword && (<p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>)} {matechedPassword && (<p className='text-red-500 text-sm mt-1'>{matechedPassword}</p>)} </div>
            <label htmlFor="dropzone-file" className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>

                <h2 className="mx-3 text-gray-400">Profile Photo (Optional) </h2>

                <input id="dropzone-file" type="file" className="hidden" />
            </label>
            <div className="mt-6">
                <button className={`w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform ${isRegistering ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-400"} rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50`} disabled={isRegistering}>
                    {isRegistering ? ("Registering") : ("Register")}
                </button>

                <div className="mt-6 text-center ">
                    <Link to="/login" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                        Already have an account?
                    </Link>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Register