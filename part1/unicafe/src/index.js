
import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const Button = ({onClick, text}) => {
  return (
    <>
    <button onClick={onClick}>{text}</button>
    </>
  )
}

const Statistic = ({text, value}) => {
  return (
      
      <tr>
        <td>{`${text}  `}</td>
        <td>{`${value}`}</td>
      </tr>
      
  )
}


const Statistics = ({good, neutral, bad}) => {
  
  const sumAll = good + bad + neutral;
  const sumGoodBad = good + bad;
  const average = Math.round(((good - bad) / sumGoodBad) * 100) / 100;
  const positive = Math.round((good / sumGoodBad) * 100);

if(good > 0 || neutral > 0 || bad > 0){
  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
        <Statistic text="good" value ={good} />
        <Statistic text="neutral" value ={neutral} />
        <Statistic text="bad" value ={bad} />
        <Statistic text="all" value ={sumAll} />
        <Statistic text="average" value ={average} />
        <Statistic text="positive" value ={positive} />  
        </tbody>     
      </table>
    </>
  )
}

return ( <p>No feedback given </p> )
  
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  return (
    <>
      <h2>Give Feedback</h2>
      <Button onClick={() => setGood(good + 1)} text="good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button onClick={() => setBad(bad + 1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>  
    </>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
