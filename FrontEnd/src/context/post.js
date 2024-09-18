import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
// Create a new context for user posts
const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  // Function to fetch user data
  const fetchUserData = async () => {
    const token = Cookies.get('token');
    console.log("fetchToken",token);
    if (!token) return console.log("noToken");
    try {
      const res = await axios.get('http://localhost:5000/api/user/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("userdataGet",res.data);
      setUserData(res.data);  // Store the user data in state
    } catch (err) {
      console.error('Error fetching user data', err);
    }
  };
  const updateUser = async (updateData) => {
    const token = Cookies.get('token');
    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    try {
      // Assume userId is available from userData or decoded token
      const userId = userData?._id; // Ensure userData is fetched before using this
      if (!userId) {
        console.error("User ID not found.");
        return;
      }

      // Create formData to handle the file upload if necessary
      const formData = new FormData();
      if (updateData.username) formData.append('username', updateData.username);
      if (updateData.password) formData.append('password', updateData.password);
      if (updateData.balance) formData.append('balance', updateData.balance);
      if (updateData.profileImage) formData.append('profileImage', updateData.profileImage);

      // Send PUT request to update user data
      const res = await axios.put(`http://localhost:5000/api/user/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('User updated successfully:', res.data);
      setUserData(res.data); // Update the userData state with the new data

    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  return (
    <UserContext.Provider value={{ userData, fetchUserData, setUserData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
// Custom hook to use the PostContext
export const useUser = () => useContext(UserContext);
