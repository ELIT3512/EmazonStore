import React, { useState } from 'react';
import { useProduct } from '../context/postProduct';
import {useNavigate} from 'react-router-dom'
import { useUser } from '../context/post';
const Share = () => {
    const navigate = useNavigate()
    const {updateUser} = useUser()
    const {createProduct} = useProduct()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [balance, setBalance] = useState(0);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    const handleCreateProduct = () => {
        const newProduct = {
            title: productName,
            description: productDescription,
            price: productPrice,
            image: productImage
        };
        createProduct(newProduct);
        navigate("/profile");
    };
    const handleUpdateProfile = () => {
        const updateData = {
          username: username,
          password: password,
          balance: balance,
          profileImage: profileImage, 
        };
        updateUser(updateData);
        navigate("/profile")
      };

    return (
        <div className="update-profile-container">
            <h2>Update Profile</h2>
            
            {/* Update Username */}
            <div className="form-group">
                <label htmlFor="username">Change Username: </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter new username"
                />
            </div>
            <br />
            {/* Update Password */}
            <div className="form-group">
                <label htmlFor="password">Change Password: </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                />
            </div>
            <br />
            {/* Upload Profile Image */}
            <div className="form-group">
                <label htmlFor="profileImage">Upload Profile Picture: </label>
                <input
                    type="file"
                    id="profileImage"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                />
            </div>
            <br />
            {/* Update Balance */}
            <div className="form-group">
                <label htmlFor="balance">Add to Balance: </label>
                <input
                    type="number"
                    id="balance"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    placeholder="Enter amount to add"
                />
                <br />
                <button type="button" onClick={handleUpdateProfile}>
                    Update Profile
                </button>
            </div>
            
            {/* Add Product to Sell */}
            <div className="form-group">
                <h3>Add a Product to Sell</h3>
                <label htmlFor="productName">Product Name: </label>
                <input
                    type="text"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Enter product name"
                />
                <br />
                <label htmlFor="productdescription">Product description: </label>
                <input
                    type="string"
                    id="productdescription"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    placeholder="Enter product description"
                />
                <br />
                <label htmlFor="productPrice">Product Price: </label>
                <input
                    type="number"
                    id="productPrice"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="Enter product price"
                />
<br />
                <label htmlFor="productImage">Product Image: </label>
                <input
                    type="file"
                    id="productImage"
                    onChange={(e) => setProductImage(e.target.files[0])}
                />
<br />
                <button type="button" onClick={handleCreateProduct}>
                    Add Product
                </button>
            </div>
        </div>
    );
}

export default Share;
