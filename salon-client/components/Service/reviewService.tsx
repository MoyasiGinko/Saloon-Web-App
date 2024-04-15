import React, { useEffect, useState } from "react";
import { Service } from "./interface";
import axios from "axios";
import Modal from "./modal";
import { ReviewServiceForm } from "./reviewServiceForm";
import styles from "../../styles/reviewService.module.css";

export const ReviewService = ({ id }: { id: string }) => {
  const [service, setService] = useState<Service | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const serviceData = await fetchServiceById(id);
      setService(serviceData);
    };
    fetchData();
  }, [id]);

  const handleReview = () => {
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const updateReviews = async () => {
    const updatedService = await fetchServiceById(id);
    setService(updatedService);
  };

  // Fetch service by ID function
  const fetchServiceById = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/services/show/${id}`
      );
      return response.data.service;
    } catch (error) {
      console.error("Error fetching service", error);
      // Handle error appropriately
    }
  };

  return (
    <div className={styles.reviewService}>
      {service && (
        <div className={styles.serviceContainer} key={service._id}>
          <div className={styles.serviceDetails}>
            <img src={service.image} alt={service.name} />
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <p>Duration: {service.duration}</p>
            <p>Price: {service.price}</p>
            <p>Category: {service.category}</p>
            <p>Staff: {service.staff}</p>
            <p>Location: {service.location}</p>
            <button onClick={handleReview}>Review Service</button>
          </div>
          <div className={styles.reviews}>
            <h3>Reviews</h3>
            <div className={styles.reviewList}>
              {service.reviews.map((review) => (
                <div className={styles.reviewItem} key={review._id}>
                  <p>{review.comment}</p>
                  <p>Rating: {review.rating}</p>
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
