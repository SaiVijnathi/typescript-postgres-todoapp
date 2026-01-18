import { Button } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { API_BASE } from "../config/api";

const Signup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const userSignup = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    const dataToSend = {
      name,email,password
    }
    const reqOptions = {
      method : "POST",
      body : JSON.stringify(dataToSend),
      headers : {
        "Content-Type" : "application/json"
      }
    }
    const response = await fetch(`${API_BASE}/signup`,reqOptions);
    const result = await response.json();
    console.log("Func executed!!")
    console.log("response from signing up",result);
    navigate("/")
  };

  return (
    <>
    <Logo/>
    <div className="form-container">
    <form onSubmit={userSignup}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
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
          backgroundColor: "red",
          "&:hover": { backgroundColor: "#c90909ff" }, borderRadius:"10px", margin:"10px", fontWeight:"600", width:"200px", fontSize:"15px"
        }}
      >
        Signup
  </Button>
    </form>
    <span className="span">Already have an account? <Link to="/">Login</Link></span>
    </div>
    </>
  );
};

export default Signup;
