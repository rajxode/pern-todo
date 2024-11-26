
import React, { useState } from "react";
import axios, { toFormData } from "axios";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TodoData {
  name:string;
  duedate:string;
  status:string;
  priority:string;
}

const dummyTodo : TodoData = {
  name:"",
  status:"pending",
  priority:"low",
  duedate:""
}

const AddTodoDialog: React.FC<Props> = ({ open, setOpen }) => {

  const [todoData, setTodoData] = useState<TodoData>(dummyTodo);

  const handleAddClick = async(e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if(!todoData.name || !todoData.duedate ) {
        console.log("all values required");
        return;
      }
      const response = await axios.post(`${import.meta.env.VITE_BASEURL}/add-todo`,{
        name:todoData.name,
        priority:todoData.priority,
        status:todoData.status,
        dueDate:todoData.duedate
      })

      if(response.data.success) {
        setTodoData(dummyTodo);
        setOpen(false);
      }

    } catch (error) {
      console.log('error in adding new todo');      
    }
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 
            data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all 
                data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 
                data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 
                data-[closed]:sm:scale-95"
          >
            <div className="w-full bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="w-full sm:flex sm:items-start">
                <div className="w-full mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-xl font-semibold text-gray-700 underline underline-offset-4"
                  >
                    Add Todo
                  </DialogTitle>
                  <div className="mt-2 flex flex-col w-full">
                    <div className="w-full flex justify-between items-center">
                      <label htmlFor="todoName" className="mr-3">Todo: </label>
                      <input 
                        id="todoName" 
                        type="text" 
                        placeholder="todo.." 
                        value={todoData?.name}
                        onChange={(e) => setTodoData({...todoData, name:e.target.value})}
                        className="w-full focus:outline-none border-b border-blue-400" 
                      />
                    </div>

                    <div className="w-full flex justify-between items-center mt-4">
                      <label htmlFor="todoStatus" className="mr-3">Status: </label>
                      <select 
                        id="todoStatus"
                        value={todoData?.status}
                        onChange={(e) => setTodoData({...todoData, status:e.target.value})}
                        className="w-full focus:outline-none border-b border-blue-400 pb-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="fulfilled">Fulfilled</option>
                        <option value="not done">Failed</option>
                      </select>
                    </div>

                    <div className="w-full flex justify-between items-center mt-4">
                      <label htmlFor="todoPriority" className="mr-3">Priority: </label>
                      <select 
                        id="todoPriority" 
                        value={todoData.priority}
                        onChange={(e) => setTodoData({...todoData, priority:e.target.value})}
                        className="w-full focus:outline-none border-b border-blue-400 pb-1"
                      >
                        <option value="low">Low</option>
                        <option value="mid">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    <div className="w-full flex justify-start items-center mt-4">
                      <label htmlFor="todoDueDate" className="mr-3">Due Date: </label>
                      <input 
                        id="todoDueDate" 
                        type="date" 
                        value={todoData.duedate}
                        onChange={(e) => setTodoData({...todoData, duedate:e.target.value})}
                        className="w-auto focus:outline-none border-b border-blue-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold 
                    text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="button"
                data-autofocus
                onClick={handleAddClick}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold 
                    text-blue-500 shadow-sm ring-1 ring-inset ring-blue-400 hover:bg-blue-50 sm:mt-0 sm:w-auto"
              >
                Add
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddTodoDialog;
