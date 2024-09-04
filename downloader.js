import axios from "axios";
import { createWriteStream } from "fs";
import { dirname, resolve } from "path";

export const download = async (url, filename, username, raandomId) => {
  try {
    const imgPath = resolve(
      `/Users/air/Desktop/coding/botAPI/img/${filename}_${username}_${raandomId}.png`
    );

    const response = await axios({
      method: "get",
      url,
      responseType: "stream",
    });
    return new Promise((resolve) => {
      const stream = createWriteStream(imgPath);
      response.data.pipe(stream);
      stream.on("finish", () => resolve(imgPath));
    });
  } catch (error) {
    console.log("Axios Error", error.message);
  }
};
