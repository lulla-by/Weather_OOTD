import React, { useEffect, useState } from 'react'
import Information from './Information';
import Clothes from './Clothes';
import {useSelector } from 'react-redux';
import { dfsXyConv } from '../../xyConverter';
import axios from 'axios';
import classes from "./Contents.module.css"

const Contents = () => {

  const [nowWeather, setNowWether] = useState([])
  const dateTimeConverter = (a) => {
    if (a < 10) {
      return "0" + a.toString()
    } else {
      return a.toString()
    }
  }

  let date = new Date();

  let year = date.getFullYear().toString()
  let month = dateTimeConverter(date.getMonth() + 1)
  let day = dateTimeConverter(date.getDate())

  let hours = dateTimeConverter(date.getHours())
  let minutes = dateTimeConverter(date.getMinutes())


  let baseDate = (year + month + day)
  let baseTime = (hours + minutes > hours + "30" ? hours + "30" : hours - 1 + "30")
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
      if (!groupedData[fcstDate+fcstTime]) {
        groupedData[fcstDate+fcstTime] = [];
      }
      groupedData[fcstDate+fcstTime].push(item);
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
          const data = response.data.response.body.items.item
          const filteredData = groupByFcstTime(data);
          setNowWether(filteredData)
        })
        .catch(error => {
          // 오류 처리
          console.error(error);
        });
    }
  }, [lat, long])


  return (
    <div className={classes.container}>   
      <Information />
      <Clothes />
    </div>
  )
}

export default Contents