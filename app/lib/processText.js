import buildTextFormData from "./buildTextFormData";
import fetchSummary from "./fetchSummary";
import createCardFromResponse from "./createCardFromResponse";
import useStore from "../store/useStore";

const getPlainText = (html) =>
  html ? (new DOMParser().parseFromString(html, "text/html")).body.textContent || "" : "";

export default async function processText(theText, userId) {

    const { isFetching, setIsFetching, text, user } = useStore.getState();

  try {
    setIsFetching(true)
    const plainText = getPlainText(text);
    const formData = await buildTextFormData(userId, theText);
    console.log('this is form data',formData);
    const response = await fetchSummary(formData);
    console.log( 'this is response' ,response)
    return createCardFromResponse(response);
  } catch (error) {
    console.error("Error processing audio:", error);
    return null;
  } finally {
    setIsFetching(false); // always runs after try/catch
  }
}