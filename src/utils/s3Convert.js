import { URLPATH } from "../assets/data/common";
import { defaultGetApiSet } from "./api";

export const s3ConverData = async (folder, imgId) => {
  if (!folder | !imgId) return;
  try {
    const res = await defaultGetApiSet(
      "",
      `${URLPATH.s3Img}/${folder}/${imgId}`
    );
    const path = `${res.config.baseURL}${res.config.url}`;
    return path;
  } catch (e) {
    console.log("fail s3 img", e);
  }
};
