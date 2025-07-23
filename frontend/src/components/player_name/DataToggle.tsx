import React, {useEffect, useRef, useState} from "react";
import {Select, SelectItem, Selection} from "@nextui-org/react";
import {getColumnsForPosition, StatKey} from "@/components/player_name/NewTable";
import RenderLineChart from "@/components/player_name/LineChart";
import {GameStats, PlayerStats} from "@/interfaces/playerStats";

export default function DataToggle({ position, setSelectionKey }: { position: string; setSelectionKey: any}) {
    const [options, setOptions] = useState<{key: StatKey; label: string}[]>([]);
    const [key, setKey] = useState<StatKey>("PPR");

    useEffect(() => {
        const data = getColumnsForPosition(position)
        data.shift();
        data.shift();
        setOptions(data)
    }, [position])

    const handleSelectionChange = (selection: Selection) => {
        const selectedKey = Array.from(selection)[0] as StatKey;
        setKey(selectedKey);
        setSelectionKey(selectedKey)
    };

    return (
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
    );
}
