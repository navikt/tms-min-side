import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MultiStatusError } from "./error";
import { fetchData, fetchMicrofrontend } from "./fetch";

const url = "http://localhost:3000/navn";
const token = "obo-token";

describe("fetchData", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should GET the url with a bearer token and return the parsed json", async () => {
    const payload = { navn: "Navn Navnesen", ident: "1234" };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => payload,
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchData(token, url);

    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  });

  it("should throw a MultiStatusError carrying the partial data on a 207 response", async () => {
    const partial = { delivered: ["a"], failed: ["b"] };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 207,
      json: async () => partial,
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchData(token, url)).rejects.toThrow(MultiStatusError);
    await expect(fetchData(token, url)).rejects.toMatchObject({
      partialData: partial,
    });
  });

  it("should throw when the response is not ok", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 500 });
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchData(token, url)).rejects.toThrow("Http error with status: 500");
  });
});

describe("fetchMicrofrontend", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should GET the url with a bearer token and return the response text", async () => {
    const html = "<div>microfrontend</div>";
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => html,
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchMicrofrontend(token, url);

    expect(result).toBe(html);
    expect(fetchMock).toHaveBeenCalledWith(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  });

  it("should throw when the response is not ok", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 503 });
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchMicrofrontend(token, url)).rejects.toThrow("Http error with status: 503");
  });
});
