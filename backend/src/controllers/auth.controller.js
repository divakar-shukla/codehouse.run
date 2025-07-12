import ApiResponse from "../utills/api-response.js";
import ApiError from "../utills/api-error.js";
import asyncHandler from "../utills/async-handler.js";
import db from "../lib/db.js";
import bcrypt from "bcryptjs";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";
//  where: {
//       OR: [{ username }, { email }],
//     },
const register = asyncHandler(async (req, res) => {
  const { email, name, password, avatar, role } = req.body;

  const userRole = role || UserRole.USER;
  const existingUser = await db.user.findFirst({
    where: {
       email
    },
  });

  if (existingUser) {
    throw new ApiError(400, "User with email already exists", []);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  let newUser;

  try {
    newUser = await db.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
        avatar: avatar,
        role: userRole,
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
      },
    });
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while registering user",
      error,
    );
  }

  const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const cookieOption = {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV != "production",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  };

  res.cookie("jwt", token, cookieOption);

  return res
    .status(201)
    .json(new ApiResponse(201, newUser, "User created successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
 
  const user = await db.user.findFirst({
    where: {
     email ,
    },
    select: {
      id: true,
      email: true,
      name: true,
      password: true,
      avatar: true,
      role: true,
    },
  });

  if (!user) {
    throw new ApiError(404, "User does not exists");
  }

  const isMatchPassword = await bcrypt.compare(password, user.password);

  if (!isMatchPassword) {
    throw new ApiError(404, "Invalid user credentials");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const cookieOption = {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV != "production",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  };
  delete user.password;
  return res
    .status(200)
    .cookie("jwt", token, cookieOption)
    .json(new ApiResponse(200, user, "User logged in"));
});

const logOut = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "You are logged out successfully"));
});

const profile = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const user = await db.user.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatar: true,
    },
  });
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User's profile fetched successfully"));
});

export { register, login, logOut, profile };
