import { body, param } from "express-validator";

const addFevProblemValidtor = ()=>{
    return [
        body("problemId")
        .trim()
        .notEmpty()
        .withMessage("problem id is required"),
    ]
}
const removeFevProblemValidtor = ()=>{
    return [
        body("fevProblemsIds")
        .notEmpty()
        .withMessage("problems id is required")
        .isArray({min:1})
        .withMessage("Problem's id must be minimum one length array"),
    ]
}


export {addFevProblemValidtor, removeFevProblemValidtor}