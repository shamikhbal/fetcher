"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const content_types_1 = require("../types/content_types");
const formUrlEncoded = (jsonBody) => {
    const params = new URLSearchParams();
    for (const key in jsonBody) {
        if (jsonBody.hasOwnProperty(key)) {
            params.append(key, jsonBody[key]);
        }
    }
    return params;
};
const bodyParser = ({ contentType, jsonBody, }) => {
    if (contentType === content_types_1.contentTypes.formData && jsonBody instanceof FormData) {
        return jsonBody; // Directly use the FormData instance
    }
    switch (contentType) {
        case content_types_1.contentTypes.json:
            return JSON.stringify(jsonBody);
        case content_types_1.contentTypes.formUrlEncoded:
            return formUrlEncoded(jsonBody);
        case content_types_1.contentTypes.textPlain:
            return JSON.stringify(jsonBody);
        default:
            return jsonBody;
    }
};
exports.default = bodyParser;
