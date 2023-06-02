import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import {ProtectedRoute} from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Homepage />}/> */}
        <Route path="/login" element={<Login />} />
        {/* <ProtectedRoute path="/home" element={Homepage} /> */}
        {/* <Route exact path='/' element={<ProtectedRoute/>}>
            <Route exact path='/' element={<Homepage/>}/>
          </Route> */}
            {/* <Route path='/' element={ 
              <ProtectedRoute accessBy={'non-authenticated'} user={'user'}> 
                <Login /> 
              </ProtectedRoute>} 
            />  */}
            <Route path="/" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
