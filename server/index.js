const express = require("express");
const cors = require("cors");
const pool = require("./db");
const jwt = require("jsonwebtoken");

const app = express();

const allowedOrigins = [process.env.FRONTEND_URL]; // Vercel URL

//cors
app.use(cors({
    origin: function(origin, callback){
        if(!origin) return callback(null, true); // allow non-browser requests
        if(allowedOrigins.indexOf(origin) === -1){
            const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// This ensures preflight OPTIONS requests are handled automatically
app.options("*", cors());


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

app.listen(process.env.PORT, () => {
    console.log("Listening to port 5467");
});