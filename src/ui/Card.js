import React from 'react'

const Card = (props) => {
  return (
    <div style={{height:"100px",width:"100px",backgroundColor:"lightcyan"}}>{props.children}</div>
  )
}

export default Card