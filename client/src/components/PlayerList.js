import Player from "./Player"

function PlayerList({ players }) {
    return (
        <div>
            {players.map((player) => (
                <ul key={player.id}>
                <Player
                    key={player.id}
                    fname = {player.first_name}
                    lname = {player.last_name}
                    age = {player.age}
                    position = {player.position}
                />
                </ul>
            ))}
        </div>
    )
}

export default PlayerList;