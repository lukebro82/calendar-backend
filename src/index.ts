import express from "express";

import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth";
import eventsRoutes from "./routes/events";

import { dbConnection } from "./lib/mongodb";
dbConnection();

const port = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/auth", authRoutes);
app.use("/api/events",eventsRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
