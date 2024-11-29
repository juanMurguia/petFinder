import { User } from "../models/";
import { cloudinary } from "../lib/cloudinary";

export async function updateProfile(userId, updateData) {
  if (updateData.pictureDataURL) {
    const imagen = await cloudinary.uploader.upload(updateData.pictureDataURL, {
      resource_type: "image",
      discard_original_filename: true,
      width: 1000,
    });

    const updateDataComplete = {
      name: updateData.name,
      bio: updateData.bio,
      pictureURL: imagen.secure_url,
    };
    console.log(updateDataComplete);

    await User.update(updateDataComplete, { where: { id: userId } });

    return updateDataComplete;
  } else {
    console.error("no hay imagen adjunta");
  }
}
