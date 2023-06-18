import React from "react";
import { NavLink } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";
import "../../CSS/main.css";
import prod1 from "../../img/product-1.jpg";
import prod2 from "../../img/product-2.jpg";
import prod3 from "../../img/product-3.jpg";

function Main() {
  return (
    <div>
      <Header></Header>
      <main id="main" className="main">
        <div classNameName="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink to="index.html">Home</NavLink>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card sales-card">
                    <div className="filter">
                      <NavLink
                        className="icon"
                        to="#"
                        data-bs-toggle="dropdown"
                      >
                        <i className="bi bi-three-dots"></i>
                      </NavLink>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li>
                          <NavLink className="dropdown-item" to="#">
                            Today
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="dropdown-item" to="#">
                            This Month
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="dropdown-item" to="#">
                            This Year
                          </NavLink>
                        </li>
                      </ul>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">
                        Sales <span>| Today</span>
                      </h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>145</h6>
                          <span className="text-success small pt-1 fw-bold">
                            12%
                          </span>{" "}
                          <span className="text-muted small pt-2 ps-1">
                            increase
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card revenue-card">
                    <div className="filter">
                      <NavLink
                        className="icon"
                        to="#"
                        data-bs-toggle="dropdown"
                      >
                        <i className="bi bi-three-dots"></i>
                      </NavLink>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li>
                          <NavLink className="dropdown-item" to="#">
                            Today
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="dropdown-item" to="#">
                            This Month
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="dropdown-item" to="#">
                            This Year
                          </NavLink>
                        </li>
                      </ul>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">
                        Revenue <span>| This Month</span>
                      </h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-currency-dollar"></i>
                        </div>
                        <div className="ps-3">
                          <h6>$3,264</h6>
                          <span className="text-success small pt-1 fw-bold">
                            8%
                          </span>{" "}
                          <span className="text-muted small pt-2 ps-1">
                            increase
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 col-xl-12">
                  <div className="card info-card customers-card">
                    <div className="filter">
                      <NavLink
                        className="icon"
                        to="#"
                        data-bs-toggle="dropdown"
                      >
                        <i className="bi bi-three-dots"></i>
                      </NavLink>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li>
                          <NavLink className="dropdown-item" to="#">
                            Today
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="dropdown-item" to="#">
                            This Month
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="dropdown-item" to="#">
                            This Year
                          </NavLink>
                        </li>
                      </ul>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">
                        Customers <span>| This Year</span>
                      </h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-people"></i>
                        </div>
                        <div className="ps-3">
                          <h6>1244</h6>
                          <span className="text-danger small pt-1 fw-bold">
                            12%
                          </span>{" "}
                          <span className="text-muted small pt-2 ps-1">
                            decrease
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="card">
                    <div className="filter">
                      <NavLink
                        className="icon"
                        to="#"
                        data-bs-toggle="dropdown"
                      >
                        <i className="bi bi-three-dots"></i>
                      </NavLink>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li>
                          <NavLink className="dropdown-item" to="#">
                            Today
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="dropdown-item" to="#">
                            This Month
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="dropdown-item" to="#">
                            This Year
                          </NavLink>
                        </li>
                      </ul>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">
                        Reports <span>/Today</span>
                      </h5>

                      <div id="reportsChart"></div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="card recent-sales overflow-auto">
                    <div className="filter">
                      <NavLink
                        className="icon"
                        to="#"
                        data-bs-toggle="dropdown"
                      >
                        <i className="bi bi-three-dots"></i>
                      </NavLink>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li>
                          <NavLink className="dropdown-item" to="#">
                            Today
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="dropdown-item" to="#">
                            This Month
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="dropdown-item" to="#">
                            This Year
                          </NavLink>
                        </li>
                      </ul>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">
                        Recent Sales <span>| Today</span>
                      </h5>

                      <table className="table table-borderless datatable">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">
                              <NavLink to="#">#2457</NavLink>
                            </th>
                            <td>Mahmoud Zaki</td>
                            <td>
                              <NavLink to="#" className="text-primary">
                                Apple Watch
                              </NavLink>
                            </td>
                            <td>2000</td>
                            <td>
                              <span className="badge bg-success">Approved</span>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <NavLink to="#">#2147</NavLink>
                            </th>
                            <td>Rawan Weal</td>
                            <td>
                              <NavLink to="#" className="text-primary">
                                body splash
                              </NavLink>
                            </td>
                            <td>200</td>
                            <td>
                              <span className="badge bg-warning">Pending</span>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <NavLink to="#">#2049</NavLink>
                            </th>
                            <td>Hassan Mostafa</td>
                            <td>
                              <NavLink to="#" className="text-primary">
                                Sports shoes
                              </NavLink>
                            </td>
                            <td>600</td>
                            <td>
                              <span className="badge bg-success">Approved</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="card top-selling overflow-auto">
                    <div className="filter">
                      <NavLink
                        className="icon"
                        to="#"
                        data-bs-toggle="dropdown"
                      >
                        <i className="bi bi-three-dots"></i>
                      </NavLink>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li>
                          <NavLink className="dropdown-item" to="#">
                            Today
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="dropdown-item" to="#">
                            This Month
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="dropdown-item" to="#">
                            This Year
                          </NavLink>
                        </li>
                      </ul>
                    </div>

                    <div className="card-body pb-0">
                      <h5 className="card-title">
                        Top Selling <span>| Today</span>
                      </h5>

                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <th scope="col">Preview</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Sold</th>
                            <th scope="col">Revenue</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">
                              <NavLink to="#">
                                <img src={prod1} alt="" />
                              </NavLink>
                            </th>
                            <td>
                              <NavLink to="#" className="text-primary fw-bold">
                                Sports shoes{" "}
                                <span id="store_name_id">Adidas</span>
                              </NavLink>
                            </td>
                            <td>600 L.E</td>
                            <td className="fw-bold">124</td>
                            <td>74400 L.E</td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <NavLink to="#">
                                <img src={prod2} alt="" />
                              </NavLink>
                            </th>
                            <td>
                              <NavLink to="#" className="text-primary fw-bold">
                                Smart Watch pro{" "}
                                <span id="store_name_id">Apple Store</span>
                              </NavLink>
                            </td>
                            <td>2000 L.E</td>
                            <td className="fw-bold">5</td>
                            <td>10000 L.E</td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <NavLink to="#">
                                <img src={prod3} alt="" />
                              </NavLink>
                            </th>
                            <td>
                              <NavLink to="#" className="text-primary fw-bold">
                                Body Splash{" "}
                                <span id="store_name_id">Luryan</span>
                              </NavLink>
                            </td>
                            <td>150 L.E</td>
                            <td className="fw-bold">20</td>
                            <td>3000 L.E</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="filter">
                  <NavLink className="icon" to="#" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots"></i>
                  </NavLink>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>

                    <li>
                      <NavLink className="dropdown-item" to="#">
                        Today
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="#">
                        This Month
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="#">
                        This Year
                      </NavLink>
                    </li>
                  </ul>
                </div>

                <div className="card-body">
                  <h5 className="card-title">
                    Recent Activity <span>| Today</span>
                  </h5>

                  <div className="activity"></div>
                </div>
              </div>
              <div className="card">
                <div className="filter">
                  <NavLink className="icon" to="#" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots"></i>
                  </NavLink>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>

                    <li>
                      <NavLink className="dropdown-item" to="#">
                        Today
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="#">
                        This Month
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="#">
                        This Year
                      </NavLink>
                    </li>
                  </ul>
                </div>

                <div className="card-body pb-0">
                  <h5 className="card-title">
                    Budget Report <span>| This Month</span>
                  </h5>

                  <div
                    id="budgetChart"
                    style={{ minHeight: "400px" }}
                    className="echart"
                  ></div>
                </div>
              </div>
              <div className="card">
                <div className="filter">
                  <NavLink className="icon" to="#" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots"></i>
                  </NavLink>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>

                    <li>
                      <NavLink className="dropdown-item" to="#">
                        Today
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="#">
                        This Month
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="#">
                        This Year
                      </NavLink>
                    </li>
                  </ul>
                </div>

                <div className="card-body pb-0">
                  <h5 className="card-title">
                    Website Traffic <span>| Today</span>
                  </h5>

                  <div
                    id="trafficChart"
                    style={{ minHeight: "400px" }}
                    className="echart"
                  ></div>
                </div>
              </div>
              <div className="card">
                <div className="filter">
                  <NavLink className="icon" to="#" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots"></i>
                  </NavLink>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>

                    <li>
                      <NavLink className="dropdown-item" to="#">
                        Today
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="#">
                        This Month
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="#">
                        This Year
                      </NavLink>
                    </li>
                  </ul>
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

export default Main;
