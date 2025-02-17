
function Team({ city, mascot, theme, rosters, login, user }) {
    return (
        <div>
            <ul className="teamcontainer">
                <p className="teamtitle">{city} {mascot} </p>
                    <ul>
                        {rosters.map((roster) => {
                            if (theme === "sporty"){
                                return(
                                    <div key={roster.id} className="sportyteamrosters">
                                        <div className="p">
                                        <p>Year: {roster.year} </p>
                                        <p>Level of Competition: {roster.level} </p>
                                        <p>Coach Name: {roster.coach.first_name} {roster.coach.last_name} </p>
                                        </div>
                                    </div>
                                )
                            }
                            if (theme === "dark"){
                                return(
                                    <div key={roster.id} className="darkteamrosters">
                                        <div className="p">
                                        <p>Year: {roster.year} </p>
                                        <p>Level of Competition: {roster.level} </p>
                                        <p>Coach Name: {roster.coach.first_name} {roster.coach.last_name} </p>
                                        </div>
                                    </div>
                                )
                            }
                            if (theme === "light"){
                                return(
                                    <div key={roster.id} className="lightteamrosters">
                                        <div className="p">
                                        <p>Year: {roster.year} </p>
                                        <p>Level of Competition: {roster.level} </p>
                                        <p>Coach Name: {roster.coach.first_name} {roster.coach.last_name} </p>
                                        </div>
                                    </div>
                                )
                            }
                            if (theme === "business"){
                                return(
                                    <div key={roster.id} className="businessteamrosters">
                                        <div className="p">
                                        <p>Year: {roster.year} </p>
                                        <p>Level of Competition: {roster.level} </p>
                                        <p>Coach Name: {roster.coach.first_name} {roster.coach.last_name} </p>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </ul>
            </ul>
        </div>
    )
}

export default Team;