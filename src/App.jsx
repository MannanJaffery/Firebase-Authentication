
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Homepage from "./components/homepage";
import Login from './components/Login';
import Register from './components/Register';
import ForgetPassword from "./components/forgetpassword";
import Changepassword from "./components/changepassword";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  return (
    <>

  <AuthProvider>
    <BrowserRouter> 
        <Routes>
        <Route path="/" element={<Homepage />}/>       
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/changepassword" element={
          <ProtectedRoute>
          <Changepassword />
          </ProtectedRoute>
          } />
        </Routes>
    </BrowserRouter>
  </AuthProvider>
    </>
  )
}
export default App;
