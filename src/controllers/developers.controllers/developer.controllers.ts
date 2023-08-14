import { Request, Response } from "express";
import {
  addNewDeveloper,
  deleteDeveloperById,
  searchForDeveloperById,
  upDateDeveloperById,
} from "../../services/developers.services/developers.service";

export const createDevelopers = async (
  request: Request,
  response: Response
):Promise<Response> => {
  const newDeveloper = await addNewDeveloper(request.body);
  return response.status(201).json(newDeveloper);
};

export const searchAllInfoDeveloper = async (
  request: Request,
  response: Response
):Promise<Response> => {
  const { id } = request.params;
  const allDeveloperInformation = await searchForDeveloperById({
    id: Number(id),
  });
  return response.status(200).json(allDeveloperInformation);
};

export const upDateDeveloper = async (request: Request, response: Response):Promise<Response> => {
  const { id } = request.params;

  const upDate = await upDateDeveloperById(request.body, { id: Number(id) });

  return response.status(200).json(upDate);
};

export const deleteDeveloper = async (request: Request, response: Response):Promise<Response> => {
  const { id } = request.params;

  await deleteDeveloperById({ id: Number(id) });

  return response.status(204).json();
};
