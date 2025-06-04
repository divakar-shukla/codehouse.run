import asyncHandler from "../utills/async-handler.js";
import db from "../lib/db.js";
import ApiError from "../utills/api-error.js";
import ApiResponse from "../utills/api-response.js";
import { getJudgeLanguageId, pollBatchResult, submitBatch } from "../lib/judge0.lib.js";

const createProblem = asyncHandler(async (req, res)=>{
    
    // get all body data
    // validate user role
    // loop throw refference solutions for defference language

    const {
        tittle,
        description, 
        difficulty, 
        tags, 
        examples, 
        constraints, 
        hints, 
        editorial, 
        testcases, 
        codeSnippets, 
        referenceSolutions, 
    } = req.body

    if(req.user.role != "ADMIN"){
        throw new ApiError(403, "You are not authorized to create problem")
    }

    
   
        for (const [language, solutionsCode] of Object.entries(referenceSolutions)){
            const languageId = getJudgeLanguageId(language)
            console.log(languageId)
            if(!languageId){
               throw new ApiError(400, `${language} language is not supported`)
            }
            
            const submissions = testcases.map(({input, output})=>(
                {
                    language_id:languageId,
                    source_code:solutionsCode,
                    stdin:input,
                    expected_output:output
                }
            ))

            const tokens = await submitBatch(submissions)
        
            const batchResults = await pollBatchResult(tokens)
            console.log(batchResults)
            
            for(let i = 0; i < batchResults.length; i++){
                const batchResult = batchResults[i]

                if(batchResult.status.id !== 3){
                    throw new ApiError(400, `Tastecase ${i + 1} failed for ${language} language`)
                }

            }
        }
 try {
        const newProblem = await db.problem.create({
            data:{
               tittle,
               description, 
               difficulty, 
               tags, 
               examples, 
               constraints, 
               testcases, 
               codeSnippets, 
               referenceSolutions,
               userId:req.user.id
            }
        })

        return res.status(201).json(new ApiResponse(201, newProblem, "Problem created successfully"))

    } catch (error) {
        throw new ApiError(500, "Error while creating problem", error)
    }
})
const getAllProblems = asyncHandler(async (req, res)=>{

})
const getProblem = asyncHandler(async (req, res)=>{

})
const updateProblem = asyncHandler(async (req, res)=>{

})
const deleteProblem = asyncHandler(async (req, res)=>{

})
const getProblemSolvedByUser = asyncHandler(async (req, res)=>{

})


export {createProblem, getAllProblems, getProblem, updateProblem, deleteProblem, getProblemSolvedByUser};