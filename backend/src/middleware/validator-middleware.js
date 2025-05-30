import { validationResult } from "express-validator";
import ApiError from "../utills/api-error.js";

const validate = (req, res, next) => {
  // const error = validationResult(req);

  const error = validationResult(req)
  //  console.log(error)
    if(error.isEmpty()){
        return next()
    }
    const extractError = []
    error.array().map((err)=>{
        const errorPath = err.path
        extractError.push({errorPath:err.msg})
    })
    
    throw new ApiError(422, "Received data is not valid", extractError)
  }
export default validate