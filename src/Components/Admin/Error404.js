import React from "react";
import layer from "../../img/Layer 1.png";
import "../../CSS/main.css";

function Error404() {
  return (
    <div>
      <main>
        <div class="container">
          <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <h1>404</h1>
            <h2>The page you are looking for doesn't exist.</h2>
            <a class="btn" href="index.html">
              Back to home
            </a>
            <img src={layer} class="img-fluid py-5" alt="Page Not Found" />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Error404;
