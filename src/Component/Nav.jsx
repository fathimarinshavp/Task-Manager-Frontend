import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const location = useLocation();

  return (
    <nav className="navbar">

   
   
      <div className="nav-logo">
        <span className="nav-logo-icon">✔</span>
        <div>
          <div className="nav-logo-name">TaskFlow</div>
          <div className="nav-logo-sub">Task Manager</div>
        </div>
      </div>

    
      <div className="nav-links">
        <Link
          to="/"
          className={location.pathname === "/" ? "nav-link active" : "nav-link"}
        >
          Register
        </Link>

        <Link
          to="/login"
          className={location.pathname === "/login" ? "nav-link active" : "nav-link"}
        >
          Login
        </Link>
      </div>

    </nav>
  );
}

export default Nav;