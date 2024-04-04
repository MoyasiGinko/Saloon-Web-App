"use client";
import React, { useState, useEffect } from "react";
import { Service } from "./interface";
import axios from "axios";
import UploadServiceForm from "./uploadService";

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

  return (
    <div>
      <h2>Services</h2>
      <UploadServiceForm />
      <div>
        {services.map((service) => (
          <div key={service._id}>
            <h3>{service.name}</h3>
            <p>Description: {service.description}</p>
            <p>Duration: {service.duration}</p>
            <p>Price: {service.price}</p>
            <p>Category: {service.category}</p>
            <p>Staff: {service.staff}</p>
            <p>Location: {service.location}</p>
            {/* Add image display if needed */}
          </div>
        ))}
      </div>
    </div>
  );
};
