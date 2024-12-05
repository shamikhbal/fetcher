var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

// src/helper/logger.ts
import pino from "pino";
var pino_log = pino(
  {
    level: "trace",
    // Set the desired log level
    timestamp: pino.stdTimeFunctions.isoTime,
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
var logger = (start, method, url, response) => {
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
  delete: "DELETE"
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
      timeout = 5e3
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
          logger_default(start, method, finalUrl, response);
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
      timeout = 5e3
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
      timeout = 5e3
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
      timeout = 5e3
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
      timeout = 5e3
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
};
var fetcher_default = Fetcher;

// src/index.ts
var fetcher = {
  Fetcher: fetcher_default,
  contentTypes,
  methods
};
var src_default = fetcher;
export {
  fetcher_default as Fetcher,
  contentTypes,
  src_default as default,
  methods
};
//# sourceMappingURL=index.mjs.map