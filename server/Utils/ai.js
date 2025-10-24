import openAi from "openai";
const ai = new openAi({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL:process.env.OPENAI_BASE_URL
})

export default ai