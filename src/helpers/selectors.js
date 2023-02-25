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

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerId = interview.interviewer;
  const interviewer = state.interviewers[interviewerId];
  
  return {
    student: interview.student,
    interviewer: interviewer
  };

  // if (!interview) return null

  // if (interview) {
  //   const num = interview.interviewer
  //   interview["interviewer"] = state.interviewers[num];
  // }

  // return interview
}


//appt
// { id: 1, time: "12pm", interview: null } 


// interviewers: {
//   "1": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   },
//   "2": {
//     id: 2,
//     name: "Tori Malcolm",
//     avatar: "https://i.imgur.com/Nmx0Qxo.png"
//   }
// }
// };