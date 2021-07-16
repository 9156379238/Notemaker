import note from '../assets/note.png';
import React, { useState, useEffect} from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import '../components/Signin.css';
import Axios from 'axios';
import { useHistory } from "react-router-dom";


export const Signin = () => {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem('loggedIn')) {
      history.push('/')
    }
  }, []);
  const [errorMessage, setErrorMessage] = useState("");

  const validate = Yup.object({

    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
  })
  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={validate}
      onSubmit={values => {

        Axios.post("http://localhost:5000/Signup/Signin", values)
          .then((response) => {
            if (response.data.loggedIn) {
              localStorage.setItem("loggedIn", true);
              localStorage.setItem("email", response.data.email);
              alert("Welcome");

              history.push("/");
            } else {
              setErrorMessage(response.data.message);
            }
          });
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

                    <h1 className="my-4 font-weight-bold .display-4">Login</h1>
                    <span >{errorMessage}</span>

                    <div className="inner">
                      <TextField label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter Email"
                        name="email"
                        type="email"
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
                      <button className="btn btn-success btn-lg btn-block"
                        disabled={!formik.isValid}
                        type="submit">Login</button>
                    </div>
                    
                  </div>
                  <div className="col-md-7 my-auto">
                    <img className="img-fluid w-100" style={{ marginTop: "15%" }} src={note} alt="" />
                  </div>
                  
                </div>
                
              </div>
              <div className = "footer">
              <Footer />
              </div>
            </Form>
          </div>
          
        </>
        
      )}
      
    </Formik>
  )
}