import { NavLink } from "react-router-dom";

function NavBar({ }) {
    return(
        <div>
            <nav className="navbar">
            <NavLink
            to="/"
            className="nav-link"
            > Home </NavLink>
            <NavLink
            to="/coaches"
            className="nav-link"
            > Coaches </NavLink>
            <NavLink
            to="/teams"
            className="nav-link"
            > Teams </NavLink>
            <NavLink
            to="/login"
            className="nav-link"
            > Login </NavLink>
            <NavLink
            to="/signup"
            className="nav-link"
            > Signup </NavLink>
            </nav>
        </div>
)}

export default NavBar;