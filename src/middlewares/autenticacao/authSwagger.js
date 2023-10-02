"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSwagger = void 0;
function authSwagger(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic realm="API Access"');
        res.sendStatus(401);
        return;
    }
    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('ascii');
    if (credentials !== 'teste:teste') {
        res.setHeader('WWW-Authenticate', 'Basic realm="API Access"');
        res.sendStatus(401);
        return;
    }
    next();
}
exports.authSwagger = authSwagger;
