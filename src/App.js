import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Footer from './components/Footer';
import About from './components/About';

function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect( () => {
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  const fetchTasks = async() => {
    const response = await fetch('http://localhost:4000/tasks')
    const data = await response.json()
    console.log(data)
    return data
  }

  const fetchTask = async(id) => {
    const response = await fetch(`http://localhost:4000/tasks/${id}`)
    const data = await response.json()
    console.log(data)
    return data
  }  

  const addTask = async(task) => {
    console.log('Add Task', task)
    // const id = Math.floor(Math.random() * 10000) + 1
    const response = await fetch('http://localhost:4000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await response.json()
    setTasks([...tasks, data])
  }

  const deleteTask = async(id) => {
    console.log('delete', id)
    await fetch(`http://localhost:4000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))

  }

  const toggleReminder = async(id) => {
    console.log('reminder', id)
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const response = await fetch(`http://localhost:4000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await response.json()

    setTasks(tasks.map( (task)=> task.id === id ? {...task, reminder: !data.reminder} : task))

  }

  return (
    <Router>
      <div className="container">
        <Header onAddTask={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask}></Header>        
        <Routes>
        <Route path='/' element={
          <>
          {showAddTask && <AddTask onAddTask={addTask}></AddTask>}
          {tasks.length > 0 ? (
            <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}></Tasks>
            ) : (
            'Nothing to show here'
          )}
          </>
        } />
        <Route path='/about' element={<About />} />
        </Routes>
        <Footer></Footer>
      </div>
    </Router>  
  );
}

export default App;