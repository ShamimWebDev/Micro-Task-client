import axios from "axios";

export const imageUpload = async (image) => {
  if (!image) return null;

  const imgbb_key = import.meta.env.VITE_IMGBB_API_KEY;
  const formData = new FormData();
  formData.append("image", image);

  // Using fetch to avoid axios default header issues that might trigger CORS
  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${imgbb_key}`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload image to ImgBB");
  }

  const data = await response.json();
  return data.data.display_url;
};
