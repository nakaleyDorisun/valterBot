import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const TOKEN = process.env.GOOGLE_TOKEN;
const googleAI = new GoogleGenerativeAI(TOKEN);

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

export const image = async (img, usePrompt = "") => {
  const model = googleAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "переведи текст на картинке на русский язык";

  const imageParts = [fileToGenerativePart(img, "image/png")];

  const result = await model.generateContent([
    usePrompt ? usePrompt : prompt,
    imageParts,
  ]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
};
