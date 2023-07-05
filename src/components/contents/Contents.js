import React, { useEffect, useState } from 'react'
import Information from './Information';
import Clothes from './Clothes';
import { useSelector } from 'react-redux';
import { dfsXyConv } from '../../xyConverter';
import axios from 'axios';

const Contents = () => {

  const [nowWeather, setNowWether] = useState([])

  const dateTimeConverter = (a)=>{
    if(a < 10){
      return "0"+a.toString()
    }else{
      return a.toString()
    }
  }

  let date = new Date();
  
  let year = date.getFullYear().toString()
  let month = dateTimeConverter(date.getMonth()+1)
  let day = dateTimeConverter(date.getDate())

  let hours = dateTimeConverter(date.getHours())
  let minutes = dateTimeConverter(date.getMinutes())


  let baseDate = (year+month+day)
  let baseTime = (hours+minutes > hours+"30" ? hours+"30" :hours-1+"30")
  const serviceKey = process.env.REACT_APP_WEATHER_KEY;
  const numOfRows = 1000;
  const pageNo = 1;


  const { lat, long } = useSelector(state => state.current)
  const { x: nx, y: ny } = dfsXyConv("toXY", lat, long);



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
          console.log(data);
        })
        .catch(error => {
          // 오류 처리
          console.error(error);
        });
    }
  }, [lat,date])

  return (
    <div>
      <Information />
      <Clothes />
    </div>
  )
}

export default Contents