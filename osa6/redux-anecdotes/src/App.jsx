import { useEffect } from "react"
import AnecdoteForm from "./components/anecdoteform"
import AnecdoteList from './components/anecdotelist'
import Filter from "./components/filter"
import Notification from "./components/Notification"
import anecdoteService from './services/anecdotes'
import { setAnecdotes, initializeAnecdotes } from "./reducers/anecdoteReducer"
import { useDispatch } from "react-redux"


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(initializeAnecdotes())
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <p></p>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App