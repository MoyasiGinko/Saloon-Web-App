import React, { useState } from "react";
import { Service } from "./interface"; // Import the Services interface
import axios from "axios";
import styles from "../../styles/uploadService.module.css"; // Import CSS file for styling
import { toast } from "react-toastify";

interface UploadServiceFormProps {
  onSave: (service: Service) => void;
}

const UploadServiceForm = ({ onSave }: UploadServiceFormProps) => {
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
      const response = await axios.post(
        "http://localhost:3000/api/services/upload",
        formData
      );
      console.log("Service uploaded successfully");
      // Optionally, you can redirect the user or perform other actions upon successful upload
      onSave(response.data.service); // Call the onSave function passed as a prop to update the list of services
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
        <input
          placeholder="Enter Service Name"
          className={styles.formInput}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.formLabel}>
        <input
          placeholder="Enter Service Description"
          className={styles.formInput}
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.formLabel}>
        <input
          placeholder="Enter Service Duration"
          className={styles.formInput}
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.formLabel}>
        <input
          placeholder="Enter Service Price"
          className={styles.formInput}
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.formLabel}>
        <input
          placeholder="Enter Service Category"
          className={styles.formInput}
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.formLabel}>
        <input
          placeholder="Enter Staff Member"
          className={styles.formInput}
          type="text"
          name="staff"
          value={formData.staff}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.formLabel}>
        <input
          placeholder="Enter Service Location"
          className={styles.formInput}
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.formLabel}>
        <input
          placeholder="Enter Image URL"
          className={styles.formInput}
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </label>
      <button className={styles.submitButton} type="submit">
        Upload Service
      </button>
    </form>
  );
};

export default UploadServiceForm;
