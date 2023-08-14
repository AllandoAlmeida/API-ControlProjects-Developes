import format from "pg-format";
import {
  ProjectInformation,
  ProjectInfosResult,
  Projects,
  ProjectsRequest,
  ProjectsResult,
} from "../../interfaces/projects.interfaces/project.interfaces";
import { client } from "../../database/database";
import { QueryConfig } from "pg";

export const addNewProject = async (
  ProjectBody: Projects
): Promise<Projects> => {
  const queryString: string = format(
    `
        INSERT INTO "projects"
        (%I)
        VALUES
        (%L)
        RETURNING *;
        `,
    Object.keys(ProjectBody),
    Object.values(ProjectBody)
  );
  const queryResult: ProjectsResult = await client.query(queryString);
 
  const newProject: Projects = queryResult.rows[0];

  return newProject;
};

export const searchForProjectById = async (params: {
  id: number;
}): Promise<ProjectInformation> => {
  const queryString: string = `
    SELECT 
            "p"."id" AS "projectId", 
            "p"."name" AS "projectName",
            "p"."description" AS "projectDescription",
            "p"."repository" AS "projectRepository",
            "p"."startDate" AS "projectStartDate",
            "p"."endDate" AS "projectEndDate",
            "d"."name" AS "projectDeveloperName"
        FROM "projects" AS "p"
        JOIN "developers" AS "d"
        ON "p"."developerId" = "d"."id"
        WHERE "p"."id" = $1;
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [params.id],
  };
  const queryResult: ProjectInfosResult = await client.query(queryConfig);
  const projectInfos: ProjectInformation = queryResult.rows[0];
  return projectInfos;
};

export const upDateProjectById = async (
    ProjectBody: ProjectsRequest,
    params: { id: number }
  ): Promise<ProjectInformation> => {
    const updateColumn: string[] = Object.keys(ProjectBody);
    const updateValues: (string | number | Text | Date)[] = Object.values(ProjectBody);
  
    const queryString: string = format(
      `
            UPDATE "projects"
            SET (%I) = ROW (%L)
            WHERE id = $1
            RETURNING *; 
          `,
      updateColumn,
      updateValues
    );
  
    const queryConfig: QueryConfig = {
      text: queryString,
      values: [params.id],
    };
    const queryResult: ProjectInfosResult = await client.query(queryConfig);
    const updateProject = queryResult.rows[0];
  
    return updateProject;
  };
