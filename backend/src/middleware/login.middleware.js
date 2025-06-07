import ApiError from "../utills/api-error.js";
import jwt from "jsonwebtoken";
import db from "../lib/db.js";

const isLogin = async (req, res, next) => {
  const token = req.cookies.jwt;
  // console.log(token)
  if (!token) {
    throw new ApiError(401, "Login with email or username and password");
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid token");
  }
  const loggedinUser = await db.user.findFirst({
    where: {
      id: decodedToken.id,
    },
    select: {
      id: true,
      avatar: true,
      email: true,
      role: true,
    },
  });

  req.user = loggedinUser;
  // console.log(req.user)
  next();
};

export default isLogin;
