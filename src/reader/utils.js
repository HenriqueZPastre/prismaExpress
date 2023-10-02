"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTags = exports.parseDataOFXtoDate = void 0;
const parseDataOFXtoDate = (data) => {
    const regex = data.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})\[(-?\d+):[A-Za-z]+\]$/);
    if (!regex) {
        console.error('Erro ao converter data');
        return null;
    }
    //_stringNormal é o dado inicial
    // timeZoneOffset é ignorado no momento  
    //const [_stringNormal, ano, mes, dia, hora, minuto, segundo, timeZoneOffset] = regex
    const [, ano, mes, dia, hora, minuto, segundo,] = regex;
    const date = new Date(Date.UTC(parseInt(ano, 10), parseInt(mes, 10) - 1, parseInt(dia, 10), parseInt(hora, 10), parseInt(minuto, 10), parseInt(segundo, 10)));
    //ignorar por enquanto o timezone
    //	date.setTime(date.getTime() - parseInt(timeZoneOffset, 10) * 60 * 60 * 1000)
    return date.toISOString();
};
exports.parseDataOFXtoDate = parseDataOFXtoDate;
const removeTags = (linha, tag) => {
    const regex = new RegExp(`<\\/?${tag}>`, 'g');
    return linha.replace(regex, '');
};
exports.removeTags = removeTags;
