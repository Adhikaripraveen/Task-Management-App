import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import "./TaskList.css";

const TaskList = () => {
  const navigate = useNavigate();
  const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [checkedTasks, setCheckedTasks] = useState(() => {
    const storedCheckedTasks =
      JSON.parse(localStorage.getItem("checkedTasks")) || [];
    return existingTasks.map((_, index) => storedCheckedTasks[index] || false);
  });
  console.log(existingTasks)
const myStyle={
    fontSize:'3rem',
    Color:'white',
}
  useEffect(() => {
    localStorage.setItem("checkedTasks", JSON.stringify(checkedTasks));
  }, [checkedTasks]);

  const handleCheckboxChange = (index) => {
    setCheckedTasks((prevCheckedTasks) => {
      const updatedCheckedTasks = [...prevCheckedTasks];
      updatedCheckedTasks[index] = !updatedCheckedTasks[index];
      return updatedCheckedTasks;
    });
  };

  const handleDelete = (index) => {
    const updatedTasks = [...existingTasks];
    updatedTasks.splice(index, 1);

    setCheckedTasks((prevCheckedTasks) => {
      const updatedCheckedTasks = [...prevCheckedTasks];
      updatedCheckedTasks.splice(index, 1);
      return updatedCheckedTasks;
    });

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem("checkedTasks", JSON.stringify(checkedTasks));
  };
  const handleEdit = (index) => {
    navigate(`/edit/${index}`, { state: { task: existingTasks[index] } });
  };

  return (
    <>
      <h1 className="heading">Task List</h1>
      {existingTasks.length > 0 ? (
        existingTasks.map((task, index) => (
          <div
            className={`task-container ${
              checkedTasks[index] ? "completed" : ""
            }`}
            key={index}
          >
            <h2
              style={{
                textDecoration: checkedTasks[index] ? "line-through" : "none",
              }}
            >
              {task.name}
            </h2>
            <p className="task-description">{task.description}</p>
            <p className='task-dueDate'>Due Date:-{task.dueDate}</p>
            <p className="task-priority">Priority:-{task.priority}</p>
            <div className="input">
              <input
                type="checkbox"
                id={`checkbox-${index}`}
                checked={checkedTasks[index] || false}
                onChange={() => handleCheckboxChange(index)}
                className="checkbox"
              />
              <div>
                {checkedTasks[index] ? (
                  <h3>Completed</h3>
                ) : (
                  <h3>Not Completed</h3>
                )}
              </div>
            </div>
            <div className="icon">
              <div title="Edit" className="edit">
                <EditIcon style={myStyle} onClick={() => handleEdit(index)} />
              </div>
              <div title="Delete" className="delete">
                <DeleteIcon
                  style={myStyle}
                  onClick={() => handleDelete(index)}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-task">

            <p>No tasks added yet</p>
        </div>
      )}
    </>
  );
};

export default TaskList;
