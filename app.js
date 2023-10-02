"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = require("./router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
app.use(router_1.router);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log('http://localhost:3000/');
});
app.use('/api', router_1.router);
