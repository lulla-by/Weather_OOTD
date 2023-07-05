import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  region:"",
  current:{
    lat:"",
    long:""
  },
  weather:""
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
    changeWeather(state,aciton){
      state.weather = aciton.payload
    }
  },
});

export const weatherActions = weatherReducer.actions;

export default weatherReducer.reducer;