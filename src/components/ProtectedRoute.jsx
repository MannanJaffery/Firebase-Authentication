import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const ProtectedRoute = ({children}) => {
    const {user , loading}=useAuth();
    console.log(user);


    if(loading){
        return <div>Loading.......</div>
    }
    console.log(user);

        if(!user){

            return <Navigate to = "/login" replace />
        }

        return children;
};

export default ProtectedRoute;
