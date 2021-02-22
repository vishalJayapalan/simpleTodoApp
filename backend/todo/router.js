const router = require('express').Router()

const auth = require('../middleware/auth')
const {
  getTodos,
  getCompletedTodos,
  createTodo,
  deleteTodo,
  updateTodo
} = require('./controller')

router.get('/', auth, getTodos)
router.get('/completed', auth, getCompletedTodos)
router.post('/', auth, createTodo)
router.put('/:id', auth, updateTodo)
router.delete('/:id', auth, deleteTodo)

module.exports = router
