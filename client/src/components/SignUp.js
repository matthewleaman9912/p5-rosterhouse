import React, { useContext } from "react";
import { useFormik } from 'formik';
import * as yup from "yup";
import { MyContext } from "./App";



function Signup({ onSignupSubmit, onLogin }) {
    const {error, setError, setLogin, setUser} = useContext(MyContext)

    setError(false)

    const validationSchema = yup.object({
        first_name: yup.string()
          .min(2, 'Name must be at least 2 characters long'),
        last_name: yup.string()
          .min(2, 'Last name must be at least 2 characters long'),
        playing_style: yup.string()
          .required('Playing Style is required'),
        username: yup.string()
          .required('Username is required'),
        _password_hash: yup.string()
          .required('Password is required')
    })

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            playing_style: '',
            username: '',
            _password_hash: '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            fetch('/coaches', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
                })
            .then(res => {
                if (!res.ok) {
                    setError(true)
                }
                return res.json();
            })
            .then(data => {
                onSignupSubmit(data);
                onLogin();
                resetForm();
                setError(false)
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
            })
            .catch(() => {
              setError(true)
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
      <h2 className="signuptitle">Sign Up</h2>
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
      {formik.errors.playing_style && <div>{formik.errors.playing_style}</div>}
      <label>Playing Style: </label>
      <input
        className="input-signup"
        name="playing_style"
        value={formik.values.playing_style}
        onChange={formik.handleChange}
        placeholder="Enter Playing Style..."
      />
      <br/>
      {formik.errors.username && <div>{formik.errors.username}</div>}
      <label>Username: </label>
      {error ? (
        <>
          <input
          className="input-signup"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          placeholder="Enter Username"
        />
        <p className="error">This Usernme is already taken. Please select another...</p>
        </>
        ) : (
          <>
           <input
            className="input-signup"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            placeholder="Enter Username"
          />
          </>
        )}
      <br/>
      {formik.errors._password_hash && <div>{formik.errors._password_hash}</div>}
      <label>Password: </label>
      <input
        className="signup"
        name="_password_hash"
        value={formik.values._password_hash}
        onChange={formik.handleChange}
        placeholder="Enter Password"
      />
      <br />
      <button className="signupbutton" type="submit" disabled={formik.isSubmitting} >
        Sign Up
      </button>
    </form>
    </div>
  );
}
export default Signup;