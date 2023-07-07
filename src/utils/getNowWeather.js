 export const getNowWeather= (precipitationType, skyCondition) => {
  if (precipitationType === "없음" || precipitationType ===null) {
    if (skyCondition === "구름 많음") {
      return ["cloudy","구름 많음"];
    } else if (skyCondition === "맑음") {
      return ["sunny","맑음"];
    } else if (skyCondition === "흐림") {
      return[ "gloomy","흐림"];
    }
  } else if (precipitationType === "눈" || precipitationType === "비/눈") {
    return ["snow","눈"];
  } else if (precipitationType === "비") {
    return ["rain","비"];
  }
};