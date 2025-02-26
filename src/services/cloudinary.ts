import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadImage = async (url: string, publicId: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(url, {
      public_id: publicId,
      format: 'webp',
      width: 1200,
      crop: 'limit',
      resource_type: 'image',
    })

    return result.secure_url
  } catch (err) {
    console.error(err)
    throw new Error('cloudinary upload error')
  }
}
