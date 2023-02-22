import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers, setInterviewer, interviewer } = props;

  const interviewerArray = interviewers.map((selectedInterviewer) => {
    return (
      <InterviewerListItem
        key={selectedInterviewer.id}
        setInterviewer={() => setInterviewer(selectedInterviewer.id)}
        selected={interviewer === selectedInterviewer.id}
        name={selectedInterviewer.name}
        avatar={selectedInterviewer.avatar}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerArray}
      </ul>
    </section>
  );
}