import { AppError } from "./AppError.errors";
import { NextFunction, Response, Request } from "express";
import "express-async-errors";

export const HandleError = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }
  console.log(err);
  return response.status(500).json({ message: "Internal Server Error" });
};
