// Simple number to string formatter
// Only displays tenth below 30s left

export default function formatTime(time: number): string {
  const tenth = Math.floor(time / 100) % 10;
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / 60000) % 60;
  const hour = Math.floor(time / 3600000);

  return `${hour > 0 ? hour + ":" : ""}${hour > 0 && minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" + seconds : seconds}${
    time < 30000 ? "." + tenth : ""
  }`;
}
