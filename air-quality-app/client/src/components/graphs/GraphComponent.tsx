import React, {useEffect, useState} from 'react';
import { GraphsContainer } from "./GraphsContainer";
import { PeriodPicker } from "./PeriodPicker";
import { GraphResponseData, TimePeriod } from "../../types";
import { getData} from "../../api/api";

type Props = {

}
export function GraphComponent(props: Props) {

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