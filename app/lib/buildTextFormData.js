import { getLocalDateTime } from "./buildAudioFromData";

const buildTextFormData = async (userId, text) => {
    
    const file = new File([text], "input.txt", { type: "text/plain" });

  const formData = new FormData();
  formData.append("file", file, file.name);                   // text content
  formData.append("userId", userId);               // user id
  formData.append("createdAt", getLocalDateTime()); // IST timestamp
  formData.append("type", "text/plain");           // content type for plain text

  return formData;
}

export default buildTextFormData ;