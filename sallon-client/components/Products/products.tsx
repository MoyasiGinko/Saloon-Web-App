"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { EditProduct } from "./editProduct";
import { toast } from "react-toastify";
import { Product } from "./interface";
import { fetchCategories } from "./category";

export const ShowProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ [key: string]: string }>({});
  const [editingProd, setEditingProd] = useState<Product | null>(null);

  const fetchData = async () => {
    try {
      const productsResponse = await axios.get(
        "http://localhost:3000/api/prod/showprod"
      );
      setProducts(productsResponse.data.products);

      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching products and categories", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (prod: Product) => {
    setEditingProd(prod);
  };

  const handleSave = async (newProd: Product) => {
    try {
      await axios.put(`http://localhost:3000/api/prod/${newProd._id}`, newProd);
      const updatedProducts = products.map((product) =>
        product._id === newProd._id ? newProd : product
      );
      setProducts(updatedProducts);
      setEditingProd(null);
      toast.success("Product updated successfully");
    } catch (error) {
      console.error("Error updating product", error);
      toast.error("Failed to update product");
    }
  };

  const handleCancel = () => {
    setEditingProd(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/prod/del/${id}`);
      const updatedProducts = products.filter((product) => product._id !== id);
      setProducts(updatedProducts);
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="bg-white text-red-900 pl-10 pb-10">
      <h1 className="text-center">Products</h1>
      <div>
        {products.map((product) => (
          <div key={product._id}>
            {editingProd && editingProd._id === product._id ? (
              <EditProduct
                key={product._id}
                product={editingProd}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <>
                <h2 className="text-3xl">{product.name}</h2>
                <p>Description: {product.description}</p>
                <p>Price: {product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Category: {categories[product.category]}</p>{" "}
                {/* Map category ID to name */}
                <Image
                  src={`http://localhost:3000/${product.image}`}
                  alt="Description of Image"
                  width={400}
                  height={200}
                />
                <div className="text-white flex gap-2">
                  <button
                    className="bg-blue-500 px-4 py-1"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-400 px-4 py-1"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
