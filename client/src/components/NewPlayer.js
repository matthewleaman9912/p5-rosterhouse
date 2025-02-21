import React, { useContext } from "react";
import { useFormik } from 'formik';
import * as yup from "yup";
import { MyContext } from "./App";

function NewPlayer({ handleAddPlayer, id, teamcity, teammascot, year }) {
    const {setRosters} = useContext(MyContext)

    const validationSchema = yup.object({
        first_name: yup.string()
          .min(2, 'Name must be at least 2 characters long'),
        last_name: yup.string()
          .min(2, 'Last name must be at least 2 characters long'),
        position: yup.string()
          .required('Position is required'),
        age: yup.number()
          .required('Age is required')
    })

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            position: '',
            age: '',
            roster_id: id,
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            fetch('/players', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
                })
            .then(res => {
                return res.json()
            })
            .then((data) => {
                console.log(data);
                resetForm();
                handleAddPlayer();
                fetch('/rosters')
                .then((r) => r.json())
                .then((data) => setRosters(data))
            })
            .catch(() => {
              return("nope")
            })
            .finally(() => {
              setSubmitting(false)
            }
          );
        },
    });


  return (
    <div className="signuppage">
    <form onSubmit={formik.handleSubmit} className="signupform">
      <h2 className="signuptitle">Create A New Player</h2>
      {formik.errors.first_name && <div>{formik.errors.first_name}</div>}
      <label>First Name: </label>
      <input
        className="input-signup"
        name="first_name"
        value={formik.values.first_name}
        onChange={formik.handleChange}
        placeholder="Enter First Name..."
      />
      <br/>
      {formik.errors.last_name && <div>{formik.errors.last_name}</div>}
      <label>Last Name: </label>
      <input
        className="input-signup"
        name="last_name"
        value={formik.values.last_name}
        onChange={formik.handleChange}
        placeholder="Enter Last Name..."
      />
      <br/>
      {formik.errors.position && <div>{formik.errors.position}</div>}
      <label>Position: </label>
      <input
        className="input-signup"
        name="position"
        value={formik.values.position}
        onChange={formik.handleChange}
        placeholder="Enter Position..."
      />
      <br/>
      {formik.errors.age && <div>{formik.errors.age}</div>}
      <label>Age: </label>
      <input 
        className="input-signup"
        name="age"
        value={formik.values.age}
        onChange={formik.handleChange}
        placeholder="Enter Age..."
        />
      <br/>
      {formik.errors.roster_id && <div>{formik.errors.roster_id}</div>}
      <label>Roster: </label>
      <select name="roster_id" value={formik.values.roster_id} onChange={formik.handleChange} >
            <option key={id} value={id}>
                {teamcity} {teammascot} {year}
            </option>
      </select>
      <button className="signupbutton" type="submit" disabled={formik.isSubmitting} >
        Create
      </button>
    </form>
    </div>
  );
}
export default NewPlayer;