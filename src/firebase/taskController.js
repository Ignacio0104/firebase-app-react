import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from ".";

export const addNewTask = async task =>{
    await addDoc(collection(db,"tasks"), task)
}

export const getTasks = async ()=>{
    const taskRef = collection(db,"tasks");
    const querySnapshot = await getDocs(taskRef);
    /*querySnapshot.forEach(doc => console.log(doc.id,"=>",doc.data()))*/
    const tasks = querySnapshot.docs.map(doc=>{
        return {...doc.data(),id: doc.id}
    })
    //console.log(tasks)
    return tasks
}

export const updateTask = async (task)=>{
    await setDoc(doc(db,"tasks",task.id),{
        title: task.title,
        description: task.description
    })
}

export const removeTask = async (id)=>{
    await deleteDoc(doc(db,"tasks",id))
}