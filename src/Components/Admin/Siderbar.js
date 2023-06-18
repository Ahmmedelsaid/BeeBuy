import React from "react";
import { NavLink } from "react-bootstrap";
import Header from "./Header";
import "../../CSS/main.css";

function Siderbar() {
  return (
    <div>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <NavLink className="nav-link " to={<Header></Header>}>
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li className="nav-item" />

          <li className="nav-heading">Pages</li>

          <li className="nav-item">
            <NavLink
              className="nav-link collapsed"
              to="/3/BEE%20BUY%20Admin/users-profile.html"
            >
              <i className="bi bi-person"></i>
              <span>Profile</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link collapsed"
              to="/3/BEE%20BUY%20Admin/index.html"
            >
              <i className="bi bi-box-arrow-in-right"></i>
              <span>Login</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link collapsed"
              to="/3/BEE%20BUY%20Admin/superadminpanel/add/add.html"
            >
              <i className="bi bi-plus-circle"></i>
              <span>Add</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link collapsed"
              to="/3/BEE%20BUY%20Admin/superadminpanel/list/list.html"
            >
              <i className="bi bi-card-list"></i>
              <span>List</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link collapsed"
              to="/3/BEE%20BUY%20Admin/notauth.html"
            >
              <i className="bi bi-x-circle"></i>
              <span>Not Authorized</span>
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Siderbar;
