import asyncHandler from "../utills/async-handler.js";
import db from "../lib/db.js";
import ApiError from "../utills/api-error.js";
import ApiResponse from "../utills/api-response.js";

const getFevProblems = asyncHandler(async (req, res)=>{
    
   try {
     const fevProblems = await db.favouriteList.findMany({
         where:{userId:req.user.id},
         include:{
             Problem:true
         }
     })
     if(fevProblems.length === 0){
        throw new ApiError(401, "There are no fevourite problem")
     }
     return res.status(200).json(new ApiResponse(200, fevProblems, "Fevorite Problems fetched successfully"))
   } catch (error) {
    throw new ApiError(500, "Something went wrong in fetching fevourite problems", error)
   }
})
const addFevProblems = asyncHandler(async (req, res)=>{
const {problemId} = req.body

const isExistsFavouriteList = await db.favouriteList.findUnique({
    where:{
        problemId
    }
  })
  
  if(isExistsFavouriteList) throw new ApiError(409, "This problem already exist in this favourite list")

 let addedProblem =  await db.favouriteList.create({
        data:{
            userId:req.user.id,
            problemId:problemId
        }
    })

  
    return res.status(201).json(new ApiResponse(201, addedProblem, "Problem added in favourite list"))
})
const removeFevProblems = asyncHandler(async (req, res)=>{

    const {fevProblemsIds} = req.body

    let removedProblem  = await db.favouriteList.deleteMany({
            where:{
                userId:req.user.id,
                problemId:{in:fevProblemsIds}
            }
        })
    
     if(removedProblem.count <= 0){
        throw new ApiError(404, "Problem not found in the favourite list")
      }

     return res.status(200).json(new ApiResponse(200, removedProblem, "Problem removed from favourite list"))
})

export {
    getFevProblems,
    addFevProblems,
    removeFevProblems
}