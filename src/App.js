import React from 'react'
import './App.css';
import Row from './Row'

function App() {
  return (
    <div className="App">
      <h1>Let's build Netflix clone front-end today</h1>
      <Row title="NETFLIX ORIGINALS"/>
      <Row title="Trending Now"/>
      <Row title="Top Rated"/>
    </div>
  );
}

export default App;
