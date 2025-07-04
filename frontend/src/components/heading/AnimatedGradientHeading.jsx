import React from 'react'
import { motion } from 'framer-motion'

const AnimatedGradientHeading = ({text, className=""}) => {
  return (
    <div
      className={`flex justify-center ${className}`}
      
      style={{
        backgroundSize: "100% 100%",
      }}
    >
      <h2 className={`text-center font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#eab308] to-[#e5e7eb] ${className} inline-block `}>
        {text}
        <div className='h-[2px] m-auto bg-[var(--foreground)] w-90 mt-4'></div>
        </h2>
      
    </div>
  )
}

export default AnimatedGradientHeading