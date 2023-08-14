import { QueryResult } from "pg";
import { Developers } from "./developer.interfaces";

export type OS = "Windows" | "Linux" | "MacOS";

export type DeveloperInfos = {
    id: number;        
    developerSince: Date;
    preferredOS: OS;
    developerId: number
};

export type AllDeveloperInfo = {
    developer:Developers;
    info:DeveloperInfos;
};

export type DevelopersInfosResult = QueryResult<DeveloperInfos>;
export type developerInfosCreate = Omit<DeveloperInfos, "id">;

export type AllDeveloperInfoResult = QueryResult<AllDeveloperInfo>;