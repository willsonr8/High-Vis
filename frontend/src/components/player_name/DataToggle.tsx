import React, {useEffect, useState} from "react";
import {Select, SelectItem, Selection} from "@nextui-org/react";
import {DefenseStats, PassingStats, ReceivingStats, RushingStats, SnapCounts} from "@/interfaces/playerStats";
import {columnMap} from "@/components/player_name/NewTable";

const data = [
    {
        key: "fantasy_points",
        label: "Points",
    },
    {
        key: "pass_yds",
        label: "Pass Yards",
    },
    {
        key: "pass_td",
        label: "Pass TDs",
    },
    {
        key: "interceptions",
        label: "Ints",
    },
    {
        key: "pass_attempts",
        label: "Attempts"
    },
    {
        key: "pass_completions",
        label: "Completions",
    },
    {
        key: "pass_avg",
        label: "Yds/Attempt",
    },
    {
        key: "rush_yards",
        label: "Rush Yds",
    },
    {
        key: "rush_td",
        label: "Rush TDs"
    },
    {
        key: "carries",
        label: "Carries",
    },
    {
        key: "long_rush",
        label: "Long Rush",
    },
    {
        key: "rush_avg",
        label: "Yds/Rush",
    },
    {
        key: "fumbles",
        label: "Fumbles"
    },
    {
        key: "fumbles_lost",
        label: "Fumbles Lost",
    },
    {
        key: "receptions",
        label: "Receptions",
    },
    {
        key: "targets",
        label: "Targets",
    },
    {
        key: "rec_yards",
        label: "Rec Yards"
    },
    {
        key: "rec_td",
        label: "Rec TDs",
    },
    {
        key: "long_rec",
        label: "Long Rec",
    },
    {
        key: "rec_avg",
        label: "Yds/Reception",
    },
];

export interface DataToggleProp {
    selectionKey: SelectKey,
}

type SelectKey =
    | keyof SnapCounts
    | keyof ReceivingStats
    | keyof RushingStats
    | keyof DefenseStats
    | keyof PassingStats;

function getLabelValues(key: SelectKey): { key: SelectKey, label: string } {
    const value = columnMap[key];
    if (!value) {
        return { key, label: String(key) }; // fallback to key as label
    }
    return value as { key: SelectKey; label: string };
}

export default function DataToggle() {
    const [key, setKey] = useState<SelectKey>("receptions");
    const [label, setLabel] = useState<string>(getLabelValues("receptions").label);

    const handleSelectionChange = (selection: Selection) => {
        const selected = selection as string as SelectKey;
        console.log(selected)
        setKey(selected);
        setLabel((getLabelValues(selected)).label);
    };

    return (
        <Select
            items={data}
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
