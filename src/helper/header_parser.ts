import { ContentType, contentTypes } from "../types/content_types";

const headersParser = ({
  jsonHeaders,
  contentType,
}: {
  jsonHeaders?: Record<string, string>;
  contentType: ContentType;
}): Headers => {
  const headers = new Headers();

  // Handle content type setting
  const effectiveContentType =
    jsonHeaders?.["Content-Type"] || contentType || contentTypes.json;

  switch (contentType) {
    case contentTypes.formData:
      // For FormData, do not set Content-Type
      break;
    case contentTypes.json:
    case contentTypes.formUrlEncoded:
    case contentTypes.textPlain:
      headers.set("Content-Type", effectiveContentType);
      break;
    default:
      // For unknown content types, set Content-Type if provided
      if (effectiveContentType) {
        headers.set("Content-Type", effectiveContentType);
      }
  }

  // Add additional headers
  if (jsonHeaders) {
    Object.entries(jsonHeaders).forEach(([key, value]) => {
      if (key.toLowerCase() !== "content-type") {
        headers.append(key, value);
      }
    });
  }

  return headers;
};

export default headersParser;
