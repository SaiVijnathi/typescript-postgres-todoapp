const express = require("express");
const cors = require("cors");
const pool = require("./db");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();

const FRONTEND_URL = [process.env.FRONTEND_URL]; // Vercel URL

// ===== CORS MIDDLEWARE =====
// Handles preflight OPTIONS requests manually for Render + CORS
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "https://typescript-postgres-todoapp-pzo1xtoy5-sai-vijnathis-projects.vercel.app");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.header("Access-Control-Allow-Credentials", "true");

//     if (req.method === "OPTIONS") {
//         return res.sendStatus(204); // Preflight OK
//     }
//     next();
// });

const allowedOrigins = [
  "http://localhost:5173",
  "https://typescript-postgres-todoapp-pzo1xtoy5-sai-vijnathis-projects.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Optional: keep cors() for safety
// app.use(cors({
//     origin: "https://typescript-postgres-todoapp-pzo1xtoy5-sai-vijnathis-projects.vercel.app",
//     credentials: true
// }));


app.use(express.json());

//api endpoints
//signup
app.post("/signup", async (req,res) => {
    try {
        const {name, email, password} = req.body;
        const result = await pool.query("insert into users(name, email, password) values($1,$2,$3) returning *",[name, email, password])
        res.json(result.rows[0]);
    } catch (err) {
        console.log(err.message)
    }
})

//login
app.post("/login", async (req,res) => {
    try {
        const {email, password} = req.body;
        const checkEmail = await pool.query("select * from users where email=$1", [email])
        if(checkEmail.rows.length > 0){
            if(checkEmail.rows[0].password === password){
                const token = jwt.sign({userID:checkEmail.rows[0].user_id}, "secret_key");
                res.json({status:"success",data : token, message:"Login Successful"})
            }else{
                res.json({status:"Password is incorrect"})
            }
        }else{
                res.json({status:"User doesnt exist"})
        }
    } catch (err) {
        console.log(err.message)
        res.json({status:"login failed", message:err.message})
    }
})

//create todos
app.post("/createtodo", async (req,res) => {
    try {
        const {task} = req.body;
        const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json("Authorization header missing");
            }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, "secret_key");
        console.log(decoded)
        const userid = decoded.userID;
        const result = await pool.query("insert into todos(description, user_id) values($1,$2) returning *", [task, userid]);
        res.json({status:"Todo Inserted", data:result.rows})
    } catch (err) {
        console.log(err.message)
    }
})

//get todos
app.get("/gettodos", async (req,res) => {
    try {
        const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json("Authorization header missing");
            }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, "secret_key");
        console.log(decoded)
        const userid = decoded.userID; 
        const todos = await pool.query("select * from todos where user_Id = $1", [userid]);
        res.json({status:"fetched todos",data:todos.rows})
    } catch (err) {
        console.log(err.message)
        res.json("unable to fetch todos")
    }
})

//update todo
app.put("/edittodo/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const {todo} = req.body;
        const editedTodo = await pool.query("update todos set description=$1 where todo_id=$2 returning *", [todo, id])
        res.json({status:"todo updated", data:editedTodo.rows[0]})
    } catch (err) {
        console.log(err.message)
    }
})

//delete todo
app.delete("/deletetodo/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("delete from todos where todo_id=$1",[id]);
        res.json({status:"deleted successfully"})
    } catch (err) {
        console.log(err.message)
    }
})


const PORT = process.env.PORT || 5467;
app.listen(PORT, () => {
  console.log("Server running on", PORT);
});