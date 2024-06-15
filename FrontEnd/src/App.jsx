import { Routes, Route } from "react-router-dom";
// import Aside from "./components/Aside";
// import Footer from "./components/Footer";
import Navigation from "./components/Navigation"
import Emazon from "./pages/Emazon";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Share from "./pages/Share";
import NotFound from "./pages/NotFound";

const App = () => {

  return (
    <>
     <Navigation />
      <div className="Container">
     
        
         <Routes>
          <Route path="/" element={<Emazon/>}/>
          
              <Route path="profile" element={<Profile />}/>
              <Route path="share" element={<Share/>}/>
          
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
        
                  <Route path="*" element={<NotFound/>}/>    
        </Routes>
        
       
      </div>
      </>
  );
};
export default App;

