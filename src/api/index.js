import axios from 'axios'

const server = axios.create({
  baseURL: 'http://localhost:5000/api'
})

export const getTodoList = () => server.get('/todo/all')
export const createTodo = payload => server.post('/todo', payload)
export const updateTodo = payload => server.put('/todo', payload)
export const removeTodo = id => server.delete(`/todo/${id}`)
