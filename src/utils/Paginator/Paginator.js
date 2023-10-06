"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paginator = void 0;
var OrdenarConsulta_1 = require("./OrdenarConsulta");
var Paginacao_1 = require("./Paginacao");
var Paginator = /** @class */ (function () {
    function Paginator() {
    }
    Paginator.main = function (query) {
        var paginator = Paginacao_1.Paginacao.main(query);
        var order = OrdenarConsulta_1.OrdenarConsultas.main(query);
        return __assign(__assign({}, paginator), order);
    };
    Paginator.paginas = function (query) {
        var paginator = Paginacao_1.Paginacao.main(query);
        return paginator;
    };
    Paginator.ordenacao = function (query) {
        var order = OrdenarConsulta_1.OrdenarConsultas.main(query);
        return order;
    };
    return Paginator;
}());
exports.Paginator = Paginator;
