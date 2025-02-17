
function Player({ fname, lname, age, position }) {
    return(
        <div className="playercontainer">
            <p>First Name: {fname}</p>
            <p>Last Name: {lname}</p>
            <p>Age: {age}</p>
            <p>Position: {position}</p>
        </div>
    )
}

export default Player;