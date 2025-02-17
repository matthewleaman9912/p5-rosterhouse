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

export const CoachContext = createContext(null);
export const TeamContext = createContext(null);
export const RosterContext = createContext(null);
export const LoginContext = createContext(null);
export const UserContext = createContext(null);
export const ErrorContext = createContext(null);


function App() {
    const [coaches, setCoaches] = useState([]);
    const [teams, setTeams] = useState([]);
    const [rosters, setRosters] = useState([]);
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState([]);
    const [error, setError] = useState(false);
    const [increment, setIncrement] = useState(0);
   

    useEffect(() => {
        fetch('/coaches')
        .then((r) => r.json())
        .then((data) => setCoaches(data));
    }, [increment]);

    useEffect(() => {
        fetch('/teams')
        .then((r) => r.json())
        .then((data) => setTeams(data));
    }, [increment]);

    useEffect(() => {
        fetch('/rosters')
        .then((r) => r.json())
        .then((data) => setRosters(data));
    }, [increment]);

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
                console.log(data)
            }
        })
    }, [increment]);
    

    function onSignupSubmit(data) {
        setCoaches(...coaches, data)
        setIncrement((increment) => increment + 1)
    };

    function onNewTeam(data) {
        setTeams(...teams, data)
        setIncrement((increment) => increment + 1)
    };

    function onLogin() {
        setLogin(true)
        setIncrement((increment) => increment + 1)
    };

    function onNewRoster(data) {
        setRosters(...rosters, data)
        setIncrement((increment) => increment + 1)
    };

    function onLogout() {
        setLogin(false)
        setIncrement((increment) => increment + 1)
    };

    function handleUpdateRoster(updatedRoster) {
        const updatedRosters = rosters.map((roster) => {
            if (roster.id === updatedRoster.id) {
                return updatedRoster;
            } else {
                return roster;
            }
        })
        setRosters(updatedRosters);
        setIncrement((increment) => increment + 1)
    };

    function handleDeleteRoster(id){
        const updatedRosters = rosters.filter((roster) => roster.id !== id)
        setIncrement((increment) => increment + 1)
        setRosters(updatedRosters)
    };

    function handleAddPlayer() {
        return setIncrement((increment) => increment + 1)
    }
    

    return (
        <div className="app">
            {login ? (
                <NavbarLogIn />
            ) : (
                <NavBar/>
            )}
            <Switch>
                <Route exact path="/coaches">
                    <CoachContext.Provider value={coaches}>
                        <CoachList />
                    </CoachContext.Provider>
                </Route>
                <Route exact path="/">
                    <UserContext.Provider value={user}>
                    <LoginContext.Provider value={login}>
                        <Home />
                    </LoginContext.Provider>
                    </UserContext.Provider>
                </Route>
                <Route exact path="/login">
                    <ErrorContext.Provider value={error}>
                        <Login onLogin={onLogin} setError={setError}/>
                    </ErrorContext.Provider>
                </Route>
                <Route exact path="/signup">
                    <ErrorContext.Provider value={error}>
                        <Signup setError={setError} onSignupSubmit={onSignupSubmit} onLogin={onLogin}/>
                    </ErrorContext.Provider>
                </Route>
                <Route exact path="/logout">
                    <LoginContext.Provider value={login}>
                        <Logout onLogout={onLogout} />
                    </LoginContext.Provider>
                </Route>
                <Route exact path="/teams">
                    <UserContext.Provider value={user}>
                    <LoginContext.Provider value={login}>
                    <TeamContext.Provider value={teams}>
                        <TeamList />
                    </TeamContext.Provider>
                    </LoginContext.Provider>
                    </UserContext.Provider>
                </Route>
                <Route exact path="/newteam">
                    <ErrorContext.Provider value={user}>
                    <TeamContext.Provider value={teams}>
                        <NewTeam setError={setError} onNewTeam={onNewTeam} />
                    </TeamContext.Provider>
                    </ErrorContext.Provider>
                </Route>
                <Route exact path="/newroster">
                    <UserContext.Provider value={user}>
                    <TeamContext.Provider value={teams}>
                        <NewRoster onNewRoster={onNewRoster} />
                    </TeamContext.Provider>
                    </UserContext.Provider>
                </Route>
                <Route exact path="/rosters">
                    <RosterContext.Provider value={rosters}>
                    <UserContext.Provider value={user}>
                        <RosterList handleUpdateRoster={handleUpdateRoster} handleDeleteRoster={handleDeleteRoster} handleAddPlayer={handleAddPlayer}/>
                    </UserContext.Provider>
                    </RosterContext.Provider>
                </Route>
                <Route exact path='/newteam'>
                    <NewTeam onNewTeam={onNewTeam} />
                </Route>
            </Switch>
        </div>
    )
}

export default App;