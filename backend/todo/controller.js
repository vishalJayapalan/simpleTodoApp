const { getTodosFromDb } = require('./model')

const getTodos = async (req, res) => {
  const { error, todos } = await getTodosFromDb()
  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }
  res.status(200).json(todos)
}

const createTodo = async (req, res) => {
  const task = req.body.task
  const { error, insertedTodo } = await createTodoInDb(task)

  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }
  res.status(200).json(insertedTodo)
}

const updateTodo = async (req, res) => {
  const { id } = req.body.params
  const { completed } = req.bod
  const { error, updatedTodo } = await updateTodoInDb(completed, id)

  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }
  res.status(200).json(updatedTodo)
}

const deleteTodo = async (req, res) => {
  const todoId = req.params
  const { error, deletedTodo } = await deleteTodoInDb(todoid)

  if (error) {
    return res
      .status(500)
      .json({ Msg: 'There was an error please try again later' })
  }
  res.status(200).json(deletedTodo)
}

module.exports = { getTodos, createTodo, updateTodo, deleteTodo }
