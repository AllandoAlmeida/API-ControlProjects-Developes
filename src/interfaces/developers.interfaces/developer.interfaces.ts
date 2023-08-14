import { QueryResult } from "pg";

export type Developers = {
    id: number;      
    name: string;  
    email: string;
};

export type DevelopersResult = QueryResult<Developers>;
export type DeveloperRequest = Omit<Developers, "id">;