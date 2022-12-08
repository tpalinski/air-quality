import React, {useEffect, useState} from 'react';
import './App.css';

import { GraphsContainer } from "./components/GraphsContainer";
import { PeriodPicker } from "./components/PeriodPicker";
import { GraphResponseData, TimePeriod } from "./types";
import { getData, getDataDebug } from "./api/api";
import { MapSelector } from './components/MapSelector';

function App() {
  let [graphData, setGraphData] = useState<GraphResponseData>();
  let [timePeriod, setTimePeriod] = useState<TimePeriod>(["2021-02-02 11:00:00", "2021-02-02 12:00:00"]);
  let [isLoading, setIsLoading] = useState(false);
  let [urlSuffix, setUrlSuffix] = useState<string>("Average");

  useEffect(() => {
    setIsLoading(true);
    getData(timePeriod, urlSuffix).then((response) => {
      let responseData = JSON.parse(response)
      setGraphData(responseData)
      setIsLoading(false);
    })
    
  }, [timePeriod])

  const handlePeriodChange = (period: TimePeriod = ["2021-02-02 11:00:00", "2021-02-02 12:00:00"]) => {
    setTimePeriod(period)
  }

  const handleUrlChange = (url: string) => {
    setUrlSuffix(url)
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
        <PeriodPicker onChange={(period) => {handlePeriodChange(period)}} 
                      isLoading={isLoading} 
                      onStationChange={(stationName) => handleUrlChange(stationName)} />
        <div className='Graphs'>
          <GraphsContainer text="CO" data={graphData?.co}/>
          <GraphsContainer text='NO2' data={graphData?.no}/>
          <GraphsContainer text='PM10' data={graphData?.pm}/>
        </div>
        <MapSelector />
      </div>
      
    </div>
  );
}

export default App;
