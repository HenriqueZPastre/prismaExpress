"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paginacao = void 0;
var Paginacao = /** @class */ (function () {
    function Paginacao() {
    }
    Paginacao.main = function (query) {
        var all = query.all === 'true' ? Boolean(query.all) : null;
        var take = !all ? Number(query.take) || 15 : undefined;
        var skip = (take && Number(query.page) > 1) ? (Number(query.page) - 1) * take : undefined;
        return { take: take, skip: skip };
    };
    return Paginacao;
}());
exports.Paginacao = Paginacao;
