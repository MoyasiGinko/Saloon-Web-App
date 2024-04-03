// reservaatioController.ts

import { Request, Response } from "express";
import {
  createReservation,
  showReservations,
  updateReservation,
  deleteReservation,
} from "../services/reservationService";

export const createReservationC = async (req: Request, res: Response) => {
  createReservation(req, res);
};

export const showReservationsC = async (req: Request, res: Response) => {
  showReservations(req, res);
};

export const updateReservationC = async (req: Request, res: Response) => {
  updateReservation(req, res);
};

export const deleteReservationC = async (req: Request, res: Response) => {
  deleteReservation(req, res);
};
