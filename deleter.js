import { unlink } from "fs/promises";

export const deletFile = async (path) => {
  try {
    await unlink(path);
  } catch (error) {
    console.log("Remove Error", error);
  }
};
