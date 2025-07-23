import React, {useEffect, useState} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {columnMap, StatKey} from "@/components/player_name/NewTable";
import {
    DefenseStats, FantasyPoints,
    GameStats,
    PassingStats,
    ReceivingStats,
    RushingStats,
    SnapCounts
} from "@/interfaces/playerStats";

const labelStyle = {
    color: 'black',
};

function getStatValue(game: GameStats, row_path: string): SnapCounts | PassingStats | ReceivingStats | RushingStats | DefenseStats | FantasyPoints | undefined {
    const validKeys = ["snapCounts", "Passing", "Receiving", "Rushing", "Defense", "fantasyPoints"] as const;
    if ((validKeys as readonly string[]).includes(row_path)) {
        return (game as any)[row_path];
    }
    return undefined;
}


export default function RenderLineChart({ selectionKey, data }: { selectionKey: StatKey; data: GameStats[] }) {
    const [rows, setRows] = useState<any[]>([])
    const [selectionLabel, setSelectionLabel] = useState<string>("")

    useEffect(() => {
        const temp_row = []
        let row_path = ""
        if (data && data.length > 0 && data[0]) {
            for (const nested of ["fantasyPoints", "Rushing", "Receiving", "Passing", "snapCounts", "Defense"]) {
                if ((data as any)[0][nested] && selectionKey in (data as any)[0][nested]) {
                    row_path = nested
                    break
                }
            }
        }
        for (const game of data) {
            const stat = getStatValue(game, row_path)
            if (stat) {
                temp_row.push(stat)
            }
        }
        setRows(temp_row)
        const record = columnMap[selectionKey as keyof typeof columnMap];
        if (!record) {
          console.warn(`Invalid selectionKey: ${selectionKey}`);
          setSelectionLabel("Unknown Stat");
        } else {
          setSelectionLabel(record.label);
}
    }, [selectionKey, data])

  const yAxisDomain = [
    0,
    Math.max(...rows.map(row => (row[selectionKey] as number) || 0)) + 5,
  ];

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
            bottom: 50,
          }}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="week" label={{
          value: "Game Week",
          position: "insideBottom",
          offset: -5,
          style: {marginTop: 8}
        }}/>
        <YAxis dataKey={selectionKey} domain={yAxisDomain} type="number" allowDataOverflow label={{
          value: selectionLabel,
          angle: -90,
          position: 'insideLeft',
          style: {textAnchor: 'middle'}
        }}
        />
        <Tooltip labelStyle={labelStyle} label={selectionLabel}/>
        <Line type="monotone" dataKey={selectionKey} stroke="#8884d8" activeDot={{r: 8}}/>
        <text x={"50%"} y={"5%"} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize={16} fontWeight="500">
            {`${selectionLabel} by Game Week`}
        </text>
      </LineChart>
    </ResponsiveContainer>
  );
}
