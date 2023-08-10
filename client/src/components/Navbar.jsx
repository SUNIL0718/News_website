import { Link } from "react-router-dom";
import PNH from "../assets/PNH.png";
import "./navbar.css";
import useContext from "../pages/ContextProvider/Context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../pages/ContextProvider/Context";
// import Avatar from "@mui/material/Avatar";

const Navbar = () => {
  const { logindata, setLogindata } = useContext(LoginContext);
  // console.log(logindata);

  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    // console.log(token);

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();
    // console.log(data);
    if (data.status === 401 || !data) {
      // console.log("Error Page Redirect");
      history("*");
    } else {
      console.log("User Veerified");
      // setLogindata(data);
      history("/");
    }
  };
  useEffect(() => {
    DashboardValid();
  }, []);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg sticky-top bg-secondary"
        // style={{ background: "#bbc3ce" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">
            <img src={PNH} alt="/" style={{ width: "70px", height: "50px" }} />
          </Link>
          <button
            className="navbar-toggler text-bg-secondary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active text-white"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active text-white"
                  aria-current="page"
                  to="/general"
                >
                  Recomended
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active text-white"
                  aria-current="page"
                  to="/business"
                >
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active text-white"
                  aria-current="page"
                  to="/entertainment"
                >
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active text-white"
                  aria-current="page"
                  to="/health"
                >
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active text-white"
                  aria-current="page"
                  to="science"
                >
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active text-white"
                  aria-current="page"
                  to="/sports"
                >
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active text-white"
                  aria-current="page"
                  to="technology"
                >
                  Technology
                </Link>
              </li>
              <Link to="/register">
                <button className="btn  button m-1">Sign up</button>
              </Link>
              <Link to="/login">
                <button className="btn button  m-1">LogIn</button>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
