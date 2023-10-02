"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paginacao = void 0;
class Paginacao {
    static main(query) {
        const all = query.all === 'true' ? Boolean(query.all) : null;
        const take = !all ? Number(query.take) || 15 : undefined;
        const skip = (take && Number(query.page) > 1) ? (Number(query.page) - 1) * take : undefined;
        return { take, skip };
    }
}
exports.Paginacao = Paginacao;
