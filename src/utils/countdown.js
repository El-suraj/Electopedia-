/**
 * Calculates the time remaining until a target date.
 * Returns an object with days, hours, minutes, seconds, and a isPast flag.
 */
export function getTimeRemaining(targetDateStr) {
  const target = new Date(targetDateStr).getTime(); // ✅ use input
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return {
      text: "Election day is here",
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    text: `${days} days to election`,
    days,
    hours,
    minutes,
    seconds,
    isPast: false,
  };
}

/**
 * Formats a number with a leading zero if less than 10.
 */
export function pad(n) {
  return String(n).padStart(2, "0");
}

/**
 * Returns a human-readable relative label, e.g. "in 45 days"
 */
export function relativeLabel(targetDateStr) {
  const { days, isPast } = getTimeRemaining(targetDateStr);
  if (isPast) return "Passed";
  if (days === 0) return "Today!";
  if (days === 1) return "Tomorrow";
  return `in ${days} days`;
}
