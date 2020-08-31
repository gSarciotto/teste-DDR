import { Database } from "../utils";
import { QueryConfig, QueryResult } from "pg";

export interface IListMatchingsDatabase {
    query: (query: QueryConfig) => Promise<QueryResult>;
    selectAllMatchings: () => Promise<QueryResult>;
}

export class ListMatchingsDatabase implements IListMatchingsDatabase {
    constructor(private database: Database) {}
    query(query: QueryConfig): Promise<QueryResult> {
        return this.database.query(query);
    }
    selectAllMatchings(): Promise<QueryResult> {
        const query: QueryConfig = {
            text: "SELECT * FROM matchings"
        };
        return this.database.query(query);
    }
}

export default ListMatchingsDatabase;
