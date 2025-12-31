import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const logout = () => {
        navigate("/");
        localStorage.removeItem("token");
    }

    return <div>
        <button onClick={logout}>Logout</button>
    </div>
}

export default Navbar;