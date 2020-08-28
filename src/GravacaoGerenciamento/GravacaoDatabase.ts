import { Pg } from "../utils";
import { QueryConfig, QueryResult } from "pg";

export interface IGravacaoDatabase {
    query: (query: QueryConfig) => Promise<QueryResult>;
}

export class GravacaoDatabase implements IGravacaoDatabase {
    constructor(private pg: Pg) {}
    query(query: QueryConfig): Promise<QueryResult> {
        return this.pg.query(query);
    }
}

export default GravacaoDatabase;
