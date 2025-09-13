export function getAudioDuration(blob) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);

    audio.addEventListener("loadedmetadata", () => {
      const totalSeconds = Math.floor(audio.duration);
      URL.revokeObjectURL(url);

      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      const formatted = 
        String(minutes).padStart(2, "0") + ":" + 
        String(seconds).padStart(2, "0");

      resolve(formatted);
    });

    audio.addEventListener("error", (err) => {
      reject(err);
    });
  });
}

