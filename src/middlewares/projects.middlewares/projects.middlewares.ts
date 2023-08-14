import { Request, Response, NextFunction, request } from "express";
import { QueryConfig } from "pg";
import { Developers, DevelopersResult } from "../../interfaces/developers.interfaces/developer.interfaces";
import { client } from "../../database/database";
import { AppError } from "../../errors/AppError.errors";
import { Projects, ProjectsResult } from "../../interfaces/projects.interfaces/project.interfaces";

export const checkIdOnProjectCreation = async (requist: Request, response: Response, next:NextFunction): Promise<void> => {
    const { developerId } = requist.body;

    if(developerId){
        const queryString: string = 
        `
        SELECT * FROM "developers" WHERE ID = $1;
        `;

        const queryConfig: QueryConfig = {
            text: queryString,
            values: [developerId],
        };

        const queryResult: DevelopersResult = await client.query(queryConfig);
        const validDeveloperId: Developers = queryResult.rows[0];

        if(!validDeveloperId){
            throw new AppError("Developer not found", 404);
        }
        return next()
    } else {
        return next()
    };
};

export const checkProjectId = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> => {
    const {id}  = request.params;

    const queryString: string =
    `
    SELECT * FROM "projects" WHERE id = $1;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };

    const queryResult:ProjectsResult = await client.query(queryConfig);
    const validProjectId: Projects = queryResult.rows[0];
    
    if(!validProjectId) {
        throw new AppError("Project not found", 404);
    };

    return next()
};

