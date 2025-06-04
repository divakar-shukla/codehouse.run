import ApiError from "../utills/api-error.js";
import db from "../lib/db.js";

  const isAdmin = async (req, res, next)=>{
    const userId = req.user.id
    console.log(userId)
    let user
    try {
         user = await db.user.findFirst({
            where:{
                id:userId
            },
            select:{
                role:true
            }
        })
    } catch (error) {
        throw new ApiError(500, "Something went wrong while authincating user as a admin")
    }

    if(user.role == "ADMIN"){
        return next()
    }

    throw new ApiError(403, "Unauthorized request")
    
}
export default isAdmin;