import cors from "cors";
import express from "express";
import { scopePerRequest } from "awilix-express";
import { container } from "./config/container";
import healthRouter from "./infrastructure/api/routes/health.routes";
import v1Router from "./infrastructure/api/routes/v1";
import { notFoundMiddleware } from "./infrastructure/api/middlewares/notFound.middleware";
import { errorMiddleware } from "./infrastructure/api/middlewares/error.middleware";

export const createServer = () => {

  const prefix = "/api";
  const app = express();

  app.disable("x-powered-by");
  app.use(cors());
  app.use(express.json());
  app.use(scopePerRequest(container));

  app.use(`${prefix}/health`, healthRouter);
  app.use(`${prefix}/v1`, v1Router);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
} 
