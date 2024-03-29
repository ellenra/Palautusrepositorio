import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(8).fill(0))

  const voteClick = () => {
    let points = [...votes]
    points[selected] += 1
    setVotes(points)
  }

  let highestIndex = -1;
  let highestValue = -Infinity
  for (let i = 0; i < 8; i++) {
    if(votes[i] > highestValue){
      highestIndex = i
      highestValue = votes[i]
    } 
  }

  const RandomAnecdote = () => Math.floor(Math.random() * 8)

  const mostVoted = anecdotes[highestIndex]



  return (
    <div>
      <h1>Anecdote of the day</h1>
      <b>{anecdotes[selected]}</b>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={() => voteClick()} text='vote' />
      <Button handleClick={() => setSelected(RandomAnecdote)} text='next anecdote' />
      <h1>Anecdote with the most votes</h1>
      <p>{mostVoted}</p>
      <p>has {highestValue} votes</p>
    </div>
  )
}

export default App