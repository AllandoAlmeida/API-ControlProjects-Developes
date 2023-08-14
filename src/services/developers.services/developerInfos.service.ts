import { QueryConfig } from "pg";
import { client } from "../../database/database";
import { developerInfosCreate, DeveloperInfos, DevelopersInfosResult } from "../../interfaces/developers.interfaces/developerInfos.interfaces";


export const addNewDeveloperInfos = async (developerInfosBody: developerInfosCreate, developerId: number): Promise<DeveloperInfos> => {

  const { preferredOS, developerSince} = developerInfosBody;

  const queryString: string = 
    `
    INSERT INTO "developerInfos"
    ("preferredOS", "developerSince" ,"developerId")
    VALUES
      ($1, $2, $3)
    RETURNING *;
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [preferredOS, developerSince, developerId],
  };
  

  const queryResult: DevelopersInfosResult = await client.query(queryConfig);
  const newDeveloperInfos: DeveloperInfos = queryResult.rows[0];

  return newDeveloperInfos;
};

