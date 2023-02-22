import React from "react";
import DayListItem from "./DayListItem";

export default function DayList({ days, onChange, value}) {

  const parsedDays = days.map((individualDay) => {
    return (
      <DayListItem
        key={individualDay.id}
        name={individualDay.name}
        spots={individualDay.spots}
        selected={individualDay.name === value}
        setDay={onChange}
      />
    )
  })

  return (
    <ul>
      {parsedDays}
    </ul>
  );
}  