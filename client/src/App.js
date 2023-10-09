import { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [list, setList]       = useState([]);
  const [task, setTask]       = useState("");
  const [newTask, setNewtask] = useState("");

useEffect(() => {
    Axios.get("http://localhost:3001/getTasks")
      .then((res) => setList(res.data))
      .catch((err) => console.error("Error: ", err));
  }, []);

const addTask = () => {
    Axios.post("http://localhost:3001/createTask", { task })
         .then(() => {
             setList([...list, { task }]);
             setTask(''); // Clear the input field after adding
         });
}

const editTask = (id) => {
  Axios.put("http://localhost:3001/editTask", {
    task: newTask,
    id: id,
  })
  .then(()=>{
    setList(list.map((val)=>{
      return val.id === id ? {id:val.id, task:newTask} : val
    }))
  })
}

const deleteTask = (id) => {
  Axios.delete(`http://localhost:3001/delete/${id}`, )
  .then((results)=>{
    console.log(results)
  })
}

  return (
    <div className="App">
      <div className='addingtask'>
        <span className='inputWrapper'>
          <input type="text" placeholder="Add another task..." onChange={(event) => { setTask(event.target.value) }} />
          <button className='addbutton' onClick={addTask}>ADD</button>
        </span>
      </div>
      <div className="displaytasks">
        {list.map((val, id) => {
          return (
            <div key={id} className="taskname">
              {val.task}
              <span>
                <span className='UDInput'>
                <input type="text" placeholder="Edit Task.." onChange={(event) => { setNewtask(event.target.value) }} />
                </span>
                <button className='editbutton' onClick={()=>{
                  editTask(val.id)
                }}>Edit</button>
                <button className='deletebutton' onClick={()=>{deleteTask(val.id)}}>Delete</button>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
