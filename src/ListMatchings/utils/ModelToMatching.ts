import MatchingModel from "../MatchingModel";
import Matching from "../Matching";

export function convertModelToMatching(model: MatchingModel): Matching {
    return {
        id: model.id,
        tabulacaoId: model.tabulacao_id,
        gravacaoId: model.gravacao_id
    };
}

export default convertModelToMatching;
