import React, {useEffect} from "react";
import {Select, SelectItem, Selection} from "@nextui-org/react";

const data = [
    {key: "2024", label: "2024"},
    {key: "2023", label: "2023"}
]

export default function SeasonSelect() {
  const [value, setValue] = React.useState<Selection>(new Set(["2024"]));
  useEffect(() => {
      const selectedYear = Array.from(value)[0];
      if (typeof selectedYear === "string") {
          sessionStorage.setItem("year", selectedYear);
      } else {
          console.log("Year is not a string")
      }
  }, [value]);
  return (
    <Select
      items={data}
      variant={"underlined"}
      color={"secondary"}
      className="max-w-xs"
      defaultSelectedKeys={["2024"]}
      onSelectionChange={setValue}
      aria-label={"Year selection"}
    >
      {(year) => <SelectItem>{year.label}</SelectItem>}
    </Select>
  );
}
