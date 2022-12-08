import React, {useEffect, useState} from 'react';
import './App.css';
import { DataAnalysis } from './components/DataAnalysis';
import { GraphComponent } from "./components/graphs/GraphComponent";
import { MapSelector } from './components/MapSelector';

function App() {
  //rendering logic
  return (
    <div className="App">
      <div className='Title'>
        <h1>Air Quality - Gdańsk</h1>
      </div>
      <div className='Content'>
        <div className='Lore'>
          <h3> Tytul tego wszystkiego</h3>
          <p>Lorem ipsum i takie tam</p>
        </div>
        <GraphComponent/>
        <MapSelector />
        <DataAnalysis />
      </div>
    </div>
  );
}

export default App;
