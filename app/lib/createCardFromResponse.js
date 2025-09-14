import getAudioURL from "../utils/getAudioUrl";

const createCardFromResponse = (response) => ({
  id: response.id,
  date: response.createdAt,
  title: response.title || "Untitled",
  type: response.type,
  duration: response.duration,
  audioUrl: getAudioURL(response.audioFile),
  transcript: response.transcript,
  content: response.summary,
});


export default createCardFromResponse;