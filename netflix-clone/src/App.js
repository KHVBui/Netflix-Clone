import React from 'react';
import './App.css';
import requests from './requests';
import Nav from './Nav';
import Banner from './Banner';
import Row from './Row';


function App() {
  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row
        title="TOP RATED"
        fetchUrl={requests.fetchTopRated}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies " fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      <Row title="Family Movies" fetchUrl={requests.fetchFamilyMovies} />
    </div>
  );
}

export default App;
