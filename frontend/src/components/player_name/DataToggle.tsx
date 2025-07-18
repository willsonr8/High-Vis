import React, {useEffect, useState} from "react";
import {Select, SelectItem, Selection} from "@nextui-org/react";
import {
    DefenseStats,
    FantasyPoints,
    PassingStats,
    ReceivingStats,
    RushingStats,
    SnapCounts
} from "@/interfaces/playerStats";
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

type SelectKey =
    | keyof SnapCounts
    | keyof ReceivingStats
    | keyof RushingStats
    | keyof DefenseStats
    | keyof PassingStats
    | keyof FantasyPoints

export default function DataToggle() {
    const [key, setKey] = useState<SelectKey>("receptions");

    const handleSelectionChange = (selection: Selection) => {
        const selected = selection as string as SelectKey;
        setKey(selected);
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
