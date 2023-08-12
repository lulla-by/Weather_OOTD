import { createSlice } from "@reduxjs/toolkit";
import { getDataObject } from "./getData";



let initialState = {
  current:{
    lat:"",
    long:""
  },
  chartWeather:"",
  region:"",
  isLoading:"",
  isLocationPermission:true
};

// 전역상태의 slice를 미리 만들기
const weatherReducer = createSlice({
  name: "weather",
  initialState: initialState,
  reducers: {
    initialRegion(state,action){
      state.current.lat = action.payload.La
      state.current.long = action.payload.Ma
    },
    changeChartWeather(state,action){
      const data = getDataObject(action.payload)
      state.chartWeather = data
      state.isLoading=false
      
    },
    regionChange(state,action) {
      state.region = action.payload;
    },
    isLoadingChange(state,action){
      state.isLoading = action.payload
    },
    isLocationPermissionGranted(state,action){
      state.isLocationPermission = action.payload
    }
  },
});

export const weatherActions = weatherReducer.actions;

export default weatherReducer.reducer;