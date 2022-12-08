import React from "react";
import '../styles/DataAnalysis.css'
import imgs from '../img/analyzeImages'

export function DataAnalysis(){
    return (
        <div className="Lore DataAnalysis">
          <h2>Analiza pomiarów</h2>
          <p>
            Ziemia i środowisko zmagają się z poważnym problemem zwiększającego się zanieczyszczenia powietrza, wody oraz gleby.  Zanieczyszczenia te są spowodowane w większości działalnością człowieka i mogą mieć fatalne skutki dla flory, fauny i ludzi. Jednymi z najgroźniejszych cząsteczek są tlenki węgla, dwutlenki azotu oraz różne inne cząsteczki zawieszone w powietrzu o średnicy nie większej niż 10 mikrometrów (określane nazwą PM10), pochodzące najczęściej z spalania paliw stałych i ciekłych.
          </p>
          <p>
            Jednak poziom zanieczyszczenia powietrza nie jest związany wyłącznie z działalnością człowieka. Ma na niego wpływ wielu czynników takich jak warunki pogodowe. W naszych obliczeniach skupiliśmy się na zależności pomiędzy temperaturą powietrza, prędkością wiatru oraz zachmurzeniem, a jakością powietrza. Nasze pomiary pochodzą z placówki Instytutu Meteorologii i Gospodarki Wodnej w Gdańsku oraz siedmiu placówek dokonujących pomiaru zanieczyszczeń powietrza na terenie Trójmiasta.
          </p>
          <h2>Analizowane wykresy</h2>
          {imgs.map(image => <img src={image}/>)}

          <h2>Wnioski</h2>
          <p>
            Jak można zauważyć, największa korelacja występuje pomiędzy temperaturą a zawartością tlenku węgla oraz dwutlenku azotu. Istnieje również zależność między temperaturą a PM10, jednak nie jest tak znacząca. Im temperatura jest niższa, tym powietrze staje się bardziej zanieczyszczone.
            Połączenie to jest spowodowane spalaniem większej ilości paliw w celu ogrzania mieszkań, biur czy fabryk.
          </p>

          <p>
            Przeglądając naniesione na mapę wartości pomiarów można łatwo wywnioskować, że najwięcej zanieczyszczeń gromadzi się wokół Starego Miasta i w tym rejonie potrzebna jest jak najszybsza interwencja.
            Zanieczyszczenia powietrza każdego rodzaju obecne są tam przez cały rok, przez co Śródmieście stanowi groźną dzielnicę przede wszystkim dla osób starszych oraz dzieci.
          </p>

          <p>
            Równie znaczącą relacją jest to, że wszystkie zanieczyszczenia występują odwrotnie proporcjonalnie do prędkości wiatru, który im z większą prędkością wieje, tym bardziej rozwiewa zawieszone w nim cząsteczki.
            Nasze obliczenia wskazały brak jednoznacznego powiązania między obecnością szkodliwych substancji w powietrzu a zachmurzeniem.
          </p>
            Podsumowując najlepszą porą do spędzania czasu na dworze są ciepłe i wietrzne dni. :)
        </div>
    )
}