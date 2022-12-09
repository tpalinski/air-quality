import React, {useEffect, useState} from 'react';
import { GraphsContainer } from "./GraphsContainer";
import { PeriodPicker } from "./PeriodPicker";
import { GraphResponseData, TimePeriod } from "../../types";
import { getBigData, getData} from "../../api/api";

const MONTH_THRESHOLD = 2
export function GraphComponent() {

  let [graphData, setGraphData] = useState<GraphResponseData>();
  let [timePeriod, setTimePeriod] = useState<TimePeriod>(["2021-02-02 11:00:00", "2021-02-02 12:00:00"]);
  let [isLoading, setIsLoading] = useState(false);
  let [urlSuffix, setUrlSuffix] = useState<string>("Average");

  useEffect(() => {
    setIsLoading(true);
    if(parseInt(timePeriod[1].substring(5, 7)) - parseInt(timePeriod[0].substring(5, 7)) >= MONTH_THRESHOLD){
      update(getBigData)
    } else {
      update(getData)
    }
  }, [timePeriod])

  const update = (fetchFunction: (arg0: TimePeriod, arg1: string) => Promise<string>): void => {
    fetchFunction(timePeriod, urlSuffix).then((response) => {
      let responseData = JSON.parse(response)
      setGraphData(responseData)
      setIsLoading(false);
    })
  }

  const handlePeriodChange = (period: TimePeriod = ["2021-02-02 11:00:00", "2021-02-02 12:00:00"]) => {
    setTimePeriod(period)
  }

  const handleUrlChange = (url: string) => {
    setUrlSuffix(url)
  }

    return (
        <>
            <PeriodPicker onChange={(period) => {handlePeriodChange(period)}} 
                      isLoading={isLoading} 
                      onStationChange={(stationName) => handleUrlChange(stationName)} />
            <div className='Graphs'>
            <GraphsContainer text="CO" data={graphData?.co}/>
            <GraphsContainer text='NO2' data={graphData?.no}/>
            <GraphsContainer text='PM10' data={graphData?.pm}/>
            </div>
        </>
    )
}