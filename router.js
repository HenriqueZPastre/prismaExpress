"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var contas_1 = require("./src/controllers/contas");
var tags_1 = require("./src/controllers/tags/tags");
var lancamentos_1 = require("./src/controllers/lancamentos");
var xuxo_1 = require("./src/controllers/xuxo");
var swagger_ui_express_1 = require("swagger-ui-express");
var testeSwagger_json_1 = require("./testeSwagger.json");
var valores_1 = require("./src/controllers/valores");
var authSwagger_1 = require("./src/middlewares/autenticacao/authSwagger");
var bancos_1 = require("./src/routes/bancos");
var router = (0, express_1.Router)();
exports.router = router;
router.use('/api-docs', authSwagger_1.authSwagger, swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(testeSwagger_json_1.default));
//*********************************\\
//**** BANCOS ***********\\
//*********************************\\
/*
router.get('/bancos', Bancos.listarBancos)
router.post('/bancos', Bancos.cadastrarBancos) */
router.use(bancos_1.routerBancos);
//*********************************\\
//**** CONTAS BANCÁRIAS ***********\\
//*********************************\\
router.get('/contas', contas_1.CONTAS.listAll);
router.post('/contas', contas_1.CONTAS.createConta);
router.get('/contas/:id', contas_1.CONTAS.getById);
router.put('/contas/:id', contas_1.CONTAS.editarConta);
router.delete('/contas/:id', contas_1.CONTAS.deleteConta);
//*********************************\\
//**** TAGS ***********************\\
//*********************************\\
router.get('/tags', tags_1.ControllerTags.listar);
router.post('/tags', tags_1.ControllerTags.criar);
router.get('/tags/:id', tags_1.ControllerTags.buscarPorID);
router.put('/tags/:id', tags_1.ControllerTags.editar);
router.delete('/tags/:id', tags_1.ControllerTags.excluir);
//*********************************\\
//**** LANÇAMENTOS ***************\\
//*********************************\\
router.get('/lancamentos', lancamentos_1.LancamentosController.listAll);
router.post('/lancamentos', lancamentos_1.LancamentosController.create);
router.get('/lancamentos/:id', lancamentos_1.LancamentosController.getId);
router.put('/lancamentos/:id', lancamentos_1.LancamentosController.update);
router.delete('/lancamentos/:id', lancamentos_1.LancamentosController.delete);
router.get('/valores', valores_1.controllerValores.getAll);
//*********************************\\
//**** XUXOS/TESTES ***************\\
//*********************************\\
router.get('/a', xuxo_1.xuxo.listAll);
router.get('/', xuxo_1.xuxo.test);
