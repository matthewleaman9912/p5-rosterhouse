import { useContext } from "react";
import { MyContext } from "./App";

function Home({ }) {
    const {user, login} = useContext(MyContext)
    return(
        <div className="Home">
            <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*3Z3JbBRe6edB5akQAgWpOw.jpeg" className="logo" />
            {login ? (
                <>
                <div>
                <h1>Welcome to the RosterHouse, Coach {user.first_name}!</h1>
                </div>
                </>
            ) : (
                <>
                <h1>Welcome to the RosterHouse!</h1>
                <div className="infocontainer">
                    <ul className="listing">Log in or sign up as a coach to create, update, or delete rosters and even create new teams! </ul>
                    <ul className="listing">If you choose not to sign up, you can still see our registered coaches and teams! </ul>
                    <ul className="listing">Each team, coach and roster has all the need to know information! </ul>
                </div>
                </>
            )}
        </div>
    )
}
export default Home;