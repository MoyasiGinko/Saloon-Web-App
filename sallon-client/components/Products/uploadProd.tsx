"use client"

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Uploadprod = () => {
  const [formData, setFormData] = useState({
    product: "",
    description: "",
    price: "",
    quantity: "",
    image: null as File | unknown
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/prod/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success("product uploaded successfully")
    } catch (error) {
      console.error("Error While uplaoding", error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    setFormData({ ...formData, image: selectedImage });
  }
  return (
    <>
      <div className="text-center mt-[9rem]">
        <h1>Let&apos;s upload some product</h1>
      </div>

      <form className=" ">
        <div className="flex flex-col gap-2 w-[250px] mx-auto">
          <input className="text-red-900" type="text" name="product" placeholder="Product" value={formData.product} onChange={handleChange} />
          <input className="text-red-900" type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
          <input className="text-red-900" type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
          <input className="text-red-900" type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} />
          <input className="text-red-900" type="file" name="image" placeholder="image" accept="image/*" onChange={handleImgChange} />
          <button type="submit" onClick={handleSubmit} className="bg-red-900 text-white"> Submit </button>
        </div>
      </form>
    </>
  );
}

