import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { GraphData } from "../types";


type Props = {data: GraphData}
export function GraphRenderer(props: Props){
    return (
        <LineChart
            width={600}
            height={300}
            data={props.data}
        >
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
                type="monotone"
                dataKey="value"
                stroke="#00fff0"
            />
        </LineChart>
    )
}