import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const AuthContext = createContext();
const URL = "http://localhost:5000/api/user"
 export const AuthProvider = ({ children }) => {
  const [isAuth, setisAuth] = useState(false);
  const login = async(userData) => {
    try{
      const res = await axios.post(`${URL}/login`,userData);
      if (res.status===200){
       sessionStorage.setItem("token",res.data.token);
       Cookies.set('token', res.data.token);
       setisAuth(true);
             }
    }
    catch(err){
      console.log(err)
    }
    };
    useEffect(() => {
      const token = sessionStorage.getItem('token');
      const cookie = Cookies.get('token');
      if (cookie) {
        setisAuth(true);  // If token exists, set isAuth to true
        console.log("session",token)
        console.log("cookie",cookie)
      } else {
        setisAuth(false);  // If no token, set isAuth to false
      }
    }, []);
    useEffect(()=>{
      console.log("auth",isAuth);
    },[isAuth])
  const register = async(userData) => {
    const res = await axios.post(`${URL}/register`,userData);
     };
     const logout = async () => {
      try {
        const token = Cookies.get('token');
        console.log("LogoutToken",token)
        const res = await axios.post(`${URL}/logout`,{},{
          headers:{Authorization:`Bearer ${token}`}
        });
        if (res.status === 200) {
          Cookies.remove('token'); 
          sessionStorage.removeItem('token'); 
          setisAuth(false); 
        } else {
          console.log('Failed to log out');
        }
      } catch (err) {
        console.log('Error logging out', err);
      }
    };    
  return (
    <AuthContext.Provider value={{ isAuth,setisAuth, login, logout,logout,register}}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth=() => useContext(AuthContext)