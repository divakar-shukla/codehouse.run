import ApiResponse from "../utills/api-response.js";
import ApiError from "../utills/api-error.js";
import asyncHandler from "../utills/async-handler.js";
import db from "../lib/db.js"
import bcrypt from "bcryptjs"
import {UserRole} from "../generated/prisma/index.js"
import jwt from "jsonwebtoken"

const register = asyncHandler(async(req, res)=>{
    const {name, email, password, avatar} = req.body
    
   try {
     const existingUser = await db.user.findUnique({
         where:{
             email:email
         }
     })
 
     if(existingUser){
        return res.status(400).json(new ApiError(400, "Your are already registered").toJSON())
     }
     const hashedPassword = await bcrypt.hash(password, 10);
 
     const newUser = await db.user.create({
         data:{
             email:email,
             password:hashedPassword,
             name:name,
             avatar:avatar,
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
    return res.status(500).json(new ApiError(500, "Error while created user").toJSON())
   }


})

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body
   try {
     const user = await db.user.findUnique({
             where:{
                 email   
             }
     })
 
     if(!user){
          return res.status(401).json(new ApiError(401, "You are not registered"))
     }
     const isMatchPassword = bcrypt.compare(password, user.password)
 
     if(!isMatchPassword){
         return res.status(401).json(new ApiError(401, "email or password is wrong."))
     }
 
      const token = jwt.sign(
          {id:user.id},
          process.env.JWT_SECRET,
          {expiresIn:"7d"}
      )
  
      const cookieOption = {
          httpOnly:true,
          sameSite:"strict",
          secure:process.env.NODE_ENV != "production",
          maxAge:1000 * 60 * 60 * 24 * 7
      }
 
      res.cookie("token", token, cookieOption)
 
      return res.status(200).json(new ApiResponse(200, {name:user.name, email:user.email, id:user.id}, "Now you are logged in"))
   } catch (error) {
    return res.status(500).json(new ApiError(500, "Internal server error during login proccess"))
   }
})

const logOut = asyncHandler(async(req, res)=>{
 try {
     const {userId} = req.user
     res.clearCookie("token")
     return res.status(200).json(new ApiResponse(200, "You are logged out successfully"))
 } catch (error) {
    console.error(error)
    return res.status(500).json(new ApiError(500, "Error logging out user"))
 }
})
const profile = asyncHandler(async(req, res)=>{
const {userId} = req.user
const user = await db.user.findUnique({
             where:{
                 id:userId   
             }
     })
console.log(user)

})
export {register, login, logOut, profile}