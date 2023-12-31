// App.js
import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddTask from "./Components/AddTask/AddTask.js";
import EditTask from "./Components/EditTask/EditTask.js";
import TaskList from "./Components/TaskList/TaskList.js";
import AddIcon from "@mui/icons-material/Add";
import { AddTaskProvider } from "./AddTaskProvider.js";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
const App = () => {
  const [show, setShow] = useState(false);
  

  const myStyle = {
    fontSize: "2rem",
  };

  return (
    <>
      <BrowserRouter>
        <AddTaskProvider>
          <div className="container">
            <div className="header">
              <p>Get Tasks Done</p>
              <Link onClick={() => setShow(true)} to="/add" className="link">
                <button>
                  <AddIcon style={myStyle} />
                  Add Task
                </button>
              </Link>
            </div>

            <Routes>
              <Route path="/Task-Management-App" element={<TaskList />} />
              <Route
                path="/add"
                element={<AddTask setShow={setShow} show={show} />}
              />
              <Route
                path="/edit/:taskIndex"
                element={<EditTask setShow={setShow} show={show} />}
              />
            </Routes>
          </div>
          
        </AddTaskProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
