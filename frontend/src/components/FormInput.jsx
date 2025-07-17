import React from 'react'

const FormInput = ({className, placeholder, type }) => {
  return (
    <input 
        type={type}  
         className={`w-full bg-transparent p-2 placeholder:capitalize rounded-lg border focus:outline-1 focus:outline-[var(--foreground)]  placeholder:text-[var(--detail-font-color)] text-sm ${className}`}
         placeholder={placeholder}/>
  )
}

export default FormInput