import { Pool, QueryConfig, QueryResult } from "pg";

export interface Database {
    query: (query: QueryConfig) => Promise<QueryResult>;
    end: () => Promise<void>;
}

class Pg implements Database {
    private pool: Pool;
    constructor() {
        this.pool = new Pool();
    }
    async query(query: QueryConfig): Promise<QueryResult> {
        return this.pool.query(query);
    }
    end(): Promise<void> {
        return this.pool.end();
    }
}

export default Pg;
