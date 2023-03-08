import { getAuth, signOut } from 'firebase/auth';
import React, { useContext } from 'react'
import {SiFirebase} from "react-icons/si"
import { AppContext } from '../App'
import { authConfig } from '../firebase';

const auth = authConfig

const Header = () => {
    const {route,setRoute,user,setUser} = useContext(AppContext);

    const logout = ()=>{
        signOut(auth).then(() => {
            setRoute("home");
            setUser(null)
          }).catch((error) => {
            // An error happened.
          });
    }

  return (
    <header className="fixed top-0 h-20 w-full bg-gray-100 shadow-lg flex items-center justify-between px-8">
    <div className="flex items-center gap-2">
    <SiFirebase cursor="pointer" className="text-2xl text-pink-500" onClick={()=>setRoute("home")}></SiFirebase>
    <span  className="text-xl font-semibold text-pink-500">FireShopping</span>
    </div>
    <div>
    { user !== null ? 
    (
        <div className='flex items-center'>
            <p className='m-4'>{user.email}</p>
            <button onClick={logout} className=
            "bg-sky-500 text-white py-2 px-3 rounded-full hover:bg-sky-700 transition">Logout</button>
        </div>
    ):
    (
        <div>
        <button onClick={()=>setRoute("login")} className=
    "bg-sky-500 text-white py-2 px-3 rounded-full hover:bg-sky-700 transition">Login con</button>
    <button onClick={()=>setRoute("register")} className=
    "bg-sky-500 text-white py-2 px-3 ml-2 rounded-full hover:bg-sky-700 transition">Register</button>
        </div>
    )}
 
    </div>

  </header>
  )
}

export default Header
