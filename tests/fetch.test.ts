import { Fetcher, ResponseBody, contentTypes } from "../lib/index";

const fetcher = new Fetcher({
  baseURL: "https://67f4a4aecbef97f40d2ec8c5.mockapi.io",
  logging: false,
  defaultHeaders: {
    test: "value",
  },
});

interface Timezone {
  timezone: string;
  id?: string;
}

describe("Fetcher Request with Method Chaining", () => {
  it("[FETCHER] [GET] Positive Test", async () => {
    const result: ResponseBody<Timezone> = await fetcher.get({
      url: "/api/fetcher/time",
      contentType: contentTypes.json,
    });

    expect(result.status).toBe(200);
    expect(result.statusText).toBe("OK");
    expect(result.data).toBeInstanceOf(Array);
  });

  it("[FETCHER] [GET] Negative Test", async () => {
    try {
      await fetcher.get({
        url: "/non-existent-endpoint",
        contentType: contentTypes.json,
      });
    } catch (error: any) {
      expect(error.ok).toBe(false);
      expect(error.status).toBe(404);
    }
  });

  it("[FETCHER] [POST] Positive Test", async () => {
    const result: ResponseBody<Timezone> = await fetcher.post({
      url: "/api/fetcher/time",
      contentType: contentTypes.json,
      body: {
        timezone: "Malaysia/Perak",
      } as Timezone,
    });

    expect(result.status).toBe(201);
    expect(result.statusText).toBe("Created");
    expect(result.data).toBeInstanceOf(Object);
  });

  it("[FETCHER] [POST] Negative Test", async () => {
    try {
      await fetcher.post({
        url: "/non-existent-endpoint",
        contentType: contentTypes.json,
        body: {
          timezone: "Malaysia/Perak",
        },
      });
    } catch (error: any) {
      expect(error.ok).toBe(false);
      expect(error.status).toBe(400);
    }
  });

  it("[FETCHER] [PUT] Positive Test", async () => {
    const result = await fetcher.put({
      url: `/api/fetcher/time/${1}`,
      contentType: contentTypes.json,
      body: {
        timezone: "Malaysia/Perak",
      } as Timezone,
    });

    expect(result.status).toBe(200);
    expect(result.statusText).toBe("OK");
    expect(result.data).toBeInstanceOf(Object);
  });

  it("[FETCHER] [PUT] Negative Test", async () => {
    try {
      await fetcher.put({
        url: "/non-existent-endpoint",
        contentType: contentTypes.json,
        body: {
          timezone: "Malaysia/Perak",
        },
      });
    } catch (error: any) {
      expect(error.ok).toBe(false);
      expect(error.status).toBe(400);
    }
  });

  it("[FETCHER] [DELETE] Positive Test", async () => {
    const result = await fetcher.delete({
      url: `/api/fetcher/time/${1}`,
      contentType: contentTypes.json,
    });

    expect(result.status).toBe(200);
    expect(result.statusText).toBe("OK");
    expect(result.data).toBeInstanceOf(Object);
  });

  it("[FETCHER] [DELETE] Negative Test", async () => {
    try {
      await fetcher.delete({
        url: "/non-existent-endpoint",
        contentType: contentTypes.json,
      });
    } catch (error: any) {
      expect(error.ok).toBe(false);
      expect(error.status).toBe(400);
    }
  });
});
