export const getResponse = {
  ok: true,
  status: 200,
  json: async () => ({ hello: "world" }),
  headers: { get: () => "application/json" },
};

export const postResponse = {
  ok: true,
  status: 201,
  json: async () => ({ created: true }),
  headers: { get: () => "application/json" },
};

export const errorResponse = {
  ok: false,
  status: 404,
  json: async () => ({ error: "not found" }),
  headers: { get: () => "application/json" },
};

export const paramsResponse = {
  ok: true,
  status: 200,
  json: async () => ({ ok: true }),
  headers: { get: () => "application/json" },
};

export const postBody = { name: "test" };
export const params = { q: "search" };
