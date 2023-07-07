import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { weatherActions } from '../../store/weatherReducer';
import classes from "./Search.module.css"
import Button from '../../ui/Button';

const Search = () => {
  const [region, setRegion] = useState("")
  const dispatch = useDispatch();

  const inputChangeHandler = (e) => {
    setRegion(e.target.value)
  }

  const weatherChangeHandler = (e) => {
    e.preventDefault()
    dispatch(weatherActions.isLoadingChange(true))
    dispatch(weatherActions.regionChange(region));
    setRegion("")
  };

  return (
    <form className={classes.container} onSubmit={weatherChangeHandler}>
      <input className={classes.search} value={region} onChange={inputChangeHandler} />
      <Button type='submit'>Search</Button>
    </form>
  )
}

export default Search