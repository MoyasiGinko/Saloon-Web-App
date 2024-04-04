"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { EditProduct } from "./editProduct";
import { toast } from "react-toastify";
import { Product } from "./interface";
import { fetchCategories } from "./category";
import styles from "../../styles/showProduct.module.css";

export const ShowProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ [key: string]: string }>({});
  const [editingProd, setEditingProd] = useState<Product | null>(null);

  const fetchData = async () => {
    try {
      const productsResponse = await axios.get(
        "http://localhost:3000/api/prod/showprod" //TODO: use env variable
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

  const handleSave = (newProd: Product) => {
    fetchData();
    console.log("The new prod is", newProd);
    console.log("The editing prod is", editingProd);
    const isChanged =
      newProd._id === editingProd?._id &&
      newProd.name === editingProd?.name &&
      newProd.description === editingProd?.description &&
      newProd.price === editingProd?.price &&
      newProd.quantity === editingProd?.quantity &&
      newProd.image === editingProd?.image;
    setEditingProd(null);
    if (!isChanged) {
      toast.success("Product updated successfully");
    }
  };

  const handleCancel = () => {
    setEditingProd(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/prod/del/${id}`); //TODO: use env variable
      const updatedProducts = products.filter((product) => product._id !== id);
      setProducts(updatedProducts);
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className={styles.productsContainer}>
      {/* <h1 className={styles.heading}>Products</h1> */}
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product._id} className={styles.productCard}>
            {editingProd && editingProd._id === product._id ? (
              <EditProduct
                key={product._id}
                product={editingProd}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <>
                <Image
                  src={`http://localhost:3000/${product.image}`}
                  alt="Description of Image"
                  height={300}
                  width={300}
                  className={styles.productImage}
                />
                <h2 className={styles.productName}>{product.name}</h2>
                <p className={styles.productDescription}>
                  Description: {product.description}
                </p>
                <p className={styles.productInfo}>Price: {product.price}</p>
                <p className={styles.productInfo}>
                  Quantity: {product.quantity}
                </p>
                <p className={styles.productInfo}>
                  Category:{" "}
                  {product.category
                    ? categories[product.category]
                    : "Uncategorized"}
                </p>
                <div className={styles.buttonGroup}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
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
