import React, { useEffect } from 'react';
import { useProduct } from '../context/postProduct';
const Emazon = () => {
    const {ProductData, setProductData,fetchProductData} = useProduct();
    
    useEffect(()=>{
        fetchProductData();
    },[]);
    // useEffect(() => {
    //     if(ProductData){
    //       setProductData(ProductData);
    //     }
    //   },[ProductData]);
      console.log("productData",ProductData)
      
      const recentProducts = ProductData
        ? [...ProductData] // Create a copy of the ProductData array
              .sort((a, b) => new Date(b.PostTime) - new Date(a.PostTime)) // Sort by PostTime descending
              .slice(0, 10) // Get the top 10 products
              
        : [];
        console.log("recentP",recentProducts)
        return (
            <div className="App">
                {/* Left Ad Column */}
                <div className="ad-column left-ad">
                    <p>Your Ad Here</p>
                </div>
                
                {/* Center Product Listings */}
                <div className="products-column">
                    <h2>Latest Products for Sale</h2>
                    <div className="products-list">
                        {recentProducts.length > 0 ? (
                            recentProducts.map((product, index) => (
                                <div key={index} className="product-item">
                                    <h3>Title: {product.title}</h3>
                                    <p>Image: <img src={`http://localhost:5000${product.image}`} alt={product.title} /></p>
                                    <p>Description: {product.description}</p>
                                    <p>Price: ${product.price}</p>
                                    <p>Posted on: {new Date(product.PostTime).toLocaleString()}</p>
                                    <p>Owner: {product.owner.username}</p>
                                </div>
                                                            ))
                        ) : (
                            <p>No products available.</p>
                        )}
                    </div>
                    <br />
                </div>
    
                {/* Right Ad Column */}
                <div className="ad-column right-ad">
                    <p>Your Ad Here</p>
                </div>
            </div>
        );
}

export default Emazon;
