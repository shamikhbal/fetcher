"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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
  Fetcher: () => fetcher_default,
  contentTypes: () => contentTypes,
  default: () => src_default,
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
    if (Object.prototype.hasOwnProperty.call(jsonBody, key)) {
      const value = jsonBody[key];
      if (value !== null && value !== void 0) {
        params.append(
          key,
          value instanceof Date ? value.toISOString() : value instanceof Array ? JSON.stringify(value) : typeof value === "object" ? JSON.stringify(value) : String(value)
        );
      }
    }
  }
  return params;
};
var bodyParser = ({
  contentType,
  jsonBody
}) => {
  if (jsonBody === null || jsonBody === void 0) {
    return jsonBody;
  }
  if (contentType === contentTypes.formData) {
    const formData = new FormData();
    for (const key in jsonBody) {
      if (Object.prototype.hasOwnProperty.call(jsonBody, key)) {
        const value = jsonBody[key];
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (item instanceof File || item instanceof Blob) {
              formData.append(key, item);
            } else if (item !== null && item !== void 0) {
              formData.append(
                key,
                typeof item === "object" ? JSON.stringify(item) : String(item)
              );
            }
          });
        } else if (value instanceof File || value instanceof Blob) {
          formData.append(key, value);
        } else if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if (value !== null && value !== void 0) {
          formData.append(
            key,
            typeof value === "object" ? JSON.stringify(value) : String(value)
          );
        }
      }
    }
    return formData;
  }
  switch (contentType) {
    case contentTypes.json:
      return JSON.stringify(jsonBody);
    case contentTypes.formUrlEncoded:
      return formUrlEncoded(jsonBody);
    case contentTypes.textPlain:
      return String(jsonBody);
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
  const effectiveContentType = (jsonHeaders == null ? void 0 : jsonHeaders["Content-Type"]) || contentType || contentTypes.json;
  switch (contentType) {
    case contentTypes.formData:
      break;
    case contentTypes.json:
    case contentTypes.formUrlEncoded:
    case contentTypes.textPlain:
      headers.set("Content-Type", effectiveContentType);
      break;
    default:
      if (effectiveContentType) {
        headers.set("Content-Type", effectiveContentType);
      }
  }
  if (jsonHeaders) {
    Object.entries(jsonHeaders).forEach(([key, value]) => {
      if (key.toLowerCase() !== "content-type") {
        headers.append(key, value);
      }
    });
  }
  return headers;
};
var header_parser_default = headersParser;

// src/helper/logger.ts
var import_pino = __toESM(require("pino"));
var pino_log = (0, import_pino.default)(
  {
    level: "trace",
    // Set the desired log level
    timestamp: import_pino.default.stdTimeFunctions.isoTime,
    // Optional: Add timestamp
    transport: {
      target: "pino-pretty",
      // Use pino-pretty to format the logs
      options: {
        colorize: true,
        // Enable color output for better visibility in the terminal
        timestampKey: "time",
        // Customize the timestamp key
        translateTime: "SYS:standard",
        // Format the timestamp to a readable format
        ignore: "pid,hostname"
        // Optional: Exclude unnecessary fields
      }
    }
  },
  process.stdout
);
var logger = (start, method, url, response, requestOptions) => {
  if (response.ok) {
    pino_log.info(
      `[${Date.now() - start}ms] [${response.status}] [${method}] - ${url}`
    );
  } else {
    pino_log.error(
      `[${Date.now() - start}ms] [${response.status}] [${method}] - ${url}`
    );
  }
};
var logger_default = logger;

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
  delete: "DELETE",
  patch: "PATCH",
  head: "HEAD",
  options: "OPTIONS"
};

