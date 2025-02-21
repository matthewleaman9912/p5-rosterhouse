import React, { createContext, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import CoachList from "./CoachList";
import NavBar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./SignUp";
import Logout from "./Logout";
import TeamList from "./TeamList";
import NavbarLogIn from "./NavbarLogIn";
import NewTeam from "./NewTeam";
import NewRoster from "./NewRoster";
import RosterList from "./RosterList";

export const MyContext = createContext(null);


function App() {
    const [coaches, setCoaches] = useState([]);
    const [teams, setTeams] = useState([]);
    const [rosters, setRosters] = useState([]);
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState([]);
    const [error, setError] = useState(false);
    const [players, setPlayers] = useState([]);

    

    useEffect(() => {
        fetch('/coaches')
        .then((r) => r.json())
        .then((data) => setCoaches(data));
    }, []);

    useEffect(() => {
        fetch('/teams')
        .then((r) => r.json())
        .then((data) => setTeams(data));
    }, []);

    useEffect(() => {
        fetch('/rosters')
        .then((r) => r.json())
        .then((data) => setRosters(data));
    }, []);

    useEffect(() => {
        fetch('/currentuser')
        .then((r) => r.json())
        .then((data) => {
            setLogin(false)
            if (data.unsuccessful) {
                setLogin(false)
            }
            else {
                setLogin(true)
                setUser(data)
            }
        })
    }, []);

    useEffect(() => {
        fetch('/players')
        .then((r) => r.json())
        .then((data) => setPlayers(data))
    }, [])

    function onSignupSubmit(data) {
        const newCoach = [...coaches, data]
        setCoaches(newCoach)
    };

    function onNewTeam(data) {
        const newTeams = [...teams, data]
        setTeams(newTeams)
    };

    function onLogin() {
        setLogin(true)
    };

    function onNewRoster(data) {
        const newRosters = [...rosters, data]
        setRosters(newRosters)
    };

    function onLogout() {
        setLogin(false)
    };

    function handleUpdateRoster(updatedRoster) {
        const updatedRosters = rosters.map((roster) => {
            if (roster.id === updatedRoster.id) {
                setCoaches(coaches)
                return updatedRoster;
            } else {
                return roster;
            }
        })
        setRosters(updatedRosters);
    };

    function handleDeleteRoster(id){
        const updatedRosters = rosters.filter((roster) => roster.id !== id)
        setRosters(updatedRosters)
        setCoaches(coaches)
    };

    function handleAddPlayer(data) {
        setPlayers([...players, data])
    }
    

    return (
        <div className="app">
            <MyContext.Provider value={{ coaches, setCoaches, user, setUser, login, setLogin, error, setError, teams, setTeams, rosters, setRosters }}>
            {login ? (
                <NavbarLogIn />
            ) : (
                <NavBar/>
            )}
            <Switch>
                <Route exact path="/coaches">
                    <CoachList />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/login">
                    <Login onLogin={onLogin} setError={setError}/>
                </Route>
                <Route exact path="/signup">
                    <Signup setError={setError} onSignupSubmit={onSignupSubmit} onLogin={onLogin}/>
                </Route>
                <Route exact path="/logout">
                    <Logout onLogout={onLogout} />
                </Route>
                <Route exact path="/teams">
                        <TeamList />
                </Route>
                <Route exact path="/newteam">
                        <NewTeam setError={setError} onNewTeam={onNewTeam} />
                </Route>
                <Route exact path="/newroster">
                        <NewRoster onNewRoster={onNewRoster} />
                </Route>
                <Route exact path="/rosters">
                        <RosterList handleUpdateRoster={handleUpdateRoster} handleDeleteRoster={handleDeleteRoster} handleAddPlayer={handleAddPlayer}/>
                </Route>
                <Route exact path='/newteam'>
                    <NewTeam onNewTeam={onNewTeam} />
                </Route>
            </Switch>
            </MyContext.Provider>
        </div>
    )
}

export default App;