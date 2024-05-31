import React from "react";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "#333",
      color: "#fff",
      padding: "20px",
    }} className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          {/* <img src={Logo} alt="" /> */}
        </div>
        <div className="footer-icons">
          {/* <BsTwitter style={{
            fontSize: "24px",
            margin: "0 10px",
          }} /> */}
          <SiLinkedin style={{
            fontSize: "24px", 
            margin: "0 10px",
          }} />
          {/* <BsYoutube style={{
            fontSize: "24px",
            margin: "0 10px",
          }} /> */}
          <FaFacebookF style={{
            fontSize: "24px",
            margin: "0 10px",
          }} />
        </div>
      </div>
      <div className="footer-section-two" style={{
        display: "flex",
        flexDirection: "row",
      }}>
        <div className="footer-section-columns" style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "20px",
        }}>
          <span style={{ marginBottom: "10px" }}>About us</span>
          <span style={{ marginBottom: "10px" }}>Contact us</span>
          <span style={{ marginBottom: "10px" }}>Institutions</span>
          <span style={{ marginBottom: "10px" }}>Testimonials</span>
        </div>
        {/* <div className="footer-section-columns" style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "20px",
        }}>
          <span style={{ marginBottom: "10px" }}>+2347037060212</span>
          <span style={{ marginBottom: "10px" }}>info@scovers.org</span>
        </div> */} 
        <div className="footer-section-columns" style={{
          display: "flex",
          flexDirection: "column",
        }}>
          <span style={{ marginBottom: "10px" }}>Terms & Conditions</span>
          <span style={{ marginBottom: "10px" }}>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
