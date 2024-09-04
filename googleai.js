import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const TOKEN = process.env.GOOGLE_TOKEN;

const googleAI = new GoogleGenerativeAI(TOKEN);

// const geminiModel = "models/gemini-1.5-pro-latest";
const geminiModel = "gemini-pro";

const model = googleAI.getGenerativeModel({ model: geminiModel });

export const google = async (message) => {
  console.log(message, "сообщение из файла gooleAI");
  const result = await model.generateContent(message);
  console.log(result, "result из файла gooleAI");
  const response = await result.response;
  const answer = await response.text();
  console.log(answer, "ответ из файла gooleAI");
  return answer;
};
