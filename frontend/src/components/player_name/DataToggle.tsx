import React, {useEffect, useRef, useState} from "react";
import {Select, SelectItem, Selection} from "@nextui-org/react";
import {getColumnsForPosition, StatKey} from "@/components/player_name/NewTable";
import RenderLineChart from "@/components/player_name/LineChart";
import {GameStats, PlayerStats} from "@/interfaces/playerStats";

export default function DataToggle({ position, playerData }: { position: string; playerData: PlayerStats}) {
    const [key, setKey] = useState<StatKey>("PPR");
    const [options, setOptions] = useState<{key: StatKey; label: string}[]>([]);
    const [lineGraphData, setLineGraphData] = useState<GameStats[]>([])
    const [isLineGraphLoading, setIsLineGraphLoading] = useState(true)

    useEffect(() => {
        setIsLineGraphLoading(true)
        if (playerData && playerData.games) {
            setLineGraphData(playerData.games)
        }
        setIsLineGraphLoading(false)
    }, [playerData])

    useEffect(() => {
        const data = getColumnsForPosition(position)
        data.shift();
        data.shift();
        setOptions(data)
    }, [position])

    const handleSelectionChange = (selection: Selection) => {
        const selected = selection as string as StatKey;
        setKey(selected);
    };

    return (
        <div className={"line-chart shadow-small"}>
            <div className={"select-container"}>
                <Select
                    items={options}
                    variant={"underlined"}
                    color={"secondary"}
                    className="max-w-xs"
                    defaultSelectedKeys={[key]}
                    onSelectionChange={handleSelectionChange}
                    aria-label={"Data display selection"}
                >
                    {(item) => (<SelectItem key={item.key}>{item.label}</SelectItem>)}
                </Select>
            </div>
            {isLineGraphLoading ? (
                    <div className={"text-white text-center"}>
                        Loading ...
                    </div>
                ) : (
            <RenderLineChart selectionKey={key} data={lineGraphData}/>)}
        </div>

    );
}
