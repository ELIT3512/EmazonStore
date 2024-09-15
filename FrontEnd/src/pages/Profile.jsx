import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useUser} from "../context/post"
import { useAuth } from '../context/auth';

const Profile = () => {
const {userData, fetchUserData} = useUser();
  const {logout} = useAuth()
  const [currentUser,setCurrentUser] = useState(null)
  const navigate = useNavigate()
  useEffect(()=>{
    fetchUserData();
  },[]);
  useEffect(() => {
    if(userData){
      setCurrentUser(userData);
    }
  },[userData]);
  
  
  const handleLogout = ()=>{
    logout()
    navigate('/login')
  }
  return (
    <div className="Profile">
    <img src="https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg" alt="profile-icon" />
    <div className="personal-info">
      <p><span>Email: </span> {currentUser?.username} </p>
      <p><span>Products: </span>{currentUser?.products?.length} </p>
      <button onClick={handleLogout}>Logout</button>
    </div>
    <div>
      <h2>3 of your recent posts</h2>
      {/* Assuming you will handle displaying the last 3 products or posts */}
      {/* <Products products={currentUser?.products?.slice(-3).reverse()} /> */}
    </div>
    {/* Example update section */}
    {/* This is where you would create forms or options for users to update their profile */}
    {/* <button onClick={() => handleUpdateUser(updatedUserData)}>Update Profile</button> */}
  </div>
  )

}
export default Profile