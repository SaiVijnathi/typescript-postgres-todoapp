import { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

type props = {
  editingId : number,
  setEditingId : React.Dispatch<React.SetStateAction<number>>,
}

const Todolist = ({editingId, setEditingId}:props) => {

    type todoProps = {
        todo_id : number,
        description : string
    }

    const [todos, setTodos] = useState<todoProps[]>([]);

  const getAllTodos = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("No token found");
        return;
    }
        let reqOptions = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
        }
        const response = await fetch("http://localhost:5467/gettodos", reqOptions);

        const result = await response.json();
        console.log(result.data);
        setTodos(result.data)
    };

    useEffect(()=>{
      getAllTodos();
    },[])

    const deleteTodo = async (id:number) => {
      const reqOptions = {
        method : "DELETE",
      }
      const response = await fetch(`http://localhost:5467/deletetodo/${id}`,reqOptions);
      const result = await response.json();
      alert(result.status);
    }

    return <div>
        <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo,i) => (
            <tr key={i}>
              <td>{todo.todo_id}</td>
              <td>{todo.description}</td>
              { editingId ? (
                  <td><EditTodo task={todo.description} todoID={todo.todo_id}/></td>
                ) : (
                <td>
                  <button onClick={()=>setEditingId(todo.todo_id)}>edit</button>
                </td>
                )
              }
              <td>
                <button
                  onClick={()=>deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
}
export default Todolist;