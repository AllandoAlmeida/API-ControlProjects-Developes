import { Request, Response } from "express";
import {
  addNewProject,
  searchForProjectById,
  upDateProjectById,
} from "../../services/projects.services/projects.service";

export const createProjects = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const newProject = await addNewProject(request.body);

  return response.status(201).json(newProject);
};

export const searchAllInfoProject = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;
  const projectInfos = await searchForProjectById({ id: Number(id) });
  return response.status(200).json(projectInfos);
};

export const upDateProject = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;
  const updateProject = await upDateProjectById(request.body, {
    id: Number(id),
  });
  return response.status(200).json(updateProject);
};
