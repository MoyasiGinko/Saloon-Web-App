"use client"

import React, {useState} from "react";

export const Uploadprod = () => {
  const [formData, setFormData] = useState({
    product: "",
    description: "",
    price: "",
    quantity: "",
    image: null as File | unknown
  })

  const handleSubmit = () => {
    console.log('submit button clicked');
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const {name, value} = e.target;
    setFormData({...formData, [name]: value });
  }
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    console.log('The selected image is', selectedImage);
    setFormData({ ...formData, image: selectedImage });
  }
  return (
    <>
      <div>
        <h1>Let&apos;s upload some product</h1>
      </div>

      <form className="text-red-700">
        <input type="text" name="product" placeholder="Product" value={formData.product} onChange={handleChange}/>
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange}/>
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
        <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange}/>
        <input type="file" name="image" placeholder="image" accept="image/*" onChange={handleImgChange} />
        <button type="submit" onClick={handleSubmit}> Submit </button>
      </form>
    </>
  );
}

