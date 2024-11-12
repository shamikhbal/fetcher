import bodyParser from "./helper/body_parser";
import headersParser from "./helper/header_parser";
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
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);
};

export const fetcher = async ({
  method = methods.get,
  url,
  contentType = contentTypes.json,
  headers,
  params,
  body,
  timeout = 5000,
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

  return await fetchWithTimeout(url, requestOptions, timeout)
    .then(responseBuilder)
    .catch((error) => {
      throw error;
    });
};

export const create_instance = ({
  baseURL = "",
  defaultHeaders = {},
}: {
  baseURL?: string;
  defaultHeaders?: Record<string, string>;
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
    });
  };
};

export default {
  create_instance,
  fetcher,
  contentTypes,
  methods,
};
