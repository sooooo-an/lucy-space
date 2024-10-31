import { type ResponseError } from "@/utils/ResponseError";

const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

export const uploadImage = async (file: File) => {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!);

    return fetch(UPLOAD_URL, {
      method: "POST",
      body: data,
    }) //
      .then((response) => response.json())
      .then((data) => data.url);
  } catch (error) {
    console.error("[UPLOAD ERROR]:", error);
    throw { status: 500, message: error } as ResponseError;
  }
};
