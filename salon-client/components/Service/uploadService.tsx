import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/uploadService.module.css"; // Import CSS file for styling
import { toast } from "react-toastify";

const UploadServiceForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
    category: "",
    staff: "",
    location: "",
    image: "",
    reviews: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/services/upload", formData);
      console.log("Service uploaded successfully");
      // Optionally, you can redirect the user or perform other actions upon successful upload
      toast.success("Service uploaded successfully");
      setFormData({
        name: "",
        description: "",
        duration: "",
        price: "",
        category: "",
        staff: "",
        location: "",
        image: "",
        reviews: [],
      });
    } catch (error) {
      console.error("Error uploading service", error);
      // Handle error appropriately
      toast.error("Error uploading service");
    }
  };

  return (
    <form className={styles.uploadForm} onSubmit={handleSubmit}>
      <label className={styles.formLabel}>
        Name:
        <input
          className={styles.formInput}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.formLabel}>
        Description:
        <input
          className={styles.formInput}
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.formLabel}>
        Duration (in minutes):
        <input
          className={styles.formInput}
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.formLabel}>
        Price:
        <input
          className={styles.formInput}
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.formLabel}>
        Category:
        <input
          className={styles.formInput}
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.formLabel}>
        Staff Member ID:
        <input
          className={styles.formInput}
          type="text"
          name="staff"
          value={formData.staff}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.formLabel}>
        Location:
        <input
          className={styles.formInput}
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.formLabel}>
        Image URL:
        <input
          className={styles.formInput}
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button className={styles.submitButton} type="submit">
        Upload Service
      </button>
    </form>
  );
};

export default UploadServiceForm;
