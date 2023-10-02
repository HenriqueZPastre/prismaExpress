"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paginator = void 0;
const OrdenarConsulta_1 = require("./OrdenarConsulta");
const Paginacao_1 = require("./Paginacao");
class Paginator {
    static main(query) {
        const paginator = Paginacao_1.Paginacao.main(query);
        const order = OrdenarConsulta_1.OrdenarConsultas.main(query);
        return Object.assign(Object.assign({}, paginator), order);
    }
    static paginas(query) {
        const paginator = Paginacao_1.Paginacao.main(query);
        return paginator;
    }
    static ordenacao(query) {
        const order = OrdenarConsulta_1.OrdenarConsultas.main(query);
        return order;
    }
}
exports.Paginator = Paginator;
