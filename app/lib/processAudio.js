import buildAudioFormData from "./buildAudioFromData";
import fetchSummary from "./fetchSummary";
import createCardFromResponse from "./createCardFromResponse";
import useStore from "../store/useStore";


const processAudio = async ( blob, userId) => {
  
  const { isFetching, setIsFetching } = useStore.getState();

  try {
    setIsFetching(true)
    const formData = await buildAudioFormData(userId, blob);
    const response = await fetchSummary(formData);
    console.log('this is response from database', response);
    return createCardFromResponse(response);
  } catch (error) {
    console.error("Error processing audio:", error);
    return null;
  } finally {
    setIsFetching(false); // always runs after try/catch
  }
};


export default processAudio ;