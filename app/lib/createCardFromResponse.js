import getAudioURL from "../utils/getAudioUrl";
import { formatDuration } from "../utils/getAudioDuration";
import formatIsoToLocalString from "../utils/getLocalDateTime";
// import { getAudioFileUrl } from "../utils/getAudioUrl";


const createCardFromResponse = (response) => ({
  id: response.id,
  date: formatIsoToLocalString(response.date_time),
  title: response.title || "Untitled",
  type: response.type,
  duration: formatDuration(response.duration),
  audioUrl: response.file_url,
  transcript: response.transcript,
  content: response.summary,
});


export default createCardFromResponse;