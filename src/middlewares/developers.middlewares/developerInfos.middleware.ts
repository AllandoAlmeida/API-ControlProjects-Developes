import { Request, Response, NextFunction } from "express";
import { QueryConfig } from "pg";
import {
  Developers,
  DevelopersResult,
} from "../../interfaces/developers.interfaces/developer.interfaces";
import { client } from "../../database/database";
import { AppError } from "../../errors/AppError.errors";
import {
  DeveloperInfos,
  DevelopersInfosResult,
  OS,
} from "../../interfaces/developers.interfaces/developerInfos.interfaces";



export const checkExistingId = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { id } = request.params;
  const queryString = "SELECT * FROM developers WHERE id = $1";
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  const queryResult: DevelopersResult = await client.query(queryConfig);
  const existingId: Developers = queryResult.rows[0];

  if (!existingId) {
    throw new AppError("Developer not found.", 404);
  }
  return next();
};


export const existingDeveloperInfos = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { id } = request.params;
  const queryString: string = `SELECT * FROM "developerInfos" WHERE "developerId" = $1;`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: DevelopersInfosResult = await client.query(queryConfig);
  const existingInfos: DeveloperInfos = queryResult.rows[0];

  if (existingInfos) {
    throw new AppError("Developer infos already exists.", 409);
  }
  return next();
};


export const checkExistingPreferredOS = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { preferredOS } = request.body;
  const validOS: OS[] = ["Windows", "Linux", "MacOS"];

  if (!validOS.includes(preferredOS)) {
    throw new AppError("Invalid preferredOS.", 400);
  }

  return next();
};
