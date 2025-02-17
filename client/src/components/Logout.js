import { useContext } from "react";
import { LoginContext } from "./App";

function Logout({ onLogout }) {
    const login = useContext(LoginContext)

    function handleLogOut (e) {
        e.preventDefault()
        fetch("/logout", {
            method: "DELETE"
        })
        .then(r => {
            onLogout()
            
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