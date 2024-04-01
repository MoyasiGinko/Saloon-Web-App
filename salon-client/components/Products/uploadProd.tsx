"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Uploadprod = () => {
  const [formData, setFormData] = useState({
    product: "",
    description: "",
    price: "",
    quantity: "",
    image: null as File | unknown,
    category: "",
  });
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/prod/show"); //TODO: use env variable
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      "the form data from handlesubmit is",
      formData.category,
      "type**",
      typeof formData.category
    );
    try {
      console.log("the form data from handlesubmit is************", formData);
      const response = await axios.post(
        "http://localhost:3000/api/prod/upload", //TODO: use env variable
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Product uploaded successfully");
    } catch (error) {
      console.error("Error While uploading", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    setFormData({ ...formData, image: selectedImage });
  };

  return (
    <>
      <div className="text-center mt-[9rem]">
        <h1>Lets upload some product</h1>
      </div>

      <form className=" ">
        <div className="flex flex-col gap-2 w-[250px] mx-auto">
          <input
            className="text-red-900"
            type="text"
            name="product"
            placeholder="Product"
            value={formData.product}
            onChange={handleChange}
          />
          <input
            className="text-red-900"
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            className="text-red-900"
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />
          <input
            className="text-red-900"
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
          <input
            className="text-red-900"
            type="file"
            name="image"
            placeholder="image"
            accept="image/*"
            onChange={handleImgChange}
          />

          {/* Select input for category */}
          <select
            className="text-red-900"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-red-900 text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
