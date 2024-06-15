import React from 'react'
// import { useProduct} from '../context/products'
import { useNavigate } from 'react-router-dom'
const Share = () => {
  const navigate = useNavigate()
  // const {products, fetchProducts, addProduct,title,description,image,price,setDescription,setImage,setPrice,setTitle} = useProduct()
  const clickHandler = ()=>{
    // addProduct({title:title,description:description,price:price,image:image})
    navigate('/')//add to productForSale page
    // console.log("title",title) 
    // console.log("description",description)
    // console.log("image",image)
    // console.log("price",price)
    // console.log("setTitile",setTitle)
    // console.log("setDescription",setDescription)
    // console.log("setImage",setImage)
    // console.log("setPrice",setPrice)
  }

  return (
    <div className="Input">
    <div>
      <h1>Add Product</h1>
      {/* <textarea value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Title'></textarea>
      <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Description'></textarea>
      <input type='number' min={0.01} step={0.01} value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='price'/>
      <textarea value={image} onChange={(e)=>setImage(e.target.value)} placeholder='Image'></textarea> */}
    </div>
    <button onClick={clickHandler}>ADD</button>
    <div>
      <h2>Last 3 post on your wall</h2>
      {/* <Products products={Products.slice(-3).reverse()}/> */}
    </div>
 
    </div>
    )}
export default Share