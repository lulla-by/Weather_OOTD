import React from 'react'
import Card from '../../ui/Card'
import classes from './information.module.css'
import { getNowWeather } from '../../utils/getNowWeather';

const Information = ({ props,data }) => {

  const { temperature, precipitation, humidity, precipitationType, skyCondition } = props;
  const weatherClasseName = getNowWeather(precipitationType, skyCondition)
  const weatherMsg = "현재 날씨: " + (weatherClasseName && weatherClasseName[1])

  const weatherImgSrc = require(`/src/assets/${weatherClasseName[1].split(" ").join("")}.png`)


  return (
    <Card>
      <div className={classes.weather}>
        <img src={weatherImgSrc} alt={weatherMsg} />
        <p className={classes.a11yHidden}>{weatherMsg}</p>
      </div>
      <ul className={classes.infoBox}>
        <li className={classes.info}>
          <p>기온: {temperature}℃</p>
        </li>
        <li className={classes.info}>
          <p>강수량: {(precipitation === "강수없음" ? "0mm" : (precipitation))}</p>
        </li>
        <li className={classes.info}>
          <p>습도: {humidity}%</p>
        </li>
        <li className={classes.info}>
          <p>강수형태: {precipitationType}</p>
        </li>
        <li className={classes.info}>
          <p>하늘상태: {skyCondition}</p>
        </li>
      </ul>
    </Card>
  )
}

export default Information