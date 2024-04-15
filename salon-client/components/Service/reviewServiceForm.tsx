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
  closeModal,
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
        ...formData,
        rating: 0,
        comment: "",
      });
      await updateReviews();
      closeModal();
    } catch (error) {
      console.error("Error uploading review", error);
      toast.error("Error uploading review");
    }
  };

  return (
    <form className={styles.reviewServiceForm} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Write Your Review</h2>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Rating:</label>
        <input
          type="number"
          name="rating"
          min="0"
          max="5"
          className={styles.formInput}
          value={formData.rating}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Comment:</label>
        <textarea
          name="comment"
          placeholder="Write your review here..."
          className={styles.formTextarea}
          value={formData.comment}
          onChange={handleChange}
        />
      </div>
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitButton}>
          Submit Review
        </button>
        <button
          type="button"
          onClick={closeModal}
          className={styles.cancelButton}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
