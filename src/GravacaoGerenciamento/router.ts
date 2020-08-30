import { Router, Request, Response } from "express";
import Gravacao from "./Gravacao";
import GravacaoDatabase from "./GravacaoDatabase";
import { Database } from "../utils";
import { convertToGravacaoAndValidate } from "./utils/validators";

function generateGravacoesRouter(databaseWrapper: Database): Router {
    const database = new GravacaoDatabase(databaseWrapper);
    const router = Router();
    router.post("/gravacoes", async (req: Request, res: Response) => {
        let bodyAsGravacao: Gravacao;
        try {
            bodyAsGravacao = convertToGravacaoAndValidate(req.body);
        } catch (err) {
            res.status(400).send();
            return;
        }
        const result = await database.insertOne(bodyAsGravacao);
        res.status(201).send(result);
    });

    return router;
}

export default generateGravacoesRouter;
