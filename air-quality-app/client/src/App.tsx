import React, {useEffect, useState} from 'react';
import './App.css';

import { GraphsContainer } from "./components/GraphsContainer";
import { PeriodPicker } from "./components/PeriodPicker";
import { GraphResponseData, TimePeriod } from "./types";
import { getData} from "./api/api";
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
        <div className='Conclusions'>
          Ziemia i środowisko zmagają się z poważnym problemem zwiększającego się zanieczyszczenia powietrza, wody oraz gleby.  Zanieczyszczenia te są spowodowane w większości działalnością człowieka i mogą mieć fatalne skutki dla flory, fauny i ludzi. Jednymi z najgroźniejszych cząsteczek są tlenki węgla, dwutlenki azotu oraz różne inne cząsteczki zawieszone w powietrzu o średnicy nie większej niż 10 mikrometrów (określane nazwą PM10), pochodzące najczęściej z spalania paliw stałych i ciekłych. <br></br><br></br>

          Jednak poziom zanieczyszczenia powietrza nie jest związany wyłącznie z działalnością człowieka. Ma na niego wpływ wielu czynników takich jak warunki pogodowe. W naszych obliczeniach skupiliśmy się na zależności pomiędzy temperaturą powietrza, prędkością wiatru oraz zachmurzeniem, a jakością powietrza. Nasze pomiary pochodzą z placówki Instytutu Meteorologii i Gospodarki Wodnej w Gdańsku oraz siedmiu placówek dokonujących pomiaru zanieczyszczeń powietrza na terenie Trójmiasta. <br></br><br></br>

          --------wykresy i zdjęcia---------------
          
          <br></br><br></br>
          Jak można zauważyć, największa korelacja występuje pomiędzy temperaturą a zawartością tlenku węgla oraz dwutlenku azotu. Istnieje również zależność między temperaturą a PM10, jednak nie jest tak znacząca. Im temperatura jest niższa, tym powietrze staje się bardziej zanieczyszczone.
          Połączenie to jest spowodowane spalaniem większej ilości paliw w celu ogrzania mieszkań, biur czy fabryk.
          <br></br><br></br>
          
          Równie znaczącą relacją jest to, że wszystkie zanieczyszczenia występują odwrotnie proporcjonalnie do prędkości wiatru, który im z większą prędkością wieje, tym bardziej rozwiewa zawieszone w nim cząsteczki.
          <br></br>
          Nasze obliczenia wskazały brak jednoznacznego powiązania między obecnością szkodliwych substancji w powietrzu a zachmurzeniem.
          <br></br><br></br>
          Podsumowując najlepszą porą do spędzania czasu na dworze są ciepłe i wietrzne dni. :)
        </div>
      </div>
    </div>
  );
}

export default App;
