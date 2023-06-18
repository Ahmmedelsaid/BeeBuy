import React from "react";
import { NavLink } from "react-bootstrap";
import "../../CSS/main.css";

function Footer() {
  return (
    <div>
      <footer id="footer" class="footer">
        <div className="copyright">
          &copy; Copyright{" "}
          <strong>
            <span>Bee Buy</span>
          </strong>
          . All Rights Reserved
        </div>
        <div class="credits">
          Designed by <NavLink to="#">Bee Buy</NavLink>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
