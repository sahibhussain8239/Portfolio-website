import { useState, useEffect} from 'react'
import Navbar from './components/Navbar'
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin2Fill } from "react-icons/ri";
import './App.css'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState(() => {
  const storedTodos = localStorage.getItem("todos")
  return storedTodos ? JSON.parse(storedTodos) : []
})
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])
  
  const toggleFinished = (e) => {
      setShowFinished(!showFinished)
  }
  

  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const HandleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
  }


  return (
    <>
      <Navbar />
      <div className="mx-auto md:w-1/2 my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
      <h1 className='font-bold text-center text-3xl'>STask Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text"  className='bg-white w-full rounded-xl px-5 '/>
          <button onClick={handleAdd} disabled={todo.length <=3} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-full disabled:bg-violet-600 mx-2'>Save</button>
          </div>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished}/> Show Finished
        <h2 className='text-xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-2'>NO Todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 justify-between my-2">
              <div className='flex gap-5'>
                <input name={item.id} onChange={HandleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-700 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><TiEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-700 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><RiDeleteBin2Fill /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
