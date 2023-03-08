import React, { useContext, useState } from 'react'
import {GoogleAuthProvider,signInWithPopup,getAuth, signInWithEmailAndPassword} from "firebase/auth"
import { toast } from 'react-hot-toast';
import { AppContext } from '../App';
import {authConfig} from "../firebase/index.js"

const provider = new GoogleAuthProvider();
const auth = authConfig;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setRoute,setUser } = useContext(AppContext);

    const loginGoogle = ()=>{
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            setRoute("home");
            setUser(user);
            toast("Usuario logueado con exito!")
            // IdP data available using getAdditionalUserInfo(result)
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
    }

    const loginMail = (e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            toast("Usuario logueado con exito!")
            setRoute("home")
            setUser(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
  });
    }
  return (
    <div className="Login">
    <div className='flex flex-col items-center'>
    <form onSubmit={loginMail} className="flex flex-col gap-2">
        <input className='border border-gray-500 rounded py-1 px-2 outline-none' type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input className='border border-gray-500 rounded py-1 px-2 outline-none' type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button  type='submit' className='bg-sky-400 py-1 text-white rounded shadow text-center'>Login</button>
    </form>
    <button onClick={loginGoogle}>... o haz login con Google</button>
    </div>
    </div>
  )
}

export default Login
