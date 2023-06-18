import React from "react";
import logo from "../../img/icon2.png";
import "../../CSS/main.css";
import { NavLink } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
function Login() {
  return (
    <div>
      <main>
        <div className="container mt-0">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center pb-4">
                    <NavLink
                      to="index.html"
                      className="logo d-flex align-items-center w-auto"
                      id="logo_regis"
                    >
                      <img src={logo} alt="" />
                      <span className="d-none d-lg-block">BEE BUY</span>
                    </NavLink>
                  </div>

                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Login to Your Account
                        </h5>
                        <p className="text-center small">
                          Enter your username & password to login
                        </p>
                      </div>

                      <form
                        method="post"
                        className="row g-3 needs-validation"
                        novalidate
                      >
                        <div className="col-12">
                          <label for="yourUsername" className="form-label">
                            Username
                          </label>
                          <div className="input-group has-validation">
                            <span
                              className="input-group-text"
                              id="inputGroupPrepend"
                            >
                              {" "}
                              <i className="bi bi-person-fill"></i>
                            </span>
                            <input
                              type="text"
                              name="username"
                              className="form-control"
                              id="yourUsername"
                              required
                            />
                            <div className="invalid-feedback">
                              Please enter your username.
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <label for="yourPassword" className="form-label">
                            Password
                          </label>
                          <div className="input-group has-validation">
                            <span
                              className="input-group-text"
                              id="inputGroupPrepend"
                            >
                              {" "}
                              <i className="bi bi-asterisk"></i>
                            </span>

                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              id="yourPassword"
                              required
                            />
                            <div className="invalid-feedback">
                              Please enter your password!
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="remember"
                              value="true"
                              id="rememberMe"
                            />
                            <label
                              className="form-check-label"
                              for="rememberMe"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <button
                            className="btn btn-warning w-100"
                            name="login"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
