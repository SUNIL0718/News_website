import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./mix.css";

const Register = () => {
  const [showpass, setShowpass] = useState(false);
  const [cshowpass, setCshowpass] = useState(false);

  const [inpval, setInpval] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
  });
  console.log(inpval);

  const handleForm = (e) => {
    // console.log(e.target.value);
    setInpval({
      ...inpval,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fname, email, password, cpassword } = inpval;

    if (fname === "") {
      alert("Please enter your name");
    } else if (email === "") {
      alert("Please enter your email");
    } else if (!email.includes("@")) {
      alert("Please enter valid email address");
    } else if (password === "") {
      alert("Please enter password");
    } else if (password.length < 6) {
      alert("Password must have 6 char");
    } else if (cpassword === "") {
      alert("Please confirm password");
    } else if (cpassword.length < 6) {
      alert("Confirm Password must have 6 char");
    } else if (password !== cpassword) {
      alert("Password and Confirm password doesn't match");
    } else {
      // console.log("User registration succesfully done");

      const data = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          email,
          password,
          cpassword,
        }),
      });

      const res = await data.json();
      // console.log(res.status);

      if (res.status === 201) {
        alert("User registration done");
        setInpval({
          ...inpval,
          fname: "",
          email: "",
          password: "",
          cpassword: "",
        });
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>
              We are glad that you will be using cluod to manage <br /> your
              tasks! we hope that you will like it
            </p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                name="fname"
                id="fname"
                onChange={handleForm}
                placeholder="Enter Your Name"
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleForm}
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!showpass ? "password" : "text"}
                  name="password"
                  id="password"
                  onChange={handleForm}
                  placeholder="Enter Your password"
                />
                <div
                  className="showpass"
                  onClick={() => setShowpass(!showpass)}
                >
                  {!showpass ? "show" : "hide"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="password">Confirm Password</label>
              <div className="two">
                <input
                  type={!cshowpass ? "password" : "text"}
                  name="cpassword"
                  id="cpassword"
                  onChange={handleForm}
                  placeholder="Confirm password"
                />
                <div
                  className="showpass"
                  onClick={() => setCshowpass(!cshowpass)}
                >
                  {!cshowpass ? "show" : "hide"}
                </div>
              </div>
            </div>
            <button className="btn" type="submit" onClick={handleSubmit}>
              Sign Up
            </button>
            <p>
              Already have an Account? <NavLink to={"/login"}>Log In</NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
