import { useContext } from "react";
import Roster from "./Roster";
import { RosterContext, UserContext } from "./App";

function RosterList({ handleUpdateRoster, handleDeleteRoster, handleAddPlayer }) {
    const rosters = useContext(RosterContext)
    const user = useContext(UserContext)
    

    const setRosters = rosters.map((roster) => {
        if (roster.coach_id === user.id) {
                return (<Roster
                    key={roster.id}
                    id={roster.id}
                    year={roster.year}
                    players={roster.players}
                    level={roster.level}
                    coach={roster.coach.first_name}
                    roster_size={roster.roster_size}
                    teamcity={roster.team.city}
                    teammascot={roster.team.mascot}
                    handleUpdateRoster={handleUpdateRoster}
                    handleDeleteRoster={handleDeleteRoster}
                    handleAddPlayer={handleAddPlayer}
                />)
            }
    })
    
    return(
        <ul className="rosterlist">
            <h1 className="rostertitle">Rosters</h1>
            {setRosters}
        </ul>
    )
}
export default RosterList;