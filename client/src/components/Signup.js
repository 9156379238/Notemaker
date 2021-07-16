import React from 'react';
import note from '../assets/note.png';

import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import * as Yup from 'yup';
import Axios from "axios";

import '../components/Signin.css';
// import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";



export const Signup = () => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('loggedIn')) {
      history.push('/')
    }
  }, []);

  const validate = Yup.object({
    name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Name is Required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
  })
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={validate}
      onSubmit={values => {
        const { confirmPassword, ...data } = values;
        const response = Axios.post("http://localhost:5000/Signup/Signup", data)
        .catch((err) => {
          if (err)
            console.log("Error", err);
        });
        if (response) {
          alert("Registration successfully done!!");
          history.push('/Signin');

        }

      }
      }
    >
      {formik => (
        <>
          <Navbar />

          <div className="inner">
            <Form className="outer">
              <div className="container mt-3">
                <div className="row">
                  <div className="col-md-5">
                    <h1 className="my-4 font-weight-bold .display-4">Register</h1>
                    <TextField label="Name"
                      placeholder="Enter Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="name"
                      type="text"
                    />
                    <br />
                    {/* <TextField label="Last Name" placeholder="Enter Last Name" name="lastName" type="text" /><br /> */}
                    <TextField label="Email"
                      placeholder="Enter Email"
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <br />
                    <TextField label="Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter Password"
                      name="password"
                      type="password"
                    />
                    <br />
                    <TextField label="Confirm Password"
                      value={formik.values.ConfirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter Confirm Password"
                      name="confirmPassword"
                      type="password"
                    />
                    <button className="btn btn-dark mt-3" disabled={!formik.isValid} type="submit">Register</button>
                    <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
                  </div>
                  <div className="col-md-7 my-auto">
                    <img className="img-fluid w-100" style={{ marginTop: "15%" }} src={note} alt="" />
                  </div>
                </div>
              </div>
              <div className = "foot">
              <Footer />
              </div>
            </Form>

          </div>
        </>
      )}
    </Formik>
  )
}
