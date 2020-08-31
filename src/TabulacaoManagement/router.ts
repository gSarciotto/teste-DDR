import { Router, Request, Response } from "express";
import Tabulacao from "./Tabulacao";
import { convertToTabulacaoAndValidate } from "./utils/validators";
import { Database } from "../utils";
import TabulacaoDatabase from "./TabulacaoDatabase";
import { QueryResult } from "pg";

function generateTabulacoesRouter(databaseWrapper: Database): Router {
    const database = new TabulacaoDatabase(databaseWrapper);
    const router = Router();
    router.post("/tabulacoes", async (req: Request, res: Response) => {
        let bodyAsTabulacao: Tabulacao;
        try {
            bodyAsTabulacao = convertToTabulacaoAndValidate(req.body);
        } catch (err) {
            res.status(400).send();
            return; //so that typescript doesnt complain about using bodyAsTabulacao below
        }
        let result: QueryResult;
        try {
            result = await database.insertOne(bodyAsTabulacao);
        } catch (err) {
            res.status(500).send("Unable to store in database.");
            return;
        }
        res.status(201).send(result);
    });
    return router;
}

export default generateTabulacoesRouter;
