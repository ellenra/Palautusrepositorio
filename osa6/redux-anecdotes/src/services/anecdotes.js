import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const voteAnecdote = async (content) => {
    console.log('voting', content)
    const addedVote = { ...content, votes: content.votes + 1 }
    console.log(content)
    const response = await axios.put(`${baseUrl}/${content.id}`, addedVote)
    return response.data
}

export default { getAll, createNew , voteAnecdote }