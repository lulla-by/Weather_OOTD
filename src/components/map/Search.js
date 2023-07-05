import React from 'react'
import {useState } from 'react';
import { useDispatch } from 'react-redux';
import { weatherActions } from '../../store/weatherReducer';


const Search = () => {
  const [region, setRegion] = useState("")
  const dispatch = useDispatch();

  const inputChangeHandler = (e) => {
    setRegion(e.target.value)
  }

  const weatherChangeHandler = (e) => {
    e.preventDefault()
    dispatch(weatherActions.regionChange(region));
    setRegion("")
  };


  return (
    <form onSubmit={weatherChangeHandler}>
      <input value={region} onChange={inputChangeHandler} />
      <button type='submit'>검색</button>
    </form>
  )
}

export default Search