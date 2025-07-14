import type { ResponseBody } from "../src/index";
import fetcher, {
  contentTypes,
  Fetcher,
  FilePicker,
  methods,
} from "../src/index";

jest.mock("../src/fetcher", () => ({
  __esModule: true,
  default: class MockFetcher {},
}));
jest.mock("../src/helper/file_picker", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../src/types/content_types", () => ({
  __esModule: true,
  contentTypes: { json: "application/json" },
}));
jest.mock("../src/types/methods", () => ({
  __esModule: true,
  methods: { get: "GET", post: "POST" },
}));
jest.mock("../src/types/response_body", () => ({
  __esModule: true,
  ResponseBody: class {},
}));

describe("Fetcher Exports Test", () => {
  it("should export Fetcher, contentTypes, and methods as default", () => {
    expect(fetcher).toHaveProperty("Fetcher");
    expect(fetcher).toHaveProperty("contentTypes");
    expect(fetcher).toHaveProperty("methods");
  });

  it("should export Fetcher as a class/function", () => {
    expect(typeof Fetcher).toBe("function");
  });

  it("should export FilePicker", () => {
    expect(FilePicker).toBeDefined();
  });

  it("should export contentTypes as an object", () => {
    expect(typeof contentTypes).toBe("object");
    expect(contentTypes).toHaveProperty("json");
  });

  it("should export methods as an object", () => {
    expect(typeof methods).toBe("object");
    expect(methods).toHaveProperty("get");
    expect(methods).toHaveProperty("post");
  });

  it("should export ResponseBody as a type", () => {
    type Test = ResponseBody;
    expect(true).toBe(true); // Type-only check, always passes
  });
});
