import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

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
      </Routes>
    </>
  );
}

export default App;
