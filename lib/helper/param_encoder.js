"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encodeParams = (params) => {
    return new URLSearchParams(params).toString();
};
exports.default = encodeParams;
