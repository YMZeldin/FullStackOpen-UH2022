// import logo from './logo.svg';
// import './App.css';
import {useState} from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
]

const initialVotes = new Array(anecdotes.length).fill(0)

const App = () => {

  const [selected, setSelected] = useState(0)
  const [allVotes, setVote] = useState(initialVotes)
  
  const max = anecdotes.length - 1

  const nextAnecdote = () => {
    const newSelection = Math.round(Math.random() * max)
    // console.log('nextAnecdote.newSelection ', newSelection)
    setSelected(newSelection)
  }

  const vote = () => {
    const copyAllVotes = [...allVotes]
    copyAllVotes[selected] += 1
    // console.log('copyAllVotes', copyAllVotes)
    setVote(copyAllVotes)
  }

  const AnecdoteWithMostVotes = () => {
    const totalVotes = allVotes.reduce((sum, current) => sum + current, 0)
    // console.log('totalVotes', totalVotes)
    if (totalVotes === 0) {return(
      <div>No votes yet</div>
      )
    }
    const maxVoteIndex = allVotes.indexOf(Math.max(...allVotes))
    return(
      <div>
        <div>{anecdotes[maxVoteIndex]}</div>
        <div>has {allVotes[maxVoteIndex]} votes</div>
      </div>
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {allVotes[selected]} votes</div>
      <br />
      <Button handleClick={vote} text='vote' />
      <Button handleClick={nextAnecdote} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <AnecdoteWithMostVotes />
    </div>
  )
}

export default App;
