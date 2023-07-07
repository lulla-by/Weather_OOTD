export function makeBaseTime() {
  const now = new Date();
  let year = now.getFullYear().toString().padStart(4, "0");
  let month = (now.getMonth() + 1).toString().padStart(2, "0");
  let day = now.getDate().toString().padStart(2, "0");
  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (hours === 0 && minutes < 30) {
    const previousDay = new Date(now.getTime() - (24 * 60 * 60 * 1000));
    year = previousDay.getFullYear().toString().padStart(4, "0");
    month = (previousDay.getMonth() + 1).toString().padStart(2, "0");
    day = previousDay.getDate().toString().padStart(2, "0");
    hours = 23;
    minutes = 30;
  } else if (hours === 1 && minutes < 30) {
    hours = 0;
    minutes = "30";
  } else if (minutes >= 30) {
    minutes = "30";
  } else {
    hours = (hours - 1).toString().padStart(2, "0");
    minutes = "30";
  }
  const baseDate = year + month + day;
  const baseTime = hours.toString().padStart(2, "0") + minutes;
  return {
    baseDate,
    baseTime
  };
}