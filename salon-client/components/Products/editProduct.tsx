import React, { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "./interface";
interface EditProductProps {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

export const EditProduct = ({
  product,
  onSave,
  onCancel,
}: EditProductProps) => {
  const [editedProd, setEditedProd] = useState({
    _id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    imgPath: product.image,
    imgFile: null as File | unknown,
    category: product.category,
  });
  console.log("the edited Prod is ***", editedProd);
  const [error, setError] = useState("");
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
    try {
      const response = await axios.put(
        `http://localhost:3000/api/prod/edit/${editedProd._id}`, //TODO: use env variable
        editedProd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onSave(response.data.product);
    } catch (err) {
      console.error("Error updating product", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedProd({ ...editedProd, [name]: value });
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (!selectedImage) {
      setError("Please choose a file");
      return;
    }
    setEditedProd({ ...editedProd, imgFile: selectedImage });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="py-5 flex flex-col gap-2 w-[250px] items-start"
      >
        <span className="text-red-500">{error}</span>
        <input
          type="text"
          name="name"
          value={editedProd.name}
          placeholder="Product"
          onChange={handleChange}
        />
        <input
          name="description"
          value={editedProd.description}
          placeholder="Description"
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={editedProd.price}
          placeholder="Price"
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          value={editedProd.quantity}
          placeholder="Quantity"
          onChange={handleChange}
        />
        <input
          type="file"
          name="image"
          placeholder="Image"
          onChange={handleChangeImg}
        />
        {/* Select input for category */}
        <select
          className="text-red-900"
          name="category"
          value={editedProd.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <button className="bg-blue-300 py-1 px-3" type="submit">
            Save
          </button>
          <button
            className="bg-red-300 py-1 px-3"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};
