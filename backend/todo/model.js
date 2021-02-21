const { pool } = require('../util/database')

const getTodosFromDb = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM todo ORDER BY id ASC')
    return { todos: rows, error: false }
  } catch (e) {
    return { error: e }
  }
}

const createTodoInDb = async task => {
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
      [completd, id]
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
  createTodoInDb,
  updateTodoInDb,
  deleteTodoInDb
}
