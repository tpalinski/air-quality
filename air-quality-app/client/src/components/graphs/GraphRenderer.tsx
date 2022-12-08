import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { GraphData } from "../../types";


type Props = {data: GraphData}
export function GraphRenderer(props: Props){
    return (
        <LineChart
            width={600}
            height={300}
            data={props.data}
        >
            <CartesianGrid strokeDasharray="20 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
                type="monotone"
                dataKey="value"
                stroke="#8d8741"
            />
        </LineChart>
    )
}