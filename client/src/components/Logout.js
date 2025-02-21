import { useContext } from "react";
import { MyContext } from "./App";

function Logout({ onLogout }) {
    const {login, setLogin, setUser} = useContext(MyContext)

    function handleLogOut (e) {
        e.preventDefault()
        fetch("/logout", {
            method: "DELETE"
        })
        .then(r => {
            setLogin(false)
            setUser([])
        })
        };
    return (
        
        <div className="logoutpage">
            {login ? (
               <div>
               <h1>Log out?</h1>
               <button onClick={handleLogOut}> Log Out </button>
               </div>
            ) : (
                <h1> Thank you for visiting RosterHouse! </h1>
            )}
        </div>
    )
}

export default Logout;