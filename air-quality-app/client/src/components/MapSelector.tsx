//@ts-nocheck
//there are some properties in jsx that ts does not particularly like
import React from 'react';
import {render} from 'react-dom';
import StaticMap from 'react-map-gl';
import DeckGL from '@deck.gl/react/typed';
import {HeatmapLayer} from '@deck.gl/aggregation-layers/typed';
import '../styles/Map.css'
import 'mapbox-gl/dist/mapbox-gl.css';

const DATA_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json'; // eslint-disable-line

const API_KEY = 'pk.eyJ1IjoibXJvY2hueSIsImEiOiJjbGJmY2hiamQwNTVoM3ZzMndzNGNodmN4In0.bSbi4473dvEs_RCJYHENZA' //please don't steal, here only for the convenience of grading

type MapData = {coordinates: [number, number], value: number}[]
const testData: MapData = [{coordinates: [18.493331, 54.560836], value: 1},
                           {coordinates: [18.464911, 54.465758], value: 1},
                           {coordinates: [18.57884, 54.43451], value: 1},
                           {coordinates: [18.657497, 54.400833], value: 1},
                           {coordinates: [18.620274, 54.380279], value: 2},
                           {coordinates: [18.635283, 54.353336], value: 1},
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
    data = testData,
    intensity = 1,
    threshold = 0.03,
    radiusPixels = 200,
    mapStyle = MAP_STYLE
    }) {
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
    
    return (
        <div style={{position:'relative', width: 600, height: 400, margin: '2rem'}}>
            <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
            <StaticMap reuseMaps mapStyle={mapStyle} preventStyleDiffing={true} mapboxAccessToken={API_KEY}/>
            </DeckGL>
        </div> 
    );
    }