import Team from "./Team";
import { LoginContext, TeamContext, UserContext } from "./App";
import { useContext } from "react";
import NewTeam from "./NewTeam";

function TeamList({ }) {
    const teams = useContext(TeamContext)
    const login = useContext(LoginContext)
    const user = useContext(UserContext)
    return(
        <div className="teampage">
            <h1 className="teamtitle">Teams</h1>
            <ul className="teamlist">
                {teams.map((team) => (
                    <>
                    <Team
                        key={team.id}
                        city={team.city}
                        mascot={team.mascot}
                        wins={team.wins}
                        theme={team.theme}
                        rosters={team.rosters}
                        login={login}
                        user={user}
                    /> 
                    </>
                ))}
            </ul>
        </div>
    )
}

export default TeamList;