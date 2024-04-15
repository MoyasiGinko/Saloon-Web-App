// reviewServiceForm.tsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Service } from "./interface";
import styles from "../../styles/reviewServiceForm.module.css";

interface ReviewServiceFormProps {
  service: Service;
  updateReviews: () => Promise<void>; // Function to update reviews after adding a new one
  closeModal: () => void; // Function to close the modal
}

export const ReviewServiceForm: React.FC<ReviewServiceFormProps> = ({
  service,
  updateReviews,
  closeModal, // Add closeModal to props
}) => {
  const [formData, setFormData] = useState({
    serviceId: service._id,
    rating: 0,
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        `http://localhost:3000/api/services/review/${formData.serviceId}`,
        formData
      );
      console.log("Review uploaded successfully");
      toast.success("Review uploaded successfully");
      setFormData({
        serviceId: service._id,
        rating: 0,
        comment: "",
      });
      await updateReviews(); // Fetch updated reviews after successful review submission
      closeModal(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error uploading review", error);
      toast.error("Error uploading review");
    }
  };

  return (
    <form className={styles.reviewServiceForm} onSubmit={handleSubmit}>
      <input
        type="number"
        name="rating"
        placeholder="Rating"
        className={styles.reviewServiceInput}
        value={formData.rating}
        onChange={handleChange}
      />
      <textarea
        name="comment"
        placeholder="Comment"
        className={styles.reviewServiceInput}
        value={formData.comment}
        onChange={handleChange}
      />
      <button type="submit" className={styles.reviewServiceButton}>
        Submit Review
      </button>
    </form>
  );
};
