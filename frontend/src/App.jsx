import { useState } from "react";
import "./App.css";
import {Route, Routes, Navigate} from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
function App() {
let authUser = null
  return (
    <div className="flex flex-col items-center justify-center">
      <Routes>
        <Route
         path="/" 
         element={authUser ? <Home/> : <Navigate to={"/login"}/>}
         />

        <Route
         path="/login" 
         element={!authUser ? <Login/> : <Navigate to={"/"}/>}
         />
         
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/About" element={<About/>}/>
      </Routes>
    </div>
  );
}

export default App;
