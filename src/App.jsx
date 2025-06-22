
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
import Category from "./components/category";
import {CourseProvider} from "./context/CourseProvider";
import About from "./components/about";
import Contact from "./components/contact";
import Payment from "./components/payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const App = () => {

  const stripepromise = loadStripe('pk_live_51RccK8LZs7wBNJ9a8LmPd46wgdXlwwaowHJXBCmjBI1itI9a5symxVquGhBFOi65OnoMElGUC1XbZxjGYaoNmePg0045ypgnE5')
  return (
    <>
<BrowserRouter> 
  <AuthProvider>
    <CourseProvider>
        <Routes>
        <Route path="/" element={<Homepage />}/>       
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/about" element = {<About />}></Route>
        <Route path="/contact" element = {<Contact />}></Route>
        <Route path="/changepassword" element={
          <ProtectedRoute>
          <Changepassword />
          </ProtectedRoute>
          } />

          <Route path="/payment/:subid" element={
            <Elements stripe={stripepromise}>
            <ProtectedRoute> 
              <Payment />

            </ProtectedRoute>
            </Elements>
          } />
          <Route path = "/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>}></Route>          
          <Route path="/category/:catid" element={< Category/>}></Route>
          <Route path="/:categoryTitle/:courseTitle" element = {<Details />}></Route>

        </Routes>


        </CourseProvider>
  </AuthProvider>
</BrowserRouter>
    </>
  )
}
export default App;
