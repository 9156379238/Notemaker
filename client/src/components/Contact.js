import React from 'react';
import note from '../assets/note.png';

import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import * as Yup from 'yup';
import Axios from "axios";
import '../components/Contact.css';
import { useHistory } from "react-router-dom";
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>






export const Contact = () => {
  let history = useHistory();
  const validate = Yup.object({
    name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Name is Required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    message: Yup.string()
      .required('Message is Required'),


  })
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        message: ''
      }}
      validationSchema={validate}
      onSubmit={values => {
        const { confirmPassword, ...data } = values;
        const response = Axios.post("http://localhost:5000/Contactus/Contactus", data).catch((err) => {
          if (err)
            console.log("Error", err);
        });
        if (response) {
          alert("Successfully Submitted");
          history.push('/');

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

                    <h1 className="my-4 font-weight-bold .display-4">Contact us</h1>
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
                    <div className="msg">
                      <TextField label="Message"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter Message"
                        name="message"
                        type="text"
                      />
                    </div>
                    <br />
                    <button className="btn btn-dark btn-lg btn-block mt-3"
                     disabled={!formik.isValid} type="submit">Contact</button>
                  </div>
                  <div className="col-md-7 my-auto">
                    <img className="img-fluid w-100" style={{ marginTop: "15%" }} src={note} alt="" />
                  </div>
                </div>
              </div>
              <div className = "footer3">
              <Footer />
              </div>
            </Form>
          </div>
        </>
      )}
    </Formik>
  )
}
