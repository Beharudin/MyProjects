import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Register from './components/Register';

function App() {
  return (
    <>
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </>
  );
}

export default App;
