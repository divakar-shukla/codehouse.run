import asyncHandler from "../utills/async-handler.js";
import ApiResponse from "../utills/api-response.js";

const healthCheck = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, "Server is running"));
});

export default healthCheck;
