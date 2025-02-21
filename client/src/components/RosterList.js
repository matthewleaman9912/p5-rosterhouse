import { useContext, useEffect } from "react";
import Roster from "./Roster";
import { MyContext } from "./App";

function RosterList({ handleUpdateRoster, handleDeleteRoster, handleAddPlayer }) {
    const {rosters, setRosters, user} = useContext(MyContext)

    useEffect(() => {
        fetch('/rosters')
        .then((r) => r.json())
        .then((data) => setRosters(data));
    }, []);

    const setRoster = rosters.map((roster) => {
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
            {setRoster}
        </ul>
    )
}
export default RosterList;