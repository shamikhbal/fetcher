import Fetcher from "../src/fetcher";
import { contentTypes } from "../src/types/content_types";
import { methods } from "../src/types/methods";
import * as testData from "./test.data";

// Mock helpers
jest.mock("../src/helper/body_parser", () => ({
  __esModule: true,
  default: jest.fn(({ jsonBody }) => JSON.stringify(jsonBody)),
}));

jest.mock("../src/helper/header_parser", () => ({
  __esModule: true,
  default: jest.fn(({ jsonHeaders }) => jsonHeaders),
}));

jest.mock("../src/helper/param_encoder", () => ({
  __esModule: true,
  default: jest.fn((params) => new URLSearchParams(params).toString()),
}));

jest.mock("../src/helper/response_builder", () => ({
  __esModule: true,
  default: jest.fn(async (response) => {
    const data = await response.json();
    return { ...data, status: response.status };
  }),
}));

jest.mock("../src/helper/logger", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Fetcher Functional Test", () => {
  const mockFetch = jest.fn();
  const originalFetch = global.fetch;

  beforeAll(() => {
    global.fetch = mockFetch as any;
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should perform a GET request and return parsed response", async () => {
    mockFetch.mockResolvedValueOnce(testData.getResponse);

    const fetcher = new Fetcher({ baseURL: "https://api.test" });
    const response = await fetcher.get({ url: "/hello" });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.test/hello",
      expect.objectContaining({ method: methods.get })
    );
    expect(response).toMatchObject({ hello: "world", status: 200 });
  });

  it("should perform a POST request with body and return parsed response", async () => {
    mockFetch.mockResolvedValueOnce(testData.postResponse);

    const fetcher = new Fetcher({ baseURL: "https://api.test" });
    const response = await fetcher.post({
      url: "/create",
      body: testData.postBody,
      contentType: contentTypes.json,
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.test/create",
      expect.objectContaining({
        method: methods.post,
        body: JSON.stringify(testData.postBody),
      })
    );
    expect(response).toMatchObject({ created: true, status: 201 });
  });

  it("should throw error for non-ok response", async () => {
    mockFetch.mockResolvedValueOnce(testData.errorResponse);

    const fetcher = new Fetcher({ baseURL: "https://api.test" });
    await expect(fetcher.get({ url: "/notfound" })).rejects.toMatchObject({
      error: "not found",
      status: 404,
    });
  });

  it("should append params to URL", async () => {
    mockFetch.mockResolvedValueOnce(testData.paramsResponse);

    const fetcher = new Fetcher({ baseURL: "https://api.test" });
    await fetcher.get({ url: "/withparams", params: testData.params });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/withparams?q=search"),
      expect.any(Object)
    );
  });
});
