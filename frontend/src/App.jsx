import { useState } from "react";
import {Toaster} from "react-hot-toast"
import Register from "./pages/Register";
import {Route, Routes, Navigate} from "react-router-dom"
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./layout/Layout";


function App() {
  document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
);
let authUser = null
  return (
    <div className="flex flex-col items-center justify-center">
      <Toaster/>
      <Routes>
        <Route path="/" element={<Layout/>}>
           <Route 
           index
           element={<Home/> }
           />
        </Route>
        <Route
         path="/" 
         element={authUser ? <Home/> : <Navigate to={"/login"}/>}
         />

        <Route
         path="/login" 
         element={!authUser ? <Login/> : <Navigate to={"/"}/>}
         />
         
        <Route path="/register" element={<Register/>}/>
        {/* <Route path="/About" element={<About/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
