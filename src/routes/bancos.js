"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerBancos = void 0;
const express_1 = __importDefault(require("express"));
const bancos_1 = require("../controllers/bancos/bancos");
const authSwagger_1 = require("../middlewares/autenticacao/authSwagger");
const routerBancos = express_1.default.Router();
exports.routerBancos = routerBancos;
/* routerBancos.get('/bancos', Bancos.listarBancos)
routerBancos.post('/bancos', Bancos.cadastrarBancos) */
routerBancos.route('/bancos')
    .get(bancos_1.Bancos.listarBancos)
    .post(bancos_1.Bancos.cadastrarBancos);
routerBancos.get('/bancos/:id', authSwagger_1.authSwagger, bancos_1.Bancos.getId);
