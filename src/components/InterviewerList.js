import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import propTypes from "prop-types";

export default function InterviewerList(props) {
  const { interviewers, onInterviewerChange, value } = props;

  const interviewerArray = interviewers.map((selectedInterviewer) => {
    return (
      <InterviewerListItem
        key={selectedInterviewer.id}
        setInterviewer={() => onInterviewerChange(selectedInterviewer.id)}
        selected={value === selectedInterviewer.id}
        name={selectedInterviewer.name}
        avatar={selectedInterviewer.avatar}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerArray}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: propTypes.array.isRequired
}