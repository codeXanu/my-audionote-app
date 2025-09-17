
export default function formatIsoToLocalString(isoString) {
  const date = new Date(isoString);
  const options = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

// Example usage:
// formatIsoToLocalString("2025-09-16T19:16:34.16327+00:00")
// → "Sep 17, 2025, 12:46 AM"
