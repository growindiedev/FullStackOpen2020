
// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartOneAndThree extends CoursePartBase {
  description: string;
}

export interface CoursePartOne extends CoursePartOneAndThree {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartOneAndThree {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartOneAndThree {
  name: "Deeper type usage";
  description: string;
  exerciseSubmissionLink: string;
}


export interface CoursePartFour extends CoursePartOneAndThree {
  name: "Special newly created course";
  special: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree| CoursePartFour;
