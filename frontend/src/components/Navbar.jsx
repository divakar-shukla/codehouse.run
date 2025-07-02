import React from "react"
import { Link } from "react-router-dom"



export function Navbar() {
  return (
   <nav className="fixed w-full z-50 transition-all duration-300 backdrop-blur-sm top-0 left-0 mt-2">
    <div className="w-full d-flex justify-center">
      <div className="transition-all duration-500 ease-in-out transform-gpu w-full max-w-5xl backdrop-blur-md shadow-lg mx-auto rounded-3xl">
        <div className="mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
               <Link to={"/"}  className="flex items-center text-indigo-500 hover:text-indigo-400 transition-colors">    
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 91 187"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M39.28 63.352H56.56L43.12 138.616H82.032L79.088 155H23.024L39.28 63.352Z"
                      fill="blue"
                    />
                    <path
                      d="M17.28 31.352H34.56L21.12 106.616H60.032L57.088 123H1.024L17.28 31.352Z"
                      fill="blue"
                    />
                  </svg>
                  <span className="font-bold text-xl">CodeHouse.run</span>
                </Link>
              </div>
              <div>
                <ul className="flex gap-7 ">
                  <li className="px-7">Problem</li>
                  <li className="px-7">Learn</li>
                  <li className="px-7">About</li>
                </ul>
              </div>
              <div>
                Dashboard
              </div>
          </div>
        </div>
      </div>
    </div>
   </nav>
  )
}

