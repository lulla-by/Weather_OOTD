import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import classes from "./KakaoMap.module.css"
import { weatherActions } from '../../store/weatherReducer';
import { dfsXyConv } from '../../utils/xyConverter';
import { makeBaseTime } from '../../utils/getBaseTime';
import { groupByFcstTime } from '../../utils/getData';

const { kakao } = window;

const KakaoMap = () => {
  const state = useSelector(state => state.region)
  const dispatch = useDispatch()

// 날씨정보를 받는 함수
  const getWeatherData = (lat, long) => {
    const { baseDate, baseTime } = makeBaseTime()
    const serviceKey = process.env.REACT_APP_WEATHER_KEY;
    const numOfRows = 1000;
    const pageNo = 1;
    const { x: nx, y: ny } = dfsXyConv("toXY", lat, long);

    const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst` +
      `?serviceKey=${serviceKey}` +
      `&numOfRows=${numOfRows}&pageNo=${pageNo}` +
      `&dataType=json&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

    axios.get(url)
      .then(async res => {
        const data = await res.data.response.body.items.item
        const filteredData = await groupByFcstTime(data);
        dispatch(weatherActions.changeChartWeather(filteredData))
        // console.log(filteredData);
      })
      .catch(error => {
        console.error(error);
      });
    dispatch(weatherActions.initialRegion({ lat, long }))

  }

  // 지도에 표시하는 함수
  const createMap = async position => {
    try {
      const coords = position.coords;
      const { latitude, longitude } = coords;
      const container = document.getElementById("map")
      const msgBox = '<div style="width:150px;text-align:center;padding:6px 0;">오늘의 여행지</div>'

      const options = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 5
      }
      const map = new kakao.maps.Map(container, options)

      // 검색한 값이 있을 경우
      if (state !== "") {
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(state, function (result, status) {

          // 1. 유효하지 않은 주소일 경우 => 기본 위경도 보내기
          if (status === "ZERO_RESULT") {
            alert("주소지를 확인해주세요")
            getWeatherData(latitude, longitude)
          }

          // 2. 유효한 주소의 경우 => 바뀐 위경도 보내기
          if (status === kakao.maps.services.Status.OK) {

            let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            // 결과값으로 받은 위치를 마커로 표시
            let marker = new kakao.maps.Marker({
              map: map,
              position: coords
            });

            map.setCenter(coords);

            // // 인포윈도우로 장소에 대한 설명을 표시합니다
            let infowindow = new kakao.maps.InfoWindow({
              content: msgBox
            });
            infowindow.open(map, marker);

            let { La, Ma } = coords
            getWeatherData(Ma, La)
          }
        });
      } else {
        // 검색값이 없는 경우 => 기본 위경도 보내기
        getWeatherData(latitude, longitude)
      }




    } catch (error) {
      console.log(error)
    }


  }

  function onGeoError() {
    console.log("Can't find you");
  }


  useEffect(() => {
    const position = navigator.geolocation.getCurrentPosition(createMap, onGeoError)
  }, [state])

  return (
    <>
      <div id="map" className={classes.container}></div>
    </>


  )
}

export default KakaoMap