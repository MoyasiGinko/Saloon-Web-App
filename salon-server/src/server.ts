import express from "express";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import serviceRoutes from "./routes/serviceRoutes";
import reservationRoutes from "./routes/reservationRoutes";
import loggerMiddleWare from "./middlewares/loggerMiddleware";
import { connectDb } from "../config/database";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(loggerMiddleWare);

connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/users", userRoutes);
app.use("/api/prod", productRoutes);
app.use("/api/prod", categoryRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/reservation", reservationRoutes);

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
