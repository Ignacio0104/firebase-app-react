import { getAuth } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Header from "./componentes/Header";
import { authConfig, messaging } from "./firebase";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import {onMessage} from "firebase/messaging"
import Shopping from "./routes/Shopping";
import Footer from "./componentes/Footer";
import TaskList from "./routes/TaskList";

export const AppContext = createContext(null)

const auth=authConfig

onMessage(messaging,payload=>{
  toast.custom(t=>(
    <div className="bg-sky-300 p-4">
    <h1 className="text-xl">{payload.notification.title}</h1>
    <p className="text-sm">{payload.notification.body}</p>
    </div>
  ))
})

function App() { 
  const [route, setRoute] = useState("home")
  const [user,setUser] = useState(null);
 /* useEffect(async () => {
    setUser(auth.currentUser)
    console.log(user)
  }, [])*/
  
  return (
    <AppContext.Provider value={{route,setRoute,user,setUser}}> 
    <div className="h-screen">     {/* Ocupa todola pantalla para que el footer quede abajo */}
    <Toaster></Toaster>
    <Header></Header>    
    <main className="px-6 py-24">
      {route=== "home" && <Home></Home>}
      {route=== "login" && <Login></Login>}
      {route=== "register" && <Register></Register>}
      {route=== "shopping" && <Shopping></Shopping>}
      {route=== "tasklist" && <TaskList></TaskList>}
    </main>
    <Footer></Footer>
    </div>
    </AppContext.Provider>
  );
}

export default App;
 