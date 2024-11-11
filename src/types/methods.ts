export const methods = {
  get: "GET",
  post: "POST",
  put: "PUT",
  delete: "DELETE",
} as const;

export type Method = (typeof methods)[keyof typeof methods];
