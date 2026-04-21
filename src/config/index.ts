import development from "./config.development.json";
import local from "./config.local.json";
import test from "./config.test.json";

type ConfigShape = { testValue: string };

const configsByEnv: Record<string, ConfigShape> = {
  development,
  local,
  test,
};

const envKey = import.meta.env.VITE_APP_ENV ?? import.meta.env.MODE;
const _config = configsByEnv[envKey] ?? configsByEnv.development;

const config = {
  testValue: _config.testValue,
};

export default config;
