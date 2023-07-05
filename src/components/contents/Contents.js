import React, { useEffect, useState } from 'react'
import Information from './Information';
import Clothes from './Clothes';
import { useSelector } from 'react-redux';
import { dfsXyConv } from '../../xyConverter';
import axios from 'axios';

const Contents = () => {

  const [nowWeather, setNowWether] = useState([])

  const serviceKey = process.env.REACT_APP_WEATHER_KEY;
  const numOfRows = 1000;
  const pageNo = 1;
  const base_date = '20230705';
  const base_time = '0030';

  const {lat,long} = useSelector(state => state.current)
  const {x:nx,y:ny} = dfsXyConv("toXY",lat,long);



  useEffect(() => {
    if(lat === ""){
      return ;
    }else{
      const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst` +
        `?serviceKey=${serviceKey}` +
        `&numOfRows=${numOfRows}&pageNo=${pageNo}` +
        `&dataType=json&base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}`;
  
      axios.get(url)
        .then(response => {
          const data =response.data.response.body.items.item
          console.log(data);

        })
        .catch(error => {
          // 오류 처리
          console.error(error);
        });
    }
  }, [lat])

  return (
    <div>
      <Information />
      <Clothes />
    </div>
  )
}

export default Contents