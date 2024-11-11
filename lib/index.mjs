var __defProp = Object.defineProperty;
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

// src/types/methods.ts
var methods = {
  get: "GET",
  post: "POST",
  put: "PUT",
  delete: "DELETE"
};

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

// src/helper/param_encoder.ts
var encodeParams = (params) => {
  return new URLSearchParams(params).toString();
};
var param_encoder_default = encodeParams;

// src/index.ts
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
var src_default = {
  create_instance,
  fetcher,
  contentTypes,
  methods
};
export {
  create_instance,
  src_default as default,
  fetcher
};
//# sourceMappingURL=index.mjs.map