import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { getCookie } from '../../util/cookie'
import Task from './Task'
import CompletedTask from './CompletedTask'

export default function Todo () {
  const [todo, setTodo] = useState([])
  const [completedTodo, setCompletedTodo] = useState([])
  const [task, setTask] = useState('')
  const [loggedIn, setLoggedIn] = useState(true)
  const [showCompleted, setShowCompleted] = useState(false)

  const getTasks = async () => {
    const data = await window.fetch('todo/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (data.ok) {
      const jsonData = await data.json()
      setTodo(jsonData)
    } else {
      if (data.status === 401) {
        setLoggedIn(false)
      }
      console.log('error')
    }
  }

  const getCompletedTasks = async () => {
    const data = await window.fetch('todo/completed', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (data.ok) {
      const jsonData = await data.json()
      setCompletedTodo(jsonData)
    } else {
      if (data.status === 401) {
        setLoggedIn(false)
      }
      console.log('error')
    }
  }

  const createTask = async () => {
    if (task.length) {
      const data = await window.fetch('todo/', {
        method: 'POST',
        body: JSON.stringify({ task }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (data.ok) {
        const jsonData = await data.json()
        setTodo(prevTodo => [...prevTodo, jsonData[0]])
        setTask('')
      }
    }
  }

  const updateTask = async (completed, taskId) => {
    const data = await window.fetch(`todo/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify({ completed }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (data.ok) {
      getTasks()
      getCompletedTasks()
    }
  }

  const deleteTask = async taskId => {
    const data = await window.fetch(`todo/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (data.ok) {
      const jsonData = await data.json()
      const todoAfterDeleting = todo.filter(task => task.id !== taskId)
      setTodo(todoAfterDeleting)
    }
  }

  useEffect(() => {
    getTasks()
    getCompletedTasks()
  }, [])

  return !loggedIn ? (
    <Redirect to='/' />
  ) : (
    <div className='task-page-container'>
      <div className='logo-container'>
        <h1 className='logo'>Todo App</h1>
      </div>
      <div className='task-container'>
        <div className='task-add-form'>
          <input
            placeholder='Create a new task'
            value={task}
            onKeyDown={e => {
              if (e.keyCode === 13) createTask()
            }}
            onChange={e => setTask(e.target.value)}
          />
        </div>
        <div className='show-task-container'>
          {todo.length ? (
            todo.map(task => (
              <Task
                task={task}
                key={task.id}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))
          ) : (
            <h2>No tasks Yet!!!</h2>
          )}
        </div>
        {completedTodo.length > 0 && (
          <div className='show-completed-task-container'>
            <div
              className='show-completed-task-toggler'
              onClick={() => {
                setShowCompleted(prevState => !prevState)
              }}
            >
              {!showCompleted && <i className='fas fa-chevron-down' />}
              {showCompleted && <i className='fas fa-chevron-up' />}
              <span className='show-completed'>
                {completedTodo.length} show completed
              </span>
            </div>
            {showCompleted &&
              completedTodo.map(completedTask => (
                <CompletedTask
                  completedTask={completedTask}
                  key={completedTask.id}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
