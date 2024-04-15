// reviewService.tsx
import React, { useEffect, useState } from "react";
import { Service } from "./interface";
import axios from "axios";
import Modal from "./modal";
import { ReviewServiceForm } from "./reviewServiceForm";
import styles from "../../styles/reviewService.module.css";

interface ReviewServiceProps {
  service: Service;
}

export const ReviewService: React.FC<ReviewServiceProps> = ({ service }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [serviceReviews, setServiceReviews] = useState(service.reviews);
  const [review, setReview] = useState({
    comment: "",
    rating: 0,
  });

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/services/show"
      );
      setServices(response.data.services);
    } catch (error) {
      console.error("Error fetching services", error);
      // Handle error appropriately
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleReview = () => {
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  return (
    <div className={styles.reviewService}>
      <h2>{service.name}</h2>
      <img src={service.image} alt={service.name} />
      <p>{service.description}</p>
      <p>Duration: {service.duration}</p>
      <p>Price: {service.price}</p>
      <p>Category: {service.category}</p>
      <p>Staff: {service.staff}</p>
      <p>Location: {service.location}</p>
      <button onClick={handleReview}>Review Service</button>
      <div>
        <h3>Reviews</h3>
        {service.reviews.map((review) => (
          <div key={review._id}>
            <p>{review.comment}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))}
      </div>
      <Modal isOpen={isReviewModalOpen} closeModal={closeReviewModal}>
        <ReviewServiceForm service={service} />
      </Modal>
    </div>
  );
};
