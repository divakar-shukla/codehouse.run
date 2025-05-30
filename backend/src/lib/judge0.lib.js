import axios from "axios"
export const getJudgeLanguageId = (language) => {
    const languageMap = {
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63,
    }
    return languageMap[language.toUpperCase];
}
const sleep = (timeInMs)=> new Promise((resolve)=>setTimeout(resolve, timeInMs))
export const submitBatch = async(submissions)=>{
    
    const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch{?base64_encoded}`,{submissions})
    console.log("token", data)

    const tokenResult = data.map((tokenObj)=>tokenObj.token)
    return tokenResult
}

export const pollBatchResult = async(token)=>{
    while(true){
        const {data} = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`, {
            params:{
                token:token.join(","),
                based64_encoded:false,
            }
        })

    const results = data.submissions;
    const isAllDone = results.every((reObject)=> reObject.status_id !== 3 && reObject.status_id !== 2)
    if(isAllDone) return results
    await sleep(100)
    }
}
