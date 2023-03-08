import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import {motion} from "framer-motion"
import {AiFillCheckCircle} from "react-icons/ai"
import { AppContext } from '../App';
import { toast } from 'react-hot-toast';
import { authConfig } from '../firebase';

const auth = authConfig

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userCreated, setUserCreated] = useState(false);
    const {setRoute } = useContext(AppContext)
    const crearUsuario=()=>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setUserCreated(true)
          toast("Usuario creado con exito!")
          setRoute("home")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        crearUsuario();
    }
  return (
    <div className='flex flex-col gap-4 items-center'>
      <h1 className='text-sky-700 font-semibold text-center' >Registrate aqui!</h1>
      <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col gap-2">
        <input className='border border-gray-500 rounded py-1 px-2 outline-none' type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input className='border border-gray-500 rounded py-1 px-2 outline-none' type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button disabled={userCreated} type='submit' onClick={(e)=>handleSubmit(e)} 
      className='bg-sky-400 py-1 text-white rounded shadow text-center'>{userCreated ? (<AiFillCheckCircle></AiFillCheckCircle>) : "Register"}</button>
      </form>
      {userCreated && <motion.h1   initial={{y:'100vh'}} animate={{y:"0"}} exit={{y:"100vh"}} className='text-green-500 text-xl'>User created!</motion.h1>}
    </div>
  )
}

export default Register
