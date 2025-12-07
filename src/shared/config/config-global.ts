import packageJson from "../../../package.json";

// ----------------------------------------------------------------------

export type ConfigValue = {
  env: "prd" | "stg" | "dev";
  site: {
    name: string;
    serverUrl: string;
    assetURL: string;
    basePath: string;
    version: string;
  };
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  env: (import.meta.env.VITE_ENV as "prd" | "stg" | "dev") ?? "dev",
  site: {
    name: "UIUX Playground",
    serverUrl: import.meta.env.VITE_SERVER_URL ?? "",
    assetURL: import.meta.env.VITE_ASSET_URL ?? "",
    basePath: import.meta.env.VITE_BASE_PATH ?? "",
    version: packageJson.version,
  },
};
