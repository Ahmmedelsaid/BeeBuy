import React from "react";
import Header from "./Header";
import Siderbar from "./Siderbar";
import no from "../../img/noentry.PNG";
function NotAuth() {
  return (
    <div>
      <Header></Header>
      <Siderbar></Siderbar>
      <div>
        <img src={no} width="100%" alt=""></img>
      </div>
    </div>
  );
}

export default NotAuth;
