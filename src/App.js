import Map from './components/map/Map';
import Contents from './components/contents/Contents';
import Layout from './ui/Layout';
import { Fragment } from 'react';
import classes from "./App.module.css"
import Chart from './components/chart/Chart';

function App() {
  return (
    <Fragment>
      <header ><h1 className={classes.header}>OOTD WITH WEATHER</h1></header>
      <main className={classes.wrap}>
        <Layout>
          <section className={classes.webDescription}>
            <p className={classes.title}>
              이 웹사이트는 원하는 지역의 기상예보를 제공합니다.<br />
              원하시는 지역을 검색하셔서 차트룰 확인하고<br />
              현재 날씨정보와 추천하는 옷차림을 확인하여 외출 준비에 참고하세요!
            </p>
          </section>
          <section>
            <Map />
            <Chart />
            <Contents />
          </section>
        </Layout>
      </main>
      <footer>
        <p>copyright</p>
        <ul className={classes.copyRightList}>
          <li>
            <a href="https://www.flaticon.com/kr/packs/weather-4?word=weather" title="날씨 아이콘"> ⓒ 맑음 아이콘 제작자: Freepik - Flaticon</a>
          </li>
          <li>
            <a href="https://www.flaticon.com/kr/packs/clothes-212?word=clothes&k=1688648414821&log-in=google" title="의상 아이콘"> ⓒ 의상 아이콘 제작자: Freepik - Flaticon</a>
          </li>
          <li>
          <a href="https://kr.freepik.com/free-vector/fashion-young-koreans_9471154.htm#page=7&query=fashion&position=6&from_view=search&track=sph"> ⓒ 배경이미지 제작자 pikisuperstar 출처 Freepik</a> 
          </li>
        </ul>
      </footer>
    </Fragment>
  );
}

export default App;
