import React from 'react'
import Card from '../../ui/Card'
import classes from "./Clothes.module.css"
import image from "../../assets/clothes/우산.png"
import { useSelector } from 'react-redux'
const Clothes = ({ props,data }) => {
  let { temperature, precipitationType } = props;

  let region = useSelector(state => state.region)
  
  const getOuterItem = (temp) => {
    if (temp < 0) {
      return "패딩"
    } else if (temp < 9) {
      return "코트"
    } else if (temp < 11) {
      return "야상"
    } else if (temp < 16) {
      return "자켓"
    } else if (temp < 19) {
      return "가디건"
    } else {
      return "아우터 착용 필요없음"
    }
  }
  const getTopItem = (temp) => {
    if (temp < 17) {
      return "두꺼운긴팔"
    } else if (temp < 22) {
      return "얇은긴팔"
    } else if (temp < 28) {
      return "반팔"
    } else {
      return "민소매"
    }
  }
  const getBottomItem = (temp) => {
    if (temp < 19) {
      return "두꺼운바지"
    } else if (temp < 26) {
      return "긴바지"
    } else {
      return "반바지"
    }
  }

  const outerItem = getOuterItem(temperature)
  const topItem = getTopItem(temperature)
  const bottomItem = getBottomItem(temperature)

  const outer = (outerItem) => {
    if (outerItem == "아우터 착용 필요없음") {
      return "필요없음";
    } else {
      return require(`/src/assets/clothes/${outerItem}.png`)
    }
  }


  const outerItemImage = outer(outerItem)
  const topItemImage = require(`/src/assets/clothes/${topItem}.png`)
  const bottomItemImage = require(`/src/assets/clothes/${bottomItem}.png`)

  const msg = "우산"

  return (
    <Card>
      {region === "" && <h2 className={classes.title}> 현재 위치 옷차림 추천</h2>}
      {region !== "" && <h2 className={classes.title}> {region} 옷차림 추천</h2>}
      

      {outerItemImage != "필요없음" ?
        <div className={classes.outerBox} ><p className={classes.a11yHidden}>{outerItem}</p> <img src={outerItemImage} alt={outerItem} /></div>
        :null}
      <div className={classes.topBox}>
        <p className={classes.a11yHidden}>{topItem}</p>
      <img src={topItemImage} alt={topItem} />
        </div>
      <div className={classes.bottomBox}>
        <p className={classes.a11yHidden}>{bottomItem}</p>
        <img src={bottomItemImage} alt={bottomItem} />
      </div>
      {precipitationType === "비" && <div className={classes.umbrellaBox}><p className={classes.a11yHidden}>{msg}</p>
      <img src={image} alt="" /></div>}
      {precipitationType === "눈" && <div className={classes.umbrellaBox}><p className={classes.a11yHidden}>{msg}</p>
      <img src={image} alt="" />
      </div>}

    </Card>
  )
}

export default Clothes