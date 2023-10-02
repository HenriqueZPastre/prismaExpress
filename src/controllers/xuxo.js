"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.xuxo = void 0;
const client_1 = require("@prisma/client");
const HandleResponse_1 = require("../utils/HandleResponse/HandleResponse");
const Paginator_1 = require("../utils/Paginator/Paginator");
const prisma = new client_1.PrismaClient();
exports.xuxo = {
    listAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, take, colunaParaOrdenacao, order } = Paginator_1.Paginator.main(req.query);
            const tags = yield prisma.tags.findMany({
                select: {
                    id: true,
                    nome: true,
                },
                take: take,
                skip: skip,
                orderBy: colunaParaOrdenacao ? colunaParaOrdenacao : {
                    id: order || 'desc'
                },
            });
            return HandleResponse_1.HandleResponse.main(res, 200, { data: tags });
        });
    },
    test(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.sendFile('index.html', { root: 'src' });
        });
    }
};
