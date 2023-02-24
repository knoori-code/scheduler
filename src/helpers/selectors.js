export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(
    (selectedDay) => selectedDay.name === day
  );

  if (filteredDay.length === 0) {
    return filteredDay
  }

  const appointmentsArray = filteredDay[0].appointments;

  // Create array containing appointment objects from state.appointments
  const appointmentsForDay = [];
  for (let appointment of appointmentsArray) {
    if (state.appointments[appointment]) {
      appointmentsForDay.push(state.appointments[appointment]);
    }
  }
  return appointmentsForDay;
}
