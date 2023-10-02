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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const xml2js_1 = __importDefault(require("xml2js"));
const utils_1 = require("../utils");
const caminhoDoArquivo = './src/reader/sicredi.ofx';
const leitorOFX = (caminhoDoArquivo) => __awaiter(void 0, void 0, void 0, function* () {
    let dados;
    const conteudoDoArquivo = fs_1.default.readFileSync(caminhoDoArquivo, 'utf-8');
    const inicioTagOfx = conteudoDoArquivo.indexOf('<OFX>'); // Encontra o índice onde começa o elemento <OFX>
    if (inicioTagOfx !== -1) {
        const conteudoOfx = conteudoDoArquivo.slice(inicioTagOfx); // Extrai o conteúdo a partir do índice encontrado
        const parser = new xml2js_1.default.Parser();
        parser.parseString(conteudoOfx, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            fs_1.default.writeFileSync('./src/reader/resultadssssssssso.json', JSON.stringify(result, null, 2));
        });
        return new Promise((resolve) => {
            xml2js_1.default.parseString(conteudoOfx, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                dados = result.OFX;
                resolve(dados);
            });
        });
    }
    else {
        console.log('Elemento <OFX> não encontrado no arquivo.');
    }
});
const tratarDados = (caminhoDoArquivo) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const b = yield leitorOFX(caminhoDoArquivo);
    if (b) {
        const dadosGerais = {
            idBanco: b.BANKMSGSRSV1[0].STMTTRNRS[0].STMTRS[0].BANKACCTFROM[0].BANKID[0].trim(),
            nomeBanco: b.SIGNONMSGSRSV1[0].SONRS[0].FI[0].ORG[0].trim(),
            numeroConta: b.BANKMSGSRSV1[0].STMTTRNRS[0].STMTRS[0].BANKACCTFROM[0].ACCTID[0].trim(),
            dataInicial: (_a = (0, utils_1.parseDataOFXtoDate)(b.BANKMSGSRSV1[0].STMTTRNRS[0].STMTRS[0].BANKTRANLIST[0].DTSTART[0])) === null || _a === void 0 ? void 0 : _a.trim(),
            dataFinal: b.BANKMSGSRSV1[0].STMTTRNRS[0].STMTRS[0].BANKTRANLIST[0].DTEND[0].trim()
        };
        console.log(dadosGerais);
        const t = [];
        b.BANKMSGSRSV1[0].STMTTRNRS[0].STMTRS[0].BANKTRANLIST[0].STMTTRN.forEach((element) => {
            const objeto = {
                TRNTYPE: element.TRNTYPE[0],
                DTPOSTED: (0, utils_1.parseDataOFXtoDate)(element.DTPOSTED[0]) || undefined,
                TRNAMT: element.TRNAMT[0],
                FITID: element.FITID[0],
                REFNUM: element.REFNUM[0],
                MEMO: element.MEMO[0]
            };
            t.push(objeto);
        });
        fs_1.default.writeFileSync('./src/reader/resultado.json', JSON.stringify(t, null, 2));
        //console.log(dadosGerais)
        //console.log('/////////////////////////////////////////////////////////////-------------------------------------------------------///////////////////////////////////////////////')
        //console.log(tran)
    }
});
tratarDados(caminhoDoArquivo);
