import React from 'react'

export default function CompletedTask ({
  completedTask,
  updateTask,
  deleteTask
}) {
  return (
    <div className='task'>
      <input
        type='checkbox'
        checked={completedTask.completed}
        onChange={e => updateTask(e.target.checked, completedTask.id)}
      />
      <span>{completedTask.task}</span>
      <i
        className='fas fa-trash'
        onClick={() => deleteTask(completedTask.id)}
      />
    </div>
  )
}
