export const getDataObject = (datas) => {
  const obj = {};
  for (const item in datas) {
    if (!obj[item]) {
      obj[item] = [];
    }
    for (let i = 0; i < datas[item].length; i++) {
      const fcstTime = datas[item][i].fcstTime;
      const fcstDate = datas[item][i].fcstDate;
      const category = datas[item][i].category;

      if (!obj[item][fcstDate + fcstTime]) {
        obj[item][fcstDate + fcstTime] = {};
      }

      obj[item][fcstDate + fcstTime][category] = datas[item][i].fcstValue;
    }
  }
  return obj;
};