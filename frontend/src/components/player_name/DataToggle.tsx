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
        if (selection === "all") return;
        const keys = Array.from(selection);
        if (keys.length === 0) return; // prevent unselection

        const selectedKey = keys[0] as StatKey;
        setKey(selectedKey);
        setSelectionKey(selectedKey)
    };

    return (
        <Select
            isRequired={true}
            items={options}
            variant={"underlined"}
            color={"secondary"}
            className="max-w-xs"
            selectedKeys={new Set([key])}
            onSelectionChange={handleSelectionChange}
            aria-label={"Data display selection"}
        >
            {(item) => (<SelectItem key={item.key}>{item.label}</SelectItem>)}
        </Select>
    );
}
