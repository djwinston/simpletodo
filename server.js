const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const route = require('koa-route')
const { v4: uuidv4 } = require('uuid')
const { promises: fs } = require('fs')

const app = new Koa()
const port = 5000

class todoService {
  static uuidv4 = uuidv4
  static dbPath = 'todo.db.json'

  static async getAll() {
    const todoListJSON = await fs.readFile(this.dbPath, 'utf8')
    if (!todoListJSON) return []
    return JSON.parse(todoListJSON)
  }
  static async add(todo) {
    const newTodo = { ...todo, id: uuidv4() }
    const todoList = await this.getAll()
    todoList.push(newTodo)
    await this.saveListToFile(todoList)
    return newTodo
  }
  static async update(todo) {
    const todoList = await this.getAll()
    const index = todoList.findIndex(({ id }) => id === todo.id)
    const deleteCount = index === -1 ? 0 : 1
    todoList.splice(index, deleteCount, todo)
    await this.saveListToFile(todoList)
    return todo
  }
  static async delete(deleteId) {
    const todoList = await this.getAll()
    const index = todoList.findIndex(({ id }) => id === deleteId)
    const deleteCount = index === -1 ? 0 : 1
    const deletedTodoList = todoList.splice(index, deleteCount)
    await this.saveListToFile(todoList)
    return deletedTodoList
  }

  static async saveListToFile(todoList) {
    await fs.writeFile(this.dbPath, JSON.stringify(todoList), 'utf8')
  }
}

class todoController {
  static async create(ctx) {
    try {
      ctx.body = await todoService.add(ctx.request.body)
    } catch (e) {
      ctx.status = 500
    }
  }
  static async read(ctx) {
    try {
      ctx.body = await todoService.getAll()
    } catch (e) {
      ctx.status = 500
    }
  }
  static async update(ctx) {
    try {
      ctx.body = await todoService.update(ctx.request.body)
    } catch (e) {
      ctx.status = 500
    }
  }
  static async delete(ctx, id) {
    try {
      ctx.body = await todoService.delete(id)
    } catch (e) {
      ctx.status = 500
    }
  }
}

app.use(cors())
app.use(bodyParser())
app.use(route.post('/api/todo', todoController.create))
app.use(route.get('/api/todo/all', todoController.read))
app.use(route.put('/api/todo', todoController.update))
app.use(route.delete('/api/todo/:id', todoController.delete))

console.log('Calling app.listen().')

app.listen(port, function() {
  console.log("Calling app.listen's callback function.")
  const host = 'localhost'
  console.log('Example app listening at http://%s:%s', host, port)
})

console.log('app.listen() executed.')
