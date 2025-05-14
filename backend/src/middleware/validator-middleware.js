import { validationResult } from "express-validator";
import ApiError from "../utills/api-error.js";

const validate = (req, res, next) => {
  // const error = validationResult(req);

  const error = validationResult(req)

    if(error.isEmpty()){
        return next()
    }
console.log(error)
    const extractError = []
    error.array().map((err)=>{
        const errorPath = err.path
        extractError.push({errorPath:err.msg})
    })
    
    return res.status(422).json(new ApiError(422, "Given data is not valid", extractError).toJSON())
  }
export default validate