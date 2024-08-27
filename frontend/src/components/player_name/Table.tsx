import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue} from "@nextui-org/table";
import React, {useEffect, useState} from "react";
import {CachedData, PlayerStats} from "./PlayerPage"

export default function RenderTable({ data, rows, cols }) {
  const [cachedData, setCachedData] = useState<CachedData>({ parsedPlayerStats: null, rows: [], cols: [] });
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const parsedPlayerStats: PlayerStats = data;
    setCachedData({ parsedPlayerStats, rows, cols });
    setLoading(false)
  }, [cols, data, rows]);

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
  if (loading) {
    return <p className={"text-white center"}>Loading fantasy data...</p>;
  }

  return (
  <Table
    aria-label="Example table with dynamic content"
    classNames={classNames}>
    <TableHeader columns={cachedData.cols}>
      {(column) => <TableColumn align={"center"} key={column.key}><div className={"w-24 flex justify-center"}>{column.label}</div></TableColumn>}
    </TableHeader>
    <TableBody items={cachedData.rows}>
      {(item) => (
        <TableRow className={"table-row"} key={item.week}>
          {(columnKey: string) => <TableCell><div className={"w-24 flex justify-center"}>{getKeyValue(item, columnKey)}</div></TableCell>}
        </TableRow>
      )}
    </TableBody>
  </Table>
  );
};