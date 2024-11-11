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
exports.create_instance = exports.fetcher = void 0;
const content_types_1 = require("./types/content_types");
const methods_1 = require("./types/methods");
const response_builder_1 = __importDefault(require("./helper/response_builder"));
const header_parser_1 = __importDefault(require("./helper/header_parser"));
const body_parser_1 = __importDefault(require("./helper/body_parser"));
const param_encoder_1 = __importDefault(require("./helper/param_encoder"));
const fetchWithTimeout = (url, options, timeout) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), timeout)),
    ]);
};
const fetcher = (_a) => __awaiter(void 0, [_a], void 0, function* ({ method = methods_1.methods.get, url, contentType = content_types_1.contentTypes.json, headers, params, body, timeout = 5000, }) {
    let requestOptions = {
        method: method,
        headers: (0, header_parser_1.default)({ jsonHeaders: headers, contentType }),
        redirect: "follow",
    };
    if (params) {
        const encodedParams = (0, param_encoder_1.default)(params);
        url = `${url}?${encodedParams}`;
    }
    if (body) {
        requestOptions.body = (0, body_parser_1.default)({
            contentType,
            jsonBody: body,
        });
    }
    return yield fetchWithTimeout(url, requestOptions, timeout)
        .then(response_builder_1.default)
        .catch((error) => {
        throw error;
    });
});
exports.fetcher = fetcher;
const create_instance = ({ baseURL = "", defaultHeaders = {}, }) => {
    return (_a) => __awaiter(void 0, [_a], void 0, function* ({ method = methods_1.methods.get, url, contentType = content_types_1.contentTypes.json, headers = {}, params, body, timeout = 5000, }) {
        const finalUrl = baseURL + url;
        const combinedHeaders = Object.assign(Object.assign({}, defaultHeaders), headers);
        return (0, exports.fetcher)({
            method,
            url: finalUrl,
            contentType,
            headers: combinedHeaders,
            params,
            body,
            timeout,
        });
    });
};
exports.create_instance = create_instance;
exports.default = {
    create_instance: exports.create_instance,
    fetcher: exports.fetcher,
    contentTypes: content_types_1.contentTypes,
    methods: methods_1.methods,
};
