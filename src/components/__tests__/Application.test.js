import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
} from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getAllByTestId(container, "appointment"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const days = getAllByTestId(container, "day");
    const day = days.find((day) => queryByText(day, "Monday"));

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getAllByTestId(container, "appointment"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find((appointment) =>
      queryByText(appointment, "Archie Cohen")
    );

    // 3. Click the "Delete" button on the booked appointment.
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to Delete?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "DELETING")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const days = getAllByTestId(container, "day");
    const day = days.find((day) => queryByText(day, "Monday"));
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday to stay 1", async () => {
    const { container, debug } = render(<Application />);

    // Find existing interview
    await waitForElement(() => getAllByTestId(container, "appointment"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find((appointment) =>
      queryByText(appointment, "Archie Cohen")
    );

    // Find the edit button and click
    fireEvent.click(getByAltText(appointment, "Edit"));

    console.log(prettyDOM(appointment));
    // Change the name and save interview
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByText(appointment, "Save"));

    // Check that it still shows Monday and the number of spots is the same
    const days = getAllByTestId(container, "day");
    const day = days.find((day) => queryByText(day, "Monday"));
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);

    await waitForElement(() => getAllByTestId(container, "appointment"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, "Could not save the appointment")
    );
    expect(
      getByText(appointment, "Could not save the appointment")
    ).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);

    // Find existing interview
    await waitForElement(() => getAllByTestId(container, "appointment"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find((appointment) =>
      queryByText(appointment, "Archie Cohen")
    );

    // Click the "Delete" button on the booked appointment.
    fireEvent.click(getByAltText(appointment, "Delete"));

    // Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to Delete?")
    ).toBeInTheDocument();

    // Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    // Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "DELETING")).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, "Could not delete the appointment")
    );

    expect(
      getByText(appointment, "Could not delete the appointment")
    ).toBeInTheDocument();

    console.log(prettyDOM(appointment));
  });
});
