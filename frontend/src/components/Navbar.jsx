import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AccountDropdown from "./AccountDropdown";
export function Navbar() {
  const [scrolled, setScrolled] =  useState(false)
    useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        console.log(scrolled)
        console.log(window.scrollY)
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
   <nav className="fixed w-full z-50 transition-all duration-300 backdrop-blur-sm top-0 left-0 mt-2">
    <div className="w-full d-flex justify-center">
      <div className={`transition-all duration-700 transform-gpu mx-auto border ${scrolled ? "scale-x-100  backdrop-blur-sm shadow-lg":"scale-x-100 rounded-2xl  backdrop-blur-md shadow-xl"}`} style={{
        transformOrigin:"center",
        ...(scrolled ? {
          borderRadius:"0px",
          maxWidth:"100%",
          width:"100%"
          
        }:{
          borderRadius:"16px",
          maxWidth:"1024px",
          width:"100%"
        })
      }}>
        <div className="px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
               <Link to={"/"}  className="flex items-center text-[var(--foreground)] transition-colors">    
                  <span className="font-bold text-xl"><img src="http://localhost:5173/matecia-logo-3.png" alt="" className="w-25"/></span>
                </Link>
              </div>
              <div>
                <ul className="flex gap-7 text-lg  text-[var(--primary)]">
                  <li className="px-7 cursor-pointer"><Link to={"/problem"}>Problem</Link></li>
                  <li className="px-7 cursor-pointer"><Link to={"/learn"}>Learn</Link></li>
                  <li className="px-7 cursor-pointer"><Link to={"/about"}>About</Link></li>
                </ul>
              </div>
              <div className="flex items-center py-2">
                <AccountDropdown className="border border-[var(--foreground)]"/>
              </div>
          </div>
        </div>
      </div>
    </div>
   </nav>
  )
}

