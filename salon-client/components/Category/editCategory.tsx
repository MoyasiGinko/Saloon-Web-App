//editCategory.tsx
"use client";
import React, { useState } from "react";
import axios from "axios";
import { Category } from "./interface";
import { toast } from "react-toastify";
import styles from "../../styles/editCategory.module.css";

interface EditCategoryProps {
  category: Category;
  onSave: (category: Category) => void;
  onCancel: () => void;
}

export const EditCategory = ({
  category,
  onSave,
  onCancel,
}: EditCategoryProps) => {
  const [editedCategory, setEditedCategory] = useState({
    _id: category._id,
    name: category.name,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/prod/update/${editedCategory._id}`, //TODO: use env variable
        editedCategory
      );
      onSave(response.data.category);
      toast.success("Category updated successfully");
    } catch (error) {
      console.error("Error adding category", error);
      toast.error("Error adding category");
    }
  };

  return (
    <form className={styles.editCategoryForm} onSubmit={handleSubmit}>
      {/* <h1>Edit Category</h1> */}
      <label>
        <input
          className={styles.editCategoryInput}
          type="text"
          value={editedCategory.name}
          onChange={(e) =>
            setEditedCategory({ ...editedCategory, name: e.target.value })
          }
        />
      </label>
      <div className={styles.editCategoryButtons}>
        <button className={styles.saveButton} type="submit">
          Save
        </button>
        <button
          className={styles.cancelButton}
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
export default EditCategory;
