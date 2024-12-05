import { ContentType, contentTypes } from "../types/content_types";

// Optimize formUrlEncoded for performance
const formUrlEncoded = (jsonBody: Record<string, any>): URLSearchParams => {
  const params = new URLSearchParams();

  // Use faster for...in with direct type checking
  for (const key in jsonBody) {
    // More efficient property check
    if (Object.prototype.hasOwnProperty.call(jsonBody, key)) {
      const value = jsonBody[key];

      // Handle different value types more robustly
      if (value !== null && value !== undefined) {
        params.append(
          key,
          value instanceof Date
            ? value.toISOString()
            : value instanceof Array
            ? JSON.stringify(value)
            : typeof value === "object"
            ? JSON.stringify(value)
            : String(value)
        );
      }
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
}): FormData | string | URLSearchParams | any => {
  // Early return for null or undefined
  if (jsonBody === null || jsonBody === undefined) {
    return jsonBody;
  }

  // Optimize FormData creation
  if (contentType === contentTypes.formData) {
    const formData = new FormData();

    // More efficient form data creation
    for (const key in jsonBody) {
      if (Object.prototype.hasOwnProperty.call(jsonBody, key)) {
        const value = jsonBody[key];

        // Handle array of files
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (item instanceof File || item instanceof Blob) {
              // Use the same key with multiple values
              formData.append(key, item);
            } else if (item !== null && item !== undefined) {
              formData.append(
                key,
                typeof item === "object" ? JSON.stringify(item) : String(item)
              );
            }
          });
        }
        // Handle single file or other types
        else if (value instanceof File || value instanceof Blob) {
          formData.append(key, value);
        } else if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if (value !== null && value !== undefined) {
          formData.append(
            key,
            typeof value === "object" ? JSON.stringify(value) : String(value)
          );
        }
      }
    }

    return formData;
  }

  // Existing switch statement remains the same
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

export default bodyParser;
