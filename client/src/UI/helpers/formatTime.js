// Simple number to string formatter
// TODO : expand to take milliseconds as input (ony display 1/10s below 30s left)
// TODO : format hours as well

export default function formatTime(time) {
  return `${Math.floor(time / 60)}:${
    time % 60 < 10 ? "0" + (time % 60) : time % 60
  }`;
}
