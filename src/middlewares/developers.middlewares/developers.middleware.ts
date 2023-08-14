import { Request, Response, NextFunction } from "express";
import { QueryConfig } from "pg";
import { Developers, DevelopersResult } from "../../interfaces/developers.interfaces/developer.interfaces";
import { client } from "../../database/database";
import { AppError } from "../../errors/AppError.errors";

export const checkExistingEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise <void | Response> => {
  const newEmail: string = request.body.email;
  const queryString = "SELECT * FROM developers WHERE email = $1"
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [newEmail],
  }
  const queryResult: DevelopersResult = await client.query(queryConfig);
  const existingDeveloper:Developers = queryResult.rows[0];

  if(existingDeveloper) {
    throw new AppError("Email already exists teste", 409)
  }
  return next()
};

