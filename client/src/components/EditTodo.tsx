import { useState } from "react"

type props = {
    task : string,
    todoID : number
}
const EditTodo = ({task, todoID}:props) => {

    const [todo, setTodo] = useState<string>(task)

    const saveEditedTodo = async () => {
        const dataToSend = {
            todo
        }
        const reqOptions = {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(dataToSend)
        }
        const response = await fetch(`http://localhost:5467/edittodo/${todoID}`, reqOptions);
        const result = await response.json();
        alert(result.status)
        console.log(result.data)
    }

    return <div>
        <div className="pop-up">
            <input value={todo} onChange={(e)=>setTodo(e.target.value)}/>
            <button onClick={saveEditedTodo}>save</button>
        </div>
    </div>
}
export default EditTodo;