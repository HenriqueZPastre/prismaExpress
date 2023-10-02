"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorGenerico = void 0;
class ErrorGenerico extends Error {
    static main(mensagem) {
        const erro = new Error(mensagem);
        return erro.message;
    }
}
exports.ErrorGenerico = ErrorGenerico;
