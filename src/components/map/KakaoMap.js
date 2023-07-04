import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { weatherActions } from '../../store/weatherReducer';

const { kakao } = window;

const KakaoMap = () => {
  const state = useSelector(state => state.region)
  const dispatch = useDispatch()

  async function onGeoOk(position) {
    const WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY
    const coords = position.coords;
    const { latitude, longitude } = coords;
    const url = ` https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    const container = document.getElementById("map")

    const msgBox =  '<div style="width:150px;text-align:center;padding:6px 0;">오늘의 여행지</div>'
    // 검색한 값이 있을 경우
    if (state !== "") {
      const options = {
        center: new kakao.maps.LatLng(data.coord.lat, data.coord.lon),
        level: 5
      }
      const map = new kakao.maps.Map(container, options)
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(state, function (result, status) {
        if(status === "ZERO_RESULT"){
          console.log("주소지를 확인해주세요")
        }
        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {

          let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          let marker = new kakao.maps.Marker({
            map: map,
            position: coords
          });

          // // 인포윈도우로 장소에 대한 설명을 표시합니다
          let infowindow = new kakao.maps.InfoWindow({
            content:msgBox
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
          let center = map.getCenter(); 
          let {La,Ma} = center
          dispatch(weatherActions.initialRegion({La,Ma}))
          
        }
      });
      // 검색값이 없는 경우
    } else {
      const options = {
        center: new kakao.maps.LatLng(data.coord.lat, data.coord.lon),
        level: 5
      }
      const map = new kakao.maps.Map(container, options)
      let center = map.getCenter(); 
      let {La,Ma} = center
      dispatch(weatherActions.initialRegion({La,Ma}))
    }


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