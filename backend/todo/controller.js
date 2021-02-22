const {
  getTodosFromDb,
  getCompletedTodosFromDb,
  createTodoInDb,
  updateTodoInDb,
  deleteTodoInDb
} = require('./model')

const getTodos = async (req, res) => {
  const userId = req.user.id
  const { error, todos } = await getTodosFromDb(userId)
  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }
  res.status(200).json(todos)
}

const getCompletedTodos = async (req, res) => {
  const userId = req.user.id
  const { error, todos } = await getCompletedTodosFromDb(userId)
  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }
  res.status(200).json(todos)
}

const createTodo = async (req, res) => {
  const task = req.body.task
  const userId = req.user.id
  const { error, insertedTodo } = await createTodoInDb(task, userId)

  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }
  res.status(200).json(insertedTodo)
}

const updateTodo = async (req, res) => {
  const { id } = req.params
  const { completed } = req.body
  const { error, updatedTodo } = await updateTodoInDb(Boolean(completed), id)

  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }
  res.status(200).json(updatedTodo)
}

const deleteTodo = async (req, res) => {
  const { id } = req.params
  const { error, deletedTodo } = await deleteTodoInDb(id)

  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }
  res.status(200).json(deletedTodo)
}

module.exports = {
  getTodos,
  getCompletedTodos,
  createTodo,
  updateTodo,
  deleteTodo
}
