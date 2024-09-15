import React from "react";
import Link from "./Link";
import {useAuth} from "../context/auth";
const Links = () => {
  const {isAuth} = useAuth();
 return(
  <>
  {!isAuth&&(
    <>
    <Link path="/" title="Emazon Shop" />
    <Link path="/register" title="Register"/>
    <Link path="/login" title="Login" />
    </>
  )}
  {isAuth&&(
    <>
    <Link path="/" title="Emazon Shop" />
    <Link path="/share" title="Post" />
    <Link path="/profile" title="Profile" />
    </>
  )}
     </>
 )
};
export default Links;
