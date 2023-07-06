import React from 'react'
import classes from "./Loading.module.css"

const Loading = () => {
  return (
    <div className={classes.wraper}>
      <div className={classes.container}>
        <div className={classes.cycle}></div>
        <p className={classes.loadingMsg}>Loading...</p>
      </div>
    </div>
  )
}

export default Loading