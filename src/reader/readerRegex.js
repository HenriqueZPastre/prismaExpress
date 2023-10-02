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
const utils_1 = require("./utils");
const client_1 = require("@prisma/client");
const interfaces_1 = require("./interfaces");
const prisma = new client_1.PrismaClient();
const ReaderOfx = (ofxPath) => {
    const dadosBanco = {
        id: '',
        nome: '',
        numeroConta: '',
        dataInicial: '',
        dataFinal: '',
    };
    const transacoes = [];
    const leitura = fs_1.default.readFileSync(ofxPath, 'utf-8');
    const indexOfx = leitura.indexOf('<OFX>');
    const removeCabecalho = leitura.slice(indexOfx);
    const split = removeCabecalho.split('\n');
    let transacao = {
        especieTransacao: '',
        date: '',
        valor: 0,
        id: '',
        memo: '',
        tipoOperacao: 0,
    };
    split.forEach((linha) => {
        linha.includes('<BANKID>') ? dadosBanco.id = (0, utils_1.removeTags)(linha, 'BANKID').trim() : null;
        linha.includes('<ACCTID>') ? dadosBanco.numeroConta = (0, utils_1.removeTags)(linha, 'ACCTID').trim() : null;
        linha.includes('<ORG>') ? dadosBanco.nome = (0, utils_1.removeTags)(linha, 'ORG').trim() : null;
        if (linha.includes('<DTSTART>')) {
            const data = (0, utils_1.parseDataOFXtoDate)((0, utils_1.removeTags)(linha, 'DTSTART').trim());
            data != null ? dadosBanco.dataInicial = data : null;
        }
        if (linha.includes('<DTEND>')) {
            const data = (0, utils_1.parseDataOFXtoDate)((0, utils_1.removeTags)(linha, 'DTEND').trim());
            data != null ? dadosBanco.dataFinal = data : null;
        }
        linha.includes('<TRNTYPE>') ? transacao.especieTransacao = (0, utils_1.removeTags)(linha, 'TRNTYPE').trim() : null;
        if (linha.includes('<DTPOSTED>')) {
            const data = (0, utils_1.parseDataOFXtoDate)((0, utils_1.removeTags)(linha, 'DTPOSTED').trim());
            data != null ? transacao.date = data : null;
        }
        if (linha.includes('<TRNAMT>')) {
            (0, utils_1.removeTags)(linha, 'TRNAMT').trim().startsWith('-') ? transacao.tipoOperacao = 1 : transacao.tipoOperacao = 0;
            transacao.valor = parseFloat((0, utils_1.removeTags)(linha, 'TRNAMT').trim().replace('-', ''));
        }
        linha.includes('<FITID>') ? transacao.id = (0, utils_1.removeTags)(linha, 'FITID').trim() : null;
        linha.includes('<MEMO>') ? transacao.memo = (0, utils_1.removeTags)(linha, 'MEMO').trim() : null;
        if (linha.includes('</STMTTRN>')) {
            if (interfaces_1.zodTransacao.safeParse(transacao).success) {
                transacoes.push(transacao);
            }
            else {
                console.log('erro');
                console.log(transacao);
            }
            transacao = {
                especieTransacao: '',
                date: '',
                valor: 0,
                id: '',
                memo: '',
                tipoOperacao: 0,
            };
        }
    });
    return { dadosBanco, transacoes };
};
const criarConta = (banco) => __awaiter(void 0, void 0, void 0, function* () {
    const bancoc = yield prisma.contas.create({
        select: {
            codigoBanco: true,
            id: true,
        },
        data: {
            codigoBanco: parseInt(banco.id),
            nome: banco.nome,
            saldoAtual: 0,
            saldoInicial: 0,
        }
    });
    return bancoc;
});
const VerificarExistenciaDaConta = (banco) => __awaiter(void 0, void 0, void 0, function* () {
    const existe = yield prisma.contas.findFirst({
        select: {
            codigoBanco: true,
            id: true,
        },
        where: {
            codigoBanco: parseInt(banco.id),
        }
    });
    if (existe) {
        return existe;
    }
    else {
        const banck = yield criarConta(banco);
        console.log(banck);
        return banck;
    }
});
const existeFitId = (transacao) => __awaiter(void 0, void 0, void 0, function* () {
    const existe = yield prisma.conciliacaoBancaria.findFirst({
        select: {
            id: true,
        },
        where: {
            fitID: transacao.id,
            data: transacao.date,
            valor: transacao.valor,
        }
    });
    return existe;
});
const criarlancamentoConcialiacao = (transacao, banco) => __awaiter(void 0, void 0, void 0, function* () {
    const criar = yield prisma.conciliacaoBancaria.create({
        data: {
            data: transacao.date,
            descricao: transacao.memo,
            especieTransacao: transacao.especieTransacao,
            fitID: transacao.id,
            tipoOperacao: transacao.tipoOperacao,
            valor: transacao.valor,
            contasId: banco.id,
        }
    });
    console.log(criar);
});
const start = (pathFile) => __awaiter(void 0, void 0, void 0, function* () {
    const { dadosBanco, transacoes } = ReaderOfx(pathFile);
    const banco = yield VerificarExistenciaDaConta(dadosBanco);
    console.log(transacoes.length);
    transacoes.forEach((transacao) => __awaiter(void 0, void 0, void 0, function* () {
        const existeFit = yield existeFitId(transacao);
        if (!existeFit) {
            yield criarlancamentoConcialiacao(transacao, banco);
        }
        else {
            console.log('existe');
        }
    }));
});
start('./src/reader/ofx/sicredi.ofx');
