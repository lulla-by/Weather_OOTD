import React, { useState } from 'react';
import ApexCharts from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import Loading from '../../ui/Loading';

const Chart = () => {
  const weatherData = useSelector(state=>state.chartWeather)
  const isLoading = useSelector(state=>state.isLoading)
 const [chartShowStata,setChartShowData] = useState(true)
const chartName = (chartShowStata?"Close Chart":"Show Chart")


 function convertDateTime(dateTime) {
  const year = dateTime.slice(2, 4);
  const month = dateTime.slice(4, 6);
  const day = dateTime.slice(6, 8);
  const hour = dateTime.slice(8, 10);

  return `${year}.${month}.${day} ${hour}시`;
}


  const filteredData = Object.entries(weatherData).map(([key, value]) => {
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

  const makedSeries = makeSeries(filteredData)
  
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


  if((isLoading === true || weatherData=== "") && chartShowStata === true) {
    return <Loading/>
  }

  return (
    <div>
      {chartShowStata && <ApexCharts options={options} series={makedSeries} type="bar" height={350} />}
      <Button onClick={()=>{setChartShowData(!chartShowStata)}} >{chartName}</Button>
    </div>
  );
};

export default Chart;