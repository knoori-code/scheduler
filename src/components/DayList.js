import React from "react";
import DayListItem from "./DayListItem";

export default function DayList({ days, setDay, day}) {

  const parsedDays = days.map((individualDay) => {
    return (
      <DayListItem
        key={individualDay.id}
        name={individualDay.name}
        spots={individualDay.spots}
        selected={individualDay.name === day}
        setDay={setDay}
      />
    )
  })

  return (
    <ul>
      {parsedDays}
    </ul>
  );
}  