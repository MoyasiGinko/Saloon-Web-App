"use client";
import React, { useState, useEffect } from "react";
import { Service } from "./interface";
import axios from "axios";
import UploadServiceForm from "./uploadService";
import { toast } from "react-toastify";
import styles from "../../styles/services.module.css";

export const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

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

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/services/delete/${id}`); //TODO: use env variable
      const updatedServices = services.filter((service) => service._id !== id);
      setServices(updatedServices);
      toast.success("Service deleted successfully");
    } catch (error) {
      console.error("Error deleting service", error);
      toast.error("Failed to delete service");
    }
  };

  return (
    <div className={styles.servicesContainer}>
      {/* <h2>Services</h2> */}
      <div>
        <UploadServiceForm onSave={fetchServices} />
      </div>
      <div className={styles.servicesList}>
        {services.map((service) => (
          <div key={service._id} className={styles.serviceCard}>
            <h3>{service.name}</h3>
            <p>Description: {service.description}</p>
            <p>Duration: {service.duration}</p>
            <p>Price: {service.price}</p>
            <p>Category: {service.category}</p>
            <p>Staff: {service.staff}</p>
            <p>Location: {service.location}</p>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(service._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
