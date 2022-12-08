//@ts-nocheck
//there are some properties in jsx that ts does not particularly like
import React, {useState} from 'react';
import StaticMap from 'react-map-gl';
import DeckGL from '@deck.gl/react/typed';
import {HeatmapLayer} from '@deck.gl/aggregation-layers/typed';
import { Calendar } from "react-calendar";
import Select from "react-select";
import { getMapData } from "../api/api";
import '../styles/Map.css'
import 'mapbox-gl/dist/mapbox-gl.css';


const API_KEY = 'pk.eyJ1IjoibXJvY2hueSIsImEiOiJjbGJmY2hiamQwNTVoM3ZzMndzNGNodmN4In0.bSbi4473dvEs_RCJYHENZA' //please don't steal, here only for the convenience of grading

type MapData = {coordinates: [number, number], value: number}[]
const testData: MapData = [{coordinates: [18.493331, 54.560836], value: 0},
                           {coordinates: [18.464911, 54.465758], value: 0},
                           {coordinates: [18.57884, 54.43451], value: 0},
                           {coordinates: [18.657497, 54.400833], value: 0},
                           {coordinates: [18.620274, 54.380279], value: 0},
                           {coordinates: [18.635283, 54.353336], value: 0},
                        ];

const INITIAL_VIEW_STATE = {
    longitude: 18.493331,
    latitude: 54.560836,
    zoom: 9,
    maxZoom: 16,
    pitch: 0,
    bearing: 0
    };
    
const MAP_STYLE = 'mapbox://styles/mapbox/streets-v12';
    
export function MapSelector({
    intensity = 1,
    threshold = 0.03,
    radiusPixels = 200,
    mapStyle = MAP_STYLE
    }) {

    //possible pollution types
    const options = [
        { value: 'co2', label: 'Carbon Monoxide' },
        { value: 'no2', label: 'Nitrogen Dioxide' },
        { value: 'pm10', label: 'PM10' },
    ];
    
    let [isLoading, setIsLoading] = useState(false);
    //chosen time
    let [day, setDay] = useState(new Date(2021, 0, 1));
    //data to be displayed on the map
    let [data, setData] = useState(testData)
    //chosen pollution type
    let [pollution, setPollution] = useState(options[0])

    const handleClick = () => {
        setIsLoading(true)
        getMapData().then((response) => {
            let responseData = JSON.parse(response);
            setData(responseData)
            setIsLoading(false)
        })
    }

    const handleChange = (value: Date) => {
        setDay(value);
    }

    const layers = [
        new HeatmapLayer({
        data,
        id: 'heatmp-layer',
        pickable: false,
        getPosition: d => d.coordinates,
        getWeight: d => d.value,
        radiusPixels,
        intensity,
        threshold,
        aggregation: 'SUM'
        })
    ];
    

    //rendering logic
    return (
        <>
            <div className='MapParams'>
                <div className='Lore'>
                    <h4>Choose pollution type and date and check the quality of air near you!</h4>
                </div>
                <Calendar 
                    onChange={handleChange} 
                    value={day} 
                    minDate={new Date(2021, 0, 1)} 
                    maxDate={new Date(2021, 11, 31)} 
                    defaultActiveStartDate={new Date(2021, 0, 1)} 
                    next2Label={null} 
                    prev2Label={null}
                    minDetail={'year'}
                />
                <div style={{color: 'black'}}>
                    <Select 
                        defaultValue={pollution}
                        onChange={setPollution}
                        options={options}
                        className="react-select-container"
                        classNamePrefix="react-select" 
                    />
                </div>
                {isLoading ? <div className='Loader'></div> : <button className="FetchButton" onClick={handleClick}>Check the pollution!</button>}
            </div>
            <div style={{position:'relative', width: '50%', height: '50vh', margin: '2rem'}}>
                <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
                <StaticMap reuseMaps mapStyle={mapStyle} mapboxAccessToken={API_KEY}/>
                </DeckGL>
            </div> 
        </>
        
    );
    }