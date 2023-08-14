import { Request, Response } from "express";
import { addNewDeveloperInfos } from "../../services/developers.services/developerInfos.service";

export const createDevelopersInfos = async (
    request: Request,
    response: Response
  ) => {
    const { id } = request.params;
    const newDeveloperInfos = await addNewDeveloperInfos(request.body, parseInt(id));
    return response.status(201).json(newDeveloperInfos);
  };