import { Router, Response, Request } from "express";
import { Database } from "../utils";
import ListMatchingsDatabase from "./ListMatchingsDatabase";
import { QueryResult } from "pg";
import MatchingModel from "./MatchingModel";
import convertModelToMatching from "./utils/ModelToMatching";

export function generateListMatchingsRouter(databaseWrapper: Database): Router {
    const database = new ListMatchingsDatabase(databaseWrapper);
    const router = Router();
    router.get("/matchings", async (req: Request, res: Response) => {
        let results: QueryResult;
        try {
            results = await database.selectAllMatchings();
        } catch (err) {
            res.status(500).send("Unable to retrieve matchings from database.");
            return;
        }
        const matchings = results.rows.map((matchingAsModel: MatchingModel) =>
            convertModelToMatching(matchingAsModel)
        );
        res.status(200).send(matchings);
    });

    return router;
}

export default generateListMatchingsRouter;
