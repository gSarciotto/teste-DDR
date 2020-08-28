import { Router, Request, Response } from "express";
import Gravacao from "./Gravacao";
import GravacaoDatabase from "./GravacaoDatabase";
import { Pg } from "../utils";
import { convertToGravacaoAndValidate } from "./utils/validators";

function generateGravacoesRouter(pg: Pg): Router {
    const database = new GravacaoDatabase(pg);
    const router = Router();
    router.post("/gravacoes", async (req: Request, res: Response) => {
        let bodyAsGravacao: Gravacao;
        try {
            bodyAsGravacao = convertToGravacaoAndValidate(req.body);
        } catch (err) {
            res.status(400).send();
            return;
        }
        const query = {
            text:
                "INSERT INTO gravacoes (id, telefone, ramal, dataGravacao) VALUES ($1, $2, $3, $4)",
            values: [
                bodyAsGravacao.id,
                bodyAsGravacao.telefone,
                bodyAsGravacao.ramal,
                bodyAsGravacao.dataGravacao
            ]
        };
        const result = await database.query(query);
        res.send(result);
    });

    return router;
}

export default generateGravacoesRouter;
