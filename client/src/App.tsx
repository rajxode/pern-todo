
import { useEffect, useState } from "react";
import axios from "axios";
import AddTodoDialog from "./components/AddTodoDialog";
import EditTodoDialog from "./components/EditTodoDialog";

interface TodoData {
  id:number;
  name: string;
  status:string;
  duedate:string;
  priority:string;
}

function App() {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [todoList, setTodoList] = useState<Array<TodoData>>([]);
  const [editTodo, setEditTodo] = useState<TodoData>({
    id:-1,
    name:"",
    status:"pending",
    duedate:"1979-01-01",
    priority:"low"
  });

  const handleEditClick = (i:number) => {
    setEditTodo(todoList[i]);
    setOpenEdit(true);
  }

  const handleDeleteClick = async(i:number) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASEURL}/remove/${i}`);
      if(response.data.success) {
        const newTodos = todoList.filter((item) => item.id != i);
        setTodoList(newTodos);
      } else {
        throw new Error("Error in deleting the todo");
      } 
    } catch (error:any) {
      console.log("error in deleting todo", error.message);
    }
  }


  useEffect(() => {
    (
      async() => {
        const response = await axios.get(`${import.meta.env.VITE_BASEURL}/my-todos`);
        if(response.data.success) {
          setTodoList(response.data.todos);
        } else {
          setTodoList([]);
        }
      }
    )();
  },[]);

  return (
    <div className="w-full min-h-screen bg-gray-200 px-4 sm:px-[5%] md:px-[10%] py-[5vh]">
      {/* search bar */}
      <div className="w-full shadow bg-white rounded-md flex justify-around py-[10px]">
        <div className="flex items-center">
          <div className="mr-3 text-blue-500">My Todo</div>
        </div>
        <div>
          <button 
          onClick={(e) => setOpen(true)}
            className="px-3 py-1 bg-blue-400 rounded-md text-white shadow hover:border hover:border-blue-400 
            hover:bg-white hover:text-blue-400"
          >
            Add Todo
          </button>
        </div>
      </div>

      {/* todo list */}
      <div className="w-full mt-[10vh] bg-white rounded-md shadow px-4 py-4">
          {
            todoList.length > 0
            ?
            todoList.map((todo,i) => (
              <div key={i} className="w-full bg-gray-200 flex justify-between px-4 py-2 items-center rounded shadow-md mb-3">
                  <div className="text-start flex-1">{i + 1}</div>
                  <div className="text-start flex-1">{todo.name}</div>
                  <div className="text-start flex-1">{todo.status}</div>
                  <div className="text-start flex-1">{todo.duedate}</div>
                  <div className="text-start flex-1">{todo.priority}</div>
                  <div>
                    <span 
                      onClick={() => handleEditClick(i)}
                      className="mr-3 text-blue-400 cursor-pointer"
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </span>
                    <span 
                      onClick={() => handleDeleteClick(todo.id)}
                      className="text-red-500 cursor-pointer"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </div>
              </div>
            ))
            :
            <div className="w-full text-blue-400 text-center">
              No Todos
            </div>
          }
      </div>
      <AddTodoDialog 
        open={open} 
        setOpen={setOpen} 
        setTodoList={setTodoList}
        todoList={todoList}
      />
      <EditTodoDialog 
        open={openEdit} 
        setOpen={setOpenEdit} 
        todo={editTodo}
        todoList={todoList}
        setTodoList={setTodoList}
      />
    </div>
  );
}

export default App;
