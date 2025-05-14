import ApiError from "../utills/api-error.js";
import jwt from "jsonwebtoken"

const isLogin = (req, res, next)=>{
    const token = req.cookies.token;
    // console.log(token)
    if(!token){
        return res.status(401).json(new ApiError(401, "Login with email and password"))
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = token;
        next()
    } catch (error) {
        return res.status(401).json(new ApiError(401, "Invalid token"))
    }
}

export default isLogin;