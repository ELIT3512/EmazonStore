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
  return (
    <UserContext.Provider value={{ userData, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};
// Custom hook to use the PostContext
export const useUser = () => useContext(UserContext);
