export default function secondsToTime(seconds: number) {
  const zeroLeft = (number: number) =>
    Math.floor(number).toString().padStart(2, '0');
  const min = zeroLeft((seconds / 60) % 60);
  const sec = zeroLeft((seconds % 60) % 60);
  return `${min}:${sec}`;
}
