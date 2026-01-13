// import { createAsyncThunk } from "@reduxjs/toolkit";

// type CreateTodoArgs = {
//   task: string;
//   token: string;
// }

// export const createTodo = createAsyncThunk<CreateTodoArgs>(
//     "todos/create",
//     async ({task, token}, {rejectWithValue}) => {
//         try{
//             const reqOptions = {
//                 method : "POST",
//                 body : JSON.stringify({task}),
//                 headers : {
//                     "Content-Type" : "application/json",
//                     Authorization: `Bearer ${token}`,
//                 }
//             }
//             const response = await fetch("http://localhost:5467/createtodo", reqOptions);
//             const result = await response.json();
//             if(!response.ok){
//                 return rejectWithValue(result);
//             }
//             return result.data
//         }catch(err){
//             return rejectWithValue(err.message);
//         }
//     }
// )