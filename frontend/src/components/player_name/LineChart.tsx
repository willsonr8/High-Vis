import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function RenderLineChart({ rows, cols }) {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
          width={500}
          height={300}
          data={rows}
          margin={{
            top: 50,
            right: 20,
            left: 20,
            bottom: 20,
          }}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="week" label={{
          value: "Game Week",
          position: "insideBottom",
          offset: -5,
          style: {marginTop: 8}
        }}/>
        <YAxis dataKey={"fantasy_points"} type="number" domain={[0, 30]} allowDataOverflow label={{
          value: "Fantasy Points",
          angle: -90,
          position: 'insideLeft',
          style: {textAnchor: 'middle'}
        }} ticks={[0, 5, 10, 15, 20, 25, 30]}
        />
        <Tooltip/>
        <Line type="monotone" dataKey="fantasy_points" labelHidden stroke="#8884d8" activeDot={{r: 8}}/>
        <text x={"50%"} y={"5%"} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize={16} fontWeight="500">
          Fantasy Points by Game Week
        </text>
      </LineChart>
    </ResponsiveContainer>
  );
}
