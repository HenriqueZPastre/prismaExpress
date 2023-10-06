"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerBancos = void 0;
var express_1 = require("express");
var bancos_1 = require("../controllers/bancos/bancos");
var authSwagger_1 = require("../middlewares/autenticacao/authSwagger");
var routerBancos = express_1.default.Router();
exports.routerBancos = routerBancos;
// routerBancos.get('/bancos', Bancos.listarBancos)
// routerBancos.post('/bancos', Bancos.cadastrarBancos) */
routerBancos.route('/bancos')
    .get(bancos_1.Bancos.listarBancos)
    .post(bancos_1.Bancos.cadastrarBancos);
routerBancos.get('/bancos/:id', authSwagger_1.authSwagger, bancos_1.Bancos.getId);
