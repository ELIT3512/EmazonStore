import { Routes, Route, Navigate } from "react-router-dom";
// import Aside from "./components/Aside";
// import Footer from "./components/Footer";
import Navigation from "./components/Navigation"
import Emazon from "./pages/Emazon";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Share from "./pages/Share";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/auth";
import './index.css';

const App = () => {

  return (
    <>
     <Navigation />
      <div className="App">
     
        
         <Routes>
          <Route path="/" element={<Emazon/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<NotFound/>}/>  
       
          <Route path="/profile" element={<Profile />}/>
          <Route path="/share" element={<Share/>}/>
            
        </Routes>
        
       
      </div>
      </>
  );
};
export default App;

