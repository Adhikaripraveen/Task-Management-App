import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useParams } from "react-router-dom";
import { useAddTaskContext } from "../../AddTaskProvider";
import { useEffect, useState } from "react";
import "./EditTask.css";

const EditTask = ({ setShow, show }) => {
  const { taskIndex } = useParams();
  const { addTaskData, resetValue } = useAddTaskContext();
  const [taskValues, setTaskValues] = useState(addTaskData);

  const navigate = useNavigate();

  useEffect(() => {
    // Get existing tasks from localStorage or initialize an empty array
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // Find the task to edit based on the taskIndex
    const taskToEdit = existingTasks[taskIndex];

    if (taskToEdit) {
      // Set the initial values of the local state
      setTaskValues({
        taskName: taskToEdit.name,
        taskDescription: taskToEdit.description,
        taskDueDate:taskToEdit.dueDate,
        priority: taskToEdit.priority,
      });
    }
  }, [taskIndex]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTaskValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSaveTask = (e) => {
    e.preventDefault();

    // Get existing tasks from localStorage or initialize an empty array
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Update the task in the array
    existingTasks[taskIndex] = {
      name: taskValues.taskName,
      description: taskValues.taskDescription,
      dueDate:taskValues.taskDueDate,
      priority: taskValues.priority,
    };

    // Save the updated tasks array to localStorage
    localStorage.setItem("tasks", JSON.stringify(existingTasks));

    // Close the EditTask component and navigate
    setShow(false);
    navigate("/");
  };

  const handleClose = () => {
    setShow(false);
    navigate("/"); // Navigate to the TaskList component when closing
  };

  return (
    <div className="edit-container">
      <form onSubmit={handleSaveTask}>
        <div className="wrapper">
          <div className="taskName prop">Edit the Task </div>
          <label className="modal prop" htmlFor="taskName">
            Task Name
          </label>
          <input
            type="text"
            name="taskName"
            autoComplete="off"
            value={taskValues.taskName}
            onChange={handleChange}
            placeholder="Enter the Task Name"
          />
          <label className="taskName prop" htmlFor="taskDescription">
            Task Description
          </label>
          <textarea
            type="text"
            name="taskDescription"
            value={taskValues.taskDescription}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Enter the Task Description"
          />
          <label  className="prop" forhtml="taskDueDate">Enter Due Date</label>
            <input type='date' name="taskDueDate" value={taskValues.taskDueDate} onChange={handleChange}></input>
          <div className="taskName prop">Priority</div>
          <select
            id="priority"
            name="priority"
            value={taskValues.priority}
            onChange={handleChange}
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
          <CloseIcon
            style={{
              position: "absolute",
              right: "2%",
              top: " 5%",
              fontSize: "3rem",
            }}
            onClick={handleClose}
          />
          <button type="submit" className="submit-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
