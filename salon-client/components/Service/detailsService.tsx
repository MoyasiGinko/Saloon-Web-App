// detailsService.tsx
import React from "react";
import { Service } from "./interface";
import styles from "../../styles/detailsService.module.css";

interface DetailsServiceProps {
  service: Service;
}

const DetailsService: React.FC<DetailsServiceProps> = ({ service }) => {
  return (
    <div className={styles.detailsService}>
      <h2>{service.name}</h2>
      <img src={service.image} alt={service.name} />
      <p>{service.description}</p>
      <p>Duration: {service.duration}</p>
      <p>Price: {service.price}</p>
      <p>Category: {service.category}</p>
      <p>Staff: {service.staff}</p>
      <p>Location: {service.location}</p>
    </div>
  );
};

export default DetailsService;
