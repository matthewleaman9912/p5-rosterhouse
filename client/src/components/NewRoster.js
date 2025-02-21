import React, { useContext } from "react";
import { useFormik } from 'formik';
import * as yup from "yup";
import { MyContext } from "./App";
import { NavLink } from "react-router-dom";

function NewRoster({ onNewRoster }) {
    const {user, login, teams, setTeams, setCoaches} = useContext(MyContext)

    const validationSchema = yup.object({
        roster_size: yup.number()
          .required('Roster size is required'),
        level: yup.string()
          .required('Level of competition is required'),
        year: yup.number()
        .required("Year is required"),
        team_id: yup.number()
        .required('Team is required')
    })

    const formik = useFormik({
        initialValues: {
            roster_size: '',
            level: '',
            year: '',
            coach_id: user.id,
            team_id: ''
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            fetch('/rosters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
                })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to create');
                }
                return res.json();
            })
            .then(data => {
                onNewRoster(data)
                resetForm();
                console.log(data)
                fetch('/teams')
                .then((r) => r.json())
                .then((data) => setTeams(data))
                fetch('/coaches')
                .then((r) => r.json())
                .then((data) => setCoaches(data))
                }
            )
            .finally(() => setSubmitting(false));
        },
    });
  
    return (
        <>
        {login ? (
        <form onSubmit={formik.handleSubmit} className="loginform">
            <h2>Create A New Roster</h2>
            {formik.errors.roster_size && <div>{formik.errors.roster_size}</div>}
            <label>Roster Size: </label>
            <input
                className="input-new-roster"
                name="roster_size"
                value={formik.values.roster_size}
                onChange={formik.handleChange}
                placeholder="Enter Roster Size..."
            />
            <br/>
            {formik.errors.level && <div>{formik.errors.level}</div>}
            <label>Level of Competition: </label>
            <input
                className="input-new-roster"
                name="level"
                value={formik.values.level}
                onChange={formik.handleChange}
                placeholder="Enter Level of Competition..."
            />
            <br />
            {formik.errors.year && <div>{formik.errors.year}</div>}
            <label>Year: </label>
            <input
                className="input-new-roster"
                name="year"
                value={formik.values.year}
                onChange={formik.handleChange}
                placeholder="Enter Year of Roster..."
            />
            <br />
            {formik.errors.coach_id && <div>{formik.errors.coach_id}</div>}
            <label>Coach: </label>
            <select name="coach_id" value={formik.values.coach_id} onChange={formik.handleChange}>
            <option>{user.first_name} {user.last_name}</option>
            </select>
            {formik.errors.team_id && <div>{formik.errors.team_id}</div>}
            <label>Team: </label>
            <select name="team_id" value={formik.values.team_id} onChange={formik.handleChange} placeholder="Select Team...">
                {teams.map((team) => (
                    <option key={team.id} value={team.id} placeholder="Select Team...">
                        {team.city} {team.mascot}
                    </option>
                ))}
            </select>
            <br />
            <button className="newrosterbutton" type="submit" disabled={formik.isSubmitting} >
             Create a New Roster
            </button>
        </form>
        ):(
            <NavLink to="/login" className="redirectlink">Please Login or Signup to Access! </NavLink>
        )}
        </>
    );
  }
export default NewRoster;