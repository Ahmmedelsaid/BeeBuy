import React from "react";
import { NavLink } from "react-bootstrap";
// import "../../CSS/main.css";
import logo from "../../img/icon2.png";
import mess1 from "../../img/messages-1.jpg";
import mess2 from "../../img/messages-2.jpg";
import mess3 from "../../img/messages-3.jpg";
import user from "../../img/free-user-profile-icon-4255-thumb.png";
import { FaSearch } from "react-icons/fa";

function Header() {
  return (
    <div>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <i className="bi bi-list toggle-sidebar-btn mx-2"></i>
          <NavLink
            to="/3/BEE BUY Admin/home.html"
            className="logo d-flex align-items-center"
          >
            <img src={logo} alt="" />
            <span className="d-none d-lg-block">BEE BUY</span>
          </NavLink>
        </div>

        <div className="search-bar">
          <form
            className="search-form d-flex align-items-center"
            method="POST"
            action="#"
          >
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            ></input>
            <button type="submit" title="Search">
              <FaSearch></FaSearch>
            </button>
          </form>
        </div>
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <NavLink className="nav-link nav-icon search-bar-toggle " to="#">
                <i className="bi bi-search"></i>
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link nav-icon"
                to="#"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-bell"></i>
                <span className="badge bg-primary badge-number">4</span>
              </NavLink>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                  You have 4 new notifications
                  <NavLink to="#">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>

                <li className="notification-item">
                  <i className="bi bi-exclamation-circle text-warning"></i>
                  <div>
                    <h4>Lorem Ipsum</h4>
                    <p>lorem lorem lorem</p>
                    <p>30 min. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider"></hr>
                </li>

                <li className="notification-item">
                  <i className="bi bi-x-circle text-danger"></i>
                  <div>
                    <h4>Lorem Ipsum</h4>
                    <p>lorem lorem lorem</p>
                    <p>1 hr. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider"></hr>
                </li>

                <li className="notification-item">
                  <i className="bi bi-check-circle text-success"></i>
                  <div>
                    <h4>Lorem Ipsum</h4>
                    <p>lorem lorem lorem</p>
                    <p>2 hrs. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider"></hr>
                </li>

                <li className="notification-item">
                  <i className="bi bi-info-circle text-primary"></i>
                  <div>
                    <h4>Lorem Ipsum</h4>
                    <p>lorem lorem lorem</p>
                    <p>4 hrs. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider"></hr>
                </li>
                <li className="dropdown-footer">
                  <NavLink to="#">Show all notifications</NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <NavLink
                className="nav-link nav-icon"
                to="#"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-chat-left-text"></i>
                <span className="badge bg-success badge-number">3</span>
              </NavLink>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                  You have 3 new messages
                  <NavLink to="#">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>

                <li className="message-item">
                  <NavLink to="#">
                    <img src={mess1} alt="" className="rounded-circle"></img>
                    <div>
                      <h4>Maria Hudson</h4>
                      <p>lorem lorem lorem</p>
                      <p>4 hrs. ago</p>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>

                <li className="message-item">
                  <NavLink to="#">
                    <img src={mess2} alt="" className="rounded-circle"></img>
                    <div>
                      <h4>Anna Nelson</h4>
                      <p>lorem lorem lorem</p>
                      <p>6 hrs. ago</p>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>

                <li className="message-item">
                  <NavLink to="#">
                    <img src={mess3} alt="" className="rounded-circle"></img>
                    <div>
                      <h4>David Muldon</h4>
                      <p>lorem lorem lorem</p>
                      <p>8 hrs. ago</p>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>

                <li className="dropdown-footer">
                  <NavLink to="#">Show all messages</NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown pe-3">
              <NavLink
                className="nav-link nav-profile d-flex align-items-center pe-0"
                to="#"
                data-bs-toggle="dropdown"
              >
                <img src={user} alt="Profile" className="rounded-circle"></img>
                <span className="d-none d-md-block dropdown-toggle ps-2"></span>
              </NavLink>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>Bee Buy</h6>
                  <span>store owner</span>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>

                <li>
                  <NavLink
                    className="dropdown-item d-flex align-items-center"
                    to="/3/BEE BUY Admin/users-profile.html"
                  >
                    <i className="bi bi-person"></i>
                    <span>My Profile</span>
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>

                <li>
                  <NavLink
                    className="dropdown-item d-flex align-items-center"
                    to="/3/BEE BUY Admin/users-profile.html"
                  >
                    <i className="bi bi-gear"></i>
                    <span>Account Settings</span>
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>

                <li>
                  <form action="">
                    <button
                      name="logout"
                      className="dropdown-item d-flex align-items-center"
                      to="#"
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      <span>Sign Out</span>
                    </button>
                  </form>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
