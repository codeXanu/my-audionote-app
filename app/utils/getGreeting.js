export function getGreetingAndDate(name = "User") {
  const now = new Date();

  // Greeting logic
  const hour = now.getHours();
  let greeting = "Hello";
  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  // Date formatting
  const options = { weekday: "long", month: "long", day: "numeric" };
  const formattedDate = now.toLocaleDateString("en-US", options);

  return {
    greeting: `${greeting}, ${name}!`,
    formattedDate, // Example: "Saturday, September 6"
  };
}
