import React, { useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import "../styles/Map.css"

export function MapSelector() {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyCtoBxew7WodXFWSbZR2OFg2uWggZYs2zA" // please don't steal, thank you, it's just a small project
    });
    if(!isLoaded) return <div>Loading...</div>
    return (
       <Map />
    )
}

function Map() {
    return (
        <GoogleMap zoom={10} center={{lat: 54.2630, lng: 17.0001}} mapContainerClassName="MapContainer"> </GoogleMap>
    )
}