import { Request, Response } from "express";
import { Service } from "../models/Service";
import fs from "fs";
import path from "path";

export const serviceUploadS = async (req: Request, res: Response) => {
  try {
    const { name, description, duration, price, category, staff, image } =
      req.body;

    const newService = new Service({
      name,
      description,
      duration,
      price,
      category,
      staff,
      image,
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
      "name description duration price images staff"
    );
    return res.status(200).json({ message: "Services by category", services });
  } catch (error) {
    console.error("Error fetching services by category", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
