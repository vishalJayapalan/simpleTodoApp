const router = require('express').Router()
const { getTodos, createTodo, deleteTodo, updateTodo } = require('./controller')

router.get('/', getTodos)
router.post('/', createTodo)
router.put('/:id', updateTodo)
router.get('/:id', deleteTodo)

module.exports = router
