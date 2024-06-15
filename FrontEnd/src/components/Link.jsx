import { NavLink } from "react-router-dom"
import React from "react"
const Link = ({title, path}) => {
  return (

    <li className='listItem'> 
        <NavLink to={path}>{title}</NavLink>
    </li>
  )
}

export default Link