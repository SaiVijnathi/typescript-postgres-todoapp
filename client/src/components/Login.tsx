import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <form onSubmit={userLogin}>
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
      <button type="submit">Login</button>
    </form>
    <span>Don't have an account?<Link to="/signup">Signup</Link></span>
    </>
  );
};

export default Login;