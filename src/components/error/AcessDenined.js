import React from 'react'
import classes from "./AcessDenined.module.css"
const AcessDenined = () => {
  return (
    <div className={classes.notice}> 
      <h2>위치 접근이 허가되어 있지 않습니다.</h2>
      <p>위치 접근을 허가한 뒤 새로고침하여 재실행 해주세요.</p>
    </div>
  )
}

export default AcessDenined