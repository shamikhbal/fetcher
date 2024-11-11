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
Object.defineProperty(exports, "__esModule", { value: true });
const responseBuilder = (response) => __awaiter(void 0, void 0, void 0, function* () {
    const text = yield response.text();
    try {
        const json = JSON.parse(text);
        return {
            ok: response.ok,
            status: response.status,
            statusText: response.statusText,
            data: json,
        };
    }
    catch (err) {
        console.error("Failed to parse response JSON:", err);
        return {
            ok: response.ok,
            status: response.status,
            statusText: response.statusText,
            data: text,
        };
    }
});
exports.default = responseBuilder;
