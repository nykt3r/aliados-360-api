import cors from "cors";
import express from "express";
import healthRouter from "./infrastructure/api/routes/health.routes";
import partnerRouter from "./infrastructure/api/routes/v1/partner.routes";
import { notFoundMiddleware } from "./infrastructure/api/middlewares/notFound.middleware";
import { errorMiddleware } from "./infrastructure/api/middlewares/error.middleware";

export const createServer = () => {

  const prefix = "/api";
  const app = express();

  app.disable("x-powered-by");
  app.use(cors());
  app.use(express.json());

  app.use(`${prefix}/health`, healthRouter);
  app.use(`${prefix}/v1`, partnerRouter);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
} 
