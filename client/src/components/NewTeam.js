import React, { useContext } from "react";
import { useFormik } from 'formik';
import * as yup from "yup";
import { MyContext } from "./App";
import { NavLink } from "react-router-dom";

function NewTeam({ }) {
    const {error, setError, login, teams, setTeams, user} = useContext(MyContext)
    
    const validationSchema = yup.object({
        city: yup.string()
          .min(2, 'City must be at least 2 characters long'),
        mascot: yup.string()
          .min(2, 'Mascot must be at least 2 characters long'),
        wins: yup.number()
          .required('Number of wins is required')
          .max(100),
        theme: yup.string()
          .required('Theme is required')
    })

    const formik = useFormik({
        initialValues: {
            city: '',
            mascot: '',
            wins: '',
            theme: '',
            rosters: [],
            coaches: [user.id],
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            fetch('/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
                })
            .then(res => res.json())
            .then(data => {
                setTeams([...teams, data]);
                resetForm();
                setError(false);
                console.log(data)
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => setSubmitting(false));
        },
    });


  return (
    <>
    {login ? (
      <form onSubmit={formik.handleSubmit} className="newteamform">
      <h2 className="newteamtitle">Create A New Team</h2>
      {error ? (
        <><p>The new team must have a unique mascot and city!</p></>
      ) : (
        <></>
      )}
      {formik.errors.coaches && <div>{formik.errors.coaches}</div>}
            <div name="coaches" value={formik.values.coaches} onChange={formik.handleChange}>
            </div>
            <br/>
      {formik.errors.city && <div>{formik.errors.city}</div>}
      <label>City: </label>
      <input
        className="input-newteam"
        name="city"
        value={formik.values.city}
        onChange={formik.handleChange}
        placeholder="Enter City..."
      />
      <br/>
      {formik.errors.mascot && <div>{formik.errors.mascot}</div>}
      <label>Mascot: </label>
      <input
        className="input-newteam"
        name="mascot"
        value={formik.values.mascot}
        onChange={formik.handleChange}
        placeholder="Enter Mascot..."
      />
      <br/>
      {formik.errors.wins && <div>{formik.errors.wins}</div>}
      <label>Wins: </label>
      <input
        className="input-newteam"
        name="wins"
        value={formik.values.wins}
        onChange={formik.handleChange}
        placeholder="Enter Number of Wins..."
      />
      <br/>
      {formik.errors.theme && <div>{formik.errors.theme}</div>}
      <label>Theme: </label>
      <br />
      <select name="theme" value={formik.values.theme} onChange={formik.handleChange} placeholder="Please select desired theme">
        <option>bright</option>
        <option>dark</option>
        <option>sporty</option>
        <option>business</option>
      </select>
      <div name='rosters' value={formik.values.rosters}/>
      <br/>
      
      <button className="newteambutton" type="submit" disabled={formik.isSubmitting} >
        Create New Team
      </button>
    </form>
    ):(
      <NavLink to="/login" className="redirectlink">Please Login or Signup to Access! </NavLink>
    )}
    
    </>
  );
}
export default NewTeam;