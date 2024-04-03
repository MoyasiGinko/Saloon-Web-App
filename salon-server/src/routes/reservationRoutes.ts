// reservationRoutes.ts
import express from "express";
import {
  createReservationC,
  showReservationsC,
  updateReservationC,
  deleteReservationC,
} from "../controllers/reservationController";

const router = express.Router();

router.post("/create", createReservationC);
router.get("/show", showReservationsC);
router.put("/update/:id", updateReservationC);
router.delete("/delete/:id", deleteReservationC);

export default router;
