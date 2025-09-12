

// Usage example to get duration
export function getAudioDuration(audioFile, callback) {
  const url = getAudioURL(audioFile);
  if (!url) {
    callback(null);
    return;
  }

  const audio = new Audio(url);
  audio.addEventListener('loadedmetadata', () => {
    callback(audio.duration); // Duration in seconds
    URL.revokeObjectURL(url); // Clean up URL when done
  });
  audio.addEventListener('error', () => {
    callback(null); // handle error case
    URL.revokeObjectURL(url);
  });
}
