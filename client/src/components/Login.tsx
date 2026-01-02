import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Button} from "@mui/material"
import Logo from "./Logo";

const Login = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const userLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSend = {
      email, password
    }
    const reqOptions = {
      method : "POST",
      body : JSON.stringify(dataToSend),
      headers : {
        "Content-Type" : "application/json"
      }
    }
    const response = await fetch("http://localhost:5467/login", reqOptions);
    const result = await response.json();
    alert(result.message);
    localStorage.setItem("token", result.data)
    if(result.status === "success"){
      navigate("/newtodo")
    }
  };

  return (
    <>
    <Logo/>
    <div className="form-container">
      <form onSubmit={userLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#E3000B",
            "&:hover": { backgroundColor: "#be0202ff" }, borderRadius:"10px", margin:"10px", fontWeight:"600", width:"200px", fontSize:"15px"
          }}
        >
          Login
    </Button>
      </form>
    <span className="span">Don't have an account? <Link to="/signup">Signup</Link></span>
    </div>
    </>
  );
};

export default Login;