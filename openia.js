import OpenAI from "openai";
import "dotenv/config";
import fs from "fs";
import { deletFile } from "./deleter.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const transcription = async (mp3Path) => {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(mp3Path),
      model: "gpt-4o-2024-05-13",
    });
    let text = transcription.text;
    console.log(transcription.text);
    // deletFile(mp3Path); // УДАЛЯЛКА mp3
    return transcription.text;
  } catch (error) {
    console.log("Ai error", error);
  }
};
export const chat = async (messages) => {
  try {
    const completion = await openai.chat.completions.create({
      messages,
      model: "gpt-4o-2024-05-13",
    });
    return completion.choices[0];
  } catch (error) {
    console.log("Chat Error", error.message);
  }
};
