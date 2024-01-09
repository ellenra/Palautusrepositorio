import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import AnecdoteForm from './components/AnecdoteForm'
import { getAnecdotes, updateVotes } from './requests'
import Notification from './components/Notification'
import { useNotificationState, useNotificationDispatch } from "./notificationContext"


const App = () => {
  const queryClient = useQueryClient()
  const notification_state = useNotificationState()
  const notification_dispatch = useNotificationDispatch()

  const updateVoteMutation = useMutation({
    mutationFn: updateVotes,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes'])
      console.log('updating votes in mutation')
      notification_dispatch({ type: 'SHOW', payload: `Anecdote voted!`})
    }
  })

  const handleVote = (anecdote) => {
    updateVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if (result.isError) {
    return <span>anecdote service not available due to problems in server</span>
  }

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification message={ notification_state } />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
