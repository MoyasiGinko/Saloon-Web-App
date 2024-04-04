// reservationService.ts
import { Reservation } from "../models/Reservation";
import { Request, Response } from "express";
import { User } from "../models/User";
import { Service } from "../models/Service";

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { userId, serviceId, date, payment } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    const newReservation = new Reservation({
      user: userId,
      service: serviceId,
      date,
      payment,
    });
    await newReservation.save();
    return res
      .status(200)
      .json({ message: "Reservation created successfully" });
  } catch (error) {
    console.error("Error creating reservation", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const showReservations = async (req: Request, res: Response) => {
  const reservations = await Reservation.find();
  return res
    .status(200)
    .json({ message: "this is the reservations", reservations });
};

export const updateReservation = async (req: Request, res: Response) => {
  try {
    const resId = req.params.id;
    const { userId, serviceId, date, payment, status } = req.body;
    const reservation = await Reservation.findById(resId);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    reservation.user = userId;
    reservation.service = serviceId;
    reservation.date = date;
    reservation.payment = payment;
    reservation.status = status;

    await reservation.save();

    return res
      .status(200)
      .json({ message: "Reservation updated successfully" });
  } catch (error) {
    console.error("Error updating reservation", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const resId = req.params.id;
    const reservation = await Reservation.findById(resId);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    await reservation.deleteOne();
    return res
      .status(200)
      .json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error("Error deleting reservation", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
