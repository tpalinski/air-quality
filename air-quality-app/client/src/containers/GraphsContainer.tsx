import React from "react";
import { GraphRenderer } from "../components/GraphRenderer";
import { GraphData } from "../types";

type Props = {text: string, data?: GraphData}

export function GraphsContainer(props: Props){
    const sampleData: GraphData = [{time: '01.2020', value: 1}, {time: '02.2020', value: 2}, {time: '03.2020', value: 3}] 
    return (
        <div>
            <h3>{props.text}</h3>
            <GraphRenderer data={sampleData} />
        </div>
    )
}