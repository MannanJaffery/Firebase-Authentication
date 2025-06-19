
import { collection ,addDoc} from "firebase/firestore";
import { db } from "../firebase";

export const Errorlog = async (error , context = "unknown") => {

    try{

        await addDoc(collection(db , "errorlog") , {
            message:error.message , 
            context:context , 
            stack : error.stack || "no stack"
        })

    }

    catch(err){
        console.log("Failed to Log the error" ,err);
    }

}

export default Errorlog;
