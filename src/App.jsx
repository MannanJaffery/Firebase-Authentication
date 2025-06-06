
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import ForgetPassword from "./forgetpassword";
import Changepassword from "./changepassword";
const App = () => {
  return (
    <>
       <h1>APP</h1>
    <BrowserRouter> 
        <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link> 
         | <Link to="/forgetpassword">ForgetPassword</Link> <Link to="/"></Link> | <Link to="/changepassword">ChangePassword</Link>
        </nav>
        <Routes>       
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/changepassword" element={<Changepassword />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}
export default App;
