import React from "react";
import Link from "./Link";
// import {useAuth} from "../context/auth";

const Links = () => {
//   const {isAuthenticated} = useAuth();
 return(
  <>
  <Link path="/" title="Emazon Shop" />
  <Link path="/share" title="Post" />
  <Link path="/profile" title="Profile" />
  <Link path="/register" title="Register" />
  <Link path="/login" title="Login" />
  </>


 )
          


};

export default Links;
