"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const content_types_1 = require("../types/content_types");
const headersParser = ({ jsonHeaders, contentType, }) => {
    const headers = new Headers();
    if (jsonHeaders) {
        headers.set("Content-Type", jsonHeaders["Content-Type"] || contentType || content_types_1.contentTypes.json);
        Object.entries(jsonHeaders).forEach(([key, value]) => {
            if (key !== "Content-Type") {
                headers.append(key, value);
            }
        });
    }
    else {
        headers.set("Content-Type", contentType || content_types_1.contentTypes.json);
    }
    return headers;
};
exports.default = headersParser;
