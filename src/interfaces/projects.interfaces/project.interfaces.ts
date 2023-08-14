import { QueryResult } from "pg";
import { Developers } from "../developers.interfaces/developer.interfaces";

export type Projects = {
  id: number;
  name: string;
  description: Text;
  repository: string;
  startDate: Date;
  endDate?: Date;
  developerId: number;
};

export type ProjectInformation ={
  developer: Developers;
  projects: Projects;
}

export type ProjectsResult = QueryResult<Projects>;
export type ProjectsRequest = Omit<Projects, "id">;

export type ProjectInfosResult = QueryResult<ProjectInformation>;