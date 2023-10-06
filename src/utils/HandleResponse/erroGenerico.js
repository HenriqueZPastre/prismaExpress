"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorGenerico = void 0;
var ErrorGenerico = /** @class */ (function (_super) {
    __extends(ErrorGenerico, _super);
    function ErrorGenerico() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErrorGenerico.main = function (mensagem) {
        var erro = new Error(mensagem);
        return erro.message;
    };
    return ErrorGenerico;
}(Error));
exports.ErrorGenerico = ErrorGenerico;
