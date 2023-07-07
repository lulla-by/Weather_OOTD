import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { weatherActions } from '../../store/weatherReducer';
import classes from "./KakaoMap.module.css"
import { makeBaseTime } from '../../utils/getBaseTime';
import { dfsXyConv } from '../../utils/xyConverter';
import axios from 'axios';
import { groupByFcstTime } from '../../utils/getData';
const { kakao } = window;

const KakaoMap = () => {
  const state = useSelector(state => state.region)
  const dispatch = useDispatch()


  const onGeoOk = async position => {
    const { baseDate, baseTime } = makeBaseTime()
    const serviceKey = process.env.REACT_APP_WEATHER_KEY;
    const numOfRows = 1000;
    const pageNo = 1;
    try {
      const coords = position.coords;
      const { latitude, longitude } = coords;
      const container = document.getElementById("map")
      const msgBox = '<div style="width:150px;text-align:center;padding:6px 0;">오늘의 여행지</div>'

      // 검색한 값이 있을 경우
      if (state !== "") {
        const options = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 5
        }
        const map = new kakao.maps.Map(container, options)
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(state, function (result, status) {
          if (status === "ZERO_RESULT") {
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

            map.setCenter(coords);

            // // 인포윈도우로 장소에 대한 설명을 표시합니다
            let infowindow = new kakao.maps.InfoWindow({
              content: msgBox
            });
            infowindow.open(map, marker);

            let { La, Ma } = coords

            const { x: nx, y: ny } = dfsXyConv("toXY", Ma, La);
            const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst` +
              `?serviceKey=${serviceKey}` +
              `&numOfRows=${numOfRows}&pageNo=${pageNo}` +
              `&dataType=json&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

            axios.get(url)
              .then(async res => {
                const data = await res.data.response.body.items.item
                const filteredData = await groupByFcstTime(data);
                await dispatch(weatherActions.changeChartWeather(filteredData))
              })
              .catch(error => {
                alert("새로고침을 해주세요")
              });

            dispatch(weatherActions.initialRegion({ La, Ma }))
            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          }
        });
      } else {
        // 검색값이 없는 경우
        const options = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 5
        }
        const map = new kakao.maps.Map(container, options)

        const { x: nx, y: ny } = dfsXyConv("toXY", latitude, longitude);
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
        dispatch(weatherActions.initialRegion({ longitude,latitude }))
      }
    } catch (error) {
      console.log(error)
    }
    
    
  }
  
  function onGeoError() {
    console.log("Can't find you");
  }
  useEffect(() => {
    const position = navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)

  }, [state])

  return (
    <>
      <div id="map" className={classes.container}></div>
    </>


  )
}

export default KakaoMap