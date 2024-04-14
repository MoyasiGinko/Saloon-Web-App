// editService.tsx
import React, { useState } from "react";
import axios from "axios";
import { Service } from "./interface";
import { toast } from "react-toastify";
import styles from "../../styles/editService.module.css"; // Import the CSS file

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
    _id: service._id,
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
        `http://localhost:3000/api/services/update/${formData._id}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Response data:", response.data);
      onSave(response.data);
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
      <button type="submit" className={styles.updateButton}>
        Update Service
      </button>
      <button type="button" onClick={onCancel} className={styles.cancelButton}>
        Cancel
      </button>
    </form>
  );
};
