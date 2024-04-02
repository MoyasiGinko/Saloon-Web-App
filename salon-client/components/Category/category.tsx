"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { EditCategory } from "./editCategory";
import { AddCategory } from "./addCategory";
import { toast } from "react-toastify";
import { Category } from "./interface";
import styles from "../../styles/showCategory.module.css";

export const ShowCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const fetchData = async () => {
    try {
      const categoriesResponse = await axios.get(
        "http://localhost:3000/api/prod/show" //TODO: use env variable
      );
      setCategories(categoriesResponse.data.categories);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
  };

  const handleSave = (newCategory: Category) => {
    fetchData();
    console.log("The new category is", newCategory);
    console.log("The editing category is", editingCategory);
    const isChanged =
      newCategory._id === editingCategory?._id &&
      newCategory.name === editingCategory?.name;
    setEditingCategory(null);
    if (!isChanged) {
      toast.success("Category updated successfully");
    }
  };

  const handleCancel = () => {
    setEditingCategory(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/prod/delete/${id}`); //TODO: use env variable
      fetchData();
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <AddCategory onSave={fetchData} />
      </div>
      {/* <h1>Categories</h1> */}
      <div className={styles.cardsContainer}>
        {categories.map((category) => (
          <div key={category._id} className={styles.card}>
            {editingCategory?._id === category._id ? (
              <EditCategory
                category={category}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <>
                <p>{category.name}</p>
                <div className={styles.actions}>
                  <button onClick={() => handleEdit(category)}>Edit</button>
                  <button onClick={() => handleDelete(category._id)}>
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
