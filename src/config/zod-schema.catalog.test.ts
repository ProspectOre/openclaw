// Verifies hosted catalog feed and source profile config parsing.
import { describe, expect, it } from "vitest";
import { OpenClawSchema } from "./zod-schema.js";

function expectCatalogConfig(value: unknown) {
  const result = OpenClawSchema.safeParse(value);
  if (!result.success) {
    throw new Error(JSON.stringify(result.error.issues, null, 2));
  }
  return result.data.catalog;
}

describe("OpenClawSchema catalog config", () => {
  it("accepts hosted feed and local source profiles", () => {
    const catalog = expectCatalogConfig({
      catalog: {
        feeds: {
          "clawhub-public": {
            url: "https://register.openclaw.ai/official-external-plugin-catalog.json",
            refresh: {
              onStartup: "if-stale",
              interval: "6h",
              jitter: "10m",
              timeout: "10s",
              maxStale: "7d",
            },
            verification: { mode: "unsigned" },
          },
          acme: {
            url: "https://packages.acme.example/openclaw/feed",
            verification: { mode: "unsigned" },
          },
        },
        sources: {
          "public-npm": { type: "npm", registry: "https://registry.npmjs.org/" },
          "acme-npm": {
            type: "npm",
            registry: "https://packages.acme.example/npm/",
          },
          "acme-clawhub": {
            type: "clawhub",
            baseUrl: "https://packages.acme.example/clawhub/",
          },
          "acme-git": {
            type: "git",
            baseUrl: "ssh://git.acme.example/openclaw/",
          },
        },
      },
    });

    expect(catalog?.feeds?.acme.url).toBe("https://packages.acme.example/openclaw/feed");
    expect(catalog?.sources?.["acme-git"].type).toBe("git");
  });

  it.each(["http://packages.acme.example/openclaw/feed", "not a url"])(
    "rejects invalid hosted feed URL %s without throwing",
    (url) => {
      expect(() =>
        OpenClawSchema.safeParse({
          catalog: {
            feeds: { acme: { url } },
          },
        }),
      ).not.toThrow();
      const result = OpenClawSchema.safeParse({
        catalog: {
          feeds: { acme: { url } },
        },
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.map((issue) => issue.path.join("."))).toContain(
          "catalog.feeds.acme.url",
        );
      }
    },
  );

  it("rejects auth and signed verification until loader enforcement exists", () => {
    expect(
      OpenClawSchema.safeParse({
        catalog: {
          feeds: {
            acme: {
              url: "https://packages.acme.example/openclaw/feed",
              auth: { scheme: "bearer", secret: "token" },
            },
          },
        },
      }).success,
    ).toBe(false);
    expect(
      OpenClawSchema.safeParse({
        catalog: {
          feeds: {
            acme: {
              url: "https://packages.acme.example/openclaw/feed",
              verification: { mode: "signed" },
            },
          },
        },
      }).success,
    ).toBe(false);
  });

  it("rejects unknown source profile types", () => {
    const result = OpenClawSchema.safeParse({
      catalog: {
        sources: { acme: { type: "container", baseUrl: "https://packages.acme.example/" } },
      },
    });

    expect(result.success).toBe(false);
  });
});
