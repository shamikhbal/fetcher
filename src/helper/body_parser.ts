import { ContentType, contentTypes } from "../types/content_types";

const formUrlEncoded = (jsonBody: Record<string, any>): URLSearchParams => {
  const params = new URLSearchParams();
  for (const key in jsonBody) {
    if (jsonBody.hasOwnProperty(key)) {
      params.append(key, jsonBody[key]);
    }
  }
  return params;
};

const bodyParser = ({
  contentType,
  jsonBody,
}: {
  contentType: ContentType;
  jsonBody: any;
}): any => {
  if (contentType === contentTypes.formData && jsonBody instanceof FormData) {
    return jsonBody; // Directly use the FormData instance
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

export default bodyParser;
