
import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface Todo {
    id:number;
    name: string;
    status:string;
    duedate:string;
    priority:string;
}

interface UpdateTodo {
  status:string;
  priority:string;
}

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  todo:Todo;
  todoList: Array<Todo>;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>
}

const EditTodoDialog: React.FC<Props> = ({ open, setOpen, todo, todoList, setTodoList }) => {

  const [updateData, setUpdateData] = useState<UpdateTodo>({
    status:todo.status,
    priority:todo.priority
  });

  const handleUpdateClick = async(e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.VITE_BASEURL}/update/${todo.id}`,{
        status:updateData.status,
        priority: updateData.priority
      });

      if(response.data.success) {
        const resTodo = response.data.todo;
        const newTodoList = todoList.filter((item) => item.id != todo.id);
        setTodoList([...newTodoList, resTodo]);
        setOpen(false);
      }
    } catch (error:any) {
      console.log('error in updating the todo data', error.message);
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
                    Edit Todo
                  </DialogTitle>
                  <div className="mt-2 flex flex-col w-full">
                    <div className="w-full flex justify-between items-center">
                      <label htmlFor="todoName" className="mr-3">Todo: </label>
                      <input 
                        id="todoName" 
                        type="text" 
                        value={todo.name} 
                        className="w-full focus:outline-none border-b border-blue-400" 
                      />
                    </div>

                    <div className="w-full flex justify-between items-center mt-4">
                      <label htmlFor="todoStatus" className="mr-3">Status: </label>
                      <select 
                        id="todoStatus" 
                        className="w-full focus:outline-none border-b border-blue-400 pb-1" 
                        value={updateData.status}
                        onChange={(e) => setUpdateData({...updateData, status: e.target.value})}
                      >
                        <option value="pending">Pending</option>
                        <option value="fulfilled">Fulfilled</option>
                        <option value="not done">Not Done</option>
                      </select>
                    </div>

                    <div className="w-full flex justify-between items-center mt-4">
                      <label htmlFor="todoPriority" className="mr-3">Priority: </label>
                      <select 
                        id="todoPriority" 
                        value={updateData.priority}
                        onChange={(e) => setUpdateData({...updateData, priority: e.target.value })}
                        className="w-full focus:outline-none border-b border-blue-400 pb-1"
                      >
                        <option value="low">Low</option>
                        <option value="mid">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    <div className="w-full flex justify-start items-center mt-4">
                      <label htmlFor="todoDuedate" className="mr-3">Due Date: </label>
                      <input 
                        id="todoDuedate" 
                        type="date"
                        value={todo.duedate}
                        className="w-auto focus:outline-none border-b border-blue-400"
                      />
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
                onClick={handleUpdateClick}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold 
                    text-blue-500 shadow-sm ring-1 ring-inset ring-blue-400 hover:bg-blue-50 sm:mt-0 sm:w-auto"
              >
                Update
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default EditTodoDialog;
