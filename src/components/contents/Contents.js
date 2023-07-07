import React from 'react'
import Information from './Information';
import Clothes from './Clothes';
import {useSelector } from 'react-redux';
import classes from "./Contents.module.css"
import Loading from '../../ui/Loading';

const Contents = () => {
  
  const weatherData = useSelector(state=>state.chartWeather)
  const isLoading = useSelector(state=>state.isLoading)
  const filteredData = Object.entries(weatherData).map(([key, value]) => {
    return value[key]
  });
  const data = filteredData[0]
  
  let temperature, precipitation, humidity, PTY, SKY;
  
  // temperature:기온, 강수량:precipitation, 습도:humidity
  if (data) {
    ({ T1H: temperature, RN1: precipitation, REH: humidity, PTY, SKY } = data);
  }



  //강수형태 - 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4) 
  const precipitationType = (PTY == 0 ? "없음" : (PTY == 1 ? "비" : (PTY == 2 ? "비/눈" : (PTY == 3 ? "눈" : (PTY == 4 ? "소나기" : null)))));

  //하늘상태 - 맑음(1), 구름많음(3), 흐림(4)
  const skyCondition = (SKY == 1 ? "맑음" : (SKY == 3 ? "구름 많음" : (SKY == 4 ? "흐림" : null)));

  const weatherObj = {temperature, precipitation, humidity, precipitationType, skyCondition}


  if(isLoading === true) {
    return <Loading/>
  }

  return (
    <div className={classes.container}>
      <Information props={weatherObj} data={data}/>
      <Clothes props={weatherObj}  data={data}/>
    </div>
  )
}

export default Contents