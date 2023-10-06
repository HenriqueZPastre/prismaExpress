"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdenarConsultas = void 0;
var OrdenarConsultas = exports.OrdenarConsultas = /** @class */ (function () {
    function OrdenarConsultas() {
    }
    OrdenarConsultas.main = function (obj) {
        var _a;
        var coluna = obj.coluna, order = obj.order;
        var orderBy = undefined;
        coluna ? orderBy = (_a = {},
            _a[coluna] = order || 'desc',
            _a) : undefined;
        return { colunaParaOrdenacao: orderBy, order: order };
    };
    return OrdenarConsultas;
}());
