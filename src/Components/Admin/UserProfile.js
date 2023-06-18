import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Siderbar from "./Siderbar";
import { NavLink } from "react-bootstrap";
import user from "../../img/free-user-profile-icon-4255-thumb.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../CSS/main.css";

function UserProfile() {




  return (
    <div>
      <Header></Header>
      <Siderbar></Siderbar>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Profile</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink to="home.html">Home</NavLink>
              </li>
              <li className="breadcrumb-item">Users</li>
              <li className="breadcrumb-item active">Profile</li>
            </ol>
          </nav>
        </div>

        <section className="section profile">
          <div className="row">
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <img src={user} alt="Profile" className="rounded-circle" />
                  <h2>ahmed ali</h2>
                  <h3>Store Owner</h3>
                  <div className="social-links mt-2">
                    <NavLink to="#" className="twitter">
                      <FontAwesomeIcon icon="fa-brands fa-twitter" />
                    </NavLink>
                    <NavLink to="#" className="facebook">
                      <i className="bi bi-facebook"></i>
                    </NavLink>
                    <NavLink to="#" className="instagram">
                      <i className="bi bi-instagram"></i>
                    </NavLink>
                    <NavLink to="#" className="linkedin">
                      <i className="bi bi-linkedin"></i>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-8">
              <div className="card">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                      >
                        Overview
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit"
                      >
                        Edit Profile
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-settings"
                      >
                        Settings
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-change-password"
                      >
                        Change Password
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    <div
                      className="tab-pane fade show active profile-overview"
                      id="profile-overview"
                    >
                      <h5 className="card-title">About</h5>
                      <p className="small fst-italic">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ducimus alias, inventore commodi reiciendis vitae
                        repellendus perferendis vero eum repellat dolorum unde
                        rem? Tempora possimus maxime quae mollitia neque eos
                        quod?
                      </p>

                      <h5 className="card-title">Profile Details</h5>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label ">
                          Full Name
                        </div>
                        <div className="col-lg-9 col-md-8">ahmed ali</div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Company</div>
                        <div className="col-lg-9 col-md-8">
                          EL-SHOUROUK ACADMEY
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Job</div>
                        <div className="col-lg-9 col-md-8">Web Designer</div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Country</div>
                        <div className="col-lg-9 col-md-8">EGYPT</div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Address</div>
                        <div className="col-lg-9 col-md-8">EL-SHOUROK-CITY</div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Phone</div>
                        <div className="col-lg-9 col-md-8">010123456789</div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Email</div>
                        <div className="col-lg-9 col-md-8">
                          LOAYABED0@GMAIL.COM
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade profile-edit pt-3"
                      id="profile-edit"
                    >
                      <form>
                        <div className="row mb-3">
                          <label
                            for="profileImage"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Profile Image
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <img src="" alt="Profile" />
                            <div className="pt-2">
                              <NavLink
                                to="#"
                                className="btn btn-primary btn-sm"
                                title="Upload new profile image"
                              >
                                <i className="bi bi-upload"></i>
                              </NavLink>
                              <NavLink
                                to="#"
                                className="btn btn-danger btn-sm"
                                title="Remove my profile image"
                              >
                                <i className="bi bi-trash"></i>
                              </NavLink>
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="fullName"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Full Name
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="fullName"
                              type="text"
                              className="form-control"
                              id="fullName"
                              value="LOAI ABED"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="about"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            About
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <textarea
                              name="about"
                              className="form-control"
                              id="about"
                              style={{ height: "100px" }}
                            >
                              Sunt est soluta temporibus accusantium neque nam
                              maiores cumque temporibus. Tempora libero non est
                              unde veniam est qui dolor. Ut sunt iure rerum quae
                              quisquam autem eveniet perspiciatis odit. Fuga
                              sequi sed ea saepe at unde.
                            </textarea>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="company"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Company
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="company"
                              type="text"
                              className="form-control"
                              id="company"
                              value="EL-SHOUROK ACADMEY"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="Job"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Job
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="job"
                              type="text"
                              className="form-control"
                              id="Job"
                              value="Web Designer"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="Country"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Country
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="country"
                              type="text"
                              className="form-control"
                              id="Country"
                              value="EGYPT"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="Address"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Address
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="address"
                              type="text"
                              className="form-control"
                              id="Address"
                              value="EL-SHOUROK-CITY"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="Phone"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Phone
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="phone"
                              type="text"
                              className="form-control"
                              id="Phone"
                              value="010123456789"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="Email"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Email
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="email"
                              type="email"
                              className="form-control"
                              id="Email"
                              value="LOAYABED0@GMAIL.COM"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="Twitter"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Twitter Profile
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="twitter"
                              type="text"
                              className="form-control"
                              id="Twitter"
                              value="https://twitter.com/#"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="Facebook"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Facebook Profile
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="facebook"
                              type="text"
                              className="form-control"
                              id="Facebook"
                              value="https://facebook.com/#"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="Instagram"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Instagram Profile
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="instagram"
                              type="text"
                              className="form-control"
                              id="Instagram"
                              value="https://instagram.com/#"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="Linkedin"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Linkedin Profile
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="linkedin"
                              type="text"
                              className="form-control"
                              id="Linkedin"
                              value="https://linkedin.com/#"
                            />
                          </div>
                        </div>

                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="tab-pane fade pt-3" id="profile-settings">
                      <form>
                        <div className="row mb-3">
                          <label
                            for="fullName"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Email Notifications
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="changesMade"
                                checked
                              />
                              <label
                                className="form-check-label"
                                for="changesMade"
                              >
                                Changes made to your account
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="newProducts"
                                checked
                              />
                              <label
                                className="form-check-label"
                                for="newProducts"
                              >
                                Information on new products and services
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="proOffers"
                              />
                              <label
                                className="form-check-label"
                                for="proOffers"
                              >
                                Marketing and promo offers
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="securityNotify"
                                checked
                                disabled
                              />
                              <label
                                className="form-check-label"
                                for="securityNotify"
                              >
                                Security alerts
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>

                    <div
                      className="tab-pane fade pt-3"
                      id="profile-change-password"
                    >
                      <form>
                        <div className="row mb-3">
                          <label
                            for="currentPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Current Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="password"
                              type="password"
                              className="form-control"
                              id="currentPassword"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="newPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            New Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="newpassword"
                              type="password"
                              className="form-control"
                              id="newPassword"
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            for="renewPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Re-enter New Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="renewpassword"
                              type="password"
                              className="form-control"
                              id="renewPassword"
                            />
                          </div>
                        </div>

                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Change Password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default UserProfile;
