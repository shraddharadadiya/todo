import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [id,setid] = useState();
  const [search, setsearch] = useState("");
  const [store, setstore]= useState([]);


  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      if (editIndex !== null) {
        // If in edit mode, update the existing task
        const updatedTasks = [...tasks];
        updatedTasks[editIndex].text = newTask;
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        // Otherwise, add a new task
        setTasks([...tasks, { text: newTask, completed: false }]);
        setstore([...tasks,{ text: newTask, completed: false }])
      }
      setNewTask('');
    }
 };

  const handleRemoveTask = (index) => {
    let del = tasks.filter((ele,ind1) =>{
      return index != ind1;
    });
    setTasks(del);
    setstore(del);

  };

  const handleEditTask = (index) => {
    setNewTask(tasks[index].text);
    setEditIndex(index);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    setstore(updatedTasks);
  };
  
  const completebtn=()=>{
    let btn=store.filter((ele,ind)=>{
      return ele.completed === true;
    })
    setTasks(btn);
  }
  const uncompletebtn=()=>{
    let btn=store.filter((ele,ind)=>{
      return ele.completed ===false;
    })
    setTasks(btn);
  }
  const allbtn=()=>{
    setTasks([...store]);
  }
   const searchHandler = () => {
    var data = store.filter((ele,index) => {
      return ele.text === search;
    });
    setTasks(data);
    setsearch('');
   }

  return (
    <div className="App">
      <h1 className='title'>To-Do List</h1>
      <div>
        <input    
          type="text"
          value={newTask}
          placeholder='Add a Todo...'
          onChange={(e) => setNewTask(e.target.value)}
          className='input'
        />
        <button onClick={handleAddTask}className='btn'>
          {editIndex !== null ? 'Edit Task' : 'Add Task'}
        </button>
        <button className='btn' onClick={completebtn}>Completed</button>
        <button className='btn' onClick={uncompletebtn}>Uncompleted</button>
        <button className='btn'onClick={allbtn}>All</button><br></br>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(index)}
            />
            <span 
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.text}
            </span>
            <button className='btn1' onClick={() => handleEditTask(index)}>Edit</button>
            <button className='btn1' onClick={() => handleRemoveTask(index)}>Delet</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;