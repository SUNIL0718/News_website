import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./mix.css";

const Login = () => {
  const [showpass, setShowpass] = useState(false);

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });
  // console.log(inpval);

  const history = useNavigate();

  const handleForm = (e) => {
    // console.log(e.target.value);
    setInpval({
      ...inpval,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = inpval;

    if (email === "") {
      alert("Please enter your email");
    } else if (!email.includes("@")) {
      alert("Please enter valid email address");
    } else if (password === "") {
      alert("Please enter password");
    } else if (password.length < 6) {
      alert("Password must have 6 char");
    } else {
      // console.log("User Login succesfully");
      const data = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const res = await data.json();
      console.log(res);

      if (res.status === 201) {
        localStorage.setItem("usersdatatoken", res.result.token);
        history("/");
        setInpval({
          ...inpval,
          email: "",
          password: "",
        });
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are glad you are back. Please login.</p>
          </div>

          <form>
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
            <button className="btn" onClick={handleSubmit}>
              Login
            </button>
            <p>
              Don't have an Account? <NavLink to={"/register"}>Sign Up</NavLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
