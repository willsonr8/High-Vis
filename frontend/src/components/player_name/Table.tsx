import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue} from "@nextui-org/table";

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
}

interface PlayerData {
    player_stats: string;
}

function getRows(data: PlayerStats) {
  const all_rows = []
  for (let i = 0; i < 18; i++) {
    const newRow = {
      week: i + 1,
      fantasy_points: data.fantasy_points[i],
      rec_yards: data.rec_yards[i],
      receptions: data.receptions[i],
    }
    all_rows.push(newRow)
  }
  return all_rows;
}

const columns = [
  {
    key: "week",
    label: "Game Week"
  },
  {
    key: "fantasy_points",
    label: "Points",
  },
  {
    key: "rec_yards",
    label: "Rec Yards",
  },
  {
    key: "receptions",
    label: "Receptions",
  },
];

export default function RenderTable({ data }: { data: PlayerData }) {
  const jsonString = data.player_stats.replace(/\\/g, "");
  const parsedPlayerStats: PlayerStats = JSON.parse(jsonString);

  const rows = getRows(parsedPlayerStats);
  return (
  <Table aria-label="Example table with dynamic content">
    <TableHeader columns={columns}>
      {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
    </TableHeader>
    <TableBody items={rows}>
      {(item) => (
        <TableRow key={item.week}>
          {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
        </TableRow>
      )}
    </TableBody>
  </Table>
  );
};