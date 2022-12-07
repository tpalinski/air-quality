import React, {useEffect, useState} from 'react';
import { Calendar } from "react-calendar";
import './App.css';

import { GraphsContainer } from "./components/GraphsContainer";
import { PeriodPicker } from "./components/PeriodPicker";
import { GraphResponseData, TimePeriod } from "./types";
import { getData, getDataDebug } from "./api/api";

function App() {
  let [graphData, setGraphData] = useState<GraphResponseData>();
  let [timePeriod, setTimePeriod] = useState<TimePeriod>(["2021-02-02 11:00:00", "2021-02-02 12:00:00"]);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getDataDebug(timePeriod).then((response) => {
      let responseData = JSON.parse(response)
      setGraphData(responseData)
      setIsLoading(false);
    })
    
  }, [timePeriod])

  const handlePeriodChange = () => {
    setTimePeriod(["2021-02-02 11:00:00", "2021-02-02 12:00:00"])
  }

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
        <div className='PeriodSelector'>
          <PeriodPicker onChange={() => {handlePeriodChange()}} />
        </div>
        <div className='Graphs'>
          {isLoading ? <div className='Loader'></div> : <button onClick={handlePeriodChange} disabled={isLoading}> Fetch Data</button>}
          <GraphsContainer text="CO" data={graphData?.co}/>
          <GraphsContainer text='NO2' data={graphData?.no}/>
          <GraphsContainer text='PM10' data={graphData?.pa}/>
        </div>
      </div>
      
    </div>
  );
}

export default App;
