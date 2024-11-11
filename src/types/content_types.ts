export const contentTypes = {
  json: "application/json",
  formData: "multipart/form-data",
  formUrlEncoded: "application/x-www-form-urlencoded",
  textPlain: "text/plain",
} as const;

export type ContentType = (typeof contentTypes)[keyof typeof contentTypes];
