import React, {useEffect} from "react";
import {Select, SelectItem, Selection} from "@nextui-org/react";

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

export default function DataToggle({ selectionKey, setSelectionKey, selectionLabel, setSelectionLabel }) {
  const [value, setValue] = React.useState<Selection>(new Set([selectionLabel]));
  useEffect(() => {
      const selectedToggle = Array.from(value)[0];
      if (typeof selectedToggle === "string") {
          const selectedItem = data.find(item => item.key === selectedToggle);
          if (selectedItem) {
            setSelectionKey(selectedItem.key);
            setSelectionLabel(selectedItem.label);
            console.log("Selection in DataToggle.tsx: ", selectedToggle);
          }
      } else {
          console.log("Selection is not a string")
      }
  }, [value, setSelectionKey, setSelectionLabel]);
  return (
    <Select
      items={data}
      variant={"underlined"}
      color={"secondary"}
      className="max-w-xs"
      defaultSelectedKeys={[selectionKey]}
      onSelectionChange={setValue}
      aria-label={"Data display selection"}
    >
      {(data) => <SelectItem>{data.label}</SelectItem>}
    </Select>
  );
}
