import { Router, Request, Response, NextFunction } from "express";
import Tabulacao from "./Tabulacao";
import { convertToTabulacaoAndValidate } from "./utils/validators";
import Pg from "../utils/wrappers/Pg";
import TabulacaoDatabase from "./TabulacaoDatabase";
import { QueryConfig } from "pg";

function generateTabulacoesRouter(pg: Pg): Router {
    const database = new TabulacaoDatabase(pg);
    const router = Router();
    router.post("/tabulacoes", async (req: Request, res: Response) => {
        let bodyAsTabulacao: Tabulacao;
        try {
            bodyAsTabulacao = convertToTabulacaoAndValidate(req.body);
        } catch (err) {
            res.status(400).send();
            return; //so that typescript doesnt complain about using bodyAsTabulacao below
        }
        const query: QueryConfig = {
            text:
                "INSERT INTO tabulacoes (id, nomeCliente, protocolo, dataAtendimento, numeroBinado, numeroAcesso) VALUES ($1, $2, $3, $4, $5, $6)",
            values: [
                bodyAsTabulacao.id,
                bodyAsTabulacao.nomeCliente,
                bodyAsTabulacao.protocolo,
                bodyAsTabulacao.dataAtendimento,
                bodyAsTabulacao.numeroBinado,
                bodyAsTabulacao.numeroAcesso
            ]
        };
        const result = await database.query(query);
        res.send(result);
    });
    return router;
}

export default generateTabulacoesRouter;
