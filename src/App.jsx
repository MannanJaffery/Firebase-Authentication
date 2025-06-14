
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage";
import Login from './components/Login';
import Register from './components/Register';
import ForgetPassword from "./components/forgetpassword";
import Changepassword from "./components/changepassword";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Courses from "./components/courses";
import Details from "./components/details";


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
          <Route path = "/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>}></Route>
          <Route path="/details/:subId" element = {<Details />}></Route>
        </Routes>
    </BrowserRouter>

  </AuthProvider>
    </>
  )
}
export default App;
