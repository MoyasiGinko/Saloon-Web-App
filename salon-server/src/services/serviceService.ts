import { Request, Response } from "express";
import { Service } from "../models/Service";
import fs from "fs";
import path from "path";

export const serviceUploadS = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      duration,
      price,
      category,
      staff,
      image,
      location,
    } = req.body;

    const newService = new Service({
      name,
      description,
      duration,
      price,
      category,
      staff,
      image,
      location,
    });

    await newService.save();
    return res.status(200).json({ message: "Service uploaded successfully" });
  } catch (error) {
    console.error("Error uploading service", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch all services
export const showServiceS = async (req: Request, res: Response) => {
  try {
    const services = await Service.find();
    return res.status(200).json({ message: "All services", services });
  } catch (error) {
    console.error("Error fetching services", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateServiceS = async (req: Request, res: Response) => {
  try {
    const serviceId = req.params.id;
    const { name, description, duration, price, category, staff, image } =
      req.body;
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    if (category) {
      service.category = category;
    }

    service.name = name;
    service.description = description;
    service.duration = duration;
    service.price = price;
    service.staff = staff;
    service.image = image;

    await service.save();
    return res.status(200).json({ message: "Service updated successfully" });
  } catch (error) {
    console.error("Error updating service", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a service
export const deleteServiceS = async (req: Request, res: Response) => {
  try {
    const serviceId = req.params.id;
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    await service.deleteOne();

    return res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch all categories
export const showCategoryS = async (req: Request, res: Response) => {
  try {
    const categories = await Service.distinct("category");
    return res.status(200).json({ message: "All categories", categories });
  } catch (error) {
    console.error("Error fetching categories", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch services by category
export const showServiceByCategoryS = async (req: Request, res: Response) => {
  try {
    const category = req.params.category;
    const services = await Service.find({ category }).select(
      "name description duration price image staff"
    );
    return res.status(200).json({ message: "Services by category", services });
  } catch (error) {
    console.error("Error fetching services by category", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addReviewToServiceS = async (req: Request, res: Response) => {
  try {
    const serviceId = req.params.id;
    const { user, rating, comment } = req.body;

    // Find the service by ID
    const service = await Service.findById(serviceId);

    // If service not found, return error
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    // Create a new review object
    const newReview = {
      user,
      rating,
      comment,
    };

    // Add the new review to the reviews array of the service
    service.reviews.push(newReview);

    // Save the updated service
    await service.save();

    // Return success message
    return res.status(200).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Error adding review to service", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a review from a service
export const deleteReviewFromServiceS = async (req: Request, res: Response) => {
  try {
    const { id: serviceId, reviewId } = req.params;

    // Find the service by ID
    const service = await Service.findById(serviceId);

    // If service not found, return error
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    // Find the index of the review to delete
    const index = service.reviews.findIndex(
      (review: any) => review._id.toString() === reviewId
    );

    // If review not found, return error
    if (index === -1) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Remove the review from the array
    service.reviews.splice(index, 1);

    // Save the updated service
    await service.save();

    // Return success message
    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review from service", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update a review of a service
export const updateReviewOfServiceS = async (req: Request, res: Response) => {
  try {
    const { id: serviceId, reviewId } = req.params;
    const { user, rating, comment } = req.body;

    // Find the service by ID
    const service = await Service.findById(serviceId);

    // If service not found, return error
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    // Find the index of the review to update
    const index = service.reviews.findIndex(
      (review: any) => review._id.toString() === reviewId
    );

    // If review not found, return error
    if (index === -1) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Update the review
    service.reviews[index].user = user;
    service.reviews[index].rating = rating;
    service.reviews[index].comment = comment;

    // Save the updated service
    await service.save();

    // Return success message
    return res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    console.error("Error updating review of service", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
