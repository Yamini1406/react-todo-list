import './App.css';
import TaskForm from './TaskForm';
import Task from './Task';
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    if(tasks && tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },[tasks])

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks);
  }, [])
  

  const onAdd = (name) => {
    console.log("setting")
    setTasks((prev)=>{
      return [...prev, {name: name, done: false}]
    })
    console.log("tasks", tasks);
  }

  const updateDone = (newDone,index) => {
    setTasks((prev)=> {
      const newTasks = [...prev];
      newTasks[index].done = newDone;
      return newTasks;
    })
  }

  const taskComplete = tasks.filter(task => task.done).length
  const totalTasks = tasks.length;

  const getMessage = () => {
    let percentage = (taskComplete/totalTasks)*100;
    if(percentage === 0) return 'Try to do atleast one😭'
    if(percentage === 100) return 'Good job mini 😎'
    return 'Keep it going 🥳'
  }

  const deleteTasks = (indexToRemove) => {
    setTasks((prev)=>{
      const updatedTasks = tasks.filter((task, index)=> index!=indexToRemove);
      return updatedTasks;
    });

  }

  const renameTask = (index, newName) => {
    setTasks((prev)=>{
      const renameTask = [...prev];
      renameTask[index].name = newName;
      return renameTask;
    })
  }

  return (
    <div className="main">
    <h1>{taskComplete}/{totalTasks} complete</h1>
    <h2>{getMessage()}</h2>
      <TaskForm addTask={onAdd}/>
      {
        tasks?.map((task, index)=> 
          <Task {...task} onToggle={done => updateDone(done,index)}
            onDelete={()=> deleteTasks(index)}
            onRename={(name)=>renameTask(index, name)}
          />
        )
      }
    </div>
  );
}

export default App;
