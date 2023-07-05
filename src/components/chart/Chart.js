import React, { useState } from 'react';
import ApexCharts from 'react-apexcharts'
import { useSelector } from 'react-redux';

const Chart = () => {
  const weatherData = useSelector(state=>state.weather)
 const [chartData,setChartData] = useState([])

 function convertDateTime(dateTime) {
  const year = dateTime.slice(2, 4);
  const month = dateTime.slice(4, 6);
  const day = dateTime.slice(6, 8);
  const hour = dateTime.slice(8, 10);

  return `${year}.${month}.${day} ${hour}시`;
}


  const make = (datas) => {
    const obj = {};
    for (const item in datas) {
      if (!obj[item]) {
        obj[item] = [];
      }
      for (let i = 0; i < datas[item].length; i++) {
        const fcstTime = datas[item][i].fcstTime;
        const fcstDate = datas[item][i].fcstDate;
        const category = datas[item][i].category;
  
        if (!obj[item][fcstDate + fcstTime]) {
          obj[item][fcstDate + fcstTime] = {};
        }
  
        obj[item][fcstDate + fcstTime][category] = datas[item][i].fcstValue;
      }
    }
  
    return obj;
  };

  let data = make(weatherData)
  // console.log(data);

  const aaa = Object.entries(data).map(([key, value]) => {
    return value
  });

  const makeSeries = (data)=>{
    let arr = [{name: 'Actual',
    data:[
    ]}]
    for(let i = 0 ; i< data.length ; i++){
      for(let key in data[i]){
        let temperature = data[i][key].T1H
        let precipitation= (data[i][key].RN1==="강수없음"?0:data[i][key].RN1.toString().replace('mm', ''))
        let now = convertDateTime(key)
        let obj = {
          x:now,
          y:temperature,
          goals:[
            {name:"강수량",
            value :precipitation,
            strokeHeight: 10,
            strokeColor: '#4dabf7'
          }
          ]
        }
        arr[0].data.push(obj);
      }
    }
    return arr

  }



  const makedSeries = makeSeries(aaa)
  

  const options = {
    chart: {
      height: 350,
      type: 'bar'
    },
    colors: ['#fcc419'],
    plotOptions: {
      bar: {
        columnWidth: '45%'
      }
    },
  };

  return (
    <div id="chart">
      <ApexCharts options={options} series={makedSeries} type="bar" height={350} />
    </div>
  );
};

export default Chart;