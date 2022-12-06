import React from 'react';
import './App.css';
import { GraphsContainer } from "./containers/GraphsContainer";

function App() {
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
        <div className='Graphs'>
          <GraphsContainer text="CO"/>
          <GraphsContainer text='NO2'/>
          <GraphsContainer text='PM10'/>
        </div>
      </div>
      
    </div>
  );
}

export default App;
