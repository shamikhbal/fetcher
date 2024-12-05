export const methods = {
  get: "GET",
  post: "POST",
  put: "PUT",
  delete: "DELETE",
  patch: "PATCH",
  head: "HEAD",
  options: "OPTIONS",
} as const;

export type Method = (typeof methods)[keyof typeof methods];
