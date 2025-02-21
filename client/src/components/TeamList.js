import Team from "./Team";
import { MyContext } from "./App";
import { useContext, useEffect, useState } from "react";


function TeamList({ }) {
    const {teams, setTeams, login, user, coaches} = useContext(MyContext)

    const [isShowing, setIsShowing] = useState(false)

    function handleShowing(e) {
        e.preventDefault()
        setIsShowing(!isShowing)
    }

    const allTeams = teams.map((team) => {
        return(
            <>
                <Team
                key={team.id}
                city={team.city}
                mascot={team.mascot}
                wins={team.wins}
                theme={team.theme}
                rosters={team.rosters}
                />
            </>
        )
    })


    return(
        <div className="teampage">
            <h1 className="teamtitle">Teams</h1>
            {login ? (
                <div>
                <div>
                {isShowing ? (
                    <div>
                <button className='teambutton' type='submit' onClick={handleShowing}>View My Teams</button>
                <ul className="teamlist">
                    {allTeams}
                </ul>
                </div>
                ) : (
                    <div>
                    <button className='teambutton' type='submit' onClick={handleShowing}>View All Teams</button>
                <ul className="teamlist">
                    {coaches.map((coach) => {
                            {if (coach.id === user.id) {
                                return(
                                    coach.teams.map((team) => (
                                    <Team
                                        key={team.id}
                                        city={team.city}
                                        mascot={team.mascot}
                                        wins={team.wins}
                                        theme={team.theme}
                                        rosters={coach.rosters}
                                    />
                            )
                            ))}}})}
                </ul>
                </div>
                )}
                </div>
                </div>
            ):(
                <ul className="teamlist">
                    {allTeams}
                </ul>
            )}
            
        </div>
    )
}

export default TeamList;