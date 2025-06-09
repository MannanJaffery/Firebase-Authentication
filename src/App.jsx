
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import ForgetPassword from "./components/forgetpassword";
import Changepassword from "./components/changepassword";
const App = () => {
  return (
    <>

    <div>
       <h1 className="text-red-500 font-bold">APP</h1>
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
    </div>
    </>
  )
}
export default App;
