"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdenarConsultas = void 0;
class OrdenarConsultas {
}
exports.OrdenarConsultas = OrdenarConsultas;
OrdenarConsultas.main = (obj) => {
    const { coluna, order } = obj;
    let orderBy = undefined;
    coluna ? orderBy = {
        [coluna]: order || 'desc'
    } : undefined;
    return { colunaParaOrdenacao: orderBy, order };
};
