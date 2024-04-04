// editService.tsx
import React, { useState } from "react";
import { Service } from "./interface";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../styles/editService.module.css";

interface EditServiceFormProps {
  service: Service;
  onSave: (service: Service) => void;
  onCancel: () => void;
}

export const EditServiceForm = ({
  service,
  onSave,
  onCancel,
}: EditServiceFormProps) => {
  const [formData, setFormData] = useState({
    name: service.name,
    description: service.description,
    duration: service.duration,
    price: service.price,
    category: service.category,
    staff: service.staff,
    location: service.location,
    image: service.image,
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
      const response = await axios.put(
        `http://localhost:3000/api/services/update/${service._id}`,
        formData
      );
      console.log("Response data:", response.data); // Log the response data
      onSave(response.data.service);
      console.log("Service updated successfully");
      toast.success("Service updated successfully");
    } catch (error) {
      console.error("Error updating service", error);
      toast.error("Error updating service");
    }
  };

  return (
    <form className={styles.editServiceForm} onSubmit={handleSubmit}>
      <input
        placeholder="Service Name"
        className={styles.editServiceInput}
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        placeholder="Description"
        className={styles.editServiceInput}
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        placeholder="Duration"
        className={styles.editServiceInput}
        type="text"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
      />
      <input
        placeholder="Price"
        className={styles.editServiceInput}
        type="text"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />
      <input
        placeholder="Category"
        className={styles.editServiceInput}
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
      />
      <input
        placeholder="Staff"
        className={styles.editServiceInput}
        type="text"
        name="staff"
        value={formData.staff}
        onChange={handleChange}
      />
      <input
        placeholder="Location"
        className={styles.editServiceInput}
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
      />
      <input
        placeholder="Image"
        className={styles.editServiceInput}
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
      />
      <button type="submit" className={styles.editServiceButton}>
        Update Service
      </button>
      <button
        type="button"
        onClick={onCancel}
        className={styles.editServiceButton}
      >
        Cancel
      </button>
    </form>
  );
};
