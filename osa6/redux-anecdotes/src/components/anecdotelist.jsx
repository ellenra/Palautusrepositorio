import { useDispatch, useSelector } from 'react-redux'
import { addVote, newVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const filter = useSelector((state) => state.filter)
    const anecdotes = useSelector((state) => state.anecdotes)

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(newVote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 7))
      }
    console.log([...anecdotes])
    return (
        <div>
            {[...anecdotes].filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => b.votes - a.votes).map(anecdote =>            
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => {
                    vote(anecdote)
                }}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export default AnecdoteList