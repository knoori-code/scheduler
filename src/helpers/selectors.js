export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(
    (selectedDay) => selectedDay.name === day
  );

  if (filteredDay.length === 0) {
    return filteredDay;
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

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerId = interview.interviewer;
  const interviewer = state.interviewers[interviewerId];

  return {
    student: interview.student,
    interviewer: interviewer,
  };
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(
    (selectedDay) => selectedDay.name === day
  );

  if (filteredDay.length === 0) {
    return filteredDay;
  }

  const interviewersArray = filteredDay[0].interviewers;

  // Create array containing appointment objects from state.interviewers
  const interviewersForDay = [];
  for (let interviewer of interviewersArray) {
    if (state.interviewers[interviewer]) {
      interviewersForDay.push(state.interviewers[interviewer]);
    }
  }
  return interviewersForDay;
}
