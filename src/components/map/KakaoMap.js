import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const { kakao } = window;

const KakaoMap = () => {
  const data = useSelector(state => state.current)


  async function onGeoOk(position) {
    const WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY
    const coords = position.coords;
    const { latitude, longitude } = coords;
    const url = ` https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    const container = document.getElementById("map")
    const options = {
      center: new kakao.maps.LatLng(data.coord.lat, data.coord.lon),
      level: 5
    }
    const map = new kakao.maps.Map(container, options)
  }
  function onGeoError() {
    console.log("Can't find you");
  }
  const position = navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

  return (
    <div id="map" style={{ width: "100%", height: "300px", backgroundColor: "skyblue" }}></div>
  )
}

export default KakaoMap