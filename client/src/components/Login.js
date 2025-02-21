import React, { useContext } from "react";
import { useFormik } from 'formik';
import * as yup from "yup";
import { MyContext } from "./App";

function Login({ }) {
    const {error, setError, setLogin, setUser} = useContext(MyContext)
  
    const validationSchema = yup.object({
        username: yup.string()
          .required('Username is required'),
        password: yup.string()
          .required('Password is required')
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            fetch('/login', {
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
                if (data.success){
                    setLogin(true)
                    resetForm();
                    setError(false)
                    fetch('/currentuser')
                    .then((r) => r.json())
                    .then((data) => {
                    if (data.unsuccessful) {
                        setLogin(false)
                    }
                    else {
                        setLogin(true)
                        setUser(data)
                        console.log(data)
                    }})
                    }
                else {
                    resetForm();
                    setError(true)
                    setLogin(false)
                }
            })
            .catch(() => {
                setError(true)
            })
            .finally(() => {
                setSubmitting(false)
            });
        },
    });
    
  
    return (
        <div className="loginpage">
        <form onSubmit={formik.handleSubmit} className="loginform">
            <h2>Log In</h2>
            {error ? (
                <p className="error">Invalid Login Credentials. Please try again or sign up!</p>
            ) : (
                <></>
            )}
            {formik.errors.username && <div>{formik.errors.username}</div>}
            <label>Username: </label>
            <input
                className="input-login"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder="Enter Username"
            />
            <br/>
            {formik.errors.password && <div>{formik.errors.password}</div>}
            <label>Password: </label>
            <input
                className="input-login"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Enter Password"
            />
            <br />
            <button className="loginbutton" type="submit" disabled={formik.isSubmitting} >
             Log in
            </button>
        </form>
        </div>
    );
  }
export default Login;  