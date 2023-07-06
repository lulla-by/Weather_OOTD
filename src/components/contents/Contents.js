import React, { useEffect } from 'react'
import Information from './Information';
import Clothes from './Clothes';
import { useDispatch, useSelector } from 'react-redux';
import { dfsXyConv } from '../../utils/xyConverter';
import axios from 'axios';
import classes from "./Contents.module.css"
import { weatherActions } from '../../store/weatherReducer';

const Contents = () => {

  // temperature:기온, 강수량:precipitation, 습도:humidity
  let { T1H: temperature, RN1: precipitation, REH: humidity, PTY, SKY } = useSelector(state => state.nowWeather)

  //강수형태 - 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4) 
  const precipitationType = (PTY == 0 ? "없음" : (PTY == 1 ? "비" : (PTY == 2 ? "비/눈" : (PTY == 3 ? "눈" : (PTY == 4 ? "소나기" : null)))));

  //하늘상태 - 맑음(1), 구름많음(3), 흐림(4)
  const skyCondition = (SKY == 1 ? "맑음" : (SKY == 3 ? "구름 많음" : (SKY == 4 ? "흐림" : null)));

  const weatherObj = {
    temperature, precipitation, humidity, precipitationType, skyCondition
  }

  const dispatch = useDispatch()


  function makeBaseTime() {
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



  const { baseDate, baseTime } = makeBaseTime()
  const serviceKey = process.env.REACT_APP_WEATHER_KEY;
  const numOfRows = 1000;
  const pageNo = 1;

  const { lat, long } = useSelector(state => state.current)
  const { x: nx, y: ny } = dfsXyConv("toXY", lat, long);


  // 받아온 데이터의 날짜와 시간을 토대로 인덱스를 만들어 배열을 생성후 객체를 추가하여 리턴하는 함수
  function groupByFcstTime(data) {
    const groupedData = {};

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

  useEffect(() => {
    if (lat === "") {
      return;
    } else {
      const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst` +
        `?serviceKey=${serviceKey}` +
        `&numOfRows=${numOfRows}&pageNo=${pageNo}` +
        `&dataType=json&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

      axios.get(url)
        .then(response => {
          const data = response?.data?.response?.body?.items?.item
          const filteredData = groupByFcstTime(data);
          dispatch(weatherActions.changeChartWeather(filteredData))

        })
        .catch(error => {
          // 오류 처리
          console.error(error);
        });
    }
  }, [lat, long])




  return (
    <div className={classes.container}>
      <Information props={weatherObj} />
      <Clothes props={weatherObj} />
    </div>
  )
}

export default Contents