import bodyParser from "./helper/body_parser";
import headersParser from "./helper/header_parser";
import logger from "./helper/logger";
import encodeParams from "./helper/param_encoder";
import responseBuilder from "./helper/response_builder";
import { contentTypes } from "./types/content_types";
import { methods } from "./types/methods";
import { RequestOptions } from "./types/request_options";
import { ResponseBody } from "./types/response_body";

const fetchWithTimeout = (
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeout);

    fetch(url, options)
      .then((response) => {
        clearTimeout(timer); // Clear the timeout once fetch is resolved
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timer); // Clear the timeout if there's an error
        reject(error);
      });
  });
};

export const fetcher = async ({
  method = methods.get,
  url,
  contentType = contentTypes.json,
  headers,
  params,
  body,
  timeout = 5000,
  logging = false,
}: RequestOptions): Promise<ResponseBody> => {
  let requestOptions: RequestInit = {
    method: method,
    headers: headersParser({ jsonHeaders: headers, contentType }),
    redirect: "follow",
  };

  if (params) {
    const encodedParams = encodeParams(params);
    url = `${url}?${encodedParams}`;
  }

  if (body) {
    requestOptions.body = bodyParser({
      contentType,
      jsonBody: body,
    });
  }

  const start = Date.now();
  return await fetchWithTimeout(url, requestOptions, timeout)
    // .then(responseBuilder)
    .then(async (res) => {
      if (logging) logger(start, method, url, res);

      if (res.ok) {
        return await responseBuilder(res);
      } else {
        throw await responseBuilder(res);
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const create_instance = ({
  baseURL = "",
  defaultHeaders = {},
  logging = false,
}: {
  baseURL?: string;
  defaultHeaders?: Record<string, string>;
  logging?: boolean;
}) => {
  return async ({
    method = methods.get,
    url,
    contentType = contentTypes.json,
    headers = {},
    params,
    body,
    timeout = 5000,
  }: RequestOptions): Promise<ResponseBody> => {
    const finalUrl = baseURL + url;
    const combinedHeaders = { ...defaultHeaders, ...headers };

    return fetcher({
      method,
      url: finalUrl,
      contentType,
      headers: combinedHeaders,
      params,
      body,
      timeout,
      logging,
    });
  };
};

export default {
  create_instance,
  fetcher,
  contentTypes,
  methods,
};
