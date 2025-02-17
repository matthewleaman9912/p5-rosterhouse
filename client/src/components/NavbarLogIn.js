
import { NavLink } from "react-router-dom";

function NavbarLogin({ }) {
    return(
        <div>
            <nav className="navbar">
            <NavLink
            to="/"
            className="nav-link"
            > Home </NavLink>
            <NavLink
            to="/teams"
            className="nav-link"
            > Teams </NavLink>
            <NavLink
            to='/newteam'
            className='nav-link'
            > New Team </NavLink>
            <NavLink
            to="/rosters"
            className="nav-link"
            > Rosters </NavLink>
            <NavLink
            to="/newroster"
            className="nav-link"
            > New Roster </NavLink>
             <NavLink
            to="/logout"
            className="nav-link"
            > Logout </NavLink>
            </nav>
        </div>
    )}
export default NavbarLogin;