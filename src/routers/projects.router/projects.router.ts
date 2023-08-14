import { Router } from "express";
import { createProjects, searchAllInfoProject, upDateProject } from "../../controllers/projects.controllers/project.controllers";
import { checkIdOnProjectCreation, checkProjectId } from "../../middlewares/projects.middlewares/projects.middlewares";

export const projectsRouter:Router = Router();

projectsRouter.post ("/", checkIdOnProjectCreation, createProjects);
projectsRouter.get("/:id", checkProjectId, searchAllInfoProject);
projectsRouter.patch("/:id", checkProjectId, checkIdOnProjectCreation, upDateProject)