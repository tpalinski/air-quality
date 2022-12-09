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
          <h3> Air pollution in Gdańsk</h3>
          <h5><b> <i>Informacje w języku polskim - na dole strony </i>⬇️</b></h5>
          <p>Due to more and more people growing more conscious about the quality of the air that they are breathing in and said quality getting worse and worse, 
            it is necessary to provide people with ways to visualize and analyze the air pollution data. This application enables you to do so by providing you with 2 tools: 
          </p>
           <p> <b>Graphs</b> - they allow you to see prevalent various pollution types were in the air in the selected period of time. You can also choose the station  which measured the data or average result of all the readings </p>
           <p> <b>Heatmap</b> - this tool allows you to visualize how pollution is distributed throughout the Tri-City based on the readings from 7 stations (more details in Polish, below). Choose relevant day and type of pollution and see, how bad (or good 😉) the air quality is near you</p>
           <p>Below you can also find the analysis of the data in Polish, so that the majority of the residents can easily understand it</p>
            
        </div>
        <GraphComponent/>
        <MapSelector />
        <DataAnalysis />
      </div>
    </div>
  );
}

export default App;
