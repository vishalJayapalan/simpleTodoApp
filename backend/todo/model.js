const { pool } = require('../util/database')

const getTodosFromDb = async userId => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM todo WHERE user_id = $1 AND todo.completed = false ORDER BY id ASC',
      [userId]
    )
    return { todos: rows, error: false }
  } catch (e) {
    return { error: e }
  }
}

const getCompletedTodosFromDb = async userId => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM todo WHERE user_id = $1 AND todo.completed = true ORDER BY id ASC',
      [userId]
    )
    return { todos: rows, error: false }
  } catch (e) {
    return { error: e }
  }
}

const createTodoInDb = async (task, userId) => {
  try {
    const { rows } = await pool.query(
      `INSERT INTO todo (task,completed,user_id) VALUES ($1,false,$2) RETURNING *`,
      [task, userId]
    )
    return { insertedTodo: rows, error: false }
  } catch (e) {
    return { error: e }
  }
}

const updateTodoInDb = async (completed, id) => {
  try {
    const { rows } = await pool.query(
      `UPDATE todo SET completed = $1 WHERE id = $2 RETURNING *`,
      [completed, id]
    )
    return { updatedTodo: rows, error: false }
  } catch (e) {
    return { error: e }
  }
}

const deleteTodoInDb = async todoId => {
  try {
    const { rows } = await pool.query(
      `DELETE FROM todo where id = $1 RETURNING *`,
      [todoId]
    )
    return { deletedTodo: rows, error: false }
  } catch (e) {
    return { error: e }
  }
}

module.exports = {
  getTodosFromDb,
  getCompletedTodosFromDb,
  createTodoInDb,
  updateTodoInDb,
  deleteTodoInDb
}
