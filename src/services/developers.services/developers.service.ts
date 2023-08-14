import format from "pg-format";
import { client } from "../../database/database";
import {
  Developers,
  DeveloperRequest,
  DevelopersResult,
} from "../../interfaces/developers.interfaces/developer.interfaces";
import { QueryConfig } from "pg";
import {
  AllDeveloperInfo,
  AllDeveloperInfoResult,
} from "../../interfaces/developers.interfaces/developerInfos.interfaces";

export const addNewDeveloper = async (
  DeveloperBody: DeveloperRequest
): Promise<Developers> => {
  const queryString: string = format(
    `
    INSERT INTO "developers"
    (%I)
    VALUES
    (%L)
    RETURNING *;
    `,
    Object.keys(DeveloperBody),
    Object.values(DeveloperBody)
  );
  const queryResult: DevelopersResult = await client.query(queryString);
  const newDeveloper: Developers = queryResult.rows[0];

  return newDeveloper;
};

export const searchForDeveloperById = async (params: {
  id: number;
}): Promise<AllDeveloperInfo | Response> => {
  const queryString: string = `
  SELECT 
  "d"."id" AS "developerId", 
  "d"."name" AS "developerName",
  "d"."email" AS "developerEmail",
  "di"."preferredOS" AS "developerInfoPreferredOS",
  "di"."developerSince" AS "developerInfoDeveloperSince"
FROM "developers" AS "d"
LEFT JOIN "developerInfos" AS "di"
ON "di"."developerId" = "d"."id"
WHERE "d"."id" = $1;
`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [params.id],
  };
  const queryResult: AllDeveloperInfoResult = await client.query(queryConfig);
  const allDeveloperInformation = queryResult.rows[0];

  return allDeveloperInformation;
};

export const upDateDeveloperById = async (
  DeveloperBody: DeveloperRequest,
  params: { id: number }
): Promise<Developers> => {
  const updateColumn: string[] = Object.keys(DeveloperBody);
  const updateValues: string[] = Object.values(DeveloperBody);

  const queryString: string = format(
    `
  UPDATE "developers"
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
  const queryResult: DevelopersResult = await client.query(queryConfig);
  const updatedDeveloper = queryResult.rows[0];

  return updatedDeveloper;
};

export const deleteDeveloperById = async (
  params: { id: number }
): Promise<Developers> => {
const queryString: string = `
          DELETE FROM "developers"
          WHERE "id" = $1
        `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [params.id],
  };

  const queryResult: DevelopersResult = await client.query(queryConfig)
  const developerDeletd = queryResult.rows[0]

  return developerDeletd
}