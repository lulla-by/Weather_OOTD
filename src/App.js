import Map from './components/map/Map';
import Contents from './components/contents/Contents';
import Layout from './ui/Layout';
import { Fragment } from 'react';
import classes from "./App.module.css"

function App() {
  return (
    <Fragment>
      <header>header</header>
      <main className={classes.wrap}>
        <Layout>
          <div className={classes.titleBox}>
          <h1>Choose your OOTD🌍</h1>
          </div>
          <section>
            <Map />
          </section>
          <section>
            <Contents />
          </section>
        </Layout>
      </main>
      <footer>footer</footer>
    </Fragment>
  );
}

export default App;
