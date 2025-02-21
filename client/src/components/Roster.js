import { useContext, useState } from "react";
import PlayerList from "./PlayerList";
import EditRoster from "./EditRoster";
import NewPlayer from "./NewPlayer";
import { MyContext } from "./App";

function Roster({ level, coach, roster_size, teamcity, teammascot, players, id, year, handleUpdateRoster, handleDeleteRoster, handleAddPlayer }) {
    const {setCoaches} = useContext(MyContext)
    const [isEditing, setIsEditing] = useState(false)
    const [isShowing, setIsShowing] = useState(false)

    function handleDeleteClick() {
        fetch(`rosters/${id}`, {
            method: "DELETE",
        });
        handleDeleteRoster(id);
        fetch('/coaches')
        .then((r) => r.json())
        .then((data) => {
            const coachesList = data
            setCoaches(coachesList)
        })
    }

    return (
        <div className="rosters">
            {isEditing ? (
                <EditRoster
                    id={id}
                    roster_size={roster_size}
                    level={level}
                    year={year}
                    handleUpdateRoster={handleUpdateRoster}
                />
            ):(
                <div>
                {isShowing ? (
                <div>
                <p className="rosterteamtitle">Team Name: {teamcity} {teammascot}</p>
                <p>Coach Name: {coach}</p>
                <p>Level of Competition: {level}</p>
                <p>Roster Size: {roster_size}</p>
                <p>Players: </p>
                <PlayerList
                    players={players}
                />
                <NewPlayer
                    id={id}
                    teamcity={teamcity}
                    teammascot={teammascot}
                    year={year}
                    handleAddPlayer={handleAddPlayer}
                    />
                </div>
                ):(
                    <div>
                <p className="rosterteamtitle">Team Name: {teamcity} {teammascot}</p>
                <p>Coach Name: {coach}</p>
                <p>Level of Competition: {level}</p>
                <p>Roster Size: {roster_size}</p>
                <p>Players: </p>
                <PlayerList
                    players={players}
                />
                </div>
                )}
                </div>
            )
        }
        <div>
        <button className="button" onClick={() => setIsEditing((isEditing) => !isEditing)}>
            <span role="img" aria-label="edit">
                ✏️
            </span>
        </button>
        <button className="button" onClick={handleDeleteClick}>
            <span role="img" aria-label="delete">
                🗑
            </span>
        </button>
        <button className="button" onClick={() => setIsShowing((isShowing) => !isShowing)}>Create a Player</button>
        </div>
        </div>
    )}
export default Roster;