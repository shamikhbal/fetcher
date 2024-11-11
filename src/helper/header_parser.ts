import { ContentType, contentTypes } from "../types/content_types";

const headersParser = ({
  jsonHeaders,
  contentType,
}: {
  jsonHeaders?: Record<string, string>;
  contentType: ContentType;
}): Headers => {
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

export default headersParser;
