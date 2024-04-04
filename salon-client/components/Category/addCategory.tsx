import React from "react";
import axios from "axios";
import { Category } from "./interface";
import { toast } from "react-toastify";
import styles from "../../styles/addCategory.module.css";

interface AddCategoryProps {
  onSave: (category: Category) => void;
}

export const AddCategory = ({ onSave }: AddCategoryProps) => {
  const [category, setCategory] = React.useState({
    _id: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/prod/create", //TODO: use env variable
        category
      );
      onSave(response.data.category);
      toast.success("Category added successfully");
      setCategory({ _id: "", name: "" }); // Clear the input after successful submission
    } catch (error) {
      console.error("Error adding category", error);
      toast.error("Error adding category");
    }
  };

  return (
    <form className={styles.addCategoryForm} onSubmit={handleSubmit}>
      {/* <h1>Add Category</h1> */}
      <input
        placeholder="Enter Category Name"
        className={styles.addCategoryInput}
        type="text"
        value={category.name}
        onChange={(e) => setCategory({ ...category, name: e.target.value })}
      />
      <div className={styles.addCategoryButtons}>
        <button className={styles.button} type="submit">
          Create
        </button>
      </div>
    </form>
  );
};
