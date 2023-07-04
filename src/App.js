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
          <h1>OOTD</h1>
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
