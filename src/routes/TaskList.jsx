import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { addNewTask, getTasks, removeTask, updateTask } from '../firebase/taskController';



const TaskList = () => {
    const [task, setTask] = useState({title: "", description: ""});
    const [taskList, setTaskList] = useState([])
    const [mode, setMode] = useState("add")

    const createNewTask = async ()=>{
        await addNewTask(task)
        setTask({title:"",description:""})
        getTasks().then(t=>setTaskList([...t]))
        .catch(e=> console.log(e))   
    }

    useEffect(() => {
      getTasks().then(t=>setTaskList([...t]))
      .catch(e=> console.log(e))   
    }, [])
    
    const editTask = (id)=>{
        setMode(mode === "add" ? "update" : "add");
        const taskToEdit = taskList.find(t=>t.id === id);
        setTask({...taskToEdit});
    }

    const updateExistingTask = async()=>{
        await updateTask(task);
        setMode("add")
        getTasks().then(t=>setTaskList([...t]))
        .catch(e=> console.log(e))   
    }

    const deleteTask = async (id)=>{
        await removeTask(id);
        setMode("add")
        getTasks().then(t=>setTaskList([...t]))
        .catch(e=> console.log(e))   
    }

   /* const obtainTasks = async()=>{
        const tasks = await getTasks();
        setTaskList(tasks);
    }*/

  return (
    <div>
      <h1 className='text-sky-700 font-semibold text-lg'> TaskList </h1>
      <div className='flex flex-col gap-4'>
        <h2>Introduce una nueva tarea</h2>
        <input className='border shadow outline-none focus:ring ring-sky-200 rounded px-2 py-1 w-full' 
        type="text" value={task.title} 
        placeholder="Titulo" onChange={(e)=>setTask({...task,title: e.target.value})}></input>
        <textarea rows={3} className='border shadow outline-none focus:ring ring-sky-200 rounded px-2 py-1 w-full' 
        type="text" value={task.description} 
        placeholder="Descripcion" onChange={(e)=>setTask({...task,description: e.target.value})}></textarea>
        <button onClick={()=> mode === "add" ? createNewTask() : updateExistingTask()} className='bg-sky-400 text-white rounded shadow py-2 hover:bg-sky-500 transition font-semibold'>
        {mode === "add" ? "Agregar" : "Actualizar"}
        </button>
      {taskList.map(task=>(
        <div key={task.id} className='rounded-lg border border-sky-300 p-4 flex flex-col gap-2 mt-3'>
            <h1 className='font-semibold'>{task.title}</h1>
            <div className='border-t border-sky-300'></div>
            <p>{task.description}</p>
            <div className='flex justify-between'>
            <button className='bg-sky-400 text-white py-1 px-2 rounded' onClick={()=>editTask(task.id)}>Editar</button>
            <button onClick={()=>window.confirm("Seguro que quieres eliminar esta tarea?") && deleteTask(task.id)} className='bg-red-400 text-white py-1 px-2 rounded'>Eliminar</button>
            </div>

        </div>
      ))}
       
      </div>
    </div>
  )
}

export default TaskList
