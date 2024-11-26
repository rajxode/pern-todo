
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
  const [search, setSearch] = useState("");
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

  const handleDeleteClick = (i:number) => {
    let newTodos = todoList.filter((_,index) => index != i);
    setTodoList(newTodos);
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
          <div className="w-auto border-2 border-blue-300 px-3 rounded-full">
            <span className="mr-2 text-blue-400">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="focus:outline-none py-1"
            />
            {search.length > 10 && (
              <span
                className="ml-2 cursor-pointer text-red-400"
                onClick={() => setSearch("")}
              >
                <i className="fa-regular fa-circle-xmark"></i>
              </span>
            )}
          </div>
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
                      onClick={() => handleDeleteClick(i)}
                      className="text-red-500 cursor-pointer"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </div>
              </div>
            ))
          }
      </div>
      <AddTodoDialog open={open} setOpen={setOpen} />
      <EditTodoDialog open={openEdit} setOpen={setOpenEdit} todo={editTodo} />
    </div>
  );
}

export default App;
