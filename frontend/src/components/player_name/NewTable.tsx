import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue} from "@nextui-org/table";
import React, {useEffect, useState} from "react";
import {PlayerStats, RenderTableProps} from "@/interfaces/playerStats";

export default function RenderNewTable({ games }: RenderTableProps) {
    console.log(games);
    return (
        <Table>
            {/*aria-label="Example table with dynamic content"*/}
            {/*classNames={classNames}>*/}
            {/*<TableHeader columns={cachedData.cols}>*/}
            {/*  {(column) => <TableColumn align={"center"} key={column.key}><div className={"w-24 flex justify-center"}>{column.label}</div></TableColumn>}*/}
            {/*</TableHeader>*/}
            {/*<TableBody items={cachedData.rows}>*/}
            {/*  {(item) => (*/}
            {/*    <TableRow className={"table-row"} key={item.week}>*/}
            {/*      {(columnKey: string) => <TableCell><div className={"w-24 flex justify-center"}>{getKeyValue(item, columnKey)}</div></TableCell>}*/}
            {/*    </TableRow>*/}
            {/*  )}*/}
            {/*</TableBody>*/}
        </Table>
    );
};