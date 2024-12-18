import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import EvangadiLogo from "../../assets/Images/evangadi-logo-header.png";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <div className={classes.header}>
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          <div>
            <Link to="/">
              <img src={EvangadiLogo} alt="Evangadi Logo" />
            </Link>
          </div>

          <nav className={classes.navLinks}>
            <Link to="/">Home</Link>
            <Link to="/">How It Works</Link>
            {localStorage.getItem("token") ? (
              <button className={classes.logoutButton} onClick={handleLogout}>
                Log Out
              </button>
            ) : (
              <Link className={classes.login} to="/auth">
                Log In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
