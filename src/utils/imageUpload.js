import axios from "axios";

const imgbb_key = import.meta.env.VITE_IMGBB_API_KEY;
const imgbb_url = `https://api.imgbb.com/1/upload?key=${imgbb_key}`;

export const imageUpload = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const { data } = await axios.post(imgbb_url, formData);
  return data.data.display_url;
};
