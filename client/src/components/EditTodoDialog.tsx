
import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface todo {
    id:number;
    name: string;
    status:string;
    duedate:string;
    priority:string;
  }

interface props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  todo:todo;
}

const EditTodoDialog: React.FC<props> = ({ open, setOpen, todo }) => {
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
                      <input id="todoName" type="text" value={todo.name} className="w-full focus:outline-none border-b border-blue-400" />
                    </div>

                    <div className="w-full flex justify-between items-center mt-4">
                      <label htmlFor="todoStatus" className="mr-3">Status: </label>
                      <select id="todoStatus" className="w-full focus:outline-none border-b border-blue-400 pb-1" value={todo.status}>
                        <option>Pending</option>
                        <option>Fullfilled</option>
                        <option>Failed</option>
                      </select>
                    </div>

                    <div className="w-full flex justify-between items-center mt-4">
                      <label htmlFor="todoPriority" className="mr-3">Priority: </label>
                      <select id="todoPriority" className="w-full focus:outline-none border-b border-blue-400 pb-1" value={todo.priority}>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>Hight</option>
                      </select>
                    </div>

                    <div className="w-full flex justify-start items-center mt-4">
                      <label htmlFor="todoDuedate" className="mr-3">Due Date: </label>
                      <input id="todoDuedate" type="date" className="w-auto focus:outline-none border-b border-blue-400" value={todo.duedate}/>
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
                onClick={() => setOpen(false)}
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
