import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
// Create a new context for Product posts
const ProductContext = createContext();
export const ProductProvider = ({ children }) => {
  const [ProductData, setProductData] = useState(null);
  // Function to fetch Product data
  const fetchProductData = async () => {
   
    try {
      const res = await axios.get('http://localhost:5000/api/Products/', {});
      console.log("ProductdataGet",res.data);
      setProductData(res.data);  // Store the Product data in state
    } catch (err) {
      console.error('Error fetching Product data', err);
    }
  };
  const createProduct = async (product) => {
    console.log("created Product",product);
    
    try {
        const token = Cookies.get('token'); // Get the user's token from cookies
        if (!token) throw new Error("User is not authenticated");

        // Use FormData to send the product data including the image
        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('description', product.description);
        formData.append('price', product.price);
        if (product.image) {
            formData.append('image', product.image); // Append the image file to the form data
        }

        const response = await axios.post('http://localhost:5000/api/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`, // Add your token here if needed for authentication
            },
        });

        console.log('Product created successfully:', response.data);
        // Optionally, reset form fields or show a success message

    } catch (error) {
        console.error('Error creating product:', error);
    }
  };

  // Function to update an existing product
  const updateProduct = async (productId, updatedProduct) => {
    
    try {
      const res = await axios.put(`http://localhost:5000/api/Products/${productId}`, updatedProduct, {
       
      });
      console.log("ProductUpdated", res.data);
      // Optionally fetch the updated product list
      fetchProductData();
    } catch (err) {
      console.error('Error updating product', err);
    }
  };

  // Function to delete a product
  const deleteProduct = async (productId) => {
   
    try {
      const res = await axios.delete(`http://localhost:5000/api/Products/${productId}`, {
    
      });
      console.log("ProductDeleted", res.data);
      // Optionally fetch the updated product list
      fetchProductData();
    } catch (err) {
      console.error('Error deleting product', err);
    }
  };

  return (
    <ProductContext.Provider value={{ ProductData, fetchProductData, createProduct,deleteProduct,updateProduct,setProductData }}>
      {children}
    </ProductContext.Provider>
  );
};
// Custom hook to use the PostContext
export const useProduct = () => useContext(ProductContext);
