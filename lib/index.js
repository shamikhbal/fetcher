"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  contentTypes: () => contentTypes,
  create_instance: () => create_instance,
  fetcher: () => fetcher,
  methods: () => methods
});
module.exports = __toCommonJS(src_exports);

// src/types/content_types.ts
var contentTypes = {
  json: "application/json",
  formData: "multipart/form-data",
  formUrlEncoded: "application/x-www-form-urlencoded",
  textPlain: "text/plain"
};

// src/helper/body_parser.ts
var formUrlEncoded = (jsonBody) => {
  const params = new URLSearchParams();
  for (const key in jsonBody) {
    if (jsonBody.hasOwnProperty(key)) {
      params.append(key, jsonBody[key]);
    }
  }
  return params;
};
var bodyParser = ({
  contentType,
  jsonBody
}) => {
  if (contentType === contentTypes.formData && jsonBody instanceof FormData) {
    return jsonBody;
  }
  switch (contentType) {
    case contentTypes.json:
      return JSON.stringify(jsonBody);
    case contentTypes.formUrlEncoded:
      return formUrlEncoded(jsonBody);
    case contentTypes.textPlain:
      return JSON.stringify(jsonBody);
    default:
      return jsonBody;
  }
};
var body_parser_default = bodyParser;

// src/helper/header_parser.ts
var headersParser = ({
  jsonHeaders,
  contentType
}) => {
  const headers = new Headers();
  if (jsonHeaders) {
    headers.set(
      "Content-Type",
      jsonHeaders["Content-Type"] || contentType || contentTypes.json
    );
    Object.entries(jsonHeaders).forEach(([key, value]) => {
      if (key !== "Content-Type") {
        headers.append(key, value);
      }
    });
  } else {
    headers.set("Content-Type", contentType || contentTypes.json);
  }
  return headers;
};
var header_parser_default = headersParser;

// src/helper/param_encoder.ts
var encodeParams = (params) => {
  return new URLSearchParams(params).toString();
};
var param_encoder_default = encodeParams;

// src/helper/response_builder.ts
var responseBuilder = (response) => __async(void 0, null, function* () {
  const text = yield response.text();
  try {
    const json = JSON.parse(text);
    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: json
    };
  } catch (err) {
    console.error("Failed to parse response JSON:", err);
    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: text
    };
  }
});
var response_builder_default = responseBuilder;

// src/types/methods.ts
var methods = {
  get: "GET",
  post: "POST",
  put: "PUT",
  delete: "DELETE"
};

// src/fetcher.ts
var fetchWithTimeout = (url, options, timeout) => {
  return Promise.race([
    fetch(url, options),
    new Promise(
      (_, reject) => setTimeout(() => reject(new Error("Request timed out")), timeout)
    )
  ]);
};
var fetcher = (_0) => __async(void 0, [_0], function* ({
  method = methods.get,
  url,
  contentType = contentTypes.json,
  headers,
  params,
  body,
  timeout = 5e3
}) {
  let requestOptions = {
    method,
    headers: header_parser_default({ jsonHeaders: headers, contentType }),
    redirect: "follow"
  };
  if (params) {
    const encodedParams = param_encoder_default(params);
    url = `${url}?${encodedParams}`;
  }
  if (body) {
    requestOptions.body = body_parser_default({
      contentType,
      jsonBody: body
    });
  }
  return yield fetchWithTimeout(url, requestOptions, timeout).then(response_builder_default).catch((error) => {
    throw error;
  });
});
var create_instance = ({
  baseURL = "",
  defaultHeaders = {}
}) => {
  return (_0) => __async(void 0, [_0], function* ({
    method = methods.get,
    url,
    contentType = contentTypes.json,
    headers = {},
    params,
    body,
    timeout = 5e3
  }) {
    const finalUrl = baseURL + url;
    const combinedHeaders = __spreadValues(__spreadValues({}, defaultHeaders), headers);
    return fetcher({
      method,
      url: finalUrl,
      contentType,
      headers: combinedHeaders,
      params,
      body,
      timeout
    });
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  contentTypes,
  create_instance,
  fetcher,
  methods
});
//# sourceMappingURL=index.js.map