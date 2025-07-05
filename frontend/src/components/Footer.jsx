import React from 'react'
import {Github, Linkedin, Twitter  } from "lucide-react"
const Footer = () => {
  return (
   <div className="grid grid-cols-1 md:grid-cols-6 gap-10 p-4 mb-20">
  <div className="md:col-span-3">
    <div><span className="font-bold text-xl">CodeHouse.run</span></div>
    <div className="mt-3">
      <p className="text-sm text-[var(--primary)] mt-4 md:w-[80%]">
        codeHouse.run is a modern coding platform designed to help you practice real interview questions, follow structured learning paths, and track your progress. Whether you're just starting out or aiming for top tech roles, codeHouse.run supports your growth every step of the way.
      </p>
    </div>
  </div>
  
  <div className="md:col-span-1">
    <h2 className="text-xl">Product</h2>
    <ul className="flex flex-col text-[var(--primary)] mt-4 text-sm">
      <li className="mb-2 cursor-pointer">Feature</li>
      <li className="mb-2 cursor-pointer">Pricing</li>
      <li className="mb-2 cursor-pointer">Updates</li>
    </ul>
  </div>

  <div className="md:col-span-1">
    <h2 className="text-xl">Important</h2>
    <ul className="flex flex-col text-[var(--primary)] mt-4 text-sm">
      <li className="mb-2 cursor-pointer">About</li>
      <li className="mb-2 cursor-pointer">Blog</li>
      <li className="mb-2 cursor-pointer">Careers</li>
    </ul>
  </div>

  <div className="md:col-span-1">
    <h2 className="text-xl">Link</h2>
    <ul className="flex flex-col text-[var(--primary)] mt-4 text-sm">
      <li className="mb-2 flex items-center cursor-pointer"><Github className="mr-2 size-5" /> Github</li>
      <li className="mb-2 flex items-center cursor-pointer"><Linkedin className="mr-2 size-5" /> Linkedin</li>
      <li className="mb-2 flex items-center cursor-pointer"><Twitter className="mr-2 size-5" /> Twitter</li>
    </ul>
  </div>
</div>

  )
}

export default Footer