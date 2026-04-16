import cors from "cors";
import express from "express";
import partnerRoutes from "./infrastructure/api/routes/v1/partner.routes";
import {
  errorMiddleware,
  notFoundMiddleware,
} from "./infrastructure/api/middlewares/error.middleware";

export const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", partnerRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
