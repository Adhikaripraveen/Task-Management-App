import { createContext, useContext, useState } from "react";
const AddTaskContext = createContext();
const AddTaskProvider = ({ children }) => {
  const [addTaskData, setAddTaskData] = useState({
    taskName: "",
    taskDescription: "",
    taskDueDate:'',
    priority: "low",
  });
  const addTask = (newData) => {
    setAddTaskData((prev) => ({
      ...prev,
      ...newData,
    }));
    
  };
  const resetValue=()=>{
    setAddTaskData({
      taskName:'',
      taskDescription:'',
      taskDueDate:'',
      priority: 'low',
    })
  }
  const contextValue={
    addTaskData,
    addTask,
    resetValue
  }
  return (
    <AddTaskContext.Provider value={contextValue}>
        {
            children
        }
    </AddTaskContext.Provider>
  )
};
const useAddTaskContext=()=>{
  const context=useContext(AddTaskContext) ;
  return context;
  ;
}
export {AddTaskProvider,useAddTaskContext} ;
