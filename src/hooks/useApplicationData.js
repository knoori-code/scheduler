import { useState, useEffect } from "react";
import Axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Axios.get("api/days"),
      Axios.get("api/appointments"),
      Axios.get("api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const updateSpots = (state) => {
    const currentDay = state.days.find((day) => day.name === state.day);
    const listOfAppointmentForDay = currentDay.appointments.map((id) => state.appointments[id]);

    const emptyAppointmentsList = listOfAppointmentForDay.filter(((appointment) => appointment.interview === null));
    const spots = emptyAppointmentsList.length;

    const newCurrentDay = {...currentDay, spots};
    const newDays = [...state.days];

    const indexOfCurrentDay = newDays.findIndex((day) => day.name === state.day);
    newDays[indexOfCurrentDay] = newCurrentDay;

    const newState = {...state, days: newDays};
    return newState
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const newState = {...state, appointments};
    const newStateWithSpots = updateSpots(newState);

    return Axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState(newStateWithSpots);
      return res;
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const newState = {...state, appointments};
    const newStateWithSpots = updateSpots(newState);

    return Axios.delete(`/api/appointments/${id}`).then((res) => {
      setState(newStateWithSpots);
      return res;
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
