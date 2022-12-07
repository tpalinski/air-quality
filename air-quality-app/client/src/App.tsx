import React, {useEffect, useState} from 'react';
import './App.css';
import { GraphsContainer } from "./containers/GraphsContainer";
import { GraphResponseData } from "./types";
import { getData } from "./api/api";

function App() {
  let [graphData, setGraphData] = useState<GraphResponseData>();
  let [timePeriod, setTimePeriod] = useState(0);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getData('timePeriod').then((response) => {
      console.log(response)
      setGraphData(response)
      setIsLoading(false);
    })
    
  }, [timePeriod])

  const handlePeriodChange = (e: any) => {
    setTimePeriod(timePeriod + 1)
  }
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
          {isLoading ? <div className='Loader'></div> : <button onClick={handlePeriodChange} disabled={isLoading}> Fetch Data</button>}
          <GraphsContainer text="CO" data={graphData?.co}/>
          <GraphsContainer text='NO2' data={graphData?.no2}/>
          <GraphsContainer text='PM10' data={graphData?.pa}/>
        </div>
      </div>
      
    </div>
  );
}

export default App;
