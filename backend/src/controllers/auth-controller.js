import ApiResponse from "../utills/api-response.js";
import ApiError from "../utills/api-error.js";
import asyncHandler from "../utills/async-handler.js";
import db from "../lib/db.js"
import bcrypt from "bcryptjs"
import {UserRole} from "../generated/prisma/index.js"
import jwt from "jsonwebtoken"

const register = asyncHandler(async(req, res)=>{
    const {name, email, password} = req.body
    
   try {
     const existingUser = await db.user.findUnique({
         where:{
             email:email
         }
     })
 
     if(existingUser){
       return  res.status(400).json(new ApiError(400, "Your are already registered"))
     }
     const hashedPassword = await bcrypt.hash(password, 10);
 
     const newUser = await db.user.create({
         data:{
             email:email,
             password:hashedPassword,
             name:name,
             role:UserRole.USER
         }
     })
 
     const token = jwt.sign(
         {id:newUser.id},
         process.env.JWT_SECRET,
         {expiresIn:"7d"}
     )
 
     const cookieOption = {
         httpOnly:true,
         sameSite:"strict",
         secure:process.env.NODE_ENV != "production",
         maxAge:1000 * 60 * 60 * 24 * 7
     }

     res.cookie("jwt", token, cookieOption)

     const responseData = {
         id:newUser.id,
         email:newUser.email,
         name:newUser.name,
         role:newUser.role,
         avatar:newUser.avatar
     }
     return res.status(201).json(new ApiResponse(201, responseData, "User created successfully"))
   } catch (error) {
    console.error("error while creating user:", error)
    return res.status(500).json(new ApiError(500, "Error while created user"))
   }


})

export {register}