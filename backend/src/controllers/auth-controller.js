import ApiResponse from "../utills/api-response.js";
import ApiError from "../utills/api-error.js";
import asyncHandler from "../utills/async-handler.js";
import db from "../lib/db.js"
import bcrypt from "bcryptjs"
import {UserRole} from "../generated/prisma/index.js"
import jwt from "jsonwebtoken"

const register = asyncHandler(async(req, res)=>{
    const {email, username, password, avatar, role} = req.body

    const userRole = role || UserRole.USER
     const existingUser = await db.user.findFirst({
                 where: {
                    OR: [{username},{email}]
                 }
        });
 
     if(existingUser){
        throw new ApiError(400, "User with email or username already exists", [])
     }
     const hashedPassword = await bcrypt.hash(password, 10);
     let newUser

     try {
         newUser = await db.user.create({
            data:{
                email:email,
                username:username,
                password:hashedPassword,
                avatar:avatar,
                role:userRole
            },
            select:{
                id:true,
                email:true,
                username:true,
                avatar:true,
                role:true
            }
        })
     } catch (error) {
        throw new ApiError(500, "Something went wrong while registering user", error);
     }
 
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

    
     return res.status(201).json(new ApiResponse(201, newUser, "User created successfully"))
  
})

const login = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body
     if(!username && !email){
          throw new ApiError(400, "Usename or Email is required");
     }
   
     const user = await db.user.findFirst({
                where: {
                    OR: [{username},{email}]
                 },
                select:{
                id:true,
                email:true,
                username:true,
                password:true,
                avatar:true,
                role:true
            }
        });

     if(!user){
          throw new ApiError(404, "User does not exists");
     }

     const isMatchPassword = await bcrypt.compare(password, user.password)
 
     if(!isMatchPassword){
         throw new ApiError(404, "Invalid user credentials");
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
      delete user.password
      return res
      .status(200)
      .cookie("jwt", token, cookieOption)
      .json(new ApiResponse(200, user, "User logged in"))
   
})

const logOut = asyncHandler(async(req, res)=>{

     res.clearCookie("jwt")
     return res.status(200).json(new ApiResponse(200, {},"You are logged out successfully"))

})

const profile = asyncHandler(async(req, res)=>{
const {userId} = req.user
const user = await db.user.findFirst({
             where:{
                 id:userId   
             },
             select:{
                id:true,
                username:true,
                email:true,
                role:true,
                avatar:true
             }
     })
console.log(user)
return res.status(200).json(new ApiResponse(200, user, "User's profile fetched successfully"))
})



export {register, login, logOut, profile}

