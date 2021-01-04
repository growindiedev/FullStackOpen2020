import React from 'react';
import Content from './components/Content'
import Total from './components/Total'
import Header from './components/Header'
import {CoursePart} from './types'

const App: React.FC = () => {
const courseName = "Half Stack application development";

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    description: "Why this is giving an error",
    groupProjectCount: 3,
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
  },
  {
    name: "Special newly created course",
    exerciseCount: 12,
    description: "Exhaustive type checking",
    special: "Special property",
  },
];

  return (
    <div>
      <Header coursename={courseName}/>
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  );
};

export default App;
