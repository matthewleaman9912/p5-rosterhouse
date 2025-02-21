import { useContext, useEffect } from "react";
import Coach from "./Coach";
import { MyContext } from "./App";

function CoachList() {
    const {coaches, setCoaches} = useContext(MyContext);

    useEffect(() => {
        fetch('/coaches')
        .then((r) => r.json())
        .then((data) => setCoaches(data));
    }, []);
    
    return(
        <div className="coachpage">
            <h1 className="coachtitle">Coaches</h1>
            <ul className="coachlist">
                {coaches.map((coach) => (
                    <Coach
                        key={coach.id}
                        first_name={coach.first_name}
                        last_name={coach.last_name}
                        playing_style={coach.playing_style}
                        rosters={coach.rosters}
                    />
                ))}
            </ul>
        </div>
    )
}

export default CoachList;