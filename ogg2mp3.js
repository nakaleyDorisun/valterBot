import { rejects } from "assert";
import axios from "axios";
import { createWriteStream } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import Ffmpeg from "fluent-ffmpeg";
import installer from "@ffmpeg-installer/ffmpeg";
import { deletFile } from "./deleter.js";

const __dirname = resolve();
const id = () => Math.random();

const asd = Ffmpeg.setFfmpegPath(installer.path);

export const ogg2mp3 = async (input, userId, userName) => {
  try {
    let date = new Date().toISOString().trim();
    const outputPath = resolve(
      dirname(input),
      `${userId}_${userName}_${date}.mp3`
    );
    return new Promise((resolve, reject) => {
      Ffmpeg(input)
        .inputOption("-t 30")
        .output(outputPath)
        .on("end", () => {
          deletFile(input);
          resolve(outputPath);
        })
        .on("error", (error) => reject(error.message))
        .run();
    });
  } catch (error) {
    console.log("Convert Error", error);
  }
};

export const create = async (url, filename) => {
  try {
    const oggPath = resolve(
      `/Users/air/Desktop/coding/botAPI/voices/${filename}_${id()}.ogg`
    );
    console.log(__dirname, "_dirname"); // какого-то хуя не работает resolve
    console.log(oggPath, "oggPath"); // __filename
    console.log(url, "url"); // url для скачиваниия
    console.log(filename, "filename");
    const response = await axios({
      method: "get",
      url,
      responseType: "stream",
    });
    return new Promise((resolve) => {
      const stream = createWriteStream(oggPath);
      response.data.pipe(stream);
      stream.on("finish", () => resolve(oggPath));
    });
  } catch (error) {
    console.log("Axios Error", error.message);
  }
};
