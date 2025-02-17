import PlayerList from "./PlayerList";

function Coach({ id, first_name, last_name, playing_style, rosters }) {
    return(
        <div className="coachcontainer">
            <ul>
                <div className="coachrosters">
                    <div className="coachtop">
                    <p>Coach's Name: {first_name} {last_name}</p>
                    <p>Playing Style: {playing_style}</p>
                    <p>Coach's Rosters: </p>
                    </div>
                    <ul>
                        {rosters.map((roster) => (
                            <div key={roster.id} className="rostery">
                                <p>Year: {roster.year} </p>
                                <p>Level of Competition: {roster.level} </p>
                                <p>Team Name: {roster.team.city} {roster.team.mascot}</p>
                                <p>Players: </p>
                                    <PlayerList
                                        key={id}
                                        players={roster.players}
                                    />
                            </div>
                        ))}
                    </ul>
                </div>
            </ul>
        </div>
    )
}
export default Coach;