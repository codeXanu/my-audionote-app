/**
 * Convert audioFile object from API response to a playable URL
 * @param {Object} audioFile - { base64, mimeType, name }
 * @returns {string} URL - can be used in <audio> src or download link
 */
export default function getAudioURL(audioFile) {
  if (!audioFile || !audioFile.base64) return null;

  const { base64, mimeType } = audioFile;

  // Decode base64 → byte array
  const byteChars = atob(base64);
  const byteNumbers = new Array(byteChars.length)
    .fill()
    .map((_, i) => byteChars.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);

  // Create a Blob and Object URL
  const blob = new Blob([byteArray], { type: mimeType });
  const url = URL.createObjectURL(blob);

  return url;
}
