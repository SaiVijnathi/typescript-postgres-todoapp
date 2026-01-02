import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {

    const navigate = useNavigate();

    const logout = () => {
        navigate("/");
        localStorage.removeItem("token");
    }

    return <div className="navbar">
        <Logo/>
        <div  className="nav-div">
            <div>user mail</div>
            <div id="logout" onClick={logout}>Logout</div>
        </div>
    </div>
}

export default Navbar;