import "express-async-errors";
import express, { Application, json } from "express";
import { developersRouter } from "./routers/developers.router/developers.router";
import { HandleError } from "./errors/handle.erros";
import { projectsRouter } from "./routers/projects.router/projects.router";

export const app: Application = express();
app.use(json());

app.use("/developers", developersRouter);
app.use("/projects", projectsRouter);
app.use(HandleError);
