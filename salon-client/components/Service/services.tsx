"use client";

import React, { useState, useEffect } from "react";
import { Service } from "./interface";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../styles/services.module.css";
import Modal from "./modal"; // Import Modal component
import UploadServiceForm from "./uploadService";
import { EditServiceForm } from "./editService";
import { ReviewService } from "./reviewService";

export const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );
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

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsEditModalOpen(true);
  };

  // const handleReview = (service: Service) => {
  //   // Implement review functionality
  //   setSelectedService(service);
  //   setIsReviewModalOpen(true);
  // };

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

  // Review button click handler
  const handleReview = async (service: Service) => {
    setSelectedServiceId(service._id);
    setIsReviewModalOpen(true);
  };

  // Cancel review modal handler
  const handleCancelReview = () => {
    setIsReviewModalOpen(false);
    setSelectedServiceId(null);
  };

  const handleSave = (newService: Service) => {
    fetchServices();
    console.log("The new service is", newService);
    console.log("The editing service is", editingService);

    // Check if editingService is defined
    if (editingService) {
      const isChanged =
        newService._id === editingService._id &&
        newService.name === editingService.name &&
        newService.description === editingService.description &&
        newService.duration === editingService.duration &&
        newService.price === editingService.price &&
        newService.category === editingService.category &&
        newService.staff === editingService.staff &&
        newService.location === editingService.location;
      newService.image === editingService.image;

      setEditingService(null);
      setIsEditModalOpen(false);

      if (!isChanged) {
        console.log("Service updated successfully");
      }
    }
  };

  const handleCancel = () => {
    setEditingService(null);
    setIsEditModalOpen(false);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/services/delete/${id}`);
      const updatedServices = services.filter((service) => service._id !== id);
      setServices(updatedServices);
      toast.success("Service deleted successfully");
    } catch (error) {
      console.error("Error deleting service", error);
      toast.error("Failed to delete service");
    }
  };

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  return (
    <div className={styles.servicesContainer}>
      <div className={styles.servicesHeader}>
        <h1 className={styles.headersTitle}>Services Management</h1>
        <button className={styles.addServiceButton} onClick={openUploadModal}>
          Add New Service
        </button>
      </div>
      <Modal isOpen={isUploadModalOpen} closeModal={closeUploadModal}>
        <UploadServiceForm
          onSave={() => {
            fetchServices();
            closeUploadModal();
          }}
        />
      </Modal>
      <div id="modal-root"></div>
      <div className={styles.servicesList}>
        {services.map((service) => (
          <div key={service._id} className={styles.serviceCard}>
            <h3 className={styles.serviceTitle}>{service.name}</h3>
            <p className={styles.serviceDescription}>
              Description: {service.description}
            </p>
            <div className={styles.serviceInfo}>
              <p>Duration: {service.duration}</p>
              <p>Price: {service.price}</p>
              <p>Category: {service.category}</p>
              <p>Staff: {service.staff}</p>
              <p>Location: {service.location}</p>
            </div>
            <img
              src={service.image}
              alt="Service"
              className={styles.serviceImage}
            />
            <button
              className={styles.editButton}
              onClick={() => handleEdit(service)}
            >
              Edit
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(service._id)}
            >
              Delete
            </button>
            <button
              className={styles.reviewButton}
              onClick={() => handleReview(service)}
            >
              Review
            </button>
          </div>
        ))}
      </div>
      {editingService && (
        <Modal isOpen={isEditModalOpen} closeModal={handleCancel}>
          <EditServiceForm
            service={editingService}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </Modal>
      )}
      {isReviewModalOpen && (
        <Modal isOpen={isReviewModalOpen} closeModal={handleCancelReview}>
          {selectedServiceId && (
            <ReviewService
              id={selectedServiceId}
              onCancel={handleCloseReviewModal}
            />
          )}
        </Modal>
      )}
    </div>
  );
};