// src/fetcher.ts
var fetchWithTimeout = (url, options, timeout) => __async(void 0, null, function* () {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = yield fetch(url, __spreadProps(__spreadValues({}, options), {
      signal: controller.signal
    }));
    clearTimeout(timer);
    return response;
  } catch (error) {
    clearTimeout(timer);
    throw error;
  }
});
var Fetcher = class {
  constructor({
    baseURL = "",
    defaultHeaders = {},
    logging = false
  } = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = defaultHeaders;
    this.logging = logging;
  }
  request(_0) {
    return __async(this, arguments, function* ({
      method = methods.get,
      url,
      contentType = contentTypes.json,
      headers = {},
      params,
      body,
      timeout = 1e4
    }) {
      const finalUrl = this.baseURL + url;
      const combinedHeaders = __spreadValues(__spreadValues({}, this.defaultHeaders), headers);
      let requestOptions = {
        method,
        headers: header_parser_default({ jsonHeaders: combinedHeaders, contentType }),
        redirect: "follow"
      };
      if (params) {
        const encodedParams = param_encoder_default(params);
        url = `${finalUrl}?${encodedParams}`;
      }
      if (body) {
        requestOptions.body = body_parser_default({
          contentType,
          jsonBody: body
        });
      }
      const start = Date.now();
      try {
        const response = yield fetchWithTimeout(
          finalUrl,
          requestOptions,
          timeout
        );
        if (this.logging) {
          logger_default(start, method, finalUrl, response, requestOptions);
        }
        if (response.ok) {
          return yield response_builder_default(response);
        } else {
          throw yield response_builder_default(response);
        }
      } catch (error) {
        throw error;
      }
    });
  }
  get(_0) {
    return __async(this, arguments, function* ({
      url,
      contentType = contentTypes.json,
      headers = {},
      params,
      timeout = 1e4
    }) {
      return this.request({
        method: methods.get,
        url,
        contentType,
        headers,
        params,
        timeout
      });
    });
  }
  post(_0) {
    return __async(this, arguments, function* ({
      url,
      contentType = contentTypes.json,
      headers = {},
      params,
      body,
      timeout = 1e4
    }) {
      return this.request({
        method: methods.post,
        url,
        contentType,
        headers,
        params,
        body,
        timeout
      });
    });
  }
  put(_0) {
    return __async(this, arguments, function* ({
      url,
      contentType = contentTypes.json,
      headers = {},
      params,
      body,
      timeout = 1e4
    }) {
      return this.request({
        method: methods.put,
        url,
        contentType,
        headers,
        params,
        body,
        timeout
      });
    });
  }
  delete(_0) {
    return __async(this, arguments, function* ({
      url,
      contentType = contentTypes.json,
      headers = {},
      params,
      body,
      timeout = 1e4
    }) {
      return this.request({
        method: methods.delete,
        url,
        contentType,
        headers,
        params,
        body,
        timeout
      });
    });
  }
  patch(_0) {
    return __async(this, arguments, function* ({
      url,
      contentType = contentTypes.json,
      headers = {},
      params,
      body,
      timeout = 1e4
    }) {
      return this.request({
        method: methods.patch,
        url,
        contentType,
        headers,
        params,
        body,
        timeout
      });
    });
  }
  head(_0) {
    return __async(this, arguments, function* ({
      url,
      contentType = contentTypes.json,
      headers = {},
      params,
      timeout = 1e4
    }) {
      return this.request({
        method: methods.head,
        url,
        contentType,
        headers,
        params,
        timeout
      });
    });
  }
  options(_0) {
    return __async(this, arguments, function* ({
      url,
      contentType = contentTypes.json,
      headers = {},
      params,
      timeout = 1e4
    }) {
      return this.request({
        method: methods.options,
        url,
        contentType,
        headers,
        params,
        timeout
      });
    });
  }
};
var fetcher_default = Fetcher;

// src/index.ts
var fetcher = {
  Fetcher: fetcher_default,
  contentTypes,
  methods
};
var src_default = fetcher;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Fetcher,
  contentTypes,
  methods
});
//# sourceMappingURL=index.js.map