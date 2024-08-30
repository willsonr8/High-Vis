import React, {useEffect} from "react";
import {Select, SelectItem, Selection} from "@nextui-org/react";

const data = [
    {key: "2024", label: "2024"},
    {key: "2023", label: "2023"}
]

export default function SeasonSelect({ year, setYear }) {
  const [value, setValue] = React.useState<Selection>(new Set([year]));
  useEffect(() => {
      const selectedYear = Array.from(value)[0];
      if (typeof selectedYear === "string") {
          setYear(selectedYear);
          console.log("Year in Select.tsx: ", selectedYear)
      } else {
          console.log("Year is not a string")
      }
  }, [value, setYear, year]);
  return (
    <Select
      items={data}
      variant={"underlined"}
      color={"secondary"}
      className="max-w-xs"
      defaultSelectedKeys={[year]}
      onSelectionChange={setValue}
      aria-label={"Year selection"}
    >
      {(year) => <SelectItem>{year.label}</SelectItem>}
    </Select>
  );
}
