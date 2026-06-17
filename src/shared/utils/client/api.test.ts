import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetcher } from "./api";

describe("fetcher", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should GET the path and return the parsed json", async () => {
    const payload = { hello: "world" };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => payload,
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await fetcher({ path: "/varsler" });

    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith("/varsler", { method: "GET" });
  });

  it("should merge caller options over the defaults", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    });
    vi.stubGlobal("fetch", fetchMock);

    await fetcher({
      path: "/varsler",
      options: { credentials: "include" },
    });

    expect(fetchMock).toHaveBeenCalledWith("/varsler", {
      method: "GET",
      credentials: "include",
    });
  });

  it("should throw when the response is not ok", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 503 });
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetcher({ path: "/varsler" })).rejects.toThrow("Fetch request failed");
  });
});
