import axios from "axios"
export const getJudgeLanguageId = (language) => {
    const languageMap = {
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63,
    }
    return languageMap[language.toUpperCase()];
}


export const submitBatch = async(submissions)=>{
    
    const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,{submissions})
    
    const tokenResult = data.map((tokenObj)=>tokenObj.token)
    return tokenResult
}


const sleep = (timeInMs)=> new Promise((resolve)=>setTimeout(resolve, timeInMs))


export const pollBatchResult = async(tokens)=>{
    console.log(tokens)
    while(true){
        const {data} = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`, {
            params:{
                tokens:tokens.join(","),
                base64_encoded:false,
            }
        })

    const results = data.submissions;
    const isAllDone = results.every((reObject)=> (reObject.status.id !== 1 && reObject.status.id !== 2))
    // console.log(isAllDone)
    if(isAllDone) return results
    await sleep(100)
    }
}
