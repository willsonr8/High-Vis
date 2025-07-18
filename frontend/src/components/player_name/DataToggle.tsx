import React, {useEffect, useState} from "react";
import {Select, SelectItem, Selection} from "@nextui-org/react";
import {getColumnsForPosition, StatKey} from "@/components/player_name/NewTable";

export default function DataToggle(position: string) {
    const [key, setKey] = useState<StatKey>("PPR");
    const [options, setOptions] = useState<{key: StatKey; label: string}[]>([]);

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
