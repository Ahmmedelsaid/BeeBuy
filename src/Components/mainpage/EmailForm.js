import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import "../style/contact.css";
import { Link } from "react-router-dom";
import NavBar from "../ComonentsSmall/NavBar";

function EmailForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [Name, setName] = useState("");

  return (
    <form className="fomCont">
      <NavBar></NavBar>
      <div className="divFomCot">
        <h4 id="contts">
          Contact <span>Us :</span>{" "}
        </h4>
        <div className="divCot">
          <label className="lblCont">Name:</label>
          <input
            type="text"
            required
            className="inpCont"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="divCot">
          <label className="lblCont">Email:</label>
          <input
            type="email"
            required
            className="inpCont"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="divCot">
          <label className="lblCont">Subject:</label>
          <input
            type="text"
            className="inpCont"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="divCot">
          <label className="lblCont">Message:</label>
          <textarea
            required
            rows="3"
            value={message}
            className="inpCont"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="sends">
          <button id="btnCot" type="submit">
            <FaPaperPlane></FaPaperPlane>
          </button>

          <div>
            <Link to="/Sign-In-Now">Sign In</Link>
            <Link to="/Sign-In-Now">Sign Up</Link>
          </div>
          <div>
            <span>we're here to help you :)</span>
          </div>
        </div>
      </div>
      <div className="background"></div>
    </form>
  );
}

export default EmailForm;
