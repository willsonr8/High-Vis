import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue} from "@nextui-org/table";
import React from "react";

interface PlayerStats {
    rush_avg: number[];
    rush_yards: number[];
    carries: number[];
    long_rush: number[];
    rush_td: number[];
    fumbles: number[];
    fumbles_lost: number[];
    receptions: number[];
    rec_td: number[];
    long_rec: number[];
    targets: number[];
    rec_yards: number[];
    rec_avg: number[];
    two_point_conversions: number[];
    pass_attempts: number[];
    pass_avg: number[];
    pass_td: number[];
    pass_yds: number[];
    interceptions: number[];
    pass_completions: number[];
    fantasy_points: number[];
    team_games: string[];
}

interface PlayerData {
    player_stats: string;
}

function getRows(data: PlayerStats) {
  const all_rows = []
  for (let i = 0; i < data.team_games.length; i++) {
    const newRow = {
      week: i + 1,
      fantasy_points: data.fantasy_points[i],
      rush_avg: data.rush_avg[i],
      rush_yards: data.rush_yards[i],
      carries: data.carries[i],
      long_rush: data.long_rush[i],
      rush_td: data.rush_td[i],
      fumbles: data.fumbles[i],
      fumbles_lost: data.fumbles_lost[i],
      receptions: data.receptions[i],
      rec_td: data.rec_td[i],
      long_rec: data.long_rec[i],
      targets: data.targets[i],
      rec_yards: data.rec_yards[i],
      rec_avg: data.rec_avg[i],
      two_point_conversions: data.two_point_conversions[i],
      pass_attempts: data.pass_attempts[i],
      pass_avg: data.pass_avg[i],
      pass_td: data.pass_td[i],
      pass_yds: data.pass_yds[i],
      interceptions: data.interceptions[i],
      pass_completions: data.pass_completions[i],
      team_games: data.team_games[i]
    }
    all_rows.push(newRow)
  }
  return all_rows;
}

const qb_columns = [
  {
    key: "week",
    label: "Week"
  },
  {
    key: "team_games",
    label: "Game",
  },
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
  {
    key: "two_point_conversions",
    label: "2 Point Conv."
  },
];

export default function RenderTable({ data }: { data: PlayerData }) {
  const jsonString = data.player_stats.replace(/\\/g, "");
  const parsedPlayerStats: PlayerStats = JSON.parse(jsonString);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["p-0", "rounded-none", "shadow-none"],
      th: ["bg-transparent", "text-default-500", "border-x","border-divider", "whitespace-nowrap", "text-center", "text-base"], // changes headers
      td: [
        "border",
        "border-divider",
        "whitespace-nowrap",
        "text-center",
      ],
      loadingWrapper: []
    }),
    [],
  );

  const rows = getRows(parsedPlayerStats);
  return (
  <Table
    aria-label="Example table with dynamic content"
    classNames={classNames}>
    <TableHeader columns={qb_columns}>
      {(column) => <TableColumn align={"center"} key={column.key}><div className={"w-24 flex justify-center"}>{column.label}</div></TableColumn>}
    </TableHeader>
    <TableBody items={rows}>
      {(item) => (
        <TableRow className={"table-row"} key={item.week}>
          {(columnKey: string) => <TableCell><div className={"w-24 flex justify-center"}>{getKeyValue(item, columnKey)}</div></TableCell>}
        </TableRow>
      )}
    </TableBody>
  </Table>
  );
};