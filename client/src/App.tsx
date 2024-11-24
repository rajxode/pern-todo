import { useState } from "react";
import AddTodoDialog from "./components/AddTodoDialog";
import EditTodoDialog from "./components/EditTodoDialog";

interface todo {
  id:number;
  name: string;
  status:string;
  dueDate:string;
  priority:string;
}

let todos:Array<todo> = [
  {
    "id": 1,
    "name": "Buy groceries",
    "status": "pending",
    "dueDate": "2024-11-25",
    "priority": "high"
  },
  {
    "id": 2,
    "name": "Finish project report",
    "status": "not done",
    "dueDate": "2024-11-30",
    "priority": "high"
  },
  {
    "id": 3,
    "name": "Walk the dog",
    "status": "fullfilled",
    "dueDate": "2024-11-23",
    "priority": "medium"
  },
  {
    "id": 4,
    "name": "Attend team meeting",
    "status": "pending",
    "dueDate": "2024-11-25",
    "priority": "low"
  },
  {
    "id": 5,
    "name": "Call mom",
    "status": "fullfilled",
    "dueDate": "2024-11-22",
    "priority": "medium"
  },
  {
    "id": 6,
    "name": "Complete online course",
    "status": "not done",
    "dueDate": "2024-12-01",
    "priority": "high"
  },
  {
    "id": 7,
    "name": "Clean the house",
    "status": "pending",
    "dueDate": "2024-11-25",
    "priority": "low"
  },
  {
    "id": 8,
    "name": "Read new book",
    "status": "not done",
    "dueDate": "2024-12-10",
    "priority": "medium"
  },
  {
    "id": 9,
    "name": "Prepare dinner",
    "status": "fullfilled",
    "dueDate": "2024-11-23",
    "priority": "medium"
  },
  {
    "id": 10,
    "name": "Organize email inbox",
    "status": "pending",
    "dueDate": "2024-11-28",
    "priority": "low"
  }
]


function App() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [todoList, setTodoList] = useState<Array<todo>>(todos);
  const [editTodo, setEditTodo] = useState<todo>({
    id:-1,
    name:"",
    status:"pending",
    dueDate:"1979-01-01",
    priority:"low"
  });

  const handleEditClick = (i:number) => {
    setEditTodo(todos[i]);
    setOpenEdit(true);
  }

  const handleDeleteClick = (i:number) => {
    let newTodos = todoList.filter((_,index) => index != i);
    setTodoList(newTodos);
  }

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
                  <div className="text-start flex-1">{todo.dueDate}</div>
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
