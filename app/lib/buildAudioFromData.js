import { getAudioDuration } from "../utils/getAudioDuration";


const getLocalDateTime = () => {
  const now = new Date();

  const options = {
    month: "short",   // Aug
    day: "2-digit",  // 28
    year: "numeric", // 2025
    hour: "2-digit", // 11
    minute: "2-digit", // 08
    hour12: true,    // AM/PM
  };

  // Format based on user's local timezone
  const formatted = now.toLocaleString("en-US", options);

  // Convert "Aug 28, 2025, 11:08 PM" → "Aug 28, 2025 . 11:08 PM"
  return formatted;
};


const buildAudioFormData = async (userId, blob) => {
  const audioFile = new File([blob], "recording.webm", { type: "audio/webm" });
  const duration = await getAudioDuration(blob);
  console.log("abcd", + duration)
  // console.log(type)

  const formData = new FormData();
  formData.append("file", audioFile, audioFile.name); // audio recording
  formData.append("userId", userId);                    // user id
  formData.append("createdAt", getLocalDateTime());       // IST timestamp
  formData.append("type", blob.type);
  formData.append("duration", duration);


  console.log("abcd", + duration)
  // console.log(type)


  return formData;
};

export default buildAudioFormData;