import React from 'react'

export default function Task ({ task, updateTask, deleteTask }) {
  return (
    <div className='task'>
      <input
        type='checkbox'
        checked={task.completed}
        onChange={e => updateTask(e.target.checked, task.id)}
      />
      <span>{task.task}</span>
      <i className='fas fa-trash' onClick={() => deleteTask(task.id)} />
    </div>
  )
}
