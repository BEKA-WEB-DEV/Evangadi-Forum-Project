import React from "react";
import classes from "./Footer.module.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import footerLogo from "../../assets/Images/evangadi-logo-footer.png";
const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.logoSection}>
        <h2 className={classes.logo}>
          <span className={classes.evangadiPrefix}>
            <Link to="/">
              <img src={footerLogo} alt=" evangagadi logo" />
            </Link>
          </span>
        </h2>
        <div className={classes.socialIcons}>
          <FaFacebookF className={classes.icon} />
          <FaInstagram className={classes.icon} />
          <FaYoutube className={classes.icon} />
        </div>
      </div>

      <div className={classes.linksSection}>
        <h3>Useful Links</h3>
        <ul>
          <li>How it works</li>
          <li>Terms of Service</li>
          <li>Privacy policy</li>
        </ul>
      </div>

      <div className={classes.contactSection}>
        <h3>Contact Info</h3>
        <p>Evangadi Networks</p>
        <p>support@evangadi.com</p>
        <p>+1-202-386-2702</p>
      </div>
    </footer>
  );
};

export default Footer;
