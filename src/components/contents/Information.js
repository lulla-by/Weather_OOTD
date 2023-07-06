import React from 'react'
import Card from '../../ui/Card'
import classes from './information.module.css'

const Information = ({ props }) => {

  const { temperature, precipitation, humidity, precipitationType, skyCondition } = props;

  const makeWeatherClassName = (precipitationType, skyCondition) => {
    if (precipitationType === "없음") {
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

  const weatherClasseName = makeWeatherClassName(precipitationType, skyCondition)
  const weatherMsg = "현재 날씨: "+(weatherClasseName&&weatherClasseName[1])

  return (
    <Card>
      <div className={`${classes.weather} ${classes[weatherClasseName&&weatherClasseName[0]]}`}>
        <p className={classes.a11yHidden}>{weatherMsg}</p>
      </div>
      <ul className={classes.infoBox}>
        <li className={classes.info}>
          <p>기온: {temperature}℃</p>
        </li>
        <li className={classes.info}>
          <p>강수량: {(precipitation === "강수없음" ? "0ml" : (precipitation + "ml"))}</p>
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