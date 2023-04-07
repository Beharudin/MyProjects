import React from 'react'
import { Route, Routes } from "react-router-dom";
import TaskLists from "./components/TaskLists";
import Mytasks from './components/Mytasks';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<TaskLists />} />
        <Route path="/mytasks" element={<Mytasks />} />
      </Routes>
    </div>
  );
}

export default App;
