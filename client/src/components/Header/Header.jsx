import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import EvangadiLogo from "../../assets/Images/evangadi-logo-header.png";
import { UserState } from "../../App";

function Header() {
  // const { user } = useContext(UserState);
  // const userId = user?.userid;
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Evandadi-Forum-token-JUN2024");
    setIsLoggedIn(token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Evandadi-Forum-token-JUN2024");
    setIsLoggedIn({});
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
            {isLoggedIn && <Link to="/">Home</Link>}
            <Link to="/">How It Works</Link>
            {isLoggedIn ? (
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
