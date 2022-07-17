// import logo from './logo.svg';
// import './App.css';
import {useState} from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad
  let average = (good - bad)/total
  average = average.toFixed(2)
  let positive = good/total*100
  positive = positive.toFixed(2)

  const StatisticLine = ({ comment, value, units }) => {
    return(
      <div>{comment} = {value} {units}</div>
    )
  }

  if (total === 0) {return(
    <div>No feedback given</div>
    )
  }
  return(
    <div>
      <StatisticLine comment='good' value={good} />
      <StatisticLine comment='neutral' value={neutral} />
      <StatisticLine comment='bad' value={bad} />
      <StatisticLine comment='all' value={total} />
      <StatisticLine comment='average' value={average} />
      <StatisticLine comment='positive' value={positive} units='%' />
    </div>
  )
}

const App = () => {
  
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text='good' />
      <Button handleClick={increaseNeutral} text='neutral' />
      <Button handleClick={increaseBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
