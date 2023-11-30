import CloseIcon from "@mui/icons-material/Close";
import { useAddTaskContext } from "../../AddTaskProvider";
import { useNavigate} from "react-router-dom";
import {useState} from "react";
import "./AddTask.css";
// import { useAddTaskContext } from "../AddTaskProvider.js";
const AddTask = ({ show, setShow }) => {
  const { addTaskData, addTask, resetValue } = useAddTaskContext();
  const [error,setError]=useState(false)
  const navigate = useNavigate();
  const myStyle = {
    position: 'absolute',
    right: '2%',
    top:' 5%',
    fontSize: '3rem',
  };

 

  const handleChange = (e) => {
    const { name, value } = e.target;

    addTask({ [name]: value });
  };

  const handleSaveTask = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
if(addTaskData.taskName.trim()==="")
{
setError(true);
}
else{
  const newTask = {
    name: addTaskData.taskName,
    description: addTaskData.taskDescription,
    dueDate:addTaskData.taskDueDate,
    priority: addTaskData.priority,

  };

  // Get existing tasks from localStorage or initialize an empty array
  const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Add the new task to the array
  const updatedTasks = [...existingTasks, newTask];

  // Save the updated tasks array to localStorage
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  // console.log(addTaskData/);
  // Clear the form fields after saving
  resetValue();
  setError(false);
}
   
  };

  const handleClose = () => {
    setShow(false);
    navigate("/"); // Navigate to the TaskList component when closing
  };
  return (
    <>
      {show && (
        <form onSubmit={handleSaveTask}>
          <div className="wrapper">
            <div className="taskName prop">Task Add</div>
            <label className="modal prop" forhtml="taskName">
           Name
            </label>
            <input
              type="text"
              name="taskName"
              autoComplete="off"
              value={addTaskData.taskName}
              onChange={handleChange}
              placeholder="Enter the Task Name"
            />
            {
              error && <p className="error">Name field cannot be Blank.</p>
            }
            <label className="taskName prop" forhtml="taskDescription">
              Description
            </label>
            <textarea
              type="text"
              name="taskDescription"
              value={addTaskData.taskDescription}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter the Task Description"
            />
            <label  className="prop" forhtml="taskDueDate">Enter Due Date</label>
            <input type='date' name="taskDueDate" onChange={handleChange} value={addTaskData.taskDueDate}></input>
            <div className="taskName prop">Priority</div>
            <select
              id="priority"
              name="priority"
              value={addTaskData.priority}
              onChange={handleChange}
             
            >
              <option   className="select" value="Low">Low</option>
              <option   className="select" value="Medium">Medium</option>
              <option className="select"   value="High">High</option>
            </select>
            <CloseIcon style={myStyle} onClick={handleClose} />
            <button type="submit" className="submit-button">
              Add Task
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AddTask;
