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
  
  useEffect(()=>{
    if(userData){
      setCurrentUser(userData)
    }
  },[userData])
  
  const handleLogout = ()=>{
    logout()
    navigate('/login')
  }
  return (
    <div className="Profile">
      <img src="https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg" alt="profile-icon" />
      <div className="personal-info">
        <p><span>Email: </span> {currentUser?.username} </p>
        <p><span>Products: </span>{currentUser?.productsForSale?.length} </p>
        <p><span>Balance: ${currentUser?.balance} </span></p>
        
        
      </div>
      <div>
        <h2>Your Recent Products</h2>
        {currentUser?.productsForSale?.length > -1 ? (
          currentUser.productsForSale.slice(-3).reverse().map((product, index) => (
            <div key={index} className="product-item">
              <h3>Title: {product.title}</h3>
              <p>Description: {product.description}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )

}
export default Profile