import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../shared/errors/app.error";

export function notFoundMiddleware(_req: Request, res: Response): void {
  res.status(404).json({
    message: "Route not found",
  });
}

export function errorMiddleware(
  error: Error & { status?: number; type?: string },
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
    });
    return;
  }

  if (error instanceof SyntaxError && error.status === 400 && error.type === "entity.parse.failed") {
    res.status(400).json({
      message: "Malformed JSON body",
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    message: "Internal server error",
  });
}
