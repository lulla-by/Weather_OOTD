export function groupByFcstTime(data) {
  const groupedData = {};

  if (!data) {
    return groupedData;
  }

  data.forEach((item) => {
    const fcstTime = item.fcstTime;
    const fcstDate = item.fcstDate
    if (!groupedData[fcstDate + fcstTime]) {
      groupedData[fcstDate + fcstTime] = [];
    }
    groupedData[fcstDate + fcstTime].push(item);
  });

  return groupedData;
}