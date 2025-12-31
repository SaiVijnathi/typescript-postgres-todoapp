import { useState } from "react";
import Todolist from "./Todolist";
import Navbar from "./Navbar";

const NewTodo = () => {
    const [task, setTask] = useState<string>("");
    const [editingId, setEditingId] = useState<number>(0);
    const token = localStorage.getItem("token");

    console.log("new todo rendered")
    
    if (!token) {
        console.log("No token found");
        return;
    }

    const createTodo = async () => {
        const dataToSend = {
            task
        }
        const reqOptions = {
            method : "POST",
            body : JSON.stringify(dataToSend),
            headers : {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const response = await fetch("http://localhost:5467/createtodo", reqOptions);
        const result = await response.json();
        console.log(result.data)
        alert(result.status)
    }

    return <div>
        <Navbar/>
        <div>
            <input placeholder="new todo" onChange={(e)=>setTask(e.target.value)}/>
            <button onClick={createTodo}>create</button>
        </div>
        <Todolist editingId={editingId} setEditingId={setEditingId}/>
    </div>
}

export default NewTodo;