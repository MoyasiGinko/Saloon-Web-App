import React, { useEffect, useState } from "react";
import { Service, Reviews } from "./interface";
import axios from "axios";
import Modal from "./modal";
import { ReviewServiceForm } from "./reviewServiceForm";
import styles from "../../styles/reviewService.module.css";

interface ReviewServiceProps {
  id: string;
  onCancel: () => void; // onCancel function from props
}

export const ReviewService: React.FC<ReviewServiceProps> = ({
  id,
  onCancel,
}) => {
  const [service, setService] = useState<Service | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/services/show/${id}`
        );
        setService(response.data.service);
      } catch (error) {
        console.error("Error fetching service", error);
      }
    };
    fetchData();
  }, [id]);

  const handleReview = () => {
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    onCancel(); // Call onCancel function from props to notify the parent component
  };

  const updateReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/services/show/${id}`
      );
      setService(response.data.service);
    } catch (error) {
      console.error("Error fetching service", error);
    }
  };

  return (
    <div className={styles.reviewService}>
      {service && (
        <div className={styles.serviceContainer}>
          <div className={styles.serviceDetails}>
            <img
              src={service.image}
              alt={service.name}
              className={styles.serviceImage}
            />
            <div className={styles.serviceInfo}>
              <h2 className={styles.serviceName}>{service.name}</h2>
              <p className={styles.serviceDescription}>{service.description}</p>
              <div className={styles.serviceDetails}>
                <p>
                  <strong>Duration:</strong> {service.duration}
                </p>
                <p>
                  <strong>Price:</strong> {service.price}
                </p>
                <p>
                  <strong>Category:</strong> {service.category}
                </p>
                <p>
                  <strong>Staff:</strong> {service.staff}
                </p>
                <p>
                  <strong>Location:</strong> {service.location}
                </p>
              </div>
            </div>
            <div className={styles.buttonsContainer}>
              <button className={styles.submitButton} onClick={handleReview}>
                Review Service
              </button>
              <button className={styles.cancelButton} onClick={onCancel}>
                Cancel
              </button>
            </div>
          </div>
          <div className={styles.reviews}>
            <h3 className={styles.reviewsTitle}>Reviews</h3>
            <div className={styles.reviewList}>
              {service.reviews.map((review: Reviews) => (
                <div className={styles.reviewItem} key={review._id}>
                  <p className={styles.reviewComment}>{review.comment}</p>
                  <p className={styles.reviewRating}>Rating: {review.rating}</p>
                </div>
              ))}
            </div>
          </div>
          <Modal isOpen={isReviewModalOpen} closeModal={closeReviewModal}>
            <ReviewServiceForm
              service={service}
              updateReviews={updateReviews}
              closeModal={closeReviewModal}
            />
          </Modal>
        </div>
      )}
    </div>
  );
};
