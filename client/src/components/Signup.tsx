import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    const response = await fetch("http://localhost:5467/signup",reqOptions);
    const result = await response.json();
    console.log("Func executed!!")
    console.log("response from signing up",result);
    navigate("/")
  };

  return (
    <>
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
      <button type="submit">Signup</button>
    </form>
    <span>Already have an account?<Link to="/">Login</Link></span>
    </>
  );
};

export default Signup;
