import asyncHandler from "../utills/async-handler.js";
import ApiError from "../utills/api-error.js";
import db from "../lib/db.js";
import ApiResponse from "../utills/api-response.js";

const executeCode = asyncHandler(async (req, res) => {

    const {source_code, stdin, expected_output, language_id, problemId} = req.body

    const userId = req.user.id

});

export { executeCode };
