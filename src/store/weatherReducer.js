import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  region:"",
  current:{
    lat:"",
    long:""
  },
  chartWeather:"",
  nowWeather:{}
};

// 전역상태의 slice를 미리 만들기
const weatherReducer = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    regionChange(state,action) {
      state.region = action.payload;
    },
    initialRegion(state,aciton){
      state.current.lat = aciton.payload.Ma
      state.current.long = aciton.payload.La
    },
    changeChartWeather(state,aciton){
      state.chartWeather = aciton.payload
    },
    changeNowWeather(state,action){
      for(let key in action.payload){
      state.nowWeather = action.payload[key]
      }
    }
  },
});

export const weatherActions = weatherReducer.actions;

export default weatherReducer.reducer;