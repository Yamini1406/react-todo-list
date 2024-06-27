import React, { useState } from 'react'

function TaskForm({addTask}) {
    const [taskName, setTaskName] = useState();

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(taskName)
      addTask(taskName)
      setTaskName('');
    }

  return (
    <form onSubmit={handleSubmit}>
        <button>+</button>
        <input type='text' value={taskName} onChange={ev => setTaskName(ev.target.value)} placeholder='your next task here'/>
    </form>
  )
}

export default TaskForm