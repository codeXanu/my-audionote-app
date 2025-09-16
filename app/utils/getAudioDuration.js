// ✅ Function to get raw duration in seconds (integer)
export function getAudioDuration(blob) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);

    audio.addEventListener("loadedmetadata", () => {
      const totalSeconds = Math.floor(audio.duration);
      URL.revokeObjectURL(url);
      resolve(totalSeconds); // integer
    });

    audio.addEventListener("error", (err) => {
      reject(err);
    });
  });
}

// ✅ Helper function to format duration in "MM:SS"
export function formatDuration(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0")
  );
}



// export function getAudioDuration(blob) {
//   return new Promise((resolve, reject) => {
//     const url = URL.createObjectURL(blob);
//     const audio = new Audio(url);

//     audio.addEventListener("loadedmetadata", () => {
//       const totalSeconds = Math.floor(audio.duration);
//       URL.revokeObjectURL(url);

//       const minutes = Math.floor(totalSeconds / 60);
//       const seconds = totalSeconds % 60;

//       const formatted = 
//         String(minutes).padStart(2, "0") + ":" + 
//         String(seconds).padStart(2, "0");

//       resolve(formatted);
//     });

//     audio.addEventListener("error", (err) => {
//       reject(err);
//     });
//   });
// }

