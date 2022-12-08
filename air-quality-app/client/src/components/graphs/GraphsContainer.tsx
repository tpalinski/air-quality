import React from "react";
import { GraphRenderer } from "./GraphRenderer";
import { GraphData } from "../../types";
import '../styles/GraphContainerStyling.css'

type Props = {text: string, data?: GraphData}

export function GraphsContainer(props: Props){
    const sampleData: GraphData = [{time: '01.2020', value: 1}, {time: '02.2020', value: 2}, {time: '03.2020', value: 3}] 
    return (
        <div className="GraphContainer">
            <h3>{props.text}</h3>
            <GraphRenderer data={props.data || sampleData} />
        </div>
    )
}