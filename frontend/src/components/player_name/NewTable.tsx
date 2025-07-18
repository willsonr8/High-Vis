import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue} from "@nextui-org/table";
import React, {useEffect, useState} from "react";
import {
    DefenseStats, FantasyPoints, GameStats,
    PassingStats, PlayerStatsProps,
    ReceivingStats,
    RenderTableProps,
    RushingStats,
    SnapCounts
} from "@/interfaces/playerStats";

export type StatKey =
    | "encodedGameWeek"
    | "gameId"
    | keyof SnapCounts
    | keyof ReceivingStats
    | keyof RushingStats
    | keyof DefenseStats
    | keyof PassingStats
    | keyof FantasyPoints;

export const columnMap: Record<StatKey, { key: StatKey; label: string }> = {
    // General Game Info
    encodedGameWeek: {key: "encodedGameWeek", label: "Week"},
    gameId: {key: "gameId", label: "Game"},

    // SnapCounts
    defSnap: {key: "defSnap", label: "Def Snaps"},
    defSnapPct: {key: "defSnapPct", label: "Def Snap %"},
    offSnap: {key: "offSnap", label: "Off Snaps"},
    offSnapPct: {key: "offSnapPct", label: "Off Snap %"},
    stSnap: {key: "stSnap", label: "ST Snaps"},
    stSnapPct: {key: "stSnapPct", label: "ST Snap %"},

    // ReceivingStats
    receptions: {key: "receptions", label: "Receptions"},
    recTD: {key: "recTD", label: "Rec TDs"},
    longRec: {key: "longRec", label: "Long Rec"},
    targets: {key: "targets", label: "Targets"},
    recYds: {key: "recYds", label: "Rec Yds"},
    recAvg: {key: "recAvg", label: "Yds/Rec"},
    recTwoPointConversions: {key: "recTwoPointConversions", label: "2pt Rec"},

    // RushingStats
    rushAvg: {key: "rushAvg", label: "Yds/Rush"},
    rushYds: {key: "rushYds", label: "Rush Yds"},
    carries: {key: "carries", label: "Carries"},
    longRush: {key: "longRush", label: "Long Rush"},
    rushTD: {key: "rushTD", label: "Rush TDs"},
    rushTwoPointConversions: {key: "rushTwoPointConversions", label: "2pt Rush"},

    // DefenseStats
    fumblesLost: {key: "fumblesLost", label: "Fumbles Lost"},
    defensiveInterceptions: {key: "defensiveInterceptions", label: "INTs"},
    forcedFumbles: {key: "forcedFumbles", label: "Forced Fumbles"},
    fumbles: {key: "fumbles", label: "Fumbles"},
    fumblesRecovered: {key: "fumblesRecovered", label: "Fumbles Recovered"},
    totalTackles: {key: "totalTackles", label: "Total Tackles"},
    defTD: {key: "defTD", label: "Def TDs"},
    soloTackles: {key: "soloTackles", label: "Solo Tackles"},
    tfl: {key: "tfl", label: "TFL"},
    qbHits: {key: "qbHits", label: "QB Hits"},
    sacks: {key: "sacks", label: "Sacks"},
    passDeflections: {key: "passDeflections", label: "Pass Deflections"},
    twoPointConversionReturns: {key: "twoPointConversionReturns", label: "2pt Returns"},

    // PassingStats
    passYds: {key: "passYds", label: "Pass Yds"},
    passTD: {key: "passTD", label: "Pass TDs"},
    passInt: {key: "passInt", label: "INTs"},
    passCmp: {key: "passCmp", label: "Completions"},
    passAtt: {key: "passAtt", label: "Attempts"},
    longPass: {key: "longPass", label: "Long Pass"},
    passRating: {key: "passRating", label: "Rating"},
    passTwoPointConversions: {key: "passTwoPointConversions", label: "2pt Pass"},
    passAvg: {key: "passAvg", label: "Yds/Attempt"},
    qbr: {key: "qbr", label: "QBR"},
    rtg: {key: "rtg", label: "RTG"},
    sacked: {key: "sacked", label: "Sacked"},

    // FantasyPoints
    PPR: {key: "PPR", label: "PPR Points"},
    halfPPR: {key: "halfPPR", label: "halfPPR Points"},
    standard: {key: "standard", label: "standard Points"}
};

type Position = "QB" | "RB" | "WR" | "DEF";

const positionColumns: Record<Position, StatKey[]> = {
  QB: [
    "encodedGameWeek", "gameId", "PPR", "passYds", "passTD", "passInt", "passCmp", "passAtt", "passAvg",
    "rushYds", "rushTD", "carries", "longRush", "rushAvg",
    "receptions", "recTD", "recYds", "targets", "recAvg",
    "fumblesLost", "sacked", "qbr"
  ],
  RB: [
    "encodedGameWeek", "gameId", "PPR", "rushYds", "rushTD", "carries", "longRush", "rushAvg",
    "receptions", "recYds", "recTD", "targets", "recAvg",
    "fumbles", "fumblesLost"
  ],
  WR: [
    "encodedGameWeek", "gameId", "PPR", "receptions", "targets", "recYds", "recTD", "recAvg", "longRec",
    "rushYds", "rushTD", "carries", "rushAvg"
  ],
  DEF: [
    "encodedGameWeek", "gameId", "PPR", "totalTackles", "soloTackles", "sacks", "tfl", "qbHits",
    "defensiveInterceptions", "forcedFumbles", "fumblesRecovered",
    "passDeflections", "defTD", "twoPointConversionReturns"
  ]
};

function getStatValue(item: GameStats, key: StatKey) {
    if (key in item) {
        if (item[key] == undefined) {
            return "0";
        }
        else {
            return item[key];
        }
    }
    for (const nested of ["Defense", "Rushing", "Receiving", "Passing", "snapCounts", "fantasyPoints"]) {
        if (item[nested] && key in item[nested]) {
            if (item[nested][key] == undefined) {
                return "0"
            }
            else {
                return item[nested][key]
            }
        }
    }
    return ""
}

export function getColumnsForPosition(position: string): { key: StatKey; label: string }[] {
    let keys: StatKey[] = positionColumns[position as Position] ?? positionColumns["WR"];
    return keys.filter((key) => key in columnMap).map((key) => columnMap[key]);
}

export default function RenderNewTable({ playerStats }: PlayerStatsProps) {
    const [loading, setLoading] = useState(true);
    const [position, setPosition] = useState("WR");
    const [columns, setColumns] = useState<{ key: StatKey; label: string }[]>([]);
    const [games, setGames] = useState<GameStats[]>([]);

    useEffect(() => {
        setLoading(true)

        const newPosition = playerStats.position;
        const newGames = playerStats.games;
        const newCols = getColumnsForPosition(newPosition);

        setPosition(newPosition);
        setGames(newGames);
        setColumns(newCols);

        setLoading(false)
    }, [playerStats]);

    if (loading) return <div>Loading...</div>;
    return (
        <Table>
            <TableHeader columns={columns}>
                {columns.map((column) => (
                    <TableColumn align="center" key={column.key}>
                        <div className="w-24 flex justify-center">{column.label}</div>
                    </TableColumn>
                ))}
            </TableHeader>
            <TableBody items={games}>
                {(item) => (
                    <TableRow className={"table-row"} key={item.encodedGameWeek}>
                        {columns.map((col) => (
                            <TableCell key={col.key}>
                                <div className="w-24 flex justify-center">{getStatValue(item, col.key)}</div>
                            </TableCell>
                        ))}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};