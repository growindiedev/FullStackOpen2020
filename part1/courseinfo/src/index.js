import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
	return <h1>{course}</h1>;
};

const Part = ({ obj }) => {
	return (
		<p>
			{obj.name} {obj.exercises}
		</p>
	);
};

const Total = ({ parts }) => {
	const total = () => parts.map((x) => x.exercises).reduce((total, current) => total + current, 0);

	return <p>Number of exercises {total()}</p>;
};

const Content = ({ parts }) => {
	return parts.map((obj) => {
		return <Part obj={obj} />;
	});
};

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10
			},
			{
				name: 'Using props to pass data',
				exercises: 7
			},
			{
				name: 'State of a component',
				exercises: 14
			}
		]
	};

	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));