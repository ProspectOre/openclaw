// Defines hosted catalog feed and package source profile configuration types.
export type CatalogFeedRefreshConfig = {
  onStartup?: "never" | "always" | "if-stale";
  interval?: string;
  jitter?: string;
  timeout?: string;
  maxStale?: string;
};

export type CatalogFeedVerificationConfig = {
  mode: "unsigned";
};

export type CatalogFeedProfileConfig = {
  url: string;
  refresh?: CatalogFeedRefreshConfig;
  verification?: CatalogFeedVerificationConfig;
};

export type CatalogSourceProfileConfig =
  | {
      type: "npm";
      registry?: string;
    }
  | {
      type: "clawhub";
      baseUrl?: string;
    }
  | {
      type: "git";
      baseUrl?: string;
    };

export type CatalogConfig = {
  feeds?: Record<string, CatalogFeedProfileConfig>;
  sources?: Record<string, CatalogSourceProfileConfig>;
};
