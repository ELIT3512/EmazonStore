
import { useNavigate } from 'react-router-dom';
// import Products from '../components/Productss';
// import { useAuth } from '../context/auth';

const Profile = () => {

  // const {logout} = useAuth()
  const currentUser = JSON.parse(sessionStorage.getItem('user'))
  const navigate = useNavigate()
  const handleLogout = ()=>{
    // logout();
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
      {/* <Products products={currentUser?.products?.slice(-3).reverse()}/> */}
    </div>
    </div>
  )

}
export default Profile